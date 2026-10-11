#!/usr/bin/env bash

set -euo pipefail

INPUT=${1:-docs/plan/plan.md}

if [[ ! -f "$INPUT" ]]; then
    printf 'deployment image verification: file not found: %s\n' "$INPUT" >&2
    exit 2
fi

references=$(grep -Eo 'ghcr\.io/jedarden/face-detection(:[^[:space:]`]+|@[[:alnum:]:.-]+)' "$INPUT" || true)

if [[ -z "$references" ]]; then
    printf 'deployment image verification: no face-detection image reference found in %s\n' "$INPUT" >&2
    exit 1
fi

while IFS= read -r reference; do
    [[ -n "$reference" ]] || continue

    if [[ "$reference" == *":latest" ]]; then
        printf 'deployment image verification: mutable latest tag rejected: %s\n' "$reference" >&2
        exit 1
    fi

    if [[ "$reference" =~ ^ghcr\.io/jedarden/face-detection:v?[0-9]+\.[0-9]+\.[0-9]+([.-][0-9A-Za-z.-]+)?$ ]]; then
        continue
    fi

    if [[ "$reference" == ghcr.io/jedarden/face-detection@sha256:* ]]; then
        digest=${reference##*@sha256:}
        if [[ "${#digest}" -eq 64 && "$digest" =~ ^[[:xdigit:]]+$ ]]; then
            continue
        fi
    fi

    printf 'deployment image verification: unsupported non-immutable reference: %s\n' "$reference" >&2
    exit 1
done < <(printf '%s\n' "$references")

printf 'deployment image verification: immutable reference(s) accepted in %s\n' "$INPUT"
