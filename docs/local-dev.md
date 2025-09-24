# Local Development — Doppler + pnpm (CLI & Docker)

Run Hedgr Copilot locally with **Doppler**-injected envs and **pnpm** (via Corepack).  
No `.env*` files; the image does **not** contain Doppler or secrets.

---

## Prerequisites
- **Node** (use Corepack-managed pnpm; do not install pnpm globally)
- **Corepack** (ships with Node ≥16.13): `corepack enable`
- **Docker Desktop** (or Colima)
- **Doppler CLI**: `brew install dopplerhq/cli/doppler`

> The workspace respects `package.json:"packageManager"` via Corepack. Never hardcode a pnpm version.

---

## One-time setup
```bash
# Authenticate Doppler & select dev config
doppler setup -p hedgr-copilot -c dev_config_dev

# Verify Corepack + pnpm
corepack enable
pnpm --version
```

---

## Day-to-day commands

### Dev (CLI)
```bash
pnpm run dev:cli
```
Runs the dev servers locally with Doppler-provided envs.

### Dev (Docker Compose)
```bash
pnpm run dev:docker
```
Builds and starts the `frontend` service via Compose.  
Env is injected **from host** by Doppler at invocation time (no Doppler inside the container).

### Pre-PR validation
```bash
pnpm run validate
```
Aggregates: `pnpm -w test && pnpm -w typecheck && pnpm -w lint`.

---

## Quick smoke checks
- `GET /api/health` → `200 { "status": "ok", "ts": "<ISO>" }`
- `GET /api/version` → `200 { "version": "<apps/frontend package version>" }`

---

## Environment & secrets policy
- **Single source of truth:** Doppler (`dev_config_dev`, `stg_config_stg`)
- **Never** commit `.env*` files.
- Observability is **off by default**. Dev-only enabling requires:
  - `NEXT_PUBLIC_APP_ENV=dev`
  - Optional keys: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_SENTRY_DSN`
  - See `docs/observability.md` for details.

---

## Troubleshooting
- `command not found: doppler` → `brew install dopplerhq/cli/doppler`
- pnpm not recognized / wrong version → `corepack enable` (uses repo’s pinned version)
- Env not loading in Docker → ensure you ran `pnpm run dev:docker` (which wraps `doppler run -- docker compose ...`)
- Hitting endpoints returns 404 → ensure you’re on the **frontend** app and dev server is running

---

## Notes
- Run scripts **from the repo root**; workspaces use `-w` to run across packages.
- Keep secrets out of logs and code; rely on Doppler for config across environments.
