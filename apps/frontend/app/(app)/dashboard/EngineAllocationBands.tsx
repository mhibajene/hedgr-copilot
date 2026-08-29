"use client";

import React from "react";
import type { EngineState } from "../../../lib/engine/types";

type EngineAllocationBandsProps = {
  engineState: EngineState;
  collapsed?: boolean;
};

type LaneKey = "liquidityTargetPct" | "coreTargetPct" | "yieldCapPct";

// These are planning roles, not funded containers. Order and labels remain
// fixed across postures so the guidance stays legible without colour or a
// portfolio-style allocation graphic.
const GUIDANCE_LANES: Array<{
  key: LaneKey;
  label: string;
  role: string;
}> = [
  {
    key: "coreTargetPct",
    label: "Core stability target",
    role: "Primary stability guidance",
  },
  {
    key: "yieldCapPct",
    label: "Conservative yield",
    role: "Supporting guidance",
  },
  {
    key: "liquidityTargetPct",
    label: "Reserve",
    role: "Supporting guidance",
  },
];

function formatPct(value: number) {
  return `${value}%`;
}

function laneDescription(key: LaneKey): string {
  switch (key) {
    case "coreTargetPct":
      return "The largest target, focused on preserving value.";
    case "yieldCapPct":
      return "A limited target for return opportunity when conditions allow.";
    case "liquidityTargetPct":
      return "A buffer target, kept ready if needed.";
  }
}

const TARGET_ROLES: Array<{
  key: LaneKey;
  label: string;
  role: string;
  description: string;
}> = [
  {
    key: "coreTargetPct",
    label: "Core stability target",
    role: "Primary stability role",
    description: "Preserve value as the primary stability priority.",
  },
  {
    key: "yieldCapPct",
    label: "Conservative yield",
    role: "Supporting role",
    description: "Keep return opportunity limited and conditional.",
  },
  {
    key: "liquidityTargetPct",
    label: "Reserve",
    role: "Supporting role",
    description: "Keep a buffer ready if needed.",
  },
];

const SYNTHETIC_PURPOSES: Array<{
  key: LaneKey;
  label: string;
  description: string;
}> = [
  {
    key: "coreTargetPct",
    label: "Now",
    description: "For what matters in the near term.",
  },
  {
    key: "liquidityTargetPct",
    label: "Reserve",
    description: "A buffer for surprises and setbacks.",
  },
  {
    key: "yieldCapPct",
    label: "Growth",
    description: "For future opportunities.",
  },
];

