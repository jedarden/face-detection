# Starvation-alert triage protocol

Repeatable, fully automated triage for beads labeled `starvation-alert` in this
workspace (prefix `facedete`, bead-rs backend). Goal: a starvation alert is
either **verified false positive → closed with evidence**, or **genuine →
remediated mechanically**, without the `human` label being the only route.

**This protocol has an executable form:** `scripts/triage-starvation-alerts.sh`
(bash + jq, no other dependencies) implements steps 1–7 mechanically — label
detection, payload parsing, live-store verification, the create-then-close
writability probe, the step-5 verdict table, step-6 bucket remediation, and
run-log emission (`--append-run-log` appends to this document's run log).
Prefer running it over re-deriving the steps by hand; this document remains
the authority the script codifies.

Precedent: `facedete-26dbdeba` (2026-08-28), closed as FALSE POSITIVE using
steps 2–3 below. The recurring alerts all share one shape — empty workspace
field, `open: 0 / excluded: 0` counters, label `alert:starvation:unknown`, and
a hardcoded "open beads exist" assertion in the emitter. The emitter defect is
tracked on NEEDLE-side beads (e.g. `facedete-1002c031` and siblings); this
document covers only the **target-repo triage side**.

## Ground rules

- Never hand-edit anything under `.beads/`. Every store interaction goes
  through the `bead` CLI. `.beads/diagnostics/pluck-diagnostics.json` is
  read-only evidence, not state.
- This is a bead-rs workspace (`.beads/config.json`, `bead_cli.backend:
  bead-rs` in `.needle.yaml`). Never run `bf`/`bead-forge` here.
- `bead list` has **no `--label` filter**. To find beads by label, list JSON
  and filter yourself (step 1).

## Step 1 — Detect

List open beads carrying the label, using jq (or equivalent):

```bash
bead list --status open --json --limit 500 | jq -c '
  select((.labels // []) | index("starvation-alert")) | {id, title}'
```

If output is empty, there is nothing to triage. Still record a health
snapshot (steps 2–4) on the tracking bead that sent you here, then stop.

## Step 2 — Read the alert payload

The payload is in the alert bead's description body, e.g.:

```
Pluck found no candidates but open beads exist.
**Workspace:**
**Open beads:** 0
**Excluded beads:** 0
**Exclusion reasons:**
**Timestamp:** 2026-08-28T04:05:44.396194246+00:00
```

Extract `open_beads`, `excluded_beads`, `workspace`, `timestamp` and compare
them against the live store in steps 3–4.

## Step 3 — Verify against the live store

Run all three; capture output verbatim for the close reason:

```bash
bead list --ready                    # ready frontier (claim ordering)
bead list --status open --json       # open set with labels/assignees/deps
bead doctor                          # store health, all scopes
```

`bead list --ready` and `bead claim` each regenerate
`.beads/diagnostics/pluck-diagnostics.json`, so read it **after** running
them — that guarantees the snapshot is fresh relative to your queries:

```bash
jq '{total_open_beads, exclusion_criteria, final_candidate_count}' \
  .beads/diagnostics/pluck-diagnostics.json
```

`bead doctor` is read-only by default and is expected to report all `OK`. A
`WARN secret_scan` line with 0 blocking findings is advisory and does not
count as an unhealthy store.

## Step 4 — Prove writability

**Do not use `.beads/events.jsonl` as writability evidence.** That file is the
NEEDLE worker dispatch log (`claim` / `dispatch` / `complete` / `timeout` /
`fail` events); it never contains bead `created` events, so an alert bead's
created event cannot appear there. (This corrects the original protocol
suggestion; `facedete-26dbdeba`'s resolution used doctor + list evidence, not
the event log.)

The reliable proof is a create-then-close probe. Two gotchas:

- `bead create` already prints the full prefixed ID — do not add `facedete-`
  again.
- The probe is a real bead; close it immediately and mark it inert.

```bash
PROBE="$(bead create --title 'Writability probe: starvation-alert triage' \
  --priority 4 --issue-type task | grep -oE 'facedete-[0-9a-f]+' | head -1)"
bead close "$PROBE" --reason "Create-then-close writability probe per \
docs/notes/starvation-alert-triage.md; intentionally inert."
```

Create succeeding and close succeeding proves the store reads and writes at
triage time.

## Step 5 — Decide

| Payload | Live store | Verdict | Action |
|---|---|---|---|
| `open: 0`, `excluded: 0` | doctor all-OK; 0 open beads; frontier empty **because nothing is open**; probe passes | **Verified false positive** (self-contradicting emitter output) | Close the alert with the step-3 evidence in the close reason |
| `open > 0` | frontier non-empty | **Stale / self-resolved** — work became claimable after the alert fired | Close the alert; note the ready IDs that disproved starvation |
| `open > 0` | frontier empty | **Genuine starvation** | Step 6 |

Genuine starvation is precisely: `open > 0` **and** the ready frontier is
empty. An empty frontier alone is not starvation if the open set is also
empty.

## Step 6 — Remediate genuine starvation

Classify every excluded bead in `.beads/diagnostics/pluck-diagnostics.json`
(`excluded_beads[]` plus `exclusion_criteria`), then apply the mechanical fix
for each bucket:

| Bucket (`exclusion_criteria`) | Fix |
|---|---|
| `has_assignee` | `bead update <id> --clear-assignee` — the assigned-but-open trap; `bead show`/`bead doctor` report this state as healthy, so trust the diagnostics file |
| `has_dependencies` | For each blocker: if closed, the edge is satisfied; if open, the bead is legitimately waiting — verify the blocker itself is claimable or already in progress. Add missing `bead dep` edges rather than leaving two overlapping beads simultaneously ready |
| `manually_blocked` | Genuinely external — a human unblocked it (`bead list --blocked`). Record it and stop; do not clear someone else's block |
| `resource_conflicts` | Serialize through `bead dep` (single shared checkout; no worktrees), then re-check |

After each fix, re-run `bead list --ready`. Repeat until the frontier is
non-empty **or** every remaining excluded bead is `manually_blocked` (or a
dependency chain terminating in one) — that is genuinely external and ends
the automated path.

## Step 7 — Record and close

- Per-alert outcome goes in the alert bead's own notes
  (`bead update <alert-id> --notes "..."`), with the verdict from step 5, the
  captured step-3 output, and (if remediated) each bead touched and why.
- Close reason format, false positive:

  ```
  bead close <alert-id> --reason "Verified false positive per \
  docs/notes/starvation-alert-triage.md: payload open=0/excluded=0 vs live \
  store 0 open beads, doctor all-OK, probe <id> created+closed; \
  'open beads exist' assertion contradicted by payload counters."
  ```

## Run log

- **2026-09-08** (bead `facedete-57cff2d5`, protocol codified): step 1 found
  **0 open `starvation-alert` beads** (317 total carry the label, all closed).
  Live store: 8 open beads, ready frontier non-empty (`facedete-1002c031`,
  `facedete-dccb10a1`, `facedete-ef5d75de`, `facedete-9745ff59`), doctor
  all-OK (1 advisory secret-scan warning, 0 blocking), diagnostics snapshot
  8 open / 4 excluded (all `has_dependencies`) / 4 candidates, probe
  `facedete-4ef59e8a` created+closed. Verdict: starvation condition absent;
  nothing to verify-then-close, nothing to remediate.
- **2026-09-08** (`scripts/triage-starvation-alerts.sh`): step 1 found **0 open `starvation-alert` beads**. Live store: 7 open beads, ready frontier 2 candidate(s) (facedete-1002c031, facedete-0e794da6), doctor all-OK (13 OK checks, advisory-only warnings ignored), diagnostics snapshot: 7 open / 5 excluded / 2 candidates, probe facedete-7ab5508c created+closed. Verdict: starvation condition absent; nothing to verify-then-close, nothing to remediate.
- **2026-09-08** (`scripts/triage-starvation-alerts.sh`): alert `facedete-ee071d7a` — verdict **verified-false-positive**. Payload open=0/excluded=0, workspace='', ts=2026-08-28T05:01:48.126323508+00:00. live store: 7 open beads, ready frontier 2 candidate(s), doctor all-OK (13 OK checks, advisory-only warnings ignored), probe facedete-65d646b3 created+closed. diagnostics snapshot: 7 open / 5 excluded / 2 candidates.
