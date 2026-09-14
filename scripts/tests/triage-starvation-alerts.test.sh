#!/usr/bin/env bash
#
# triage-starvation-alerts.test.sh — unit + end-to-end tests for
# scripts/triage-starvation-alerts.sh.
#
# The bead CLI is stubbed (scripts/tests/stub-bead.sh, placed on PATH) and
# every scenario runs against a disposable fixture workspace, so nothing here
# touches a real store, the network, or .beads/. jq is real — the script's
# jq filters are part of what is under test (notably the diagnostics
# excluded_beads projection).
#
#   bash scripts/tests/triage-starvation-alerts.test.sh          # run all
#   bash scripts/tests/triage-starvation-alerts.test.sh <name>   # one scenario
#
# Exit 0 when every assertion passes, 1 otherwise.

set -u

HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
SCRIPT="$HERE/../triage-starvation-alerts.sh"
STUB="$HERE/stub-bead.sh"

PASS=0 FAIL=0 CURRENT=""

fail()  { FAIL=$((FAIL + 1)); printf 'FAIL [%s] %s\n' "$CURRENT" "$*"; }
stage() { PASS=$((PASS + 1)); printf 'ok   [%s] %s\n' "$CURRENT" "$*"; }

assert_eq() { # desc expected actual
    if [ "$2" = "$3" ]; then stage "$1"
    else fail "$1 — expected [$2], got [$3]"; fi
}
assert_contains() { # desc needle haystack
    case "$3" in
        *"$2"*) stage "$1" ;;
        *)      fail "$1 — [$2] not present" ;;
    esac
}
assert_rc() { assert_eq "$1 (exit code)" "$2" "$3"; }

# ---- fixture helpers -------------------------------------------------------
#
# mkbead renders one bead object with defaults; overrides go through an
# optional JSON object so typed fields (arrays, nulls, booleans) stay exact.

ROOT=$(mktemp -d)
trap 'rm -rf "$ROOT"' EXIT

mkbead() { # id title status description [override-json]
    local id=$1 title=$2 status=$3 desc=$4 ov=${5:-\{\}}
    jq -cn --arg id "$id" --arg t "$title" --arg s "$status" --arg d "$desc" \
           --argjson ov "$ov" '
        {id: $id, title: $t, description: $d, status: $s, effective_status: $s,
         assignee: null, labels: [], manual_blocked: false, dependencies: [],
         notes: "", priority: 2, revision: 1,
         created_at: "2026-09-08T00:00:00Z", updated_at: "2026-09-08T00:00:00Z"} + $ov'
}
to_store() { # bead-json... -> JSON array literal on stdout
    { for b in "$@"; do printf '%s\n' "$b"; done; } | jq -s -c '.'
}

new_ws() { # name -> ws dir with bead-rs config, stub doc, stub bin
    local ws="$ROOT/$1"
    mkdir -p "$ws/.beads/diagnostics" "$ws/docs/notes" "$ws/bin"
    printf '{"prefix":"facedete","uuid":"test","version":1,"created_at":"2026-01-01T00:00:00Z"}\n' \
        >"$ws/.beads/config.json"
    printf '# stub protocol doc\n\n## Run log\n' >"$ws/docs/notes/starvation-alert-triage.md"
    ln -sf "$STUB" "$ws/bin/bead"
    printf '%s\n' "$ws"
}
put_store() { printf '%s' "$2" >"$1/store.json"; }
put_diag()  { printf '%s' "$2" >"$1/.beads/diagnostics/pluck-diagnostics.json"; }

store_json() { jq -c . "$1/store.json"; }          # canonical form for diffs
bead_field() { # ws id field — raw jq -r, so null prints as "null"
    jq -r --arg id "$2" --arg f "$3" '.[] | select(.id == $id) | .[$f]' "$1/store.json"
}
probe_count() { jq '[.[] | select(.title | startswith("Writability probe"))] | length' "$1/store.json"; }

