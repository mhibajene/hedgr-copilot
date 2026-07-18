"use client";

import React, { useEffect, useMemo, useState } from "react";
import { formatEngineSnapshotUpdatedAt } from "../../../lib/engine/format-engine-snapshot-updated-at";
import {
  REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
  buildReviewSnapshotFingerprint,
} from "../../../lib/engine/review-snapshot-fingerprint";
import {
  appendReviewSnapshotMemoryAfterVisit,
  readReviewSnapshotMemory,
  type ReviewSnapshotMemoryEntry,
} from "../../../lib/engine/review-snapshot-memory";
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
} from "../../../lib/engine/stability-review-snapshot-copy";
import type { EngineState } from "../../../lib/engine/types";

type EngineStabilityReviewSnapshotProps = {
  engineState: EngineState;
};

type ChangeSignal = "unchanged" | "changed" | null;

export function EngineStabilityReviewSnapshot({
  engineState,
}: EngineStabilityReviewSnapshotProps) {
  const formattedUpdatedAt = formatEngineSnapshotUpdatedAt(
    engineState.updatedAt
  );

  const fingerprint = useMemo(
    () => buildReviewSnapshotFingerprint(engineState),
    [
      engineState.posture,
      engineState.liquidityTargetPct,
      engineState.coreTargetPct,
      engineState.yieldCapPct,
    ]
  );

  const [changeSignal, setChangeSignal] = useState<ChangeSignal>(null);
  const [memoryEntries, setMemoryEntries] = useState<
    ReviewSnapshotMemoryEntry[]
  >([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const current = fingerprint;
      const raw = window.localStorage.getItem(
        REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY
      );
      if (raw === null) {
        window.localStorage.setItem(
          REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
          current
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
      setChangeSignal(raw === current ? "unchanged" : "changed");
      window.localStorage.setItem(
        REVIEW_SNAPSHOT_FINGERPRINT_STORAGE_KEY,
        current
      );
      setMemoryEntries(readReviewSnapshotMemory());
    } catch {
      setChangeSignal(null);
      setMemoryEntries(readReviewSnapshotMemory());
    }
    // Deps: fingerprint only—encodes posture and targets; avoids duplicate appends on parent object identity churn.
  }, [fingerprint]);

  return (
    <section
      className="max-w-2xl rounded-3xl border border-[#A6B0D8] bg-white p-5 text-sm text-[#1F2937] sm:p-6"
      data-testid="engine-stability-review-snapshot"
      aria-labelledby="engine-stability-review-snapshot-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4658A0]">
            Review
          </p>
          <h2
            id="engine-stability-review-snapshot-title"
            className="mt-1 text-lg font-semibold tracking-tight text-[#171D35]"
          >
            {ENGINE_STABILITY_REVIEW_SNAPSHOT_TITLE}
          </h2>
        </div>
        <span className="rounded-full border border-[#A6B0D8] bg-[#CAD0E8] px-3 py-1 text-xs font-semibold text-[#171D35]">
          Current
        </span>
      </div>
      <p
        className="mt-4 text-base font-medium leading-relaxed text-[#171D35]"
        data-testid="engine-stability-review-snapshot-stance"
      >
        {getEngineStabilityReviewSnapshotStance(engineState.posture)}
      </p>
      <p
        className="mt-2 max-w-xl leading-relaxed text-[#1F2937]"
        data-testid="engine-stability-review-snapshot-cadence"
      >
        {ENGINE_STABILITY_REVIEW_CADENCE_CUE}
      </p>
      {changeSignal !== null && (
        <p
          className="mt-3 text-sm font-medium leading-relaxed text-[#36447C]"
          data-testid="engine-stability-review-snapshot-change-signal"
        >
          {changeSignal === "unchanged"
            ? ENGINE_STABILITY_REVIEW_CHANGE_UNCHANGED
            : ENGINE_STABILITY_REVIEW_CHANGE_CHANGED}
        </p>
      )}
      <p
        className="mt-3 text-xs leading-snug text-[#4658A0]"
        data-testid="engine-stability-review-snapshot-updated-at"
      >
        {getEngineStabilityReviewTimestampLine(formattedUpdatedAt)}
      </p>

      <details
        className="mt-5 border-t border-[#CAD0E8] pt-4"
        data-testid="engine-stability-review-details"
      >
        <summary className="cursor-pointer list-none font-medium text-[#171D35] marker:content-none select-none [&::-webkit-details-marker]:hidden">
          <span className="flex items-center justify-between gap-4">
            <span>Review details</span>
            <span className="text-xs font-medium uppercase tracking-wide text-[#4658A0]">
              View
            </span>
          </span>
        </summary>
        <div className="mt-4 space-y-3 border-t border-[#CAD0E8] pt-4">
          <p className="max-w-xl leading-relaxed text-[#1F2937]">
            {ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY}
          </p>
          <p className="max-w-xl leading-relaxed text-[#1F2937]">
            {ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY}
          </p>
          {changeSignal !== null && (
            <p
              className="max-w-xl text-xs leading-relaxed text-[#4658A0]"
              data-testid="engine-stability-review-snapshot-change-disclaimer"
            >
              {ENGINE_STABILITY_REVIEW_CHANGE_DISCLAIMER}
            </p>
          )}
          {memoryEntries.length > 0 && (
            <div
              className="space-y-3 border-t border-[#CAD0E8] pt-4"
              data-testid="engine-stability-review-memory"
            >
              <h3 className="text-xs font-medium text-[#171D35]">
                {ENGINE_STABILITY_REVIEW_MEMORY_TITLE}
              </h3>
              <p className="max-w-xl text-xs leading-relaxed text-[#4658A0]">
                {ENGINE_STABILITY_REVIEW_MEMORY_DISCLAIMER}
              </p>
              <div className="space-y-4">
                {memoryEntries.map((entry, index) => (
                  <div
                    key={`${entry.viewedAt}-${index}`}
                    className="space-y-1"
                    data-testid="engine-stability-review-memory-entry"
                  >
                    <p className="text-sm text-[#1F2937]">
                      {getEngineStabilityReviewSnapshotStance(entry.posture)}
                    </p>
                    <p className="text-sm text-[#1F2937]">
                      {entry.changeVsPrior === "unchanged"
                        ? ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_UNCHANGED
                        : ENGINE_STABILITY_REVIEW_MEMORY_TARGETS_CHANGED}
                    </p>
                    <p className="text-xs text-[#4658A0]">
                      {formatEngineSnapshotUpdatedAt(entry.viewedAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </details>
    </section>
  );
}
