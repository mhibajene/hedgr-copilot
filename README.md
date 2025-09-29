# Hedgr Copilot

Hedgr Copilot is a monorepo for Hedgr's developer tooling and web app surfaces. It's optimized for **Doppler-first config**, **fork-safe CI**, and **lean validation** (test/typecheck/lint).

## Repo layout
```
.
├─ apps/
│  └─ frontend/         # Next.js (Pages Router), API routes, Vitest, ESLint v9 flat config
└─ packages/
   └─ ui/               # Shared UI package (workspace dependency)
```

## Requirements
- Node 20 with **Corepack** (pnpm managed via Corepack)
- **Doppler** CLI (source of truth for env/secrets)
- Docker (optional, for `dev:docker`)

### Doppler setup (once)
```bash
doppler login
doppler setup -p hedgr-copilot -c dev_config_dev
```

## Development

### Quick scripts
```bash
pnpm run dev:cli       # run frontend (Doppler-provided env)
pnpm run dev:docker    # run via docker compose (frontend)
pnpm run validate      # test + typecheck + lint for the whole workspace
```

See `docs/local-dev.md` for Doppler setup and observability toggles.

## Observability (dev-safe)
- Default: off in all envs.
- Dev-only enable: NEXT_PUBLIC_APP_ENV=dev and provider keys present.
- Providers: PostHog (events, session recording disabled), Sentry (errors).
Details: docs/observability.md and docs/secrets.md.

## Health checks (for QA/automation)
- GET /api/health → 200 { status: "ok", ts: "<ISO>" }
- GET /api/version → 200 { version: "<apps/frontend package version>" }

## QA / CI quick checks
```bash
pnpm -w test       # Vitest (unit)
pnpm -w typecheck  # TS (app + tests)
pnpm -w lint       # ESLint v9 flat config
pnpm run validate  # test + typecheck + lint (aggregator)
```

CI includes a version guard to block latest/* ranges. See .github/workflows/ and scripts/ci/guard-no-latest.mjs.
QA process: docs/qa-checklist.md. New PRs auto-use .github/pull_request_template.md.

## Security
- No .env* in git. Doppler is the source of truth.
- No PII in telemetry; PostHog properties sanitized; Sentry beforeSend scrubs PII.

## Contributing
- Open a branch, push, and create a PR.
- Pass validate and check the QA checklist.
- Follow repo coding standards (TypeScript, tests with Vitest, ESLint v9).

### How PRs get merged
- **Auto-merge enabled**: PRs automatically merge once all conditions are met
- **Required checks**: Fork-safe CI, E2E tests, and at least 1 approving review
- **Branch protection**: Must be up-to-date with main branch
- **Pre-merge validation**: Run `pnpm run validate` and `pnpm --filter @hedgr/frontend run e2e:ci` locally before creating PRs

## License
TBD.
