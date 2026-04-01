// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  MAX_REVIEW_SNAPSHOT_MEMORY_ENTRIES,
  appendReviewSnapshotMemoryAfterVisit,
  readReviewSnapshotMemory,
  REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY,
} from '../lib/engine/review-snapshot-memory';
import {
  buildReviewSnapshotFingerprint,
  REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
} from '../lib/engine/review-snapshot-fingerprint';
import { getMockEngineState } from '../lib/engine/mock';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-04-01T12:00:00.000Z'));
  window.localStorage.removeItem(REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY);
  window.localStorage.removeItem(REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY);
});

afterEach(() => {
  vi.useRealTimers();
  window.localStorage.removeItem(REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY);
  window.localStorage.removeItem(REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY);
});

describe('appendReviewSnapshotMemoryAfterVisit', () => {
  test('does not append when no prior fingerprint (initial visit gate)', () => {
    const state = getMockEngineState('normal');
    const fp = buildReviewSnapshotFingerprint(state);
    appendReviewSnapshotMemoryAfterVisit({
      priorFingerprintRaw: null,
      currentFingerprint: fp,
      posture: state.posture,
    });
    expect(readReviewSnapshotMemory()).toEqual([]);
  });

  test('appends one entry when prior fingerprint exists', () => {
    const prior = getMockEngineState('normal');
    const priorFp = buildReviewSnapshotFingerprint(prior);
    window.localStorage.setItem(REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY, priorFp);

    const current = getMockEngineState('tightened');
    const currentFp = buildReviewSnapshotFingerprint(current);
    appendReviewSnapshotMemoryAfterVisit({
      priorFingerprintRaw: priorFp,
      currentFingerprint: currentFp,
      posture: current.posture,
    });

    const rows = readReviewSnapshotMemory();
    expect(rows).toHaveLength(1);
    expect(rows[0].changeVsPrior).toBe('changed');
    expect(rows[0].posture).toBe('tightened');
    expect(rows[0].viewedAt).toBe('2026-04-01T12:00:00.000Z');
  });

  test('caps at MAX_REVIEW_SNAPSHOT_MEMORY_ENTRIES with newest first', () => {
    const a = getMockEngineState('normal');
    const b = getMockEngineState('tightened');
    const c = getMockEngineState('recovery');
    const fpA = buildReviewSnapshotFingerprint(a);
    const fpB = buildReviewSnapshotFingerprint(b);
    const fpC = buildReviewSnapshotFingerprint(c);

    appendReviewSnapshotMemoryAfterVisit({
      priorFingerprintRaw: fpA,
      currentFingerprint: fpB,
      posture: b.posture,
    });
    vi.setSystemTime(new Date('2026-04-01T13:00:00.000Z'));
    appendReviewSnapshotMemoryAfterVisit({
      priorFingerprintRaw: fpB,
      currentFingerprint: fpC,
      posture: c.posture,
    });
    vi.setSystemTime(new Date('2026-04-01T14:00:00.000Z'));
    appendReviewSnapshotMemoryAfterVisit({
      priorFingerprintRaw: fpC,
      currentFingerprint: fpA,
      posture: a.posture,
    });

    const rows = readReviewSnapshotMemory();
    expect(rows.length).toBe(MAX_REVIEW_SNAPSHOT_MEMORY_ENTRIES);
    expect(rows[0].posture).toBe('normal');
    expect(rows[0].viewedAt).toBe('2026-04-01T14:00:00.000Z');
    expect(rows[1].posture).toBe('recovery');
  });
});
