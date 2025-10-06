#!/usr/bin/env bash
set -euo pipefail

# macOS-safe, idempotent label bootstrap
create() { gh label create "$1" --color "$2" --description "$3" --force >/dev/null || true; }

create "product:approved" "2ea043" "Product content approved (HedgrOps)"
create "qa:approved"      "2ea043" "QA pre-merge approval (Codex)"
create "qa:blocked"       "cf222e" "QA: merge blocked"
create "qa:warning"       "d4c5f9" "QA: non-blocking issues"
create "needs:qa"         "fbca04" "Request Codex QA review"

echo "✅ Labels ready."