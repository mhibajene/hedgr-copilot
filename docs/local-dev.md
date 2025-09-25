# Local Development (Hedgr Copilot)

## Prereqs
- Node 20 (Corepack enabled), pnpm via Corepack
- Doppler CLI logged in
  ```bash
  doppler login
  doppler setup -p hedgr-copilot -c dev_config_dev
  ```

## One-liners
- Start frontend (CLI):
  ```bash
  pnpm run dev:cli
  ```
- Start frontend (Docker Compose):
  ```bash
  pnpm run dev:docker
  ```
- Validate workspace (CI-equivalent):
  ```bash
  pnpm run validate   # runs test + typecheck + lint across all packages
  ```

## Observability (dev-safe)
- Off by default. To exercise analytics locally, set keys in Doppler and:
  - `NEXT_PUBLIC_APP_ENV=dev`
  - `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST` (optional)
  - `NEXT_PUBLIC_SENTRY_DSN` (optional)
- Privacy: PostHog session recording disabled; PII scrubbed via `sanitize_properties`.  
  Sentry `beforeSend` strips `user`, `request`, and breadcrumbs.
See: `docs/observability.md`

## Smoke checks
- `GET /api/health` → `200 { status: "ok", ts: "<ISO>" }`
- `GET /api/version` → `200 { version: "<apps/frontend package version>" }`