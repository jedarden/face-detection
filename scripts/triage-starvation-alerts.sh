#!/usr/bin/env bash
#
# triage-starvation-alerts.sh — mechanical triage for `starvation-alert` beads.
#
# Executable form of docs/notes/starvation-alert-triage.md (steps 1–7).
# A starvation alert is either verified false positive (closed with evidence)
# or genuine (remediated mechanically); the `human` label is never the only
# route. Requires only bash + jq + the bead CLI (bead-rs; never run bf here).
#
# Usage:
#   scripts/triage-starvation-alerts.sh                     # scan: triage every
#                                                           # open starvation-alert bead
#   scripts/triage-starvation-alerts.sh --bead <id>         # triage one alert bead
#                                                           # (open or already closed —
#                                                           # closed targets get a
#                                                           # verdict reproduction only)
#   scripts/triage-starvation-alerts.sh --payload-file <f>  # triage a raw payload
#                                                           # (no bead to close)
#   scripts/triage-starvation-alerts.sh --dry-run           # no writes: no probe,
#                                                           # no remediation, no closes
#   scripts/triage-starvation-alerts.sh --append-run-log    # append the emitted
#                                                           # run-log entry to the
#                                                           # protocol doc
#
# Verdict table (protocol step 5):
#   payload open=0/excluded=0 + healthy store (doctor all-OK, probe passes)
#       -> verified false positive (self-contradicting emitter: its own counters
#          say 0/0 while its precondition asserts "open beads exist")
#   payload open>0 + non-empty ready frontier -> stale / self-resolved
#   payload open>0 + empty ready frontier    -> genuine starvation -> step 6
#
# Step-6 buckets and their mechanical fixes:
#   has_assignee       -> bead update <id> --clear-assignee (assigned-but-open
#                         trap; show/doctor report it as healthy — trust the
#                         diagnostics file, not doctor)
#   has_dependencies   -> verify each blocker: closed edge = satisfied,
#                         in_progress = legitimate wait (work is happening),
#                         deferred / manually_blocked = genuinely external,
#                         assigned-but-open blocker = clear it upstream
#   manually_blocked   -> record and stop; never clear someone else's block
#   resource_conflicts -> requires a `bead dep add` edge to serialize, but the
#                         conflict counterpart id is not exposed by the
#                         diagnostics file or any bead CLI output, so the script
#                         can only report it — under genuine starvation it keeps
#                         the run at exit 1 until a human adds the edge
#
# Exit codes:
#   0  every open alert resolved as verified false positive, stale, remediated,
#      or genuinely external (all remaining exclusions manually_blocked, or
#      dependency/wait chains terminating in one — or in an in_progress or
#      deferred blocker, which is work proceeding, not starvation)
#   1  genuine starvation remains with exclusions that are not manually_blocked
#      (or another external/legitimate terminal) — i.e. unremediated
#   2  usage error or tool/store failure (missing jq/bead, bead command failed,
#      doctor unhealthy, probe failed, payload unparseable)
#
# All progress goes to stderr; evidence and the run-log entry go to stdout.

set -uo pipefail

DOC_REL=docs/notes/starvation-alert-triage.md
DIAG_REL=.beads/diagnostics/pluck-diagnostics.json

MODE=scan          # scan | bead | payload
TARGET_BEAD=""
PAYLOAD_FILE=""
DRY_RUN=0
APPEND_RUN_LOG=0
WORKSPACE_DIR="."

PREFIX=""
TMP=""
PROBE_ID=""
PROBE_STATUS="not-run"
READY_COUNT=0
OPEN_COUNT=0
DOCTOR_HEALTHY=0
DOCTOR_SUMMARY=""
DIAG_SUMMARY=""
RUNLOG=""
ALERT_LIST=""      # space-separated alert ids to never remediate in place
RC_ERROR=0         # any tool/store/payload failure -> exit 2
RC_GENUINE=0       # unremediated genuine starvation -> exit 1

log() { printf '%s\n' "$*" >&2; }
out() { printf '%s\n' "$*"; }
die() { log "ERROR: $2"; exit "$1"; }

usage() { awk 'NR > 1 && /^#/ { sub(/^# ?/, ""); print; next } NR > 1 { exit }' "$0"; exit 2; }

