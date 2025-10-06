#!/usr/bin/env bash
set -euo pipefail
OWNER_REPO="$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || true)"
[ -z "${OWNER_REPO}" ] && { echo "ERROR: gh not authenticated or outside a repo"; exit 1; }

read -r -d '' LABELS <<'EOF'
product:approved|2ea043|Product content approved (HedgrOps)
qa:approved|2ea043|QA pre-merge approval (Codex)
qa:blocked|cf222e|QA: merge blocked
qa:warning|d4c5f9|QA: non-blocking issues
EOF

while IFS='|' read -r name color desc; do
  echo "Upserting: ${name}"
  gh label create "${name}" --color "${color}" --description "${desc}" --force >/dev/null || true
done <<< "${LABELS}"
echo "✅ Labels ready."
