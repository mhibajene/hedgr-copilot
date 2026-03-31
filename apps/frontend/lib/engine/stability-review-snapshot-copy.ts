import type { EnginePosture } from './types';

/**
 * Ticket-local copy for MC-S2-011 review snapshot, MC-S2-012 cadence cue,
 * and MC-S2-013 change signal (same-vs-last-view for informational targets only).
 * Minimal scope only—does not duplicate ENGINE_POSTURE_CONTEXT or notice copy.
 */

export const ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE = 'Review snapshot';

const STANCE_BY_POSTURE: Record<EnginePosture, string> = {
  normal: 'Current stance: within expected range',
  tightening: 'Current stance: more cautious',
  tightened: 'Current stance: more cautious',
  recovery: 'Current stance: within expected range',
};

export function getEngineStabilityReviewSnapshotStance(
  posture: EnginePosture,
): string {
  return STANCE_BY_POSTURE[posture];
}

export const ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY =
  'Available still means ready to use in principle; these targets stay informational.';

export const ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY =
  'A protective posture does not by itself imply withdrawal lockup.';

export const ENGINE_STABILITY_REVIEW_CADENCE_CUE =
  'This snapshot supports calm regular review so more protective conditions stay visible without creating action pressure.';

export function getEngineStabilityReviewTimestampLine(
  formattedUpdatedAt: string,
): string {
  return `Snapshot reflects current system targets as of ${formattedUpdatedAt}.`;
}

/** MC-S2-013 — shown only when a prior local fingerprint exists (not first visit). */
export const ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED =
  'Since you last viewed this review snapshot in this browser, the informational system targets shown here are unchanged.';

export const ENGINE_STABILITY_REVIEW_CHANGE_CHANGED =
  'Since you last viewed this review snapshot in this browser, the informational system targets shown here differ from what you last saw.';

/** Frames comparison as review/system targets—not balances or movement (ADR 0013). */
export const ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER =
  'This comparison is about system targets for this review only—not your ledger balances or whether funds moved.';
