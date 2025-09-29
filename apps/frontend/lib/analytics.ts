/* Analytics (PostHog + Sentry)
 * - client-only, dev-only, key-present-only
 * - dynamic imports; silently no-op if packages are missing
 * - no explicit `any`; minimal local typings
 */

type Dict = Record<string, unknown>

interface PostHogLike {
  init(apiKey: string, options?: Dict): void
  capture(event: string, properties?: Dict): void
  identify?(id: string): void
  reset?(): void
}

interface SentryEvent {
  user?: unknown
  request?: unknown
  breadcrumbs?: unknown[]
  [k: string]: unknown
}

interface SentryLike {
  init(options: { dsn?: string; tracesSampleRate?: number; beforeSend?: (evt: SentryEvent) => SentryEvent | null }): void
  captureException?(e: unknown): void
}

let posthogRef: PostHogLike | null = null
let sentryRef: SentryLike | null = null

const isBrowser = () => typeof window !== 'undefined'
const isDev = () => (process.env.NEXT_PUBLIC_APP_ENV ?? '') === 'dev'

const scrubProps = (props: Dict): Dict => {
  // remove common PII-ish keys
  const out: Dict = {}
  const pii = /email|phone|pass|pwd|token|secret|address|name/i
  for (const [k, v] of Object.entries(props ?? {})) {
    out[k] = pii.test(k) ? '[redacted]' : v
  }
  return out
}

export async function initAnalytics(force = false): Promise<void> {
  if (!isBrowser() || !isDev()) return
  if (!force && (posthogRef || sentryRef)) return

  const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST
  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN

  // PostHog (optional)
  if (phKey && phHost) {
    const mod = await import('posthog-js').then((m) => (('default' in m ? (m as unknown as { default: unknown }).default : m)) as unknown).catch(() => null)
    const ph = mod as PostHogLike | null
    if (ph && typeof ph.init === 'function') {
      ph.init(phKey, {
        api_host: phHost,
        sanitize_properties: (evt: { properties?: Dict }) => {
          const props = evt?.properties ?? {}
          return { ...evt, properties: scrubProps(props) }
        },
        loaded: (loadedPh: unknown) => {
          // some builds pass the instance via `loaded`
          posthogRef = (loadedPh as PostHogLike) ?? ph
        },
      })
      // if `loaded` didn't run, keep reference to base module so capture still works
      if (!posthogRef) posthogRef = ph
    }
  }

  // Sentry (optional)
  if (sentryDsn) {
    const mod = await import('@sentry/browser').then((m) => (('default' in m ? (m as unknown as { default: unknown }).default : m)) as unknown).catch(() => null)
    const sentry = mod as SentryLike | null
    if (sentry && typeof sentry.init === 'function') {
      sentry.init({
        dsn: sentryDsn,
        tracesSampleRate: 0,
        beforeSend(event: SentryEvent) {
          if (event?.user) delete event.user
          if (event?.request) delete event.request
          if (event?.breadcrumbs) delete event.breadcrumbs
          return event
        },
      })
      sentryRef = sentry
    }
  }
}

export function track(event: string, properties?: Dict) {
  if (!isBrowser() || !isDev()) return
  if (!posthogRef) return
  try {
    posthogRef.capture(event, properties)
  } catch {
    // swallow
  }
}

export function reportError(err: unknown) {
  if (!isBrowser() || !isDev()) return
  if (sentryRef && typeof sentryRef.captureException === 'function') {
    try {
      sentryRef.captureException(err)
    } catch {
      /* noop */
    }
  }
}

export function resetAnalytics() {
  posthogRef = null
  sentryRef = null
}