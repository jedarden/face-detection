# face-detection — Plan

This file is being started retroactively (2026-07-20), during an artifact-improvement
audit — it is not a full historical record of how the repo got here. See
`docs/notes/` for anything more specific added going forward, and `research/` at
the repo root for the pre-existing algorithm research (Viola-Jones, HOG, deep
learning approaches) that predates this doc.

## What this repo ships

- **`docker-app/`** — the production artifact. A client-side, browser-only face
  detection demo (face-api.js / TensorFlow.js on top of webcam video) packaged
  as a multi-stage Docker image and served by nginx. All inference runs in the
  visitor's browser; the container is a static file server plus a couple of
  JSON status endpoints (`/health`, `/metrics`). Two modes: Lite (bounding
  boxes only) and Pro (68-point landmarks, expression, age/gender).
- **`research/face-detection-lite/`**, **`research/face-detection-pro/`** —
  research notes and standalone browser demos (`python3 -m http.server`), not
  deployed.

## Live deployment

- Public URL: **https://face.jedarden.com** (confirmed reachable 2026-07-20,
  HTTP 200, fronted by Cloudflare).
- Runs on `ardenone-cluster`, namespace `face-detection`, single pod
  `face-detection-*`, image `ghcr.io/jedarden/face-detection:latest`.
- Deployment manifest lives in `jedarden/declarative-config`, synced by
  ArgoCD — this repo does not deploy itself.
- CI/CD migration off GitHub Actions onto Argo Workflows (`iad-ci`) is
  **already tracked** in this repo's own beads workspace (bf-2jh, bf-2py,
  bf-vh3, bf-25r) — not duplicated here. That migration is also *why* the
  live image is stale: the WASM-optimization commits on `main` (see below)
  were never rebuilt/redeployed because the old `apexalgo-iad-runners`
  self-hosted GH Actions runners referenced in the workflow no longer exist.

## ADR-001: 2026-07-20 — Ship a single self-hosted build path instead of two competing client entry points

### Context

`docker-app/src/index-wasm.js` is the intended, current entry point: it's
what `webpack.common.js` builds (`entry: './src/index-wasm.js'`), it wires up
`src/wasmBackend.js` (TensorFlow.js WASM backend, "8-20X faster inference"
per its own UI copy), and it's the product of several recent commits
(`ca351e7e feat: Implement WASM optimization...`, `10d95a37 feat: Add
comprehensive WASM verification tools`, `5b2fbae5 fix: Align canvas overlay
with video element`).

However, `docker-app/public/index.html` — the actual HTML template
(`HtmlWebpackPlugin` uses it as `template`, and it is also copied byte-for-byte
as `docker-app/public/index.html` when running the non-webpack
`build:simple` path) — still hard-codes the **old** implementation as well:

```html
<script src="https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"></script>
<script src="app.js"></script>
```

`docker-app/public/app.js` (627 lines) is a self-contained, pre-webpack
implementation: it listens for `DOMContentLoaded`, eagerly loads all five
face-api.js model nets from `/models`, builds its own `#app` DOM (video,
canvas, mode radios, `startBtn`/`stopBtn` etc.), and binds its own event
listeners — using the CDN global `faceapi`, not the npm/WASM-backed
`@vladmandic/face-api` that `index-wasm.js` uses.

`webpack.common.js`'s `CopyWebpackPlugin` copies everything under `public/`
(except `index.html`/`favicon.ico`) straight into `dist/`, so the **built**
`dist/index.html` ships with all three: the CDN `face-api.js` script tag,
`app.js`, *and* the hashed webpack bundle (`runtime.*.js`, `vendors.*.js`,
`main.*.js` — which contains `index-wasm.js`). Confirmed directly against the
built `dist/index.html` in this checkout (2026-07-20).

Two independent implementations both attach `DOMContentLoaded` listeners,
both fetch face detection models, and both try to own the same DOM element
IDs (`video`, `overlay`, `startBtn`, `stopBtn`, ...). Whichever script's
listener fires/finishes last wins the DOM; the other's model fetches and
event bindings are wasted work at best, and a source of flaky/undefined
behavior at worst (e.g., `app.js` rebinding `startBtn.onclick` after
`index-wasm.js` already bound it, or vice versa, depending on network timing
of two separate `Promise.all` model-loading races). This means the WASM
work — the entire stated point of the recent commits — has no reliable way
to actually be what the user's clicks and camera feed go through, even in a
build where it *is* present in the bundle.

Separately, `docker-app/src/wasmBackend.js:15` loads the WASM binary
itself from an **unpinned** CDN URL:
`https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@latest/dist/` —
so even the "new" path silently pulls whatever `@tensorflow/tfjs-backend-wasm`
version jsdelivr resolves `@latest` to at request time, independent of the
pinned `^4.22.0` in `package.json`.

This also compounds with `docker-app/nginx.conf`'s cache rule:

```nginx
location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg|eot|otf|wasm)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

This regex matches *every* `.js`/`.css` file, not just the content-hashed
webpack outputs — including the un-hashed `app.js`, `config.js` (regenerated
per-container-start by `entrypoint.sh` for runtime `APP_PREFIX` injection),
and `styles.css`. Confirmed live: `curl -sI https://face.jedarden.com/app.js`
returns `cache-control: public, max-age=31536000, immutable`. A returning
visitor's browser (and Cloudflare's edge cache) will keep serving a stale
`app.js`/`config.js` for up to a year after any redeploy that changes their
contents without renaming them, since nothing in the URL changes to bust the
cache.