# --------------------------------------------------------------------------
# Option parsing
# --------------------------------------------------------------------------
while [ $# -gt 0 ]; do
    case "$1" in
        --bead)           [ $# -ge 2 ] || usage; MODE=bead; TARGET_BEAD="$2"; shift 2 ;;
        --payload-file)   [ $# -ge 2 ] || usage; MODE=payload; PAYLOAD_FILE="$2"; shift 2 ;;
        --dry-run)        DRY_RUN=1; shift ;;
        --append-run-log) APPEND_RUN_LOG=1; shift ;;
        --workspace)      [ $# -ge 2 ] || usage; WORKSPACE_DIR="$2"; shift 2 ;;
        -h|--help)        usage ;;
        *)                log "unknown option: $1"; usage ;;
    esac
done

command -v jq   >/dev/null 2>&1 || die 2 "jq not found in PATH"
command -v bead >/dev/null 2>&1 || die 2 "bead (bead-rs) not found in PATH"

cd "$WORKSPACE_DIR" || die 2 "cannot cd to $WORKSPACE_DIR"
[ -f .beads/config.json ] || die 2 "not a bead-rs workspace (no .beads/config.json)"
PREFIX=$(jq -r '.prefix // empty' .beads/config.json) || die 2 "cannot read .beads/config.json"
[ -n "$PREFIX" ] || die 2 ".beads/config.json has no prefix"

TMP=$(mktemp -d) || die 2 "mktemp failed"
trap 'rm -rf "$TMP"' EXIT

[ -f "$DOC_REL" ] || log "note: $DOC_REL not found; --append-run-log would fail"

# `bead list --json` emits one compact object per line (JSONL) for non-empty
# result sets but a bare `[]` array for empty ones — normalize to strict JSONL
# so counts and filters see zero records instead of one array.
normalize_jsonl() { # $1 = file
    jq -c 'if type == "array" then .[] else . end' "$1" >"$1.n" 2>/dev/null \
        || die 2 "normalize_jsonl: malformed JSON in $1"
    mv "$1.n" "$1"
}

# --------------------------------------------------------------------------
# Step 3 — capture the live store.
# Ordering matters: `bead list --ready` regenerates the pluck diagnostics, so
# the diagnostics file is copied only AFTER the queries (protocol step 3).
# bead output is always consumed to a file — never piped — so the bead binary
# cannot die on SIGPIPE.
# --------------------------------------------------------------------------
capture_store() {
    bead list --ready --limit 100000 >"$TMP/ready.txt" 2>"$TMP/ready.err" \
        || die 2 "bead list --ready failed"
    bead list --ready --json --limit 100000 >"$TMP/ready.jsonl" 2>/dev/null \
        || die 2 "bead list --ready --json failed"
    bead list --status open --json --limit 100000 >"$TMP/open.jsonl" 2>/dev/null \
        || die 2 "bead list --status open --json failed"
    bead list --status in_progress --json --limit 100000 >"$TMP/inprog.jsonl" 2>/dev/null \
        || die 2 "bead list --status in_progress --json failed"
    bead list --status deferred --json --limit 100000 >"$TMP/deferred.jsonl" 2>/dev/null \
        || die 2 "bead list --status deferred --json failed"
    normalize_jsonl "$TMP/ready.jsonl"
    normalize_jsonl "$TMP/open.jsonl"
    normalize_jsonl "$TMP/inprog.jsonl"
    normalize_jsonl "$TMP/deferred.jsonl"

    local doctor_rc=0
    bead doctor >"$TMP/doctor.txt" 2>&1 || doctor_rc=$?
    check_doctor "$doctor_rc"

    # Read the diagnostics snapshot AFTER the queries above (protocol step 3).
    if [ -f "$DIAG_REL" ]; then
        cp "$DIAG_REL" "$TMP/diag.json"
    else
        log "WARN: $DIAG_REL missing — exclusion detail unavailable"
        : >"$TMP/diag.json"
    fi

    READY_COUNT=$(jq -s 'length' "$TMP/ready.jsonl")
    OPEN_COUNT=$(jq -s 'length' "$TMP/open.jsonl")
    DIAG_SUMMARY=$(jq -r '
        if .total_open_beads == null then "diagnostics unavailable"
        else "diagnostics snapshot: \(.total_open_beads) open / " +
             ([.excluded_beads[]?] | length | tostring) + " excluded / " +
             (.final_candidate_count | tostring) + " candidates" end' "$TMP/diag.json")

    # id -> status map for every non-closed bead; closed = absent.
    cat "$TMP/open.jsonl" "$TMP/inprog.jsonl" "$TMP/deferred.jsonl" \
        | jq -r '[.id, .status] | @tsv' >"$TMP/status.tsv"

    # Per open bead: id, assignee (- if none), manual_blocked, blocks-blocker ids.
    jq -r '[.id, (.assignee // "-"), (.manual_blocked | tostring),
            ([.dependencies[]? | select(.kind == "blocks") | .blocker] | join(","))]
           | @tsv' "$TMP/open.jsonl" >"$TMP/open.tsv"

    # Per excluded bead (diagnostics): id, assignee, manual_blocked, conflicts.
    { jq -r '[.bead_id, (.assignee // "-"), (.manual_blocked | tostring),
               (.has_resource_conflicts | tostring)] | @tsv' "$TMP/diag.json" 2>/dev/null \
          || true; } | grep -v '^null' >"$TMP/excluded.tsv" || true
}

