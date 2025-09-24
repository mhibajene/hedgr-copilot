/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Dev-safe analytics initialiser for PostHog & Sentry.
 * - Client-only
 * - Only runs when NEXT_PUBLIC_APP_ENV === 'dev'
 * - Only runs when respective keys are present
 * - Dynamic imports -> if packages are not installed, this no-ops silently
 * - PII-safety: PostHog sanitizes common identifiers, session replay disabled; Sentry strips user/request/breadcrumbs
 */

let posthogRef: any | null = null;
let sentryRef: any | null = null;
let initialised = false;

export async function initAnalytics(): Promise<void> {
  const isClient = typeof window !== 'undefined';
  const ENV = process.env.NEXT_PUBLIC_APP_ENV;
  const IS_DEV = ENV === 'dev';
  const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST; // require explicit host to avoid accidental exfil
  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!isClient || !IS_DEV || initialised) return;
  initialised = true;

  const tasks: Promise<void>[] = [];

  if (PH_KEY && PH_HOST) {
    tasks.push(
      import('posthog-js')
        .then((ph) => {
          const posthog = ph.default;
          posthog.init(PH_KEY, {
            api_host: PH_HOST,
            capture_pageview: false,
            disable_session_recording: true,
            persistence: 'memory',
            property_blacklist: ['email', 'name', 'phone', 'username'],
          });
          posthogRef = posthog;
        })
        .catch(() => {
          // Package not installed or failed to load → remain no-op
        })
    );
  }

  if (SENTRY_DSN) {
    tasks.push(
      import('@sentry/browser')
        .then((sentry) => {
          sentry.init({
            dsn: SENTRY_DSN,
            environment: ENV,
            tracesSampleRate: 0,
            beforeSend(event) {
              // Strip PII
              if (event.user) delete event.user;
              if (event.request) delete event.request;
              if (event.breadcrumbs) event.breadcrumbs = [];
              return event;
            },
          });
          sentryRef = sentry;
        })
        .catch(() => {
          // Package not installed or failed to load → remain no-op
        })
    );
  }

  await Promise.all(tasks);
}

export function track(event: string, properties?: Record<string, unknown>): void {
  const isClient = typeof window !== 'undefined';
  const ENV = process.env.NEXT_PUBLIC_APP_ENV;
  const IS_DEV = ENV === 'dev';
  if (!isClient || !IS_DEV || !posthogRef) return;
  try {
    posthogRef.capture(event, properties);
  } catch {
    // noop in dev
  }
}