export function EngineAllocationBands({
  engineState,
  collapsed = false,
}: EngineAllocationBandsProps) {
  const syntheticPlanning = (
    <div className="space-y-4">
      <dl
        className="divide-y divide-hedgr-100 border-y border-hedgr-100 sm:grid sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        data-testid="engine-allocation-target-roles"
        aria-label="Planning purposes"
      >
        {SYNTHETIC_PURPOSES.map(({ key, label, description }) => (
          <div
            key={key}
            className="bg-white px-1 py-3 sm:px-4"
            data-testid={`engine-allocation-role-${key}`}
          >
            <dt className="text-sm font-semibold text-hedgr-800">{label}</dt>
            <dd className="mt-1 text-xs leading-relaxed text-hedgr-500 sm:text-sm">
              {description}
            </dd>
          </div>
        ))}
      </dl>

      <p
        className="max-w-2xl rounded-r-xl border-l-2 border-hedgr-500 bg-hedgr-100/20 px-3 py-2.5 text-xs leading-relaxed text-hedgr-dark sm:text-sm"
        data-testid="engine-allocation-boundary"
      >
        These are planning purposes, not separate balances. They do not divide
        or move simulated money.
      </p>

      <details data-testid="engine-allocation-values-details">
        <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-semibold text-hedgr-600 hover:text-hedgr-primary focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2">
          View planning percentages
        </summary>
        <dl
          className="mt-4 divide-y divide-hedgr-100 border-y border-hedgr-100"
          data-testid="engine-allocation-structure"
        >
          {SYNTHETIC_PURPOSES.map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-3"
              data-testid={`engine-allocation-band-${key}`}
              data-guidance-row="true"
            >
              <dt className="text-sm font-medium text-hedgr-800">{label}</dt>
              <dd className="text-sm font-semibold tabular-nums text-hedgr-800">
                {formatPct(engineState[key])}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs leading-relaxed text-hedgr-500">
          Percentages describe the simulated planning structure only. They do
          not show where money is held.
        </p>
      </details>
    </div>
  );

  const priorities = (
    <p
      className="max-w-xl text-sm leading-relaxed text-hedgr-dark"
      data-testid="engine-allocation-philosophy"
    >
      Hedgr&apos;s guidance makes its priorities visible in this simulation:
      preserve value first, keep access and risk visible, and understand the
      situation before action.
    </p>
  );

  const targetRoles = (
    <div
      className="space-y-3"
      data-testid="engine-allocation-target-roles"
      aria-label="Stability target roles"
    >
      <p className="max-w-xl text-sm leading-relaxed text-hedgr-dark">
        Hedgr represents those priorities through three distinct target roles.
      </p>
      <dl className="divide-y divide-hedgr-100 border-y border-hedgr-100">
        {TARGET_ROLES.map(({ key, label, role, description }) => (
          <div
            key={key}
            className="grid gap-1 py-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] sm:gap-4"
            data-testid={`engine-allocation-role-${key}`}
          >
            <dt>
              <span className="block text-sm font-semibold text-hedgr-800">
                {label}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-hedgr-500">
                {role}
              </span>
            </dt>
            <dd className="text-sm leading-relaxed text-hedgr-dark">
              {description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  const targetValues = (
    <>
      <p
        className="max-w-xl text-sm leading-relaxed text-hedgr-dark"
        data-testid="engine-allocation-targets-intro"
      >
        These percentages describe a simulated planning structure for those
        roles. They are guidance, not current money.
      </p>

      <dl
        className="divide-y divide-hedgr-100 border-y border-hedgr-100"
        data-testid="engine-allocation-structure"
      >
        {GUIDANCE_LANES.map(({ key, label, role }, index) => {
          const value = engineState[key];
          const descId = `engine-allocation-band-${key}-desc`;

          return (
            <div
              key={key}
              className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
              data-testid={`engine-allocation-band-${key}`}
              data-allocation-lane={index === 0 ? "primary" : "supporting"}
              data-guidance-row="true"
              aria-describedby={descId}
            >
              <div>
                <dt>
                  <span className="block text-sm font-semibold text-hedgr-800">
                    {label}
                  </span>
                  <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-wide text-hedgr-500">
                    {role}
                  </span>
                </dt>
                <dd
                  id={descId}
                  className="mt-1 text-sm leading-relaxed text-hedgr-dark"
                >
                  {laneDescription(key)}
                </dd>
              </div>
              <dd className="flex items-baseline justify-between gap-3 sm:block sm:min-w-24 sm:text-right">
                <span className="text-[11px] font-medium uppercase tracking-wide text-hedgr-500">
                  Stability target
                </span>
                <span className="block text-lg font-semibold tabular-nums text-hedgr-800">
                  {formatPct(value)}
                </span>
              </dd>
            </div>
          );
        })}
      </dl>

      <aside
        className="max-w-xl border-l-2 border-hedgr-200 pl-3 text-sm leading-relaxed text-hedgr-dark"
        data-testid="engine-allocation-boundary"
        aria-label="Stability guidance boundary"
      >
        <span className="font-semibold text-hedgr-800">Guidance only.</span>{" "}
        This planning structure is context, not an instruction. It does not show
        current money or prove that simulated money was divided or moved.
      </aside>

      <aside
        className="max-w-xl border-t border-hedgr-100 pt-4 text-xs leading-relaxed text-hedgr-dark"
        data-testid="engine-allocation-trust-legend"
        aria-label="Detailed stability target distinction"
      >
        <p>
          <span className="font-semibold text-hedgr-800">Planning targets</span>
          . The percentages show intended stability priorities in this
          simulation only.
        </p>
        <details
          className="mt-3"
          data-testid="engine-allocation-target-details"
        >
          <summary className="inline-flex min-h-11 cursor-pointer items-center font-medium text-hedgr-600 underline decoration-hedgr-200 underline-offset-4">
            Verify what stability targets mean
          </summary>
          <div className="mt-3 space-y-2 border-l border-hedgr-200 pl-3">
            <p>
              <span className="font-semibold text-hedgr-800">Target role</span>.
              A lower Conservative yield target limits the return opportunity
              shown within the guidance.
            </p>
            <p>
              <span className="font-semibold text-hedgr-800">
                Current state
              </span>
              . The simulated balance shown above is separate from this
              guidance. The percentages do not divide it.
            </p>
            <p>
              <span className="font-semibold text-hedgr-800">
                No instruction or movement
              </span>
              . Guidance does not tell you what to do, and a target does not
              divide or move simulated money.
            </p>
          </div>
        </details>
      </aside>
    </>
  );

  return (
    <section
      aria-labelledby="engine-allocation-bands-title"
      className={
        collapsed
          ? "space-y-4 border-t border-hedgr-100 bg-white pt-5 sm:pt-6"
          : "space-y-5 rounded-2xl border border-hedgr-100 bg-white p-5 shadow-sm sm:p-6"
      }
      data-testid="engine-allocation-bands"
      data-presentation={collapsed ? "collapsed" : "expanded"}
    >
      <div className="space-y-2">
        <h2
          id="engine-allocation-bands-title"
          className="text-lg font-semibold tracking-tight text-hedgr-800"
        >
          {collapsed ? "What you are building toward" : "Stability guidance"}
        </h2>
        <p
          className="max-w-xl text-sm leading-relaxed text-hedgr-500"
          data-testid="engine-allocation-bands-caption"
        >
          {collapsed
            ? "Three purposes for planning ahead. They are guidance, not money set aside."
            : "See the planning position shown in this simulation and why it is structured this way. These targets are guidance, not current money."}
        </p>
      </div>

      {collapsed ? (
        syntheticPlanning
      ) : (
        <div className="space-y-5">
          {priorities}
          {targetRoles}
          {targetValues}
        </div>
      )}
    </section>
  );
}
