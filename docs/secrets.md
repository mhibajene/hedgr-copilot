# Secrets & Config (Doppler as source of truth)

Hedgr Copilot uses **Doppler** for all configuration and secrets.  
Do **not** commit `.env*` files.

## Environments
- Doppler project: `hedgr-copilot`
- Configs:
  - `dev_config_dev` (local development)
  - `stg_config_stg` (staging)
  - `prod_config_prod` (production) — if/when applicable

## Core Variables (common)
- App/runtime secrets live in the relevant package's namespace.
- Never hardcode secrets in code, tests, or CI workflows.

---

## Observability (optional, dev-safe)

**Default:** Off in all environments.  
**Gates:** Enables **only** when:
1) Running in the browser, and  
2) `NEXT_PUBLIC_APP_ENV === "dev"`, and  
3) Provider keys exist.

**Providers**
- **PostHog** (event analytics) — session recording disabled
- **Sentry (browser)** (error reporting) — PII scrubbed

**Env vars (set in Doppler)**
- `NEXT_PUBLIC_APP_ENV`  
  - Use `dev` to enable analytics/error-reporting code paths locally.
  - Any other value (`stg`, `prod`, empty) keeps observability **off**.
- PostHog (optional)
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST` (explicit host required)
- Sentry (optional)
  - `NEXT_PUBLIC_SENTRY_DSN`

**Enable in local dev**
1) `doppler setup -p hedgr-copilot -c dev_config_dev`  
2) Set `NEXT_PUBLIC_APP_ENV=dev` and any provider keys you want to test  
3) Start: `pnpm run dev:cli` (or `pnpm run dev:docker`)

**Staging / Production**
- Keep `NEXT_PUBLIC_APP_ENV` **not equal to** `dev` → observability remains **off**.
- If you need to validate dashboards, do it on a **developer machine** with `dev` gating; don't enable in shared staging.

**Privacy posture**
- **PostHog**: `capture_pageview: false`, `disable_session_recording: true`, `persistence: "memory"`, and a `sanitize_properties` function strips `email`, `name`, `phone`, `username`.
- **Sentry**: `tracesSampleRate: 0` and `beforeSend` removes `user`, `request`, and clears `breadcrumbs`.
- Never send wallet addresses, transaction hashes, national IDs, phone numbers, emails, or device identifiers.

**Event naming**
- Use `snake_case` (e.g., `onboarding_started`, `backup_prompt_shown`).
- Keep properties minimal, non-identifying (e.g., `{ screen: "home" }`).

**Troubleshooting**
- Missing packages (`posthog-js`, `@sentry/browser`) → dynamic imports **no-op** (by design).
- Only some keys present → only that provider initialises.
- Nothing initialises? Check `NEXT_PUBLIC_APP_ENV` is exactly `dev`.

---

## Health/Version (for smoke checks)
- `/api/health` → `200 { status: "ok", ts: "<ISO>" }`
- `/api/version` → `200 { version: "<apps/frontend package version>" }`