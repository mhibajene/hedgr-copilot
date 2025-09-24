/**
 * Dev-safe analytics initializer for PostHog & Sentry.
 * - Client-only
 * - Only runs when NEXT_PUBLIC_APP_ENV === 'dev'
 * - Provider init only when keys are present
 * - Dynamic imports; if pkgs missing, silently no-op
 * - PII-safety: PostHog sanitize_properties; Sentry beforeSend scrubs
 */

type PosthogClient = {
  capture: (event: string, properties?: Record<string, unknown>) => void;
};

let posthogRef: PosthogClient | null = null;
let initialised = false;

export async function initAnalytics(): Promise<void> {
  const isClient = typeof window !== 'undefined';
  const ENV = process.env.NEXT_PUBLIC_APP_ENV;
  const IS_DEV = ENV === 'dev';
  const PH_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const PH_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST; // explicit host required
  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (!isClient || !IS_DEV || initialised) return;
  initialised = true;

  const tasks: Promise<void>[] = [];

  if (PH_KEY && PH_HOST) {
    tasks.push(
      import('posthog-js')
        .then((ph) => {
          const posthog = ph.default as {
            init: (key: string, opts: Record<string, unknown>) => void;
            capture: (event: string, properties?: Record<string, unknown>) => void;
          };
          posthog.init(PH_KEY, {
            api_host: PH_HOST,
            capture_pageview: false,
            disable_session_recording: true,
            // keep ephemeral in dev
            persistence: 'memory',
            // defensively scrub common PII keys
            sanitize_properties: (props: Record<string, unknown>) => {
              for (const k of ['email', 'name', 'phone', 'username']) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                delete (props as any)[k];
              }
              return props;
            },
          });
          // keep only the surface we use to avoid leaking types
          posthogRef = { capture: posthog.capture.bind(posthog) };
        })
        .catch(() => {
          // package missing or failed to load -> remain no-op
        })
    );
  }

  if (SENTRY_DSN) {
    tasks.push(
      import('@sentry/browser')
        .then((Sentry) => {
          Sentry.init({
            dsn: SENTRY_DSN,
            environment: ENV,
            tracesSampleRate: 0,
            // Type explicitly to satisfy noImplicitAny without adding Sentry types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            beforeSend(event: any) {
              if (event.user) delete event.user;
              if (event.request) delete event.request;
              if (event.breadcrumbs) event.breadcrumbs = [];
              return event;
            },
          });
        })
        .catch(() => {
          // package missing or failed to load -> remain no-op
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