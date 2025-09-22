# Secrets (managed by Doppler)

## Environments / Configs
- dev → `dev`
- stg → `stg`
- prod → `prd` (create when ready)

## Required (apps/frontend)
- NEXT_PUBLIC_APP_ENV
- API_BASE_URL
- POSTHOG_KEY
- SENTRY_DSN

## Local dev (one-time + run)
1) `doppler login` (if not done)
2) `doppler setup -p hedgr-copilot -c dev`
3) `doppler run -- pnpm dev`  → dev toast confirms injectio

# Secrets & Environment — Hedgr Copilot (Frontend)

Hedgr uses **Doppler** as the single source of truth for environment variables.  
**Never** commit `.env*` files to git.

## Doppler Project / Configs
- **Project:** `hedgr-copilot`
- **Configs:**
  - `dev_config_dev` → local/dev usage
  - `stg_config_stg` → staging/main branch CI

## Frontend Variables (validated)
Validation is enforced in two places:
1) **Build-time script:** `pnpm run validate:env:frontend` (runs in secret-based CI build)  
2) **Import-time guard:** `apps/frontend/config/env.ts` throws early if invalid

### Required (build fails if missing/invalid)
- `NEXT_PUBLIC_APP_ENV` — one of **`dev` | `stg` | `prod`**
  - Drives client-side behavior and observability toggles.
- `API_BASE_URL` — **http(s) URL** to the backend API
  - Example: `https://api.dev.hedgr.local` (dev) or `https://api.stg.hedgr.xyz` (stg)

### Optional (warn only, feature disabled if absent)
- `POSTHOG_KEY` — PostHog public key (analytics)
- `SENTRY_DSN` — Sentry client DSN (error reporting)

## Local development (dev config)
```bash
doppler setup -p hedgr-copilot -c dev_config_dev
doppler run -- pnpm dev
```
> Doppler injects the variables into the dev process. No local `.env` files needed.

To set or update a secret locally in the dev config:
```bash
doppler secrets set API_BASE_URL --project hedgr-copilot --config dev_config_dev --value "http://localhost:4000"
doppler secrets set NEXT_PUBLIC_APP_ENV --project hedgr-copilot --config dev_config_dev --value "dev"
```

## CI behavior (summary)
- **Fork-safe `check` job:** runs typecheck/lint only — **no secrets required**.
- **Secret-based `build` job:** fetches secrets via Doppler and runs:
  1) `pnpm run validate:env:frontend`
  2) `pnpm -w build`

## Troubleshooting validation failures
The validator prints actionable errors. Examples:
```
❌ Frontend env validation failed:
 - NEXT_PUBLIC_APP_ENV must be one of dev, stg, prod
 - API_BASE_URL must be a valid http(s) URL

Fix locally:
  doppler setup -p hedgr-copilot -c dev_config_dev
  doppler run -- pnpm dev
```

### Common fixes
- Ensure **`NEXT_PUBLIC_APP_ENV`** is exactly one of `dev`, `stg`, `prod`.
- Ensure **`API_BASE_URL`** is a full URL with `http://` or `https://`.
- For missing optional keys, you’ll see warnings only; features will be disabled safely.

## Quick reference
```bash
# run validator manually
pnpm run validate:env:frontend

# typical local dev flow
doppler setup -p hedgr-copilot -c dev_config_dev
doppler run -- pnpm dev
```
