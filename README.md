# Face Detection

[![Docker Image](https://ghcr-badge.egpl.dev/jedarden/face-detection/latest_tag?trim=major&label=Docker%20Image&color=blue)](https://github.com/jedarden/face-detection/pkgs/container/face-detection)

Browser-based face detection using face-api.js on TensorFlow.js, packaged as a Docker image served by nginx, alongside the research notes and web demo the application grew out of. All inference runs in the browser; the container only serves static files and model weights.

**Live demo:** [face.jedarden.com](https://face.jedarden.com)

## Security update (v1.1.0)

Version 1.1.0 (commit `fc4209ae`) updated dependencies to address the findings `npm audit` reported at the time; see the [Security Migration Guide](./docker-app/SECURITY_UPDATE_MIGRATION.md). The committed `docker-app/security-audit.json` is a point-in-time audit snapshot (9 findings). Run `npm audit` in `docker-app/` for the current state rather than relying on either.

## Repository structure

### 1. `/research/face-detection-lite` - research notes and web demo
Notes on face detection approaches with a small browser demo:
- **Research**: Viola-Jones (Haar cascades), HOG + SVM, and CNN-based detectors, with a `papers/` directory of source material
- **Implementation**: a static page (`index.html`, `src/`) that runs face-api.js against the webcam
- **Documentation**: guides in `docs/`, with examples in `examples/`

What the demo does:
- Webcam face detection in the browser
- Choice of detector (Tiny Face Detector, SSD MobileNet v1)
- Optional landmarks, expressions, and age/gender models

`/research/face-detection-pro` holds two further markdown notes on landmark detection.

### 2. `/docker-app` - the Docker application
A webpack-built single-page app served by nginx, with two modes:

#### Lite mode
- Bounding boxes from the Tiny Face Detector (`faceapi.nets.tinyFaceDetector`)
- Adjustable detection threshold
- Detection loop driven by `requestAnimationFrame`; frame rate depends on the machine and browser

#### Pro mode
- SSD MobileNet v1 detector plus the 68-point landmark model
- Expression recognition (face-api.js's seven expression classes)
- Age and gender estimation
- Landmark, contour, expression, and age/gender overlays (`src/landmarkDrawing.js`)
- Heavier than Lite mode; expect a lower frame rate

Other things in the app:
- Camera selection when more than one camera is present
- Toggleable diagnostics overlay (FPS, memory, timing) from `src/performanceMonitor.js`
- TensorFlow.js WASM backend: the production webpack entry is `src/index-wasm.js`, with a compatibility check in `src/wasmCompatibility.js`
- Test suite: Jest unit and integration tests, Puppeteer E2E tests, Playwright specs, and a security test file under `docker-app/tests/`
- Multi-stage Dockerfile (Node builder stage, `nginx:alpine` runtime); the 2.0.5 image is about 80 MB compressed on GHCR
- Docker `HEALTHCHECK` plus an nginx `/health` endpoint
- HTTPS on port 8443 with a self-signed certificate generated at build time; mount your own certificates at `/etc/nginx/ssl` (see `docker-compose.yml`)

## Quick start

### Research demo
```bash
cd research/face-detection-lite
python3 -m http.server 8000
# Open http://localhost:8000
```

### Docker application

#### From GitHub Container Registry
```bash
# Pull a specific version (tags are unprefixed semver)
docker pull ghcr.io/jedarden/face-detection:2.0.5

# Run container
docker run -d -p 8080:8080 ghcr.io/jedarden/face-detection:2.0.5
# Open http://localhost:8080
```

#### From source
```bash
cd docker-app
docker-compose up
# Open http://localhost:8080
```

### Development mode
```bash
cd docker-app
docker-compose --profile development up
# Open http://localhost:3000
```

## Technologies used

- **Face detection**: face-api.js (`face-api.js` and `@vladmandic/face-api`), TensorFlow.js with the WASM backend package
- **Frontend**: plain JavaScript, HTML, CSS
- **Serving**: nginx in the image; an Express server (`server.js`) for development
- **Containerization**: Docker, Docker Compose
- **Testing**: Jest, Puppeteer, Playwright
- **Build tools**: webpack, Babel

## Performance

No benchmark numbers are committed in this repository. Frame rate is whatever the browser's TensorFlow.js backend achieves on the host; the in-app diagnostics overlay reports it live.

- **Docker image**: about 80 MB compressed (tag 2.0.5 on GHCR)
- **Browser requirements**: `getUserMedia` camera access and WebGL or WebAssembly support

## Documentation

Each subdirectory contains its own documentation:
- `/research/face-detection-lite/README.md` - research notes and algorithm comparison
- `/docker-app/README.md` - Docker application setup and configuration
- `/docker-app/SUMMARY.md` - build summary
- `DOCKER_DEPLOYMENT.md` - Docker deployment guide (written for the original GitHub Actions pipeline; the workflows it describes are no longer in this repository)

## Docker images

Images are published to GitHub Container Registry by the repository's CI. GitHub Actions are not used; there is no `.github/` directory in this repository.

### Available tags
- `2.0.5`, `2.0`, `2` - current release and its minor/major aliases (matches `VERSION`)
- `<major>.<minor>.<patch>` - earlier releases back to `0.0.1`
- `main` - build of the main branch
- `latest` - alias for the most recent release

### Image registry
```
ghcr.io/jedarden/face-detection
```

## License

MIT for this repository's own code - see [LICENSE](LICENSE). Model weights and libraries carry their own licenses; see [LICENSES/](LICENSES/) and the individual projects before commercial use.

## Development process and prompts

This application was built iteratively with AI-assisted programming. Below are the key prompts that guided the development:

### Initial setup and research
1. **Project structure**:
   > "Create a new folder named face-detection-repo/"

2. **Research phase**:
   > "conduct deep research about basic face detection, the kind where a bounding box is put around the detected face. Use github repos, academic papers, youtube transcripts, and any other web sources to create a webpage that can demonstrate this technology using a device's webcam and the local compute resources. Put the results into face-detection-repo/research/face-detection-lite"

### Core application development
3. **Docker application**:
   > "Based on the research in face-detection-repo/research build a docker image which exposes a single port and serves a web application which uses the user's camera to power two levels of face detection. Lite shows a bounding box around the face. Pro shows an overlay over the face with markers showing various landmarks. Use test driven development to build this application. If stuck, conduct deep research into the problem and the solutions. Keep iterating until the application is complete and passes all tests. Once complete, update the documentation to summarize what was built. Spawn up to 5 agents to work on this application concurrently."

### Feature enhancements
4. **Multi-camera support**:
   > "Update the application to allow the user to select from multiple cameras--provided there are multiple cameras to select from."

5. **Docker fixes**:
   > "Fix this issue. vscode ➜ /workspaces/face-detection/face-detection-repo/docker-app (workspace/basic) $ docker compose logs -f WARN[0000] /workspaces/face-detection/face-detection-repo/docker-app/docker-compose.yml: the attribute 'version' is obsolete, it will be ignored, please remove it to avoid potential confusion healthcheck.test must start either by 'CMD', 'CMD-SHELL' or 'NONE'"

6. **Build performance**:
   > "Seems the build process is hung. [+] Building 239.0s (18/23) ..."

7. **Loading issues**:
   > "Loading Face Detection App... Please wait while we load the models. nothing else shows"

### Visual and UX improvements
8. **Visual fixes**:
   > "The percentage in the lite bounding box is reverse. It's probably because the camera image is also reversed. Tune the bounding box to minimize around the face instead of showing a broader edge."

9. **Diagnostics**:
    > "Include toggleable diagnostic information showing cpu consumption, fps, memory consumption and other important metrics."

10. **Text rendering**:
    > "The text in both modes is backwards. Fix it."

11. **Container integration**:
    > "The face detection diagnostics should be included in the main container."

### Final optimizations
12. **Camera preview**:
    > "When the page is first loaded, don't show the blank canvas, already load the camera and preview. Starting the detection should start the face detection loop. Also, when pressing show diagnostics, got this in the front end console. app.js:410 Uncaught ReferenceError: diagnosticsEnabled is not defined at HTMLButtonElement.toggleDiagnostics (app.js:410:3) Put the camera detection above the canvas."

13. **CI/CD pipeline**:
    > "Set up the workflow to build and publish the docker image hosted on ghcr"

14. **Documentation enhancement**:
    > "Update the readme with the prompts which were used to create the application."

15. **Visual enhancement**:
    > "Add emojis to the readme for each section."

### Technical decisions made

#### Architecture choices
- **Frontend**: plain JavaScript rather than a framework, to keep the app small
- **Face detection**: face-api.js on TensorFlow.js so inference runs in the browser
- **Docker**: multi-stage build so the runtime image contains only nginx and the built assets
- **Testing**: Jest plus Puppeteer/Playwright

#### Problem-solving approach
1. **Docker build issues**: simplified Dockerfile, model weights downloaded during the build (`download-models.js`)
2. **ES6 module loading**: switched to CDN-based loading for compatibility
3. **Text mirroring**: canvas transform reset and re-mirroring so overlay text reads correctly on the mirrored video
4. **Camera preview**: camera initialization separated from the detection loop
5. **Diagnostics integration**: fixed variable scope issues and added the live performance overlay

#### Performance work
- **Tighter bounding boxes**: padding reduced to 10% of the box
- **Detection loop**: `requestAnimationFrame`-driven
- **Memory**: explicit cleanup when stopping detection
- **Backends**: TensorFlow.js WebGL backend, later a WASM backend build

#### User experience
- **Automatic camera preview**: camera feed shown on page load, before detection starts
- **Responsive layout**: scales to smaller screens
- **Visual feedback**: separate video preview and detection canvas
- **Diagnostics**: FPS, memory, and timing overlay
- **Error handling**: fallbacks when camera access fails

### Development methodology
- **Test-first**: unit, integration, and E2E tests were written alongside the features
- **Iterative refinement**: changes driven by the prompts above
- **Performance monitoring**: the diagnostics overlay was used to find bottlenecks
- **Documentation**: decisions recorded in the `docker-app/*.md` files

---

Part of [jedarden.com](https://jedarden.com) · Read the write-up: [jedarden.com/projects/face/](https://jedarden.com/projects/face/)

*This GitHub repo is a read-only mirror of git.ardenone.com/jedarden/face-detection — issues and PRs are welcome here either way.*
