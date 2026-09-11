#!/usr/bin/env bash
# Per-boot Cloud Agent start: bring up stub backend and frontend, then return.
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"
nvm use 20 >/dev/null
export PATH="$(dirname "$(nvm which 20)"):$PATH"

mkdir -p /tmp/cursor/start-user

if ! curl -sf --max-time 2 http://127.0.0.1:5050/v1/health >/dev/null; then
  (
    cd /workspace/apps/backend
    STUB_MODE=true PORT=5050 exec .venv/bin/python -m src.app
  ) > /tmp/cursor/start-user/backend.log 2>&1 &
  echo $! > /tmp/cursor/start-user/backend.pid
fi

if ! curl -sf --max-time 2 http://127.0.0.1:3000/api/health >/dev/null; then
  (
    export NEXT_PUBLIC_AUTH_MODE=mock
    export NEXT_PUBLIC_FX_MODE=stub
    export NEXT_PUBLIC_MARKET_MODE=manual
    export NEXT_PUBLIC_MARKET_SELECTED=UNKNOWN
    export NEXT_PUBLIC_API_BASE_URL=http://localhost:5050
    export NEXT_PUBLIC_APP_ENV=dev
    export NEXT_PUBLIC_FEATURE_COPILOT_ENABLED=true
    cd /workspace
    exec pnpm --filter @hedgr/frontend exec next dev -H 0.0.0.0 -p 3000
  ) > /tmp/cursor/start-user/frontend.log 2>&1 &
  echo $! > /tmp/cursor/start-user/frontend.pid
fi

ready=0
for _ in $(seq 1 90); do
  if curl -sf --max-time 2 http://127.0.0.1:5050/v1/health >/dev/null \
    && curl -sf --max-time 2 http://127.0.0.1:3000/api/health >/dev/null; then
    ready=1
    break
  fi
  sleep 2
done

if [[ "$ready" -ne 1 ]]; then
  echo "Hedgr services did not become ready" >&2
  tail -n 80 /tmp/cursor/start-user/backend.log /tmp/cursor/start-user/frontend.log >&2 || true
  exit 1
fi
