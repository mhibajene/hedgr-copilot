/**
 * MC-S2-022: static copy for a dev-only troubleshooting block when stub deposit API fails.
 * Shown only when `isLocalDevSimulationSeamEnabled()` is true — not a diagnostics console.
 */

export const LOCAL_STUB_DEPOSIT_FAILURE_REVIEW_HINTS: readonly string[] = [
  'Confirm your API base URL points at the backend you intend (local dev).',
  'Confirm the backend process is running and reachable.',
  'Stub deposit routes need stub mode on the backend (local setup often uses STUB_MODE=true).',
];
