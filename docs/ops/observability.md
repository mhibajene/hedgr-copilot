# Observability (PostHog & Sentry)

Goal: developer-centric telemetry that is **off by default**, **no PII**, and easy to enable in **dev/stg**.

## TL;DR
- Off everywhere by default.
- **Enable in dev** by setting `NEXT_PUBLIC_APP_ENV=dev` and provider keys in Doppler.
- **Enable in stg (optional, narrow)** only for short, intentional validation windows.
- No session recording; properties scrubbed; errors scrubbed.

## Env Matrix
| Env | `NEXT_PUBLIC_APP_ENV` | PostHog/Sentry keys present | Result |
|-----|------------------------|-----------------------------|--------|
| Local dev | `dev` | Yes | Initializes (client-only) |
| Local dev | `dev` | No  | No-op |
| Staging   | `stg` | Any | **Off by default** (recommended) |
| Production| `prod`| Any | **Off by default** |

> If you must validate in `stg`, temporarily set `NEXT_PUBLIC_APP_ENV=dev` in a **personal** dev config or a temporary staging config, then revert. Do **not** enable globally.

## How to enable (dev)
```bash
doppler login
doppler setup -p hedgr-copilot -c dev_config_dev
# In Doppler → dev_config_dev, set:
# NEXT_PUBLIC_APP_ENV=dev
# NEXT_PUBLIC_POSTHOG_KEY=<key> (optional)
# NEXT_PUBLIC_POSTHOG_HOST=<host> (optional, required to init PostHog)
# NEXT_PUBLIC_SENTRY_DSN=<dsn>   (optional)
pnpm run dev:cli   # or: pnpm run dev:docker
```

## Privacy & Safety
- **PostHog**: `capture_pageview: false`, `disable_session_recording: true`, `persistence: "memory"`, `sanitize_properties` removes `email`, `name`, `phone`, `username`.
- **Sentry**: `tracesSampleRate: 0`, `beforeSend` clears `user`, `request`, and `breadcrumbs`.
- Never log/send: wallet addresses, tx hashes, national IDs, phone numbers, emails, device IDs.

## Event naming & payloads
- `snake_case` event names: `onboarding_started`, `backup_prompt_shown`, `send_flow_opened`.
- Keep props lean and non-identifying: `{ screen: "home", action: "click" }`.
- Prefer **aggregated** counts over granular user paths.

## Troubleshooting
- Nothing initialises? Confirm:
  - You're in the **browser** (client-only).
  - `NEXT_PUBLIC_APP_ENV === "dev"`.
  - Keys exist for the provider you expect.
- Packages missing? Dynamic imports will **no-op** (intentional). Install only if you need to validate locally.

## Sample dashboards (TODO)
- PostHog: basic event volume, onboarding funnel, feature adoption.
- Sentry: top error groups, recent releases, error rate trend.