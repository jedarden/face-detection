#!/usr/bin/env bash
#
# stub-bead.sh — minimal bead-rs stand-in for
# scripts/tests/triage-starvation-alerts.test.sh.
#
# State is a JSON array of bead objects at $STUB_STORE; every mutating
# subcommand rewrites it in place (atomically via mktemp+mv). Implements
# exactly the subcommand/flag shapes scripts/triage-starvation-alerts.sh
# uses — enough to exercise the script end to end, nothing more. Output
# shapes mirror bead-rs:
#   list --json          -> one compact object per line, or a bare [] if empty
#   list (text)          -> one "<id><TAB><title>" line per bead
#   show <id> --json     -> a one-element JSON array (exit 1 on unknown id)
#   create               -> prints a line containing the new prefixed id
#
# Readiness mirrors the pluck frontier well enough for the remediation loop:
#   ready = status open, no assignee, not manually_blocked, and every
#   dependency edge of kind "blocks" points at a closed blocker.
#
# Test hooks (environment):
#   STUB_DOCTOR_FAIL=1  -> bead doctor emits FAIL and exits 1
#   STUB_DOCTOR_WARN=1  -> bead doctor adds the advisory secret_scan WARN that
#                          check_doctor must ignore (0 blocking findings)
#   STUB_NOT_READY="id id ..." -> ids the ready frontier must exclude even
#                          though store-local readiness passes (models pluck
#                          exclusions the store cannot see, e.g. the
#                          resource-conflict criterion that lives only in the
#                          diagnostics file)
#
set -u

STORE="${STUB_STORE:?stub-bead: STUB_STORE not set}"
[ -f "$STORE" ] || { printf 'stub-bead: no store at %s\n' "$STORE" >&2; exit 2; }

die() { printf 'stub-bead: %s\n' "$1" >&2; exit "${2:-2}"; }

