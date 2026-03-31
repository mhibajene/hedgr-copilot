import type { EnginePosture, EngineState } from './types';

/**
 * Single localStorage key: last-seen review snapshot fingerprint only (MC-S2-013).
 * Not a feed, not analytics—one string for orientation vs last dashboard view.
 */
export const REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY =
  'hedgr:engine-review-snapshot-fingerprint';

export type ReviewSnapshotFingerprintPayload = {
  posture: EnginePosture;
  liquidityTargetPct: number;
  coreTargetPct: number;
  yieldCapPct: number;
};

/**
 * Deterministic fingerprint of review-relevant engine fields only.
 * Excludes updatedAt, notice copy, and other non-review semantics (MC-S2-013).
 */
export function buildReviewSnapshotFingerprint(state: EngineState): string {
  const payload: ReviewSnapshotFingerprintPayload = {
    posture: state.posture,
    liquidityTargetPct: state.liquidityTargetPct,
    coreTargetPct: state.coreTargetPct,
    yieldCapPct: state.yieldCapPct,
  };
  return JSON.stringify(payload);
}
