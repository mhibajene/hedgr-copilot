import type { EnginePosture } from './types';

/**
 * Ticket-local copy for MC-S2-011 review snapshot, MC-S2-012 cadence cue,
 * MC-S2-013 change signal, and MC-S2-014 recent stability memory (same-vs-last-view).
 * Minimal scope only—does not duplicate ENGINE_POSTURE_CONTEXT or notice copy.
 */

export const ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE = 'Review snapshot';

const STANCE_BY_POSTURE: Record<EnginePosture, string> = {
  normal: 'Where things stand: within the expected range',
  tightening: 'Where things stand: more cautious than usual',
  tightened: 'Where things stand: more cautious than usual',
  recovery: 'Where things stand: within the expected range',
};

export function getEngineStabilityReviewSnapshotStance(
  posture: EnginePosture,
): string {
  return STANCE_BY_POSTURE[posture];
}

export const ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY =
  '“Available” still means ready to use in principle; these targets stay informational.';

export const ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY =
  'A protective posture does not, on its own, mean withdrawals are blocked or delayed.';

export const ENGINE_STABILITY_REVIEW_CADENCE_CUE =
  'Use this snapshot for a calm, regular check-in—protective conditions stay visible here without nudging you to act.';

export function getEngineStabilityReviewTimestampLine(
  formattedUpdatedAt: string,
): string {
  return `Snapshot reflects current system targets as of ${formattedUpdatedAt}.`;
}

/** MC-S2-013 — shown only when a prior local fingerprint exists (not first visit). */
export const ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED =
  'Since you last opened this review snapshot in this browser, the informational system targets shown here are unchanged.';

export const ENGINE_STABILITY_REVIEW_CHANGE_CHANGED =
  'Since you last opened this review snapshot in this browser, the informational system targets shown here differ from what you last saw.';

/** Frames comparison as review/system targets—not balances or movement (ADR 0013). */
export const ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER =
  'This comparison is about system targets for this review only—not your ledger balances or whether funds moved.';

/** MC-S2-014 — orientation-first; not interaction history, trail, or feed language. */
export const ENGINE_STABILITY_REVIEW_MEMORY_TITLE = 'Recent readings';

/** Memory aid in this browser only—not a system record or operational history. */
export const ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER =
  'Saved only on this device for your orientation—not a record of balances, execution, or backend events.';

/** Short row lines; same meaning as MC-S2-013, without repeating full paragraphs. */
export const ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_UNCHANGED =
  'Informational targets unchanged since your prior check.';

export const ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_CHANGED =
  'Informational targets differ from your prior check.';
