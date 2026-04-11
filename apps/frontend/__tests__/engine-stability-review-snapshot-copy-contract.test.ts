import { describe, expect, test } from 'vitest';
import {
  ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY,
  ENGINE_STABILITY_REVIEW_CADENCE_CUE,
  ENGINE_STABILITY_REVIEW_CHANGE_CHANGED,
  ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER,
  ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED,
  ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER,
  ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_CHANGED,
  ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_UNCHANGED,
  ENGINE_STABILITY_REVIEW_MEMORY_TITLE,
  ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE,
  ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY,
  getEngineStabilityReviewSnapshotStance,
  getEngineStabilityReviewTimestampLine,
} from '../lib/engine/stability-review-snapshot-copy';
import type { EnginePosture } from '../lib/engine/types';
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from './engine-trust-framing-denylist';

const ENGINE_STABILITY_REVIEW_SNAPSHOT_COPY_SEGMENTS: readonly string[] = [
  ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE,
  ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY,
  ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY,
  ENGINE_STABILITY_REVIEW_CADENCE_CUE,
  ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED,
  ENGINE_STABILITY_REVIEW_CHANGE_CHANGED,
  ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER,
  ENGINE_STABILITY_REVIEW_MEMORY_TITLE,
  ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER,
  ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_UNCHANGED,
  ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_CHANGED,
  ...(['normal', 'tightening', 'tightened', 'recovery'] as const satisfies readonly EnginePosture[]).map(
    (posture) => getEngineStabilityReviewSnapshotStance(posture),
  ),
  getEngineStabilityReviewTimestampLine('2026-04-11T12:00:00Z'),
];

describe('ENGINE_STABILITY_REVIEW_SNAPSHOT copy contract', () => {
  test.each(
    ENGINE_STABILITY_REVIEW_SNAPSHOT_COPY_SEGMENTS.map((text, idx) => [`segment-${idx}`, text] as const),
  )('%s has non-empty shipped copy', (_, text) => {
    expect(text.trim().length).toBeGreaterThan(0);
  });

  test.each(
    ENGINE_STABILITY_REVIEW_SNAPSHOT_COPY_SEGMENTS.map((text, idx) => [`segment-${idx}`, text] as const),
  )('%s avoids execution, accounting, and hype framing drift', (_, text) => {
    const lower = text.toLowerCase();
    for (const forbidden of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
      expect(lower).not.toContain(forbidden);
    }
    expect(lower).not.toMatch(/\bexecuted\b/);
    expect(lower).not.toMatch(/\bguaranteed\b/);
  });
});
