'use client';

import React from 'react';
import { formatEngineSnapshotUpdatedAt } from '../../../lib/engine/format-engine-snapshot-updated-at';
import {
  ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY,
  ENGINE_STABILITY_REVIEW_CADENCE_CUE,
  ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE,
  ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY,
  getEngineStabilityReviewSnapshotStance,
  getEngineStabilityReviewTimestampLine,
} from '../../../lib/engine/stability-review-snapshot-copy';
import type { EngineState } from '../../../lib/engine/types';

type EngineStabilityReviewSnapshotProps = {
  engineState: EngineState;
};

export function EngineStabilityReviewSnapshot({
  engineState,
}: EngineStabilityReviewSnapshotProps) {
  const formattedUpdatedAt = formatEngineSnapshotUpdatedAt(engineState.updatedAt);

  return (
    <div
      className="max-w-2xl space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-700"
      data-testid="engine-stability-review-snapshot"
    >
      <h3 className="text-sm font-semibold text-slate-900">
        {ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE}
      </h3>
      <p data-testid="engine-stability-review-snapshot-stance">
        {getEngineStabilityReviewSnapshotStance(engineState.posture)}
      </p>
      <p>{ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY}</p>
      <p>{ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY}</p>
      <p data-testid="engine-stability-review-snapshot-cadence">
        {ENGINE_STABILITY_REVIEW_CADENCE_CUE}
      </p>
      <p
        className="text-xs leading-snug text-slate-500"
        data-testid="engine-stability-review-snapshot-updated-at"
      >
        {getEngineStabilityReviewTimestampLine(formattedUpdatedAt)}
      </p>
    </div>
  );
}
