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
3) `doppler run -- pnpm dev`  → dev toast confirms injection