# rewrite [jq options...] FILTER — replace the store with jq's output.
# The filter is the LAST argument; everything before it goes to jq verbatim
# (every call site leads with --arg k v pairs).
rewrite() {
    local prog=${!#}
    local opts=("${@:1:$#-1}")
    local tmp
    tmp=$(mktemp) || die "mktemp failed"
    jq -c "${opts[@]}" "$prog" "$STORE" >"$tmp" || { rm -f "$tmp"; die "jq rewrite failed"; }
    mv "$tmp" "$STORE"
}

# count ID -> 1 when the store holds exactly one bead with that id
count() {
    jq --arg id "$1" '[.[] | select(.id == $id)] | length' "$STORE"
}

require_existing() {
    [ "$(count "$1")" -eq 1 ] || die "no such bead: $1" 1
}

cmd=${1:-}
[ -n "$cmd" ] || die "no subcommand"
shift

case "$cmd" in
    list)
        ready=0 json=0 status=""
        while [ $# -gt 0 ]; do
            case "$1" in
                --ready)  ready=1 ;;
                --json)   json=1 ;;
                --status) [ $# -ge 2 ] || die "--status needs a value"; status=$2; shift ;;
                --limit)  [ $# -ge 2 ] || die "--limit needs a value"; shift ;;
                *)        die "list: unsupported flag $1" ;;
            esac
            shift
        done

        if [ "$ready" -eq 1 ]; then
            # closed ids, space-joined (bead ids contain no spaces)
            closed=$(jq -r '[.[] | select(.status == "closed") | .id] | join(" ")' "$STORE")
            rows=$(jq -c --arg closed "$closed" --arg ex "${STUB_NOT_READY:-}" '
                .[]
                | select(.status == "open"
                         and ((.assignee // "") == "")
                         and (.manual_blocked != true))
                | select([.dependencies[]? | select(.kind == "blocks") | .blocker]
                         | all(. as $b | ($closed | split(" ") | index($b)) != null))
                | select(.id | IN($ex | split(" ")[]) | not)' "$STORE")
        elif [ -n "$status" ]; then
            rows=$(jq -c --arg s "$status" '.[] | select(.status == $s)' "$STORE")
        else
            rows=$(jq -c '.[]' "$STORE")
        fi

        if [ "$json" -eq 1 ]; then
            if [ -n "$rows" ]; then printf '%s\n' "$rows"; else printf '[]\n'; fi
        else
            if [ -n "$rows" ]; then printf '%s\n' "$rows" | jq -r '[.id, .title] | @tsv'; fi
        fi
        ;;

    doctor)
        if [ "${STUB_DOCTOR_FAIL:-0}" = "1" ]; then
            printf 'FAIL integrity: stub forced failure\n'
            exit 1
        fi
        for c in schema integrity dependency_graph checkpoint stale_in_progress \
                 ready_frontier index secret_scan; do
            printf 'OK %s\n' "$c"
        done
        if [ "${STUB_DOCTOR_WARN:-0}" = "1" ]; then
            # advisory shape check_doctor must tolerate: secret_scan with 0
            # blocking findings (comma-separated, matching real doctor output)
            printf 'WARN secret_scan: 1 finding, 0 blocking\n'
        fi
        exit 0
        ;;

    show)
        [ $# -ge 1 ] || die "show: no id"
        id=$1; shift
        [ "${1:-}" = "--json" ] || die "show: only --json is supported"
        require_existing "$id"
        jq -c --arg id "$id" '[.[] | select(.id == $id)]' "$STORE"
        ;;

    create)
        title="" priority=2
        while [ $# -gt 0 ]; do
            case "$1" in
                --title)      [ $# -ge 2 ] || die "--title needs a value"; title=$2; shift 2 ;;
                --priority)   [ $# -ge 2 ] || die "--priority needs a value"; priority=$2; shift 2 ;;
                --issue-type) [ $# -ge 2 ] || die "--issue-type needs a value"; shift 2 ;;
                *)            die "create: unsupported flag $1" ;;
            esac
        done
        [ -n "$title" ] || die "create: --title required"
        newid=$(printf 'facedete-%08x' "$(( $(jq 'length' "$STORE") + 1 ))")
        rewrite --arg id "$newid" --arg title "$title" --arg pri "$priority" \
                --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" '
            . + [{id: $id, title: $title, description: "", status: "open",
                  effective_status: "open", assignee: null, labels: [],
                  manual_blocked: false, dependencies: [], notes: "",
                  priority: ($pri | tonumber), created_at: $ts, updated_at: $ts,
                  revision: 1}]'
        printf 'Created %s\n' "$newid"
        ;;

    close)
        [ $# -ge 1 ] || die "close: no id"
        id=$1; shift
        reason=""
        while [ $# -gt 0 ]; do
            case "$1" in
                --reason) [ $# -ge 2 ] || die "--reason needs a value"; reason=$2; shift 2 ;;
                *)        die "close: unsupported flag $1" ;;
            esac
        done
        require_existing "$id"
        rewrite --arg id "$id" --arg reason "$reason" '
            map(if .id == $id
                then .status = "closed" | .effective_status = "closed"
                   | ._close_reason = $reason | .revision = (.revision + 1)
                else . end)'
        printf 'Closed %s\n' "$id"
        ;;

    update)
        [ $# -ge 1 ] || die "update: no id"
        id=$1; shift
        notes="" notes_given=0 clear=0
        while [ $# -gt 0 ]; do
            case "$1" in
                --notes)          [ $# -ge 2 ] || die "--notes needs a value"
                                  notes=$2; notes_given=1; shift 2 ;;
                --clear-assignee) clear=1; shift ;;
                *)                die "update: unsupported flag $1" ;;
            esac
        done
        require_existing "$id"
        if [ "$clear" -eq 1 ] && [ "$notes_given" -eq 1 ]; then
            rewrite --arg id "$id" --arg notes "$notes" '
                map(if .id == $id then .assignee = null | .notes = $notes
                    | .revision = (.revision + 1) else . end)'
        elif [ "$clear" -eq 1 ]; then
            rewrite --arg id "$id" '
                map(if .id == $id then .assignee = null
                    | .revision = (.revision + 1) else . end)'
        elif [ "$notes_given" -eq 1 ]; then
            rewrite --arg id "$id" --arg notes "$notes" '
                map(if .id == $id then .notes = $notes
                    | .revision = (.revision + 1) else . end)'
        else
            die "update: nothing to do"
        fi
        printf 'Updated %s\n' "$id"
        ;;

    *)
        die "unsupported subcommand: $cmd"
        ;;
esac

exit 0
