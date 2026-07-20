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
  role: "Primary holding lane",
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
      return "Held steady to preserve value.";
    case "yieldCapPct":
      return `Up to ${formatPct(
        value
      )} can support returns when conditions allow.`;
    case "liquidityTargetPct":
      return "A quiet buffer, kept ready if you need it.";
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
          Most of your balance is held steady for stability. The rest supports
          that posture, with a reserve kept ready.
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
                  Target share · {formatPct(value)}
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
                    Target share · {formatPct(value)}
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
        aria-label="Informational target notice"
      >
        <p>
          <span className="font-semibold text-hedgr-800">
            Informational targets
          </span>
          . These percentages are system targets, not ledger balances or proof
          that funds moved.
        </p>
        <details className="mt-3" data-testid="engine-allocation-target-details">
          <summary className="cursor-pointer font-medium text-hedgr-600 underline decoration-hedgr-200 underline-offset-4">
            Why targets are not balances
          </summary>
          <div className="mt-3 space-y-2 border-l border-hedgr-200 pl-3">
            <p>
              <span className="font-semibold text-hedgr-800">Targets</span>.{" "}
              Informational system targets only. A lower conservative yield
              target means less yield opportunity within this structure.
            </p>
            <p>
              <span className="font-semibold text-hedgr-800">Balances</span>.{" "}
              Your ledger shows what you hold, not these percentages. These are
              target shares of the structure, not your spendable balance.
            </p>
            <p>
              <span className="font-semibold text-hedgr-800">Movement</span>.{" "}
              Targets do not mean funds have already moved.
            </p>
          </div>
        </details>
      </aside>
    </section>
  );
}
