// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { EngineStabilityReviewSnapshot } from '../app/(app)/dashboard/EngineStabilityReviewSnapshot';
import { formatEngineSnapshotUpdatedAt } from '../lib/engine/format-engine-snapshot-updated-at';
import {
  ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY,
  ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE,
  ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY,
  getEngineStabilityReviewSnapshotStance,
  getEngineStabilityReviewTimestampLine,
} from '../lib/engine/stability-review-snapshot-copy';
import { getMockEngineState } from '../lib/engine/mock';
import type { EngineState } from '../lib/engine/types';

function makeEngineState(overrides: Partial<EngineState> = {}): EngineState {
  return {
    ...getMockEngineState('normal'),
    ...overrides,
  };
}

afterEach(() => {
  cleanup();
});

describe('EngineStabilityReviewSnapshot', () => {
  test('renders the minimal review snapshot contract', () => {
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

    const formattedUpdatedAt = formatEngineSnapshotUpdatedAt(engineState.updatedAt);
    expect(snapshot.textContent).toContain(
      getEngineStabilityReviewTimestampLine(formattedUpdatedAt),
    );
  });

  test('uses the calmer stance copy for within-range postures', () => {
    const engineState = makeEngineState({
      posture: 'recovery',
    });

    render(<EngineStabilityReviewSnapshot engineState={engineState} />);

    expect(
      screen.getByTestId('engine-stability-review-snapshot-stance').textContent,
    ).toBe(getEngineStabilityReviewSnapshotStance(engineState.posture));
  });

  test('avoids high-risk execution and live-monitoring language', () => {
    render(<EngineStabilityReviewSnapshot engineState={makeEngineState()} />);

    const snapshotText =
      screen.getByTestId('engine-stability-review-snapshot').textContent ?? '';

    for (const phrase of ['executed', 'rebalanced', 'settled', 'live', 'real-time']) {
      expect(snapshotText.toLowerCase()).not.toContain(phrase);
    }
  });
});
