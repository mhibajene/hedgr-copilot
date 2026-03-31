import { describe, expect, test } from 'vitest';
import {
  buildReviewSnapshotFingerprint,
  REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
} from '../lib/engine/review-snapshot-fingerprint';
import { getMockEngineState } from '../lib/engine/mock';

describe('buildReviewSnapshotFingerprint', () => {
  test('is stable for the same engine fields', () => {
    const a = getMockEngineState('normal');
    const b = { ...a };
    expect(buildReviewSnapshotFingerprint(a)).toBe(
      buildReviewSnapshotFingerprint(b),
    );
  });

  test('differs when posture changes', () => {
    const normal = getMockEngineState('normal');
    const tightened = getMockEngineState('tightened');
    expect(buildReviewSnapshotFingerprint(normal)).not.toBe(
      buildReviewSnapshotFingerprint(tightened),
    );
  });

  test('ignores updatedAt for equality domain (same targets, different timestamp)', () => {
    const base = getMockEngineState('normal');
    const withNewTime = {
      ...base,
      updatedAt: '2099-01-01T00:00:00.000Z',
    };
    expect(buildReviewSnapshotFingerprint(base)).toBe(
      buildReviewSnapshotFingerprint(withNewTime),
    );
  });

  test('storage key is namespaced and single-purpose', () => {
    expect(REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY).toMatch(/^hedgr:/);
  });
});