# Healthy = doctor exited 0, no FAIL/ERROR lines, and the only WARN lines are
# secret_scan advisories with 0 blocking findings (protocol step 3).
check_doctor() {
    local rc=$1
    DOCTOR_HEALTHY=1
    if [ "$rc" -ne 0 ]; then
        DOCTOR_HEALTHY=0
        DOCTOR_SUMMARY="doctor exited rc=$rc"
        return
    fi
    local bad
    bad=$(awk '
        /^FAIL/ || /^ERROR/ { print; next }
        /^WARN / {
            if ($2 == "secret_scan:" && $0 ~ / 0 blocking/) next
            print
        }
    ' "$TMP/doctor.txt")
    if [ -n "$bad" ]; then
        DOCTOR_HEALTHY=0
        DOCTOR_SUMMARY=$(printf '%s' "$bad" | head -3 | tr '\n' '; ')
    else
        DOCTOR_SUMMARY="doctor all-OK ($(grep -c '^OK' "$TMP/doctor.txt" || true) OK checks, \
advisory-only warnings ignored)"
    fi
}

status_of() { # $1 = bead id -> open|in_progress|deferred|closed
    local s
    s=$(awk -F'\t' -v id="$1" '$1 == id { print $2; exit }' "$TMP/status.tsv")
    printf '%s' "${s:-closed}"
}

open_field() { # $1 = bead id, $2 = field in open.tsv (2=assignee 3=manual 4=blockers)
    awk -F'\t' -v id="$1" '$1 == id { print $'"$2"'; exit }' "$TMP/open.tsv"
}

excluded_field() { # $1 = bead id, $2 = field in excluded.tsv (4=has_resource_conflicts)
    awk -F'\t' -v id="$1" '$1 == id { print $'"$2"'; exit }' "$TMP/excluded.tsv"
}

# --------------------------------------------------------------------------
# Step 4 — writability probe (create-then-close; the event log is NOT
# writability evidence — protocol step 4). `bead create` already prints the
# full prefixed id, so only the printed id is parsed; never re-add the prefix.
# --------------------------------------------------------------------------
run_probe() {
    if [ "$DRY_RUN" -eq 1 ]; then
        PROBE_ID="(skipped: dry-run)"
        PROBE_STATUS="skipped-dry-run"
        log "probe skipped (--dry-run)"
        return 0
    fi
    local created probe_rc=0
    created=$(bead create --title 'Writability probe: starvation-alert triage' \
                --priority 4 --issue-type task 2>"$TMP/probe-create.err") || probe_rc=$?
    PROBE_ID=$(printf '%s\n' "$created" | grep -oE "${PREFIX}-[0-9a-f]+" | head -1)
    if [ "$probe_rc" -ne 0 ] || [ -z "$PROBE_ID" ]; then
        PROBE_STATUS="create-failed"
        log "probe create failed: $created $(cat "$TMP/probe-create.err" 2>/dev/null)"
        return 1
    fi
    if ! bead close "$PROBE_ID" --reason "Create-then-close writability probe per $DOC_REL; intentionally inert." \
            >"$TMP/probe-close.txt" 2>&1; then
        PROBE_STATUS="close-failed"
        log "probe close failed: $(cat "$TMP/probe-close.txt")"
        return 1
    fi
    PROBE_STATUS="created+closed"
    log "writability probe $PROBE_ID created+closed"
    return 0
}

# --------------------------------------------------------------------------
# Step 2 — parse an alert payload. Sets PAYLOAD_*; returns 1 when the payload
# markers are absent (not an alert bead / not a payload file).
# --------------------------------------------------------------------------
parse_payload() { # $1 = file containing the payload text
    PAYLOAD_WORKSPACE=$(sed -n 's/^\*\*Workspace:\*\* *//p' "$1" | head -1 | sed 's/ *$//')
    PAYLOAD_OPEN=$(grep -oE '^\*\*Open beads:\*\* *[0-9]+' "$1" | head -1 | grep -oE '[0-9]+$' || true)
    PAYLOAD_EXCLUDED=$(grep -oE '^\*\*Excluded beads:\*\* *[0-9]+' "$1" | head -1 | grep -oE '[0-9]+$' || true)
    PAYLOAD_TIMESTAMP=$(sed -n 's/^\*\*Timestamp:\*\* *//p' "$1" | head -1)
    [ -n "$PAYLOAD_OPEN" ] && [ -n "$PAYLOAD_EXCLUDED" ] || return 1
    return 0
}

# --------------------------------------------------------------------------
# Step 6 — classify one open bead by walking its blocker chain.
#   classify <id> [visited...]
#   fix:clear-assignee(<id>)   mechanically fixable has_assignee trap
#   terminal:<why>             genuinely external / legitimate wait — record, stop
#   unremediated:<why>         genuine starvation the script cannot fix mechanically
#   inconsistent:<why>         evidence contradicts itself — treated as unremediated
#   stale:edge-satisfied       all blockers closed; next pluck drops the exclusion
# --------------------------------------------------------------------------
classify() {
    local id=$1; shift
    local visited=" $* "
    case "$visited" in *" $id "*) printf 'inconsistent:dep-cycle(%s)' "$id"; return 0 ;; esac
    visited="$visited $id "

    # Direct flags first — show/doctor report assigned-but-open as healthy, so
    # the diagnostics file and the open-set JSON are authoritative.
    local assignee manual
    assignee=$(open_field "$id" 2)
    manual=$(open_field "$id" 3)
    if [ -n "$assignee" ] && [ "$assignee" != "-" ]; then
        printf 'fix:clear-assignee(%s)' "$id"; return 0
    fi
    if [ "$manual" = "true" ]; then
        printf 'terminal:manually_blocked'; return 0
    fi
    if [ "$(excluded_field "$id" 4)" = "true" ]; then
        printf 'unremediated:resource_conflicts'; return 0
    fi

    local blockers result edgecat rest b s ba bm
    blockers=$(open_field "$id" 4)
    if [ -z "$blockers" ]; then
        # No blockers, not assigned, not manual, yet not in the frontier.
        printf 'inconsistent:not-ready-not-excluded'; return 0
    fi

    result="satisfied"
    rest=$blockers
    while [ -n "$rest" ]; do
        b=${rest%%,*}
        if [ "$rest" = "$b" ]; then rest=""; else rest=${rest#*,}; fi
        s=$(status_of "$b")
        case "$s" in
            closed)      edgecat="satisfied" ;;
            in_progress) edgecat="terminal:wait-in-progress($b)" ;;
            deferred)    edgecat="terminal:deferred-blocker($b)" ;;
            open)
                # Open blocker: fix its assignee trap, honour its manual
                # block, otherwise walk its own blockers.
                ba=$(open_field "$b" 2)
                bm=$(open_field "$b" 3)
                if [ -n "$ba" ] && [ "$ba" != "-" ]; then edgecat="fix:clear-assignee($b)"
                elif [ "$bm" = "true" ]; then           edgecat="terminal:manually_blocked($b)"
                else                                     edgecat=$(classify "$b" $visited)
                fi
                ;;
            *)           edgecat="satisfied" ;;
        esac
        # Merge: fix > inconsistent > unremediated > terminal > satisfied.
        case "$edgecat" in
            fix:*)          result="$edgecat" ;;
            inconsistent:*) case "$result" in fix:*) ;; *) result="$edgecat" ;; esac ;;
            unremediated:*) case "$result" in fix:*|inconsistent:*) ;; *) result="$edgecat" ;; esac ;;
            terminal:*)     case "$result" in fix:*|inconsistent:*|unremediated:*) ;; *) result="$edgecat" ;; esac ;;
            *)              : ;;  # satisfied never overrides
        esac
    done
    if [ "$result" = "satisfied" ]; then result="stale:edge-satisfied"; fi
    printf '%s' "$result"
}

