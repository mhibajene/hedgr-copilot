# Secrets & Config (Doppler as source of truth)

Hedgr Copilot uses **Doppler** for all configuration and secrets.  
Do **not** commit `.env*` files.

## Environments
- Doppler project: `hedgr-copilot`
- Configs:
  - `dev_config_dev` (local development)
  - `stg_config_stg` (staging)
  - `prod_config_prod` (production) — if/when applicable

## Core Rules
- Secrets live only in Doppler.
- Never hardcode secrets in code, tests, or CI.
- Use the workspace scripts (they already run via Doppler when needed).

---

## Observability (optional, dev-safe)

**Default:** Off in all environments.  
**Gates:** Initializes **only when** running in the browser, `NEXT_PUBLIC_APP_ENV === "dev"`, **and** provider keys exist.

**Env vars (set in Doppler)**
- `NEXT_PUBLIC_APP_ENV`  
  - `dev` → enable analytics/error reporting codepaths (if keys provided)  
  - anything else (`stg`, `prod`, empty) → **off by default**
- **PostHog** (optional)
  - `NEXT_PUBLIC_POSTHOG_KEY`
  - `NEXT_PUBLIC_POSTHOG_HOST` (explicit host required)
- **Sentry (browser)** (optional)
  - `NEXT_PUBLIC_SENTRY_DSN`

**Privacy-by-default**
- PostHog: `capture_pageview: false`, session recording disabled, `persistence: "memory"`, and `sanitize_properties` strips `email`, `name`, `phone`, `username`.
- Sentry: `tracesSampleRate: 0`, `beforeSend` removes `user`, `request`, and clears `breadcrumbs`.
- Never send wallet addresses, TX hashes, national IDs, phone numbers, emails, device IDs.

> See the full guide: `docs/observability.md` (how to enable in **dev/stg**, event naming, dashboards TODO).

---

## Health/Version (for smoke checks)
- `/api/health` → `200 { status: "ok", ts: "<ISO>" }`
- `/api/version` → `200 { version: "<apps/frontend package version>" }`