# stderr progress the scan prints after step 1
step1_line() { grep -o 'step 1: .*' "$1/stderr.txt" | head -1; }

RC=0
run_triage() { # ws [extra args...]; set TRIAGE_ENV="K=V K2=V2" for stub hooks
    local ws=$1; shift
    # shellcheck disable=SC2086  # TRIAGE_ENV is intentionally word-split
    env ${TRIAGE_ENV:-} STUB_STORE="$ws/store.json" PATH="$ws/bin:$PATH" \
        bash "$SCRIPT" --workspace "$ws" "$@" >"$ws/stdout.txt" 2>"$ws/stderr.txt"
    RC=$?
    TRIAGE_ENV=""
}

# ---- payload descriptions --------------------------------------------------

P00='Pluck found no candidates but open beads exist.

**Workspace:**
**Open beads:** 0
**Excluded beads:** 0
**Exclusion reasons:**

**Timestamp:** 2026-08-28T04:05:44.396194246+00:00'

P11='Pluck found no candidates but open beads exist.

**Workspace:** other-ws
**Open beads:** 1
**Excluded beads:** 1
**Exclusion reasons:** has_dependencies

**Timestamp:** 2026-08-28T05:00:00.000000000+00:00'

P21='Pluck found no candidates but open beads exist.

**Workspace:**
**Open beads:** 2
**Excluded beads:** 1
**Exclusion reasons:** has_assignee

**Timestamp:** 2026-08-28T06:00:00.000000000+00:00'

# ---- scenarios: end to end -------------------------------------------------

sc_false_positive_close() {
    local ws; ws=$(new_ws s1)
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-aaa1 'Starvation alert: beads invisible in ' open "$P00" \
            '{"labels":["starvation-alert","human"],"notes":"prior human notes"}')" \
        "$(mkbead facedete-aaa2 'finished work' closed '')")"
    put_diag "$ws" '{"total_open_beads":1,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[{"bead_id":"facedete-aaa1","assignee":null,"manual_blocked":false,"has_resource_conflicts":false}]}'

    run_triage "$ws"
    assert_rc "triage succeeds" 0 "$RC"
    assert_eq "alert closed" "closed" "$(bead_field "$ws" facedete-aaa1 status)"
    assert_contains "close reason cites the false-positive verdict" \
        "Verified false positive" "$(bead_field "$ws" facedete-aaa1 _close_reason)"
    assert_contains "close reason cites the live-store evidence" \
        "live store" "$(bead_field "$ws" facedete-aaa1 _close_reason)"
    assert_contains "pre-existing notes preserved" \
        "prior human notes" "$(bead_field "$ws" facedete-aaa1 notes)"
    assert_contains "triage evidence appended to notes" \
        "Automated triage" "$(bead_field "$ws" facedete-aaa1 notes)"
    assert_eq "exactly one writability probe" "1" "$(probe_count "$ws")"
    assert_eq "probe was closed again" "closed" \
        "$(jq -r '[.[] | select(.title | startswith("Writability probe"))][0].status' "$ws/store.json")"
    assert_eq "unrelated closed bead untouched" "closed" "$(bead_field "$ws" facedete-aaa2 status)"
}

sc_stale_self_resolved_close() {
    local ws; ws=$(new_ws s2)
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-bbb1 'Starvation alert: beads invisible in ' open "$P11" \
            '{"labels":["starvation-alert"]}')" \
        "$(mkbead facedete-bbb2 'claimable work item' open '')")"
    put_diag "$ws" '{"total_open_beads":2,"final_candidate_count":1,"exclusion_criteria":{},"excluded_beads":[{"bead_id":"facedete-bbb2","assignee":null,"manual_blocked":false,"has_resource_conflicts":false}]}'

    run_triage "$ws"
    assert_rc "triage succeeds" 0 "$RC"
    assert_eq "alert closed" "closed" "$(bead_field "$ws" facedete-bbb1 status)"
    assert_contains "verdict is stale / self-resolved" \
        "Stale / self-resolved" "$(bead_field "$ws" facedete-bbb1 _close_reason)"
    assert_eq "frontier bead left open" "open" "$(bead_field "$ws" facedete-bbb2 status)"
    assert_eq "frontier bead assignee untouched" "null" "$(bead_field "$ws" facedete-bbb2 assignee)"
}