# Classify every open bead. Alert beads under triage ($ALERT_LIST) are skipped:
# they are the alerts themselves and resolve by being closed in step 7, not by
# having their assignee cleared underneath a live triage.
classify_all() {
    : >"$TMP/classification.tsv"
    local id cat
    while IFS=$'\t' read -r id _; do
        case " $ALERT_LIST " in *" $id "*) cat="terminal:alert-bead" ;; *) cat=$(classify "$id") ;; esac
        printf '%s\t%s\n' "$id" "$cat" >>"$TMP/classification.tsv"
    done <"$TMP/open.tsv"
}

# Apply every mechanical fix the classification found, then re-capture.
# Sets APPLY_FIXES to the number of fixes attempted.
APPLY_FIXES=0
apply_fixes() {
    APPLY_FIXES=0
    local id cat target
    while IFS=$'\t' read -r id cat; do
        case "$cat" in
            fix:*)
                target=$(printf '%s' "$cat" | grep -oE "${PREFIX}-[0-9a-f]+" | head -1)
                [ -n "$target" ] || target=$id
                if [ "$DRY_RUN" -eq 1 ]; then
                    log "dry-run: would clear assignee on $target ($cat)"
                elif bead update "$target" --clear-assignee >"$TMP/fix.txt" 2>&1; then
                    log "fixed has_assignee trap: cleared assignee on $target"
                else
                    log "ERROR: bead update $target --clear-assignee failed: $(cat "$TMP/fix.txt")"
                    RC_ERROR=1
                fi
                APPLY_FIXES=$((APPLY_FIXES + 1))
                ;;
        esac
    done <"$TMP/classification.tsv"
    if [ "$APPLY_FIXES" -gt 0 ] && [ "$DRY_RUN" -eq 0 ]; then
        capture_store
    fi
}

