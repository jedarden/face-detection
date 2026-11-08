#!/usr/bin/env bash
# Regression test for scripts/verify-deployment-image.sh.

set -euo pipefail

HERE=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
VERIFIER="$HERE/../verify-deployment-image.sh"
FIXTURES=$(mktemp -d)
trap 'rm -rf "$FIXTURES"' EXIT

cat > "$FIXTURES/pinned.yaml" <<'EOF'
image: ghcr.io/jedarden/face-detection:2.0.5
EOF

bash "$VERIFIER" "$FIXTURES/pinned.yaml" >/dev/null

printf "image: 'ghcr.io/jedarden/face-detection:2.0.5'\n" > "$FIXTURES/quoted.yaml"
bash "$VERIFIER" "$FIXTURES/quoted.yaml" >/dev/null

for tag in latest main 2 2.0 v2; do
    printf 'image: ghcr.io/jedarden/face-detection:%s\n' "$tag" > "$FIXTURES/invalid.yaml"
    if bash "$VERIFIER" "$FIXTURES/invalid.yaml" >/dev/null 2>&1; then
        printf 'FAIL: mutable image tag %s was accepted\n' "$tag" >&2
        exit 1
    fi
done

printf "image: ghcr.io/jedarden/face-detection:2.0.'5\n" > "$FIXTURES/invalid.yaml"
if bash "$VERIFIER" "$FIXTURES/invalid.yaml" >/dev/null 2>&1; then
    printf 'FAIL: malformed quoted image reference was accepted\n' >&2
    exit 1
fi

cat > "$FIXTURES/invalid.yaml" <<'EOF'
image: ghcr.io/jedarden/face-detection:2.0.5
other: ghcr.io/jedarden/face-detection
EOF

if bash "$VERIFIER" "$FIXTURES/invalid.yaml" >/dev/null 2>&1; then
    printf 'FAIL: untagged image beside a pinned image was accepted\n' >&2
    exit 1
fi

digest=$(printf '0%.0s' {1..64})
printf 'image: ghcr.io/jedarden/face-detection@sha256:%s\n' "$digest" > "$FIXTURES/digest.yaml"
bash "$VERIFIER" "$FIXTURES/digest.yaml" >/dev/null

printf 'ok: semver and digest accepted; mutable and untagged references rejected\n'
