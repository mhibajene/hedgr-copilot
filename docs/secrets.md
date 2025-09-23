## Observability (optional, dev-safe)

Hedgr Copilot’s analytics/error reporting is **off by default** and **dev-gated**.

**Runtime gates**
- Only runs on the client.
- Only runs when `NEXT_PUBLIC_APP_ENV === "dev"`.
- Only initialises a given tool when its keys are present.
- Dynamic imports mean missing packages simply **no-op** (no hard dependency).

**Supported providers**
- **PostHog** (event analytics; **no session recording** in our config)
- **Sentry (browser)** (error reporting; PII scrubbing enabled)

**Env vars (set in Doppler → `dev_config_dev` / `stg_config_stg`)**
- `NEXT_PUBLIC_APP_ENV=dev` (only `dev` enables analytics code paths)
- PostHog (optional):
-  - `NEXT_PUBLIC_POSTHOG_KEY=<ph_project_key>`
-  - `NEXT_PUBLIC_POSTHOG_HOST=<https://your-posthog-host>`
- Sentry (optional):
-  - `NEXT_PUBLIC_SENTRY_DSN=<sentry_dsn>`

**Enable in dev**
1) In Doppler `dev_config_dev`, add any of the keys above you wish to test.  
2) Start the app:
- CLI: `pnpm run dev:cli`
- Docker: `pnpm run dev:docker`
3) Events/errors remain **local/dev only**; staging/prod do not initialise because `NEXT_PUBLIC_APP_ENV !== "dev"`.

**Privacy stance (PII-aware defaults)**
- PostHog: session recording disabled; pageview autocapture disabled; a sanitizer strips common identifiers (`email`, `name`, `phone`, `username`) from event properties.
- Sentry: we drop `user`, `request`, and all `breadcrumbs` via `beforeSend`.
- Do not include user PII in `track()` calls.

**Troubleshooting**
- If packages aren’t installed in the workspace, analytics silently no-ops.
- If only some keys are present, only that provider initialises.