# Step 6 remediation loop: classify -> fix -> re-pluck until the frontier is
# non-empty or nothing fixable remains. Sets GENUINE_OUTCOME to
# remediated | external | unremediated.
GENUINE_OUTCOME=""
remediate_genuine() {
    local pass=0
    while [ "$pass" -lt 5 ]; do
        if [ "$READY_COUNT" -gt 0 ]; then GENUINE_OUTCOME=remediated; return 0; fi
        classify_all
        apply_fixes
        [ "$APPLY_FIXES" -eq 0 ] && break
        [ "$DRY_RUN" -eq 1 ] && break
        pass=$((pass + 1))
    done
    if [ "$READY_COUNT" -gt 0 ]; then GENUINE_OUTCOME=remediated; return 0; fi
    classify_all
    # Frontier still empty: every remaining open bead must be terminal.
    local bad=0 id cat
    while IFS=$'\t' read -r id cat; do
        case "$cat" in terminal:*) ;; *) bad=1 ;; esac
    done <"$TMP/classification.tsv"
    if [ "$bad" -eq 0 ]; then GENUINE_OUTCOME=external; else GENUINE_OUTCOME=unremediated; fi
}

# --------------------------------------------------------------------------
# Step 7 — record outcome on the alert bead and close it.
# `bead update --notes` REPLACES notes, so pre-existing notes are captured and
# preserved (the alert beads this script closes are freshly filed by the
# emitter and normally carry none, but never destroy them on assumption).
# --------------------------------------------------------------------------
update_notes_and_close() { # $1 = alert id, $2 = status, $3 = notes, $4 = close reason
    local id=$1 status=$2 notes=$3 reason=$4
    if [ -z "$id" ]; then
        log "no alert bead (payload-only run) — nothing to close"
        return 0
    fi
    if [ "$status" != "open" ]; then
        log "$id already closed — verdict reproduced, no write"
        return 0
    fi
    if [ "$DRY_RUN" -eq 1 ]; then
        log "dry-run: would update notes and close $id"
        return 0
    fi
    local existing
    existing=$(jq -r --arg id "$id" 'select(.id == $id) | .notes // empty' "$TMP/open.jsonl" 2>/dev/null || true)
    if [ -n "$existing" ]; then notes="$existing

---
$notes"; fi
    if ! bead update "$id" --notes "$notes" >"$TMP/upd.txt" 2>&1; then
        log "ERROR: bead update $id --notes failed: $(cat "$TMP/upd.txt")"
        RC_ERROR=1
    fi
    if ! bead close "$id" --reason "$reason" >"$TMP/close.txt" 2>&1; then
        log "ERROR: bead close $id failed: $(cat "$TMP/close.txt")"
        RC_ERROR=1
    fi
}

