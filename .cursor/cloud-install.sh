#!/usr/bin/env bash
# Idempotent Cloud Agent install for Hedgr Copilot.
# Installs Node 20 / pnpm workspace deps, builds @hedgr/ui, and creates the
# Flask backend virtualenv. Ubuntu's python3 package does not include
# ensurepip; python3.12-venv must be present before `python3 -m venv`.
set -euo pipefail

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
. "$NVM_DIR/nvm.sh"

nvm install 20
nvm use 20
export PATH="$(dirname "$(nvm which 20)"):$PATH"
corepack enable
corepack install

pnpm install --frozen-lockfile
pnpm run build:ui

if ! dpkg -s python3.12-venv >/dev/null 2>&1; then
  sudo apt-get update
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends python3.12-venv python3-venv
fi

if [[ ! -x apps/backend/.venv/bin/pip ]]; then
  rm -rf apps/backend/.venv
  python3 -m venv apps/backend/.venv
fi

apps/backend/.venv/bin/pip install -U pip
apps/backend/.venv/bin/pip install -e "./apps/backend[test]"