### Decision

Ship exactly **one** client entry point: the webpack-built,
`index-wasm.js`-derived bundle (`runtime.[hash].js` + `vendors.[hash].js` +
`main.[hash].js`), self-hosting all of its dependencies:

1. Delete `docker-app/public/app.js` and the CDN `<script
   src="https://cdn.jsdelivr.net/npm/face-api.js...">` tag from
   `docker-app/public/index.html`. `@vladmandic/face-api` (already an npm
   dependency, already what `index-wasm.js`/`faceDetection.js` import) becomes
   the only face-api.js code path, bundled by webpack like everything else.
2. Vendor the TensorFlow.js WASM binaries as build-time assets (they already
   ship inside the `@tensorflow/tfjs-backend-wasm` npm package under
   `node_modules/@tensorflow/tfjs-backend-wasm/dist/`) via
   `CopyWebpackPlugin`, and point `setWasmPaths()` in
   `docker-app/src/wasmBackend.js` at the local `/wasm/` path instead of
   `cdn.jsdelivr.net/.../@latest/...`. This removes the last unpinned runtime
   dependency and the last external CDN call the production app makes.
3. Narrow the nginx immutable-cache rule to only the hashed webpack output
   directory/pattern (e.g. `location ~* \.[0-9a-f]{8,20}\.(js|css)(\.map)?$`
   or serve hashed assets from their own `/_assets/` subpath), and give
   `config.js`, any remaining unhashed HTML, and `/models/manifest.json` a
   short/no-cache policy so runtime config and manifest updates are always
   revalidated. The per-model-shard files (already content-versioned by the
   face-api.js model release, rarely change) can keep the 1-year immutable
   treatment.
4. Once this lands, `docker-app/src/faceDetection.js.pre-wasm`,
   `src/index.js.pre-wasm`, `src/proMode.js.pre-wasm` (the pre-migration
   snapshots kept alongside the live files) can be deleted — they're git
   history now, not something that needs to live in the working tree.

This is independent of, and unblocks the value of, the existing Argo CI
migration beads (bf-2jh/bf-2py/bf-vh3/bf-25r): once that pipeline rebuilds
and redeploys the image, this ADR is what makes sure the redeployed app
actually behaves like the single, WASM-accelerated app the commit messages
already claim it is, rather than shipping the same dual-entry-point conflict
to production under a new tag.

### Alternatives Considered

- **Keep both entry points, just fix the DOM/race conflict (e.g. have
  `app.js` early-return if `window.app` is already set by `index-wasm.js`).**
  Rejected: still ships two full face-api.js implementations and two model
  fetch waterfalls to every visitor, still depends on an external CDN at
  runtime (a real availability dependency for a demo whose entire value prop
  is "just works in your browser"), and still carries the unpinned
  `tfjs-backend-wasm@latest` risk. Papers over the symptom, not the cause.
- **Delete `index-wasm.js`/WASM path instead, keep the simpler CDN-based
  `app.js` as the one true implementation.** Rejected: throws away the
  documented 8-20x inference speedup, which is real user-facing value for a
  live-webcam app where FPS is the headline metric (README advertises
  25-30 FPS Lite / 15-20 FPS Pro).
- **Leave nginx caching alone, rely on manual cache-busting (e.g. bump a
  query string) on each deploy.** Rejected: relies on a human remembering
  every time; a content-hash in the filename (which webpack already does for
  the bundle) is the standard fix and should just be extended to cover
  everything unhashed instead of leaving an unhashed exception.

### Consequences

**Positive:**
- One implementation to maintain, test, and reason about; the existing
  `tests/` (Jest/Puppeteer/Playwright) can stop needing to account for two
  divergent code paths.
- Removes `cdn.jsdelivr.net`/`unpkg.com` from the CSP `script-src`/`style-src`
  allowlist entirely (both currently present specifically to permit the CDN
  script tag — see commit `6e1a6c91 Fix CSP blocking CDN resources`), which
  is a real attack-surface reduction for a page that requests camera access.
- Eliminates the duplicate model-loading network cost (see the related
  lazy-loading bead below for the second half of that fix).
- Future deploys reliably reach returning visitors' browsers.

**Negative / costs:**
- One-time work: rewiring `docker-app/public/index.html`, `webpack.common.js`
  (add the WASM-binary copy pattern), `docker-app/src/wasmBackend.js`, and
  `docker-app/nginx.conf`/`nginx.conf.template`; needs the existing Jest/E2E
  suite re-run to confirm nothing depended on the `public/app.js` code path
  specifically (e.g. `test-app-manual.js`, `test-camera-selection.js`,
  `verify-app.js` at the `docker-app/` root reference behavior that should be
  checked against which implementation they're actually exercising).
- Slightly larger initial bundle size for `main.[hash].js` since it now needs
  to include what `app.js` used to get for free from a shared CDN cache
  across other sites — acceptable trade for correctness and removing an
  external dependency.
