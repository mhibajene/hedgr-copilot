/**
 * Shared enablement for local-only review/simulation seams (engine posture, tx review, etc.).
 * Keep in sync with historical engine simulator rules — single source to avoid drift.
 */

function getAppEnv(): string {
  return process.env.NEXT_PUBLIC_APP_ENV ?? 'dev';
}

/** True only for local development: not CI, not test/production NODE_ENV, APP_ENV=dev. */
export function isLocalDevSimulationSeamEnabled(): boolean {
  if (process.env.CI === 'true') {
    return false;
  }

  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    return false;
  }

  return getAppEnv() === 'dev';
}
