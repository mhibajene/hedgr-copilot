'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { formatEngineSnapshotUpdatedAt } from '../../../lib/engine/format-engine-snapshot-updated-at';
import {
  REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
  buildReviewSnapshotFingerprint,
} from '../../../lib/engine/review-snapshot-fingerprint';
import {
  appendReviewSnapshotMemoryAfterVisit,
  readReviewSnapshotMemory,
  type ReviewSnapshotMemoryEntry,
} from '../../../lib/engine/review-snapshot-memory';
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
} from '../../../lib/engine/stability-review-snapshot-copy';
import type { EngineState } from '../../../lib/engine/types';

type EngineStabilityReviewSnapshotProps = {
  engineState: EngineState;
};

type ChangeSignal = 'unchanged' | 'changed' | null;

export function EngineStabilityReviewSnapshot({
  engineState,
}: EngineStabilityReviewSnapshotProps) {
  const formattedUpdatedAt = formatEngineSnapshotUpdatedAt(engineState.updatedAt);

  const fingerprint = useMemo(
    () => buildReviewSnapshotFingerprint(engineState),
    [
      engineState.posture,
      engineState.liquidityTargetPct,
      engineState.coreTargetPct,
      engineState.yieldCapPct,
    ],
  );

  const [changeSignal, setChangeSignal] = useState<ChangeSignal>(null);
  const [memoryEntries, setMemoryEntries] = useState<ReviewSnapshotMemoryEntry[]>(
    [],
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      const current = fingerprint;
      const raw = window.localStorage.getItem(
        REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
      );
      if (raw === null) {
        window.localStorage.setItem(
          REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
          current,
        );
        setChangeSignal(null);
        setMemoryEntries(readReviewSnapshotMemory());
        return;
      }
      appendReviewSnapshotMemoryAfterVisit({
        priorFingerprintRaw: raw,
        currentFingerprint: current,
        posture: engineState.posture,
      });
      setChangeSignal(raw === current ? 'unchanged' : 'changed');
      window.localStorage.setItem(
        REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
        current,
      );
      setMemoryEntries(readReviewSnapshotMemory());
    } catch {
      setChangeSignal(null);
      setMemoryEntries(readReviewSnapshotMemory());
    }
    // Deps: fingerprint only—encodes posture and targets; avoids duplicate appends on parent object identity churn.
  }, [fingerprint]);

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
      {changeSignal !== null && (
        <>
          <p
            className="text-sm text-slate-700"
            data-testid="engine-stability-review-snapshot-change-signal"
          >
            {changeSignal === 'unchanged'
              ? ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED
              : ENGINE_STABILITY_REVIEW_CHANGE_CHANGED}
          </p>
          <p
            className="text-xs leading-snug text-slate-500"
            data-testid="engine-stability-review-snapshot-change-disclaimer"
          >
            {ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER}
          </p>
        </>
      )}
      {memoryEntries.length > 0 && (
        <div
          className="space-y-2 border-t border-slate-100 pt-3"
          data-testid="engine-stability-review-memory"
        >
          <h4 className="text-xs font-medium text-slate-800">
            {ENGINE_STABILITY_REVIEW_MEMORY_TITLE}
          </h4>
          <p className="text-xs leading-snug text-slate-500">
            {ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER}
          </p>
          <div className="space-y-3">
            {memoryEntries.map((entry, index) => (
              <div
                key={`${entry.viewedAt}-${index}`}
                className="space-y-1"
                data-testid="engine-stability-review-memory-entry"
              >
                <p className="text-sm text-slate-700">
                  {getEngineStabilityReviewSnapshotStance(entry.posture)}
                </p>
                <p className="text-sm text-slate-700">
                  {entry.changeVsPrior === 'unchanged'
                    ? ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_UNCHANGED
                    : ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_CHANGED}
                </p>
                <p className="text-xs text-slate-500">
                  {formatEngineSnapshotUpdatedAt(entry.viewedAt)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <p
        className="text-xs leading-snug text-slate-500"
        data-testid="engine-stability-review-snapshot-updated-at"
      >
        {getEngineStabilityReviewTimestampLine(formattedUpdatedAt)}
      </p>
    </div>
  );
}
