"use client";

import React from "react";
import type { EngineState } from "../../../lib/engine/types";

type EngineAllocationBandsProps = {
  engineState: EngineState;
};

type LaneKey = "liquidityTargetPct" | "coreTargetPct" | "yieldCapPct";

// Stable balance is the dominant primary holding lane; conservative yield and
// reserve are quieter supporting lanes. Order and roles are fixed across every
// posture so the structure stays invariant (only the values change by state).
const PRIMARY_LANE: { key: LaneKey; label: string; role: string } = {
  key: "coreTargetPct",
  label: "Stable balance",
  role: "Primary stability target",
};

// Supporting-lane fills are static hierarchy cues from governed navy/lavender
// tokens only. They do not vary by posture and must remain understandable
// without colour (labels, size, and copy stay primary).
const SUPPORTING_LANES: Array<{
  key: LaneKey;
  label: string;
  surfaceClass: string;
  labelClass: string;
}> = [
  {
    key: "yieldCapPct",
    label: "Conservative yield",
    surfaceClass: "border-hedgr-200 border-t-hedgr-300 bg-hedgr-100",
    labelClass: "text-hedgr-500",
  },
  {
    key: "liquidityTargetPct",
    label: "Reserve",
    surfaceClass: "border-hedgr-300 border-t-hedgr-600 bg-hedgr-200",
    labelClass: "text-hedgr-800",
  },
];

function formatPct(value: number) {
  return `${value}%`;
}

function laneDescription(key: LaneKey, value: number): string {
  switch (key) {
    case "coreTargetPct":
      return "The largest target, focused on preserving value.";
    case "yieldCapPct":
      return `Up to ${formatPct(
        value
      )} can support returns when conditions allow.`;
    case "liquidityTargetPct":
      return "A buffer target, kept ready if needed.";
  }
}

export function EngineAllocationBands({
  engineState,
}: EngineAllocationBandsProps) {
  return (
    <section
      aria-labelledby="engine-allocation-bands-title"
      className="space-y-5 rounded-3xl border border-hedgr-200 bg-white p-5 sm:p-6"
      data-testid="engine-allocation-bands"
    >
      <div className="space-y-2">
        <h2
          id="engine-allocation-bands-title"
          className="text-base font-semibold tracking-tight text-hedgr-800"
        >
          Stability structure
        </h2>
        <p
          className="max-w-xl text-sm leading-relaxed text-hedgr-dark"
          data-testid="engine-allocation-bands-caption"
        >
          These percentages show stability priorities for guidance. They do not
          divide the balance shown above.
        </p>
      </div>

      <div className="space-y-3" data-testid="engine-allocation-structure">
        {(() => {
          const value = engineState[PRIMARY_LANE.key];
          const descId = `engine-allocation-band-${PRIMARY_LANE.key}-desc`;

          return (
            <div
              className="rounded-2xl border border-hedgr-primary border-l-4 border-l-hedgr-200 bg-hedgr-800 p-5 pl-6"
              data-testid={`engine-allocation-band-${PRIMARY_LANE.key}`}
              data-allocation-lane="primary"
              data-primary-stability-edge="true"
              aria-describedby={descId}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-base font-semibold tracking-tight text-white">
                  {PRIMARY_LANE.label}
                </span>
                <span className="text-xs font-medium tabular-nums text-hedgr-100">
                  Stability target · {formatPct(value)}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-hedgr-200">
                {PRIMARY_LANE.role}
              </p>
              <p
                id={descId}
                className="mt-3 max-w-xl text-sm leading-relaxed text-hedgr-100"
              >
                {laneDescription(PRIMARY_LANE.key, value)}
              </p>
            </div>
          );
        })()}

        <div className="grid gap-3 sm:grid-cols-2">
          {SUPPORTING_LANES.map(({ key, label, surfaceClass, labelClass }) => {
            const value = engineState[key];
            const descId = `engine-allocation-band-${key}-desc`;

            return (
              <div
                key={key}
                className={`rounded-xl border border-t-2 p-4 ${surfaceClass}`}
                data-testid={`engine-allocation-band-${key}`}
                data-allocation-lane="supporting"
                data-supporting-lane-surface="static"
                aria-describedby={descId}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-sm font-medium ${labelClass}`}>
                    {label}
                  </span>
                  <span className="text-[11px] font-medium tabular-nums text-hedgr-600">
                    Stability target · {formatPct(value)}
                  </span>
                </div>
                <p
                  id={descId}
                  className="mt-2 text-xs leading-relaxed text-hedgr-dark"
                >
                  {laneDescription(key, value)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <aside
        className="max-w-xl border-t border-hedgr-100 pt-4 text-xs leading-relaxed text-hedgr-dark"
        data-testid="engine-allocation-trust-legend"
        aria-label="Stability target guidance"
      >
        <p>
          <span className="font-semibold text-hedgr-800">
            Guidance only
          </span>
          . These percentages are stability targets, not balances and not proof
          that money moved.
        </p>
        <details className="mt-3" data-testid="engine-allocation-target-details">
          <summary className="cursor-pointer font-medium text-hedgr-600 underline decoration-hedgr-200 underline-offset-4">
            How stability targets differ from the balance
          </summary>
          <div className="mt-3 space-y-2 border-l border-hedgr-200 pl-3">
            <p>
              <span className="font-semibold text-hedgr-800">
                Stability targets
              </span>
              . These percentages show the intended structure only. A lower
              conservative yield target means less return opportunity within it.
            </p>
            <p>
              <span className="font-semibold text-hedgr-800">Balance</span>.{" "}
              The balance shown above is separate from these percentages. The
              percentages do not divide it.
            </p>
            <p>
              <span className="font-semibold text-hedgr-800">
                No money movement
              </span>
              . A target does not mean money has moved.
            </p>
          </div>
        </details>
      </aside>
    </section>
  );
}
