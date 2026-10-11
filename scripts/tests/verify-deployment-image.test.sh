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

cat > "$FIXTURES/latest.yaml" <<'EOF'
image: ghcr.io/jedarden/face-detection:latest
EOF

bash "$VERIFIER" "$FIXTURES/pinned.yaml" >/dev/null

if bash "$VERIFIER" "$FIXTURES/latest.yaml" >/dev/null 2>&1; then
    printf 'FAIL: latest image reference was accepted\n' >&2
    exit 1
fi

digest=$(printf '0%.0s' {1..64})
printf 'image: ghcr.io/jedarden/face-detection@sha256:%s\n' "$digest" > "$FIXTURES/digest.yaml"
bash "$VERIFIER" "$FIXTURES/digest.yaml" >/dev/null

printf 'ok: immutable image references accepted and latest rejected\n'
