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

const SUPPORTING_LANES: Array<{
  key: LaneKey;
  label: string;
  accentClass: string;
  labelClass: string;
}> = [
  {
    key: "yieldCapPct",
    label: "Conservative yield",
    accentClass: "border-t-[#8391C9]",
    labelClass: "text-[#4658A0]",
  },
  {
    key: "liquidityTargetPct",
    label: "Reserve",
    accentClass: "border-t-[#4658A0]",
    labelClass: "text-[#36447C]",
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
      className="space-y-6 rounded-3xl border border-[#A6B0D8] bg-white p-5 sm:p-6"
      data-testid="engine-allocation-bands"
    >
      <div className="space-y-2">
        <h2
          id="engine-allocation-bands-title"
          className="text-base font-semibold tracking-tight text-[#171D35]"
        >
          Stability structure
        </h2>
        <p
          className="max-w-xl text-sm leading-relaxed text-[#1F2937]"
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
              className="rounded-2xl border border-[#1F2747] border-l-4 border-l-[#A6B0D8] bg-[#171D35] p-5 pl-6"
              data-testid={`engine-allocation-band-${PRIMARY_LANE.key}`}
              data-allocation-lane="primary"
              aria-describedby={descId}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-base font-semibold tracking-tight text-white">
                  {PRIMARY_LANE.label}
                </span>
                <span className="text-sm font-medium tabular-nums text-[#CAD0E8]">
                  {formatPct(value)}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-[#A6B0D8]">
                {PRIMARY_LANE.role}
              </p>
              <p
                id={descId}
                className="mt-3 max-w-xl text-sm leading-relaxed text-[#CAD0E8]"
              >
                {laneDescription(PRIMARY_LANE.key, value)}
              </p>
            </div>
          );
        })()}

        <div className="grid gap-3 sm:grid-cols-2">
          {SUPPORTING_LANES.map(({ key, label, accentClass, labelClass }) => {
            const value = engineState[key];
            const descId = `engine-allocation-band-${key}-desc`;

            return (
              <div
                key={key}
                className={`rounded-xl border border-[#CAD0E8] border-t-2 bg-white p-4 ${accentClass}`}
                data-testid={`engine-allocation-band-${key}`}
                data-allocation-lane="supporting"
                aria-describedby={descId}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-sm font-medium ${labelClass}`}>
                    {label}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-[#36447C]">
                    {formatPct(value)}
                  </span>
                </div>
                <p
                  id={descId}
                  className="mt-2 text-xs leading-relaxed text-[#1F2937]"
                >
                  {laneDescription(key, value)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <aside
        className="max-w-xl rounded-2xl border border-[#A6B0D8] bg-[#CAD0E8]/30 px-4 py-3 text-xs leading-relaxed text-[#171D35]"
        data-testid="engine-allocation-trust-legend"
        aria-label="Informational target notice"
      >
        <span className="font-semibold">Targets</span> — Informational system
        targets only. A lower conservative yield target means less yield
        opportunity within this structure.{" "}
        <span className="font-semibold">Balances</span> — Your ledger shows what
        you hold—not these percentages. These are target shares of the
        structure, not your spendable balance.{" "}
        <span className="font-semibold">Movement</span> — Targets do not mean
        funds have already moved.
      </aside>
    </section>
  );
}
