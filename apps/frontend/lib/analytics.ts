declare global {
  // eslint-disable-next-line no-var
  var __HEDGR_ANALYTICS_INIT: boolean | undefined;
}

type Properties = Record<string, unknown>;
type PostHogLike = {
  capture?: (event: string, properties?: Properties) => void;
  init?: (...args: unknown[]) => void;
};

let posthogRef: PostHogLike | null = null;
let initialized = false;
let sentryReady = false;

const isBrowser = (): boolean => typeof window !== 'undefined';

const isDevEnv = (): boolean => {
  // Gate on explicit NEXT_PUBLIC_APP_ENV
  return process.env.NEXT_PUBLIC_APP_ENV === 'dev';
};

export async function initAnalytics(): Promise<void> {
  if (!isBrowser()) return; // server-side: never initialize

  // Guard against double-inits across Fast Refresh by using a global flag
  if (globalThis.__HEDGR_ANALYTICS_INIT) return;
  if (initialized) return;

  // Only consider initializing in dev, and only if at least one key exists
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!isDevEnv() || (!posthogKey && !sentryDsn)) {
    initialized = true; // stay no-op
    globalThis.__HEDGR_ANALYTICS_INIT = true;
    return;
  }

  if (posthogKey) {
    try {
      const mod: unknown = await import('posthog-js');
      // posthog-js default export is the client
      const posthog = (mod as { default?: PostHogLike }).default ?? (mod as PostHogLike);
      const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
      // Extremely conservative defaults for dev: no PII, no autocapture
      posthog.init?.(posthogKey, {
        api_host: host,
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        disable_session_recording: true,
        request_batching: true,
      });
      posthogRef = posthog;
    } catch {
      // Package not installed or failed to load → remain no-op
      posthogRef = null;
    }
  }

  if (sentryDsn) {
    try {
      const Sentry = (await import('@sentry/browser')) as {
        init?: (cfg: Record<string, unknown>) => void;
        captureException?: (e: unknown) => void;
      };
      // In dev we sample nothing by default; this is opt-in only.
      Sentry.init?.({
        dsn: sentryDsn,
        environment: process.env.NEXT_PUBLIC_APP_ENV,
        sampleRate: 0,        // error events
        tracesSampleRate: 0,  // performance events
      });
      sentryReady = true;
    } catch {
      sentryReady = false;
    }
  }

  initialized = true;
  globalThis.__HEDGR_ANALYTICS_INIT = true;
}

export function track(event: string, properties?: Properties): void {
  if (!isBrowser()) return;
  if (!isDevEnv()) return;
  try {
    posthogRef?.capture?.(event, properties);
  } catch {
    // swallow
  }
}