# --------------------------------------------------------------------------
# Run-log entry (protocol "Run log" section format).
# --------------------------------------------------------------------------
append_runlog_entry() { # $1 = alert id, $2 = verdict, $3 = store line
    local who="scripts/triage-starvation-alerts.sh"
    [ "$DRY_RUN" -eq 1 ] && who="$who (dry-run)"
    RUNLOG+="- **$(date -u +%Y-%m-%d)** (\`$who\`): "
    if [ -z "$1" ]; then RUNLOG+="raw payload triage — verdict **$2**. "
    else RUNLOG+="alert \`$1\` — verdict **$2**. "; fi
    RUNLOG+="Payload open=$PAYLOAD_OPEN/excluded=$PAYLOAD_EXCLUDED, workspace='${PAYLOAD_WORKSPACE:-}', ts=${PAYLOAD_TIMESTAMP:-?}. "
    RUNLOG+="${3:-}. $DIAG_SUMMARY."
    RUNLOG+=$'\n'
}

emit_runlog() {
    [ -n "$RUNLOG" ] || return 0
    out ''
    out '<!-- run-log entry for docs/notes/starvation-alert-triage.md -->'
    printf '%s' "$RUNLOG"
}

# --------------------------------------------------------------------------
# Steps 5–7 for one parsed alert payload (globals PAYLOAD_*).
# --------------------------------------------------------------------------
triage_payload() { # $1 = alert id ("" = payload-only), $2 = alert status
    local alert_id=$1 alert_status=$2
    local verdict close_reason notes_body store_line

    log "--- triaging ${alert_id:-raw payload} (payload open=$PAYLOAD_OPEN excluded=$PAYLOAD_EXCLUDED workspace='${PAYLOAD_WORKSPACE:-}' ts=${PAYLOAD_TIMESTAMP:-?})"

    # Every verdict requires a healthy store (protocol step 5).
    if [ "$DOCTOR_HEALTHY" -ne 1 ]; then
        log "store unhealthy ($DOCTOR_SUMMARY) — refusing to verdict; needs human"
        RC_ERROR=1
        append_runlog_entry "$alert_id" "no-verdict:unhealthy-store" ""
        return
    fi
    if ! run_probe; then
        RC_ERROR=1
        append_runlog_entry "$alert_id" "no-verdict:probe-failed" ""
        return
    fi

    store_line="live store: $OPEN_COUNT open beads, ready frontier $READY_COUNT candidate(s), $DOCTOR_SUMMARY, probe $PROBE_ID $PROBE_STATUS"

    if [ "$PAYLOAD_OPEN" -eq 0 ] && [ "$PAYLOAD_EXCLUDED" -eq 0 ]; then
        # Self-contradicting emitter output: its own counters are 0/0 while its
        # precondition asserts "open beads exist" (protocol step 5, row 1).
        verdict="verified-false-positive"
        close_reason="Verified false positive per $DOC_REL: payload open=0/excluded=0 vs $store_line; 'open beads exist' assertion contradicted by payload counters."
        notes_body="Automated triage (scripts/triage-starvation-alerts.sh): verdict verified false positive. Payload: workspace='${PAYLOAD_WORKSPACE:-}' open=$PAYLOAD_OPEN excluded=$PAYLOAD_EXCLUDED timestamp=${PAYLOAD_TIMESTAMP:-?}. $store_line."
        update_notes_and_close "$alert_id" "$alert_status" "$notes_body" "$close_reason"
        log "verdict: $verdict ($store_line)"
    elif [ "$PAYLOAD_OPEN" -gt 0 ] && [ "$READY_COUNT" -gt 0 ]; then
        verdict="stale-self-resolved"
        local ready_list
        ready_list=$(jq -sr '[.[].id][0:5] | join(", ")' "$TMP/ready.jsonl")
        close_reason="Stale / self-resolved per $DOC_REL: payload open=$PAYLOAD_OPEN>0 but ready frontier is non-empty ($ready_list) — work became claimable after the alert fired."
        notes_body="Automated triage (scripts/triage-starvation-alerts.sh): verdict stale / self-resolved. Payload open=$PAYLOAD_OPEN excluded=$PAYLOAD_EXCLUDED. $store_line. Ready frontier disproved starvation: $ready_list."
        update_notes_and_close "$alert_id" "$alert_status" "$notes_body" "$close_reason"
        log "verdict: $verdict (frontier: $ready_list)"
    elif [ "$PAYLOAD_OPEN" -gt 0 ] && [ "$READY_COUNT" -eq 0 ]; then
        verdict="genuine-starvation"
        log "verdict: GENUINE starvation (payload open=$PAYLOAD_OPEN, frontier empty) — remediating (step 6)"
        remediate_genuine
        local detail
        detail=$(awk -F'\t' '{ printf "%s=%s ", $1, $2 }' "$TMP/classification.tsv")
        case "$GENUINE_OUTCOME" in
            remediated)
                verdict="genuine-starvation-remediated"
                close_reason="Genuine starvation remediated per $DOC_REL: after mechanical fixes the ready frontier is non-empty ($store_line). Buckets: $detail"
                ;;
            external)
                verdict="genuine-starvation-external"
                close_reason="Genuine starvation, all remaining exclusions genuinely external per $DOC_REL (manually_blocked / deferred / in-progress chains); recorded and stopped. $store_line. Buckets: $detail"
                ;;
            *)
                verdict="genuine-starvation-unremediated"
                RC_GENUINE=1
                close_reason="Genuine starvation NOT remediated per $DOC_REL: unremediated exclusions remain (resource conflicts need a manual dep edge, or evidence is inconsistent). $store_line. Buckets: $detail"
                ;;
        esac
        notes_body="Automated triage (scripts/triage-starvation-alerts.sh): verdict $verdict. Payload open=$PAYLOAD_OPEN excluded=$PAYLOAD_EXCLUDED. $store_line. Per-bead classification: $detail"
        if [ "$GENUINE_OUTCOME" = "unremediated" ]; then
            # Leave the alert open so a human sees the unremediated state.
            if [ -n "$alert_id" ] && [ "$alert_status" = "open" ] && [ "$DRY_RUN" -eq 0 ]; then
                bead update "$alert_id" --notes "$notes_body" >"$TMP/upd.txt" 2>&1 \
                    || { log "ERROR: bead update $alert_id --notes failed: $(cat "$TMP/upd.txt")"; RC_ERROR=1; }
            fi
            log "alert left open: $close_reason"
        else
            update_notes_and_close "$alert_id" "$alert_status" "$notes_body" "$close_reason"
        fi
    else
        # open=0 but excluded>0 — a degenerate shape the step-5 table does not
        # cover. Record it; never close on an unclassifiable payload.
        verdict="unclassifiable-payload(open=$PAYLOAD_OPEN,excluded=$PAYLOAD_EXCLUDED)"
        RC_ERROR=1
        log "payload shape outside the step-5 verdict table: open=$PAYLOAD_OPEN excluded=$PAYLOAD_EXCLUDED — needs human"
        if [ -n "$alert_id" ] && [ "$alert_status" = "open" ] && [ "$DRY_RUN" -eq 0 ]; then
            bead update "$alert_id" --notes "Automated triage (scripts/triage-starvation-alerts.sh): $verdict — outside step-5 table, left open for human review. $store_line" \
                >"$TMP/upd.txt" 2>&1 \
                || { log "ERROR: bead update failed: $(cat "$TMP/upd.txt")"; RC_ERROR=1; }
        fi
    fi
    append_runlog_entry "$alert_id" "$verdict" "$store_line"
}

