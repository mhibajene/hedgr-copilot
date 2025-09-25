/**
 * Dev-safe analytics initializer for PostHog & Sentry.
 * - Client-only
 * - Only runs when NEXT_PUBLIC_APP_ENV === 'dev'
 * - Provider init only when keys are present
 * - Dynamic imports; if pkgs missing, silently no-op
 * - PII-safety: PostHog sanitize_properties; Sentry beforeSend scrubs
 */

// idempotent guard + runtime refs
let initialized = false
let phRef: { init?: (...args: unknown[]) => void; capture?: (evt: string, props?: Record<string, unknown>) => void } | null = null
let sentryRef: { init?: (opts: unknown) => void } | null = null

export async function initAnalytics(): Promise<void> {
  // client-only
  if (typeof window === 'undefined' || initialized) return

  // read env at call-time (testability)
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV
  const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST
  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN

  // dev-only
  if (appEnv !== 'dev') return

  // --- PostHog (optional) ---
  // Note: DO NOT early-return in test — vitest provides virtual mocks; we want init to run.
  if (phKey) {
    try {
      // Some setups expose default; keep fallback to module itself for mocks.
      const mod = await import('posthog-js')
      const posthog = (mod as any).default ?? mod
      phRef = posthog
      posthog.init?.(phKey, {
        api_host: phHost,
        capture_pageview: false,
        disable_session_recording: true,
        persistence: 'memory',
        // scrub obvious PII
        sanitize_properties: (props: Record<string, unknown>) => {
          const clone = { ...props }
          delete (clone as any).email
          delete (clone as any).phone
          delete (clone as any).name
          delete (clone as any).userId
          return clone
        },
      })
    } catch {
      // optional dep — silently no-op
    }
  }

  // --- Sentry (optional) ---
  if (sentryDsn) {
    try {
      const mod = await import('@sentry/browser')
      const sentry = (mod as any).default ?? mod
      sentryRef = sentry
      sentry.init?.({
        dsn: sentryDsn,
        environment: appEnv,
        tracesSampleRate: 0,
        beforeSend: (event: any) => {
          // strip obvious PII paths
          if (event?.user) delete event.user
          if (event?.request) delete event.request
          if (event?.breadcrumbs) delete event.breadcrumbs
          return event
        },
      })
    } catch {
      // optional dep — silently no-op
    }
  }

  initialized = true
}

export function track(event: string, props?: Record<string, unknown>): void {
  if (!phRef?.capture) return
  phRef.capture(event, props)
}

// For testing: reset module state
export function resetAnalytics(): void {
  initialized = false
  phRef = null
  sentryRef = null
}