sc_genuine_remediated_by_clear_assignee() {
    local ws; ws=$(new_ws s3)
    # The alert carries an assignee (in triage by a worker) so the frontier is
    # genuinely empty: the only other open bead is assigned-but-open — the
    # has_assignee trap the step-6 auto-repair exists to clear.
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-ccc1 'Starvation alert: beads invisible in ' open "$P21" \
            '{"labels":["starvation-alert"],"assignee":"triage-worker"}')" \
        "$(mkbead facedete-ccc2 'trapped work item' open '' '{"assignee":"stale-worker"}')")"
    put_diag "$ws" '{"total_open_beads":2,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[{"bead_id":"facedete-ccc1","assignee":"triage-worker","manual_blocked":false,"has_resource_conflicts":false},{"bead_id":"facedete-ccc2","assignee":"stale-worker","manual_blocked":false,"has_resource_conflicts":false}]}'

    run_triage "$ws"
    assert_rc "triage succeeds" 0 "$RC"
    assert_eq "stale assignee cleared" "null" "$(bead_field "$ws" facedete-ccc2 assignee)"
    assert_eq "repaired bead is claimable again (closed via probe path = still open)" \
        "open" "$(bead_field "$ws" facedete-ccc2 status)"
    assert_eq "alert closed after frontier recovered" "closed" "$(bead_field "$ws" facedete-ccc1 status)"
    assert_contains "verdict records the remediation" \
        "Genuine starvation remediated" "$(bead_field "$ws" facedete-ccc1 _close_reason)"
    assert_contains "buckets recorded" "facedete-ccc2" "$(bead_field "$ws" facedete-ccc1 notes)"
    assert_eq "alert assignee not cleared underneath triage" \
        "triage-worker" "$(bead_field "$ws" facedete-ccc1 assignee)"
}

sc_genuine_unremediated_left_open() {
    local ws; ws=$(new_ws s4)
    # resource_conflicts has no mechanical fix (the CLI exposes no counterpart
    # id to add the serializing dep edge), so this is the escalate path:
    # alert stays open, diagnostic snapshot lands in its notes, exit 1.
    # The conflict criterion lives in the diagnostics file, not the store, so
    # the stub needs it handed over explicitly — exactly what real pluck does.
    TRIAGE_ENV="STUB_NOT_READY=facedete-ddd2"
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-ddd1 'Starvation alert: beads invisible in ' open "$P21" \
            '{"labels":["starvation-alert"],"assignee":"triage-worker"}')" \
        "$(mkbead facedete-ddd2 'conflicted work item' open '')")"
    put_diag "$ws" '{"total_open_beads":2,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[{"bead_id":"facedete-ddd1","assignee":"triage-worker","manual_blocked":false,"has_resource_conflicts":false},{"bead_id":"facedete-ddd2","assignee":null,"manual_blocked":false,"has_resource_conflicts":true}]}'

    run_triage "$ws"
    assert_rc "genuine unremediated starvation signals via exit 1" 1 "$RC"
    assert_eq "alert left open for a human" "open" "$(bead_field "$ws" facedete-ddd1 status)"
    assert_contains "diagnostic snapshot attached to the alert" \
        "Automated triage" "$(bead_field "$ws" facedete-ddd1 notes)"
    assert_contains "conflict bucket classified (not mistaken for inconsistent)" \
        "unremediated:resource_conflicts" "$(bead_field "$ws" facedete-ddd1 notes)"
    assert_eq "conflicted bead untouched" "open" "$(bead_field "$ws" facedete-ddd2 status)"
}

