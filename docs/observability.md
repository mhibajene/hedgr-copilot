# Observability (PostHog + Sentry) — Dev-Safe

This project ships **optional, off-by-default** observability for analytics (PostHog) and error reporting (Sentry).

## Quick Facts
- **Off by default** in all environments.
- **Dev-only** activation via `NEXT_PUBLIC_APP_ENV=dev`.
- **Key-present-only**: each provider initialises only if its keys are set.
- **Client-only**: initialisation runs in the browser.
- **No PII**: session recording disabled; properties sanitized; Sentry drops user/request/breadcrumbs.

## Enabling (local dev)
1. In Doppler (`dev_config_dev`), set:
   - `NEXT_PUBLIC_APP_ENV=dev`
   - PostHog (optional):  
     `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`
   - Sentry (optional):  
     `NEXT_PUBLIC_SENTRY_DSN`
2. Start app:
   ```bash
   pnpm run dev:cli
   # or
   pnpm run dev:docker
   ```
3. Trigger events with `track('event_name', { minimal: 'context' })`.

## Staging/Production
- Keep `NEXT_PUBLIC_APP_ENV` **not equal to** `dev` → observability code paths **no-op**.
- If analytics validation is needed, test **locally** with `dev` gating instead of enabling in shared environments.

## Privacy & PII Posture
- **PostHog config**:
  - `capture_pageview: false`, `disable_session_recording: true`, `persistence: 'memory'`
  - Property sanitizer removes `email`, `name`, `phone`, `username`.
- **Sentry config**:
  - `tracesSampleRate: 0` by default in dev
  - `beforeSend` strips `user`, `request`, all `breadcrumbs`
- Never send wallet addresses, tx hashes, national IDs, or device identifiers.

## Event Naming & Usage
- Prefer `snake_case` events: `onboarding_started`, `backup_prompt_shown`.
- Keep properties minimal and non-identifying. Good: `{ screen: 'home' }`. Avoid: `{ userEmail: '...' }`.
- Use `track()` from `apps/frontend/lib/analytics.ts`.

## Debugging & Troubleshooting
- Missing packages → dynamic imports **no-op** (intentional).
- Only some keys present → only that provider initialises.
- To confirm PostHog init in dev, open browser console and check network calls to your PostHog host after a `track()`.
- To confirm Sentry, manually throw in a dev-only path and verify no PII is attached.

## Sample Dashboards (TODO)
- PostHog: `onboarding funnel`, `weekly active`, `feature usage`
- Sentry: `top errors`, `release trends`, `frontend regression`

> Questions? See `docs/secrets.md` for environment wiring and the Doppler policy.
