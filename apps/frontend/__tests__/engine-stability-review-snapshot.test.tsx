// @vitest-environment jsdom

import React from 'react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { EngineStabilityReviewSnapshot } from '../app/(app)/dashboard/EngineStabilityReviewSnapshot';
import { formatEngineSnapshotUpdatedAt } from '../lib/engine/format-engine-snapshot-updated-at';
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
import { getMockEngineState } from '../lib/engine/mock';
import {
  buildReviewSnapshotFingerprint,
  REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
} from '../lib/engine/review-snapshot-fingerprint';
import { REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY } from '../lib/engine/review-snapshot-memory';
import type { EngineState } from '../lib/engine/types';

function makeEngineState(overrides: Partial<EngineState> = {}): EngineState {
  return {
    ...getMockEngineState('normal'),
    ...overrides,
  };
}

beforeEach(() => {
  window.localStorage.removeItem(REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY);
  window.localStorage.removeItem(REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY);
});

afterEach(() => {
  cleanup();
  window.localStorage.removeItem(REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY);
  window.localStorage.removeItem(REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY);
});

describe('EngineStabilityReviewSnapshot', () => {
  test('renders the minimal review snapshot contract', async () => {
    const engineState = makeEngineState({
      posture: 'tightened',
      updatedAt: '2026-03-08T00:00:00.000Z',
    });

    render(<EngineStabilityReviewSnapshot engineState={engineState} />);

    const snapshot = screen.getByTestId('engine-stability-review-snapshot');
    expect(snapshot.textContent).toContain(ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE);
    expect(snapshot.textContent).toContain(
      getEngineStabilityReviewSnapshotStance(engineState.posture),
    );
    expect(snapshot.textContent).toContain(
      ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY,
    );
    expect(snapshot.textContent).toContain(
      ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY,
    );
    expect(snapshot.textContent).toContain(ENGINE_STABILITY_REVIEW_CADENCE_CUE);

    const formattedUpdatedAt = formatEngineSnapshotUpdatedAt(engineState.updatedAt);
    expect(snapshot.textContent).toContain(
      getEngineStabilityReviewTimestampLine(formattedUpdatedAt),
    );

    await waitFor(() => {
      expect(
        screen.queryByTestId('engine-stability-review-snapshot-change-signal'),
      ).toBeNull();
    });
  });

  test('uses the calmer stance copy for within-range postures', async () => {
    const engineState = makeEngineState({
      posture: 'recovery',
    });

    render(<EngineStabilityReviewSnapshot engineState={engineState} />);

    expect(
      screen.getByTestId('engine-stability-review-snapshot-stance').textContent,
    ).toBe(getEngineStabilityReviewSnapshotStance(engineState.posture));

    await waitFor(() => {
      expect(
        screen.queryByTestId('engine-stability-review-snapshot-change-signal'),
      ).toBeNull();
    });
  });

  test('MC-S2-013: shows unchanged and disclaimer when prior fingerprint matches', async () => {
    const engineState = makeEngineState();
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      buildReviewSnapshotFingerprint(engineState),
    );

    render(<EngineStabilityReviewSnapshot engineState={engineState} />);

    await waitFor(() => {
      expect(
        screen.getByTestId('engine-stability-review-snapshot-change-signal')
          .textContent,
      ).toBe(ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED);
    });

    const disclaimer = screen.getByTestId(
      'engine-stability-review-snapshot-change-disclaimer',
    );
    expect(disclaimer.textContent).toBe(ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER);
    expect(disclaimer.textContent).toMatch(/system targets/i);
    expect(disclaimer.textContent).toMatch(/ledger/i);
    expect(disclaimer.textContent).toMatch(/funds moved|movement/i);

    const cadence = screen.getByTestId('engine-stability-review-snapshot-cadence');
    const changeLine = screen.getByTestId(
      'engine-stability-review-snapshot-change-signal',
    );
    const updatedAt = screen.getByTestId('engine-stability-review-snapshot-updated-at');
    expect(
      cadence.compareDocumentPosition(changeLine) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      changeLine.compareDocumentPosition(updatedAt) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  test('MC-S2-013: shows changed when prior fingerprint differs', async () => {
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      buildReviewSnapshotFingerprint(makeEngineState({ posture: 'normal' })),
    );

    const engineState = makeEngineState({ posture: 'tightened' });
    render(<EngineStabilityReviewSnapshot engineState={engineState} />);

    await waitFor(() => {
      expect(
        screen.getByTestId('engine-stability-review-snapshot-change-signal')
          .textContent,
      ).toBe(ENGINE_STABILITY_REVIEW_CHANGE_CHANGED);
    });
  });

  test('MC-S2-013: change copy frames review snapshot and system targets', async () => {
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      buildReviewSnapshotFingerprint(makeEngineState()),
    );

    render(<EngineStabilityReviewSnapshot engineState={makeEngineState()} />);

    await waitFor(() => {
      const line = screen.getByTestId('engine-stability-review-snapshot-change-signal');
      expect(line.textContent).toMatch(/review snapshot/i);
      expect(line.textContent).toMatch(/informational system targets/i);
    });
  });

  test('keeps snapshot language free of small high-risk urgency and execution semantics when change signal is shown', async () => {
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      buildReviewSnapshotFingerprint(makeEngineState()),
    );

    render(<EngineStabilityReviewSnapshot engineState={makeEngineState()} />);

    await waitFor(() => {
      expect(
        screen.getByTestId('engine-stability-review-snapshot-change-signal'),
      ).toBeDefined();
    });

    const snapshotText =
      screen.getByTestId('engine-stability-review-snapshot').textContent ?? '';

    for (const phrase of [
      'alert',
      'notification',
      'act now',
      'real-time',
      'monitoring',
      'profit',
      'rebalance',
      'execute',
    ]) {
      expect(snapshotText.toLowerCase()).not.toContain(phrase);
    }
  });

  test('MC-S2-014: does not show recent memory until a prior fingerprint enables comparison', async () => {
    const engineState = makeEngineState();
    render(<EngineStabilityReviewSnapshot engineState={engineState} />);

    await waitFor(() => {
      expect(
        screen.queryByTestId('engine-stability-review-memory'),
      ).toBeNull();
    });
  });

  test('MC-S2-014: shows recent stability memory after a prior fingerprint exists', async () => {
    const engineState = makeEngineState({ posture: 'tightened' });
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      buildReviewSnapshotFingerprint(engineState),
    );

    render(<EngineStabilityReviewSnapshot engineState={engineState} />);

    await waitFor(() => {
      expect(screen.getByTestId('engine-stability-review-memory')).toBeTruthy();
    });

    const memory = screen.getByTestId('engine-stability-review-memory');
    expect(memory.textContent).toContain(ENGINE_STABILITY_REVIEW_MEMORY_TITLE);
    expect(memory.textContent).toContain(ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER);
    expect(memory.textContent).toContain(
      getEngineStabilityReviewSnapshotStance(engineState.posture),
    );
    expect(memory.textContent).toContain(
      ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_UNCHANGED,
    );

    const entries = screen.getAllByTestId('engine-stability-review-memory-entry');
    expect(entries.length).toBeGreaterThanOrEqual(1);
    expect(entries.length).toBeLessThanOrEqual(2);
  });

  test('MC-S2-014: memory surface copy does not read as activity log, feed, or operational record', async () => {
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      buildReviewSnapshotFingerprint(makeEngineState()),
    );

    render(<EngineStabilityReviewSnapshot engineState={makeEngineState()} />);

    await waitFor(() => {
      expect(screen.getByTestId('engine-stability-review-memory')).toBeTruthy();
    });

    const memoryText =
      screen.getByTestId('engine-stability-review-memory').textContent ?? '';

    for (const phrase of [
      'history trail',
      'recent review views',
      'activity log',
      'event feed',
      'operational record',
      'logged',
    ]) {
      expect(memoryText.toLowerCase()).not.toContain(phrase);
    }

    expect(memoryText).toContain(ENGINE_STABILITY_REVIEW_MEMORY_TITLE);
    expect(memoryText).toContain(ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER);
  });

  test('MC-S2-014: newest memory row reflects latest visit when targets change', async () => {
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      buildReviewSnapshotFingerprint(makeEngineState({ posture: 'normal' })),
    );

    const { rerender } = render(
      <EngineStabilityReviewSnapshot
        engineState={makeEngineState({ posture: 'tightened' })}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('engine-stability-review-memory')).toBeTruthy();
    });

    expect(
      screen.getByTestId('engine-stability-review-memory').textContent,
    ).toContain(ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_CHANGED);

    rerender(
      <EngineStabilityReviewSnapshot
        engineState={makeEngineState({ posture: 'recovery' })}
      />,
    );

    await waitFor(() => {
      const text = screen.getByTestId('engine-stability-review-memory').textContent ?? '';
      expect(text).toContain(
        getEngineStabilityReviewSnapshotStance('recovery'),
      );
    });
  });

  test('keeps cadence language free of high-risk prompting and monitoring semantics', async () => {
    render(<EngineStabilityReviewSnapshot engineState={makeEngineState()} />);

    await waitFor(() => {
      expect(
        screen.queryByTestId('engine-stability-review-snapshot-change-signal'),
      ).toBeNull();
    });

    const snapshotText =
      screen.getByTestId('engine-stability-review-snapshot').textContent ?? '';

    for (const phrase of [
      'act now',
      'alert',
      'reminder',
      'notification',
      'real-time',
      'monitoring',
    ]) {
      expect(snapshotText.toLowerCase()).not.toContain(phrase);
    }
  });
});