sc_genuine_external_manually_blocked() {
    local ws; ws=$(new_ws s5)
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-eee1 'Starvation alert: beads invisible in ' open "$P21" \
            '{"labels":["starvation-alert"],"assignee":"triage-worker"}')" \
        "$(mkbead facedete-eee2 'human-blocked work item' open '' '{"manual_blocked":true}')")"
    put_diag "$ws" '{"total_open_beads":2,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[{"bead_id":"facedete-eee1","assignee":"triage-worker","manual_blocked":false,"has_resource_conflicts":false},{"bead_id":"facedete-eee2","assignee":null,"manual_blocked":true,"has_resource_conflicts":false}]}'

    run_triage "$ws"
    assert_rc "external starvation ends the automated path successfully" 0 "$RC"
    assert_eq "alert closed with the external verdict" "closed" "$(bead_field "$ws" facedete-eee1 status)"
    assert_contains "verdict records genuinely external" \
        "genuinely external" "$(bead_field "$ws" facedete-eee1 _close_reason)"
    assert_eq "manual block never cleared" "true" "$(bead_field "$ws" facedete-eee2 manual_blocked)"
}

sc_dry_run_writes_nothing() {
    local ws before; ws=$(new_ws s6)
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-fff1 'Starvation alert: beads invisible in ' open "$P00" \
            '{"labels":["starvation-alert"]}')" \
        "$(mkbead facedete-fff2 'finished work' closed '')")"
    put_diag "$ws" '{"total_open_beads":1,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[{"bead_id":"facedete-fff1","assignee":null,"manual_blocked":false,"has_resource_conflicts":false}]}'
    before=$(store_json "$ws")

    run_triage "$ws" --dry-run
    assert_rc "dry run succeeds" 0 "$RC"
    assert_eq "store byte-identical after dry run" "$before" "$(store_json "$ws")"
    assert_eq "alert still open" "open" "$(bead_field "$ws" facedete-fff1 status)"
    assert_eq "no probe created" "0" "$(probe_count "$ws")"
}

sc_unhealthy_store_no_verdict() {
    local ws; ws=$(new_ws s7)
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-ggg1 'Starvation alert: beads invisible in ' open "$P00" \
            '{"labels":["starvation-alert"]}')" \
        "$(mkbead facedete-ggg2 'finished work' closed '')")"
    put_diag "$ws" '{"total_open_beads":1,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[]}'

    TRIAGE_ENV="STUB_DOCTOR_FAIL=1"
    run_triage "$ws"
    assert_rc "unhealthy store refuses to verdict (exit 2)" 2 "$RC"
    assert_eq "alert left open" "open" "$(bead_field "$ws" facedete-ggg1 status)"
    assert_eq "no probe on an unhealthy store" "0" "$(probe_count "$ws")"
}

sc_unparseable_payload_no_verdict() {
    local ws; ws=$(new_ws s8)
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-hhh1 'Starvation alert: beads invisible in ' open \
            'no payload markers in here at all' '{"labels":["starvation-alert"]}')")"
    put_diag "$ws" '{"total_open_beads":1,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[]}'

    run_triage "$ws"
    assert_rc "unparseable payload reports a tool/payload failure (exit 2)" 2 "$RC"
    assert_eq "alert left open" "open" "$(bead_field "$ws" facedete-hhh1 status)"
}

