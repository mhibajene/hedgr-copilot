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

## CI & E2E

We run two required checks on PRs:

- **Validate**: `pnpm -w validate` (unit tests + typecheck + lint)
- **E2E (Playwright)**: headless smoke against the Next.js app

### Run locally

```bash
# Install everything
pnpm -w install

# Build & test the UI package once if you change it
pnpm --filter @hedgr/ui run build

# Validate all (fast fail)
pnpm -w validate

# Install Playwright browsers (first run)
pnpm --filter @hedgr/frontend exec playwright install --with-deps

# Run E2E locally (uses dev server spun up by Playwright)
pnpm --filter @hedgr/frontend run e2e   # headed
pnpm --filter @hedgr/frontend run e2e:ci # headless, CI-like
```

## Validation & Branch Protection

### Pre-PR Validation
Before creating a PR, run these commands to ensure your changes pass CI:

```bash
# Run all validation checks (equivalent to CI)
pnpm run validate

# Run E2E tests in CI mode
pnpm --filter @hedgr/frontend run e2e:ci
```

### Branch Protection Rules
- **Auto-merge enabled**: PRs automatically merge once all checks pass
- **Required checks**: 
  - Fork-safe CI (typecheck + lint)
  - E2E (Playwright) smoke tests
  - At least 1 approving review
- **Up-to-date requirement**: Branch must be current with main