# --------------------------------------------------------------------------
# Main
# --------------------------------------------------------------------------
main() {
    capture_store
    log "store captured: $OPEN_COUNT open, frontier $READY_COUNT, $DOCTOR_SUMMARY, $DIAG_SUMMARY"

    case "$MODE" in
        scan)
            # Step 1 — detect open beads labeled starvation-alert. bead list
            # has no --label flag, so filter the JSON locally (protocol step 1).
            jq -c 'select((.labels // []) | index("starvation-alert"))' "$TMP/open.jsonl" \
                >"$TMP/alerts.jsonl" || die 2 "label filter failed"
            local n id status
            n=$(jq -s 'length' "$TMP/alerts.jsonl")
            log "step 1: $n open starvation-alert bead(s)"
            if [ "$n" -eq 0 ]; then
                # Protocol step 1: nothing to triage; still record the health
                # snapshot (steps 2–4, probe included). Fall through to the
                # shared emit/append tail — no early exit here.
                run_probe || RC_ERROR=1
                RUNLOG="- **$(date -u +%Y-%m-%d)** (\`scripts/triage-starvation-alerts.sh\`): step 1 found **0 open \`starvation-alert\` beads**. "
                RUNLOG+="Live store: $OPEN_COUNT open beads, ready frontier $READY_COUNT candidate(s) ($(jq -sr '[.[].id][0:4] | join(", ")' "$TMP/ready.jsonl")), "
                RUNLOG+="$DOCTOR_SUMMARY, $DIAG_SUMMARY, probe ${PROBE_ID:-} $PROBE_STATUS. "
                RUNLOG+="Verdict: starvation condition absent; nothing to verify-then-close, nothing to remediate."
                RUNLOG+=$'\n'
            else
                # All open alerts are excluded from in-place remediation; each
                # is triaged and closed on its own pass below.
                ALERT_LIST=$(jq -r '.id' "$TMP/alerts.jsonl" | tr '\n' ' ')
                local line
                while IFS= read -r line; do
                    id=$(printf '%s' "$line" | jq -r '.id')
                    status=$(printf '%s' "$line" | jq -r '.status')
                    printf '%s' "$line" | jq -r '.description' >"$TMP/payload.txt"
                    if ! parse_payload "$TMP/payload.txt"; then
                        log "ERROR: no payload markers in description of $id — needs human"
                        RC_ERROR=1
                        append_runlog_entry "$id" "unparseable-payload" ""
                        continue
                    fi
                    triage_payload "$id" "$status"
                    capture_store   # next alert sees post-remediation state
                done <"$TMP/alerts.jsonl"
            fi
            ;;
        bead)
            [ -n "$TARGET_BEAD" ] || die 2 "--bead requires an id"
            bead show "$TARGET_BEAD" --json >"$TMP/show.json" 2>/dev/null \
                || die 2 "bead show $TARGET_BEAD failed (not found?)"
            local status
            status=$(jq -r '.[0].status' "$TMP/show.json")
            jq -r '.[0].description' "$TMP/show.json" >"$TMP/payload.txt"
            parse_payload "$TMP/payload.txt" \
                || die 2 "no payload markers in description of $TARGET_BEAD (not an alert bead?)"
            ALERT_LIST=$TARGET_BEAD
            triage_payload "$TARGET_BEAD" "$status"
            ;;
        payload)
            [ -f "$PAYLOAD_FILE" ] || die 2 "payload file not found: $PAYLOAD_FILE"
            parse_payload "$PAYLOAD_FILE" || die 2 "no payload markers in $PAYLOAD_FILE"
            triage_payload "" ""
            ;;
    esac

    emit_runlog

    if [ "$APPEND_RUN_LOG" -eq 1 ]; then
        if [ ! -f "$DOC_REL" ]; then
            log "ERROR: $DOC_REL not found; cannot append run log"
            RC_ERROR=1
        elif [ "$DRY_RUN" -eq 1 ]; then
            log "--append-run-log ignored in dry-run"
        else
            printf '%s' "$RUNLOG" >>"$DOC_REL" || RC_ERROR=1
            log "run-log entry appended to $DOC_REL"
        fi
    fi

    [ "$RC_ERROR" -eq 1 ] && exit 2
    [ "$RC_GENUINE" -eq 1 ] && exit 1
    exit 0
}

main