sc_title_union_selection() {
    local ws; ws=$(new_ws s9)
    # A label-less alert must still be caught by its title, while the
    # "[Unravel] Starvation alert: ..." proposal siblings — work-tracking
    # beads whose titles merely CONTAIN the phrase — must never be selected.
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-tda1 'Starvation alert: beads invisible in ' open "$P00")" \
        "$(mkbead facedete-tda2 \
            '[Unravel] Starvation alert: beads invisible in  — Harden the emitter' open \
            'proposal body with no payload markers' \
            '{"labels":["unravel-proposal"],"assignee":"worker-a"}')")"
    put_diag "$ws" '{"total_open_beads":2,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[]}'

    run_triage "$ws"
    assert_rc "scan succeeds" 0 "$RC"
    assert_contains "exactly one alert selected" "step 1: 1 open starvation-alert bead(s)" \
        "$(step1_line "$ws")"
    assert_eq "title-matched label-less alert closed" "closed" "$(bead_field "$ws" facedete-tda1 status)"
    assert_contains "label-less alert closed as false positive" \
        "Verified false positive" "$(bead_field "$ws" facedete-tda1 _close_reason)"
    assert_eq "unravel proposal sibling NOT selected" "open" "$(bead_field "$ws" facedete-tda2 status)"
    assert_eq "sibling assignee intact" "worker-a" "$(bead_field "$ws" facedete-tda2 assignee)"
}

sc_bead_mode_single_alert() {
    local ws; ws=$(new_ws s10)
    put_store "$ws" "$(to_store \
        "$(mkbead facedete-tba1 'Starvation alert: beads invisible in ' open "$P00" \
            '{"labels":["starvation-alert"]}')" \
        "$(mkbead facedete-tba2 'finished work' closed '')")"
    put_diag "$ws" '{"total_open_beads":1,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[]}'

    run_triage "$ws" --bead facedete-tba1
    assert_rc "--bead triage succeeds" 0 "$RC"
    assert_eq "targeted alert closed" "closed" "$(bead_field "$ws" facedete-tba1 status)"
    assert_contains "verdict correct" \
        "Verified false positive" "$(bead_field "$ws" facedete-tba1 _close_reason)"
}

# ---- scenarios: unit level (sourced functions, fixture TSVs) ---------------

UNIT_DIRS=""
setup_unit() {
    # source the script for its functions, then point its $TMP global at a
    # fixture dir — classify/check_doctor/normalize_jsonl all read $TMP/*.
    # shellcheck disable=SC1090
    source "$SCRIPT"
    TMP=$(mktemp -d)
    UNIT_DIRS="$UNIT_DIRS $TMP"
}
tsv_fixture() { # status.tsv open.tsv excluded.tsv
    printf '%b' "$1" >"$TMP/status.tsv"
    printf '%b' "$2" >"$TMP/open.tsv"
    printf '%b' "$3" >"$TMP/excluded.tsv"
}
# default fixture: one open bead X, unassigned, unblocked, no conflicts
DEFAULT_STATUS='X\topen\n'
DEFAULT_OPEN='X\t-\tfalse\t\n'
DEFAULT_EXCL=''

sc_unit_parse_payload() {
    setup_unit
    printf 'Pluck found no candidates but open beads exist.\n\n**Workspace:**\n**Open beads:** 0\n**Excluded beads:** 0\n**Exclusion reasons:**\n\n**Timestamp:** 2026-08-28T04:05:44Z\n' >"$TMP/p1.txt"
    if parse_payload "$TMP/p1.txt"; then
        assert_eq "empty workspace parsed" "" "$PAYLOAD_WORKSPACE"
        assert_eq "open counter parsed" "0" "$PAYLOAD_OPEN"
        assert_eq "excluded counter parsed" "0" "$PAYLOAD_EXCLUDED"
        assert_contains "timestamp parsed" "2026-08-28T04:05:44Z" "$PAYLOAD_TIMESTAMP"
    else
        fail "valid payload rejected"
    fi

    printf '**Workspace:** face-detection\n**Open beads:** 12\n**Excluded beads:** 3\n**Timestamp:** 2026-09-01T00:00:00Z\n' >"$TMP/p2.txt"
    if parse_payload "$TMP/p2.txt"; then
        assert_eq "non-empty workspace parsed" "face-detection" "$PAYLOAD_WORKSPACE"
        assert_eq "non-zero open parsed" "12" "$PAYLOAD_OPEN"
        assert_eq "non-zero excluded parsed" "3" "$PAYLOAD_EXCLUDED"
    else
        fail "payload with populated counters rejected"
    fi

    printf 'just some description text\n' >"$TMP/p3.txt"
    if parse_payload "$TMP/p3.txt"; then
        fail "marker-free payload accepted"
    else
        stage "marker-free payload rejected"
    fi
}

