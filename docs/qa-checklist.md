# QA Checklist

## Smoke / Uptime
- [ ] `/api/health` responds `200` with `{ status: "ok", ts: <ISO> }`
- [ ] `/api/version` responds `200` with `{ version: <pkg.version> }`

## Observability (dev-safe)
- [ ] By default (no keys / non-dev), PostHog & Sentry do **not** initialise
- [ ] In dev with keys set in Doppler, initialisation occurs without PII:
  - PostHog: no session recording, no auto pageview, props scrubbed
  - Sentry: `beforeSend` removes `user`, `request`, and breadcrumbs

## CI & Code Quality
- [ ] Fork-safe CI passes
- [ ] Env validation (Doppler) passes for target config
- [ ] `pnpm -w test` green
- [ ] `pnpm -w typecheck` passes
- [ ] `pnpm -w lint` passes

## Security & Config
- [ ] No `.env*` files; secrets come from Doppler
- [ ] No new hardcoded secrets, tokens, or URLs leaking private infra
- [ ] Feature flags and env gates documented

## Docs
- [ ] PR includes updates to `docs/secrets.md` / `docs/observability.md` if behaviour changed
- [ ] README or `docs/local-dev.md` updated when dev flows change