sc_unit_normalize_jsonl() {
    setup_unit
    printf '[]\n' >"$TMP/n1.jsonl"
    normalize_jsonl "$TMP/n1.jsonl"
    assert_eq "empty array normalizes to zero records" "0" "$(jq -s 'length' "$TMP/n1.jsonl")"

    printf '{"id":"a"}\n{"id":"b"}\n' >"$TMP/n2.jsonl"
    normalize_jsonl "$TMP/n2.jsonl"
    assert_eq "jsonl passes through unchanged" "2" "$(jq -s 'length' "$TMP/n2.jsonl")"

    printf 'not json at all\n' >"$TMP/n3.jsonl"
    if ( normalize_jsonl "$TMP/n3.jsonl" ) 2>/dev/null; then
        fail "malformed jsonl accepted"
    else
        stage "malformed jsonl dies with an error"
    fi
}

sc_unit_check_doctor() {
    setup_unit

    printf 'OK schema\nOK integrity\nOK dependency graph\n' >"$TMP/doctor.txt"
    check_doctor 0
    assert_eq "all-OK doctor is healthy" "1" "$DOCTOR_HEALTHY"
    assert_contains "healthy summary counts OK checks" "doctor all-OK" "$DOCTOR_SUMMARY"

    printf 'OK schema\nFAIL checkpoint: stale\n' >"$TMP/doctor.txt"
    check_doctor 0
    assert_eq "FAIL line makes the store unhealthy" "0" "$DOCTOR_HEALTHY"

    printf 'OK schema\n' >"$TMP/doctor.txt"
    check_doctor 1
    assert_eq "non-zero doctor exit is unhealthy" "0" "$DOCTOR_HEALTHY"

    printf 'OK schema\nWARN secret_scan: 1 finding, 0 blocking\n' >"$TMP/doctor.txt"
    check_doctor 0
    assert_eq "advisory secret_scan warn stays healthy" "1" "$DOCTOR_HEALTHY"

    printf 'OK schema\nWARN checkpoint: 2 generations behind\n' >"$TMP/doctor.txt"
    check_doctor 0
    assert_eq "non-advisory warn is unhealthy" "0" "$DOCTOR_HEALTHY"
}

sc_unit_classify() {
    setup_unit

    # assigned-but-open -> mechanical fix (the NEEDLE stale-assignee repair)
    tsv_fixture "$DEFAULT_STATUS" 'X\tstale-worker\tfalse\t\n' "$DEFAULT_EXCL"
    assert_eq "assignee -> fix bucket" \
        "fix:clear-assignee(X)" "$(classify X)"

    # manual block -> terminal, never cleared
    tsv_fixture "$DEFAULT_STATUS" 'X\t-\ttrue\t\n' "$DEFAULT_EXCL"
    assert_eq "manual_blocked -> terminal" \
        "terminal:manually_blocked" "$(classify X)"

    # resource conflict from the diagnostics projection -> unremediated
    tsv_fixture "$DEFAULT_STATUS" "$DEFAULT_OPEN" 'X\t-\tfalse\ttrue\n'
    assert_eq "resource_conflicts -> unremediated" \
        "unremediated:resource_conflicts" "$(classify X)"

    # every blocker closed -> the exclusion is stale
    tsv_fixture 'X\topen\nB1\tclosed\n' 'X\t-\tfalse\tB1\n' "$DEFAULT_EXCL"
    assert_eq "satisfied edges -> stale exclusion" \
        "stale:edge-satisfied" "$(classify X)"

    # blocker in progress -> legitimate wait
    tsv_fixture 'X\topen\nB1\tin_progress\n' 'X\t-\tfalse\tB1\n' "$DEFAULT_EXCL"
    assert_eq "in-progress blocker -> terminal wait" \
        "terminal:wait-in-progress(B1)" "$(classify X)"

    # deferred blocker -> legitimate wait
    tsv_fixture 'X\topen\nB1\tdeferred\n' 'X\t-\tfalse\tB1\n' "$DEFAULT_EXCL"
    assert_eq "deferred blocker -> terminal wait" \
        "terminal:deferred-blocker(B1)" "$(classify X)"

    # blocker carrying its own assignee trap surfaces as the fix
    tsv_fixture 'X\topen\nB1\topen\n' 'X\t-\tfalse\tB1\nB1\tw2\tfalse\t\n' "$DEFAULT_EXCL"
    assert_eq "assigned blocker -> upstream fix" \
        "fix:clear-assignee(B1)" "$(classify X)"

    # blocker manually blocked -> terminal upstream
    tsv_fixture 'X\topen\nB1\topen\n' 'X\t-\tfalse\tB1\nB1\t-\ttrue\t\n' "$DEFAULT_EXCL"
    assert_eq "manually-blocked blocker -> terminal upstream" \
        "terminal:manually_blocked(B1)" "$(classify X)"

    # dependency cycle -> evidence contradicts itself
    tsv_fixture 'X\topen\nB1\topen\n' 'X\t-\tfalse\tB1\nB1\t-\tfalse\tX\n' "$DEFAULT_EXCL"
    assert_eq "dependency cycle -> inconsistent" \
        "inconsistent:dep-cycle(X)" "$(classify X)"

    # nothing wrong anywhere yet not in the frontier -> inconsistent evidence
    tsv_fixture "$DEFAULT_STATUS" "$DEFAULT_OPEN" "$DEFAULT_EXCL"
    assert_eq "not-ready-not-excluded -> inconsistent" \
        "inconsistent:not-ready-not-excluded" "$(classify X)"
}

sc_unit_excluded_tsv_projection() {
    # The diagnostics file is an OBJECT with an excluded_beads ARRAY; the
    # projection must iterate that array. Regressing to a top-level projection
    # yields one all-null row, an empty excluded.tsv, and a resource_conflicts
    # bead misclassified as inconsistent evidence.
    setup_unit
    printf '%s' '{"total_open_beads":2,"final_candidate_count":0,"exclusion_criteria":{},"excluded_beads":[{"bead_id":"facedete-z1","assignee":null,"manual_blocked":false,"has_resource_conflicts":true},{"bead_id":"facedete-z2","assignee":"w","manual_blocked":true,"has_resource_conflicts":false}]}' >"$TMP/diag.json"
    { jq -r '.excluded_beads[]? | [.bead_id, (.assignee // "-"),
               (.manual_blocked | tostring), (.has_resource_conflicts | tostring)] | @tsv' \
          "$TMP/diag.json" 2>/dev/null || true; } \
        | grep -v '^null' >"$TMP/excluded.tsv"
    assert_eq "both excluded beads projected" "2" "$(wc -l <"$TMP/excluded.tsv" | tr -d ' ')"
    assert_contains "conflict flag survives the projection" "true" \
        "$(awk -F'\t' '$1 == "facedete-z1" { print $4 }' "$TMP/excluded.tsv")"
}

# ---- runner ----------------------------------------------------------------

wanted="${1:-all}"
for fn in $(declare -F | awk '{print $3}' | grep '^sc_' | sort); do
    name=${fn#sc_}
    if [ "$wanted" = "all" ] || [ "$wanted" = "$name" ]; then
        CURRENT=$name
        "$fn"
    fi
done

printf '\n%d passed, %d failed\n' "$PASS" "$FAIL"
[ -n "$UNIT_DIRS" ] && rm -rf $UNIT_DIRS   # sourced-function fixture dirs
[ "$FAIL" -eq 0 ]
