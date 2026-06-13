'use client';

import React from 'react';
import type { EngineState } from '../../../lib/engine/types';
import { EngineProtectiveGuidance } from './EngineProtectiveGuidance';
import { EngineStabilityReviewSnapshot } from './EngineStabilityReviewSnapshot';
import { EngineStabilityExplainer } from './EngineStabilityExplainer';

type EngineAllocationBandsProps = {
  engineState: EngineState;
};

type LaneKey = 'liquidityTargetPct' | 'coreTargetPct' | 'yieldCapPct';

// Stable balance is the dominant primary holding lane; conservative yield and
// reserve are quieter supporting lanes. Order and roles are fixed across every
// posture so the structure stays invariant (only the values change by state).
const PRIMARY_LANE: { key: LaneKey; label: string; role: string } = {
  key: 'coreTargetPct',
  label: 'Stable balance',
  role: 'Primary holding lane',
};

const SUPPORTING_LANES: Array<{ key: LaneKey; label: string }> = [
  { key: 'yieldCapPct', label: 'Conservative yield' },
  { key: 'liquidityTargetPct', label: 'Reserve' },
];

function formatPct(value: number) {
  return `${value}%`;
}

function laneDescription(key: LaneKey, value: number): string {
  switch (key) {
    case 'coreTargetPct':
      return 'Held steady to preserve value.';
    case 'yieldCapPct':
      return `Up to ${formatPct(
        value,
      )} can support returns when conditions allow.`;
    case 'liquidityTargetPct':
      return 'A quiet buffer, kept ready if you need it.';
  }
}

export function EngineAllocationBands({
  engineState,
}: EngineAllocationBandsProps) {
  return (
    <section
      aria-labelledby="engine-allocation-bands-title"
      className="space-y-5 rounded-2xl border border-slate-200/50 bg-slate-50/50 p-5 shadow-sm shadow-slate-900/[0.02]"
      data-testid="engine-allocation-bands"
    >
      <div className="space-y-3">
        <h2
          id="engine-allocation-bands-title"
          className="text-sm font-semibold tracking-tight text-slate-800"
        >
          Target posture
        </h2>
        <p
          className="max-w-2xl text-sm leading-relaxed text-slate-600"
          data-testid="engine-allocation-bands-caption"
        >
          Most of your balance is held steady for stability. The rest supports
          that posture, with a reserve kept ready—there is nothing here you need
          to manage.
        </p>
        <ul
          className="max-w-2xl list-none space-y-3 p-0 text-sm leading-relaxed text-slate-600"
          data-testid="engine-allocation-trust-legend"
        >
          <li>
            <span className="font-medium text-slate-700">Targets</span>
            <span className="text-slate-600">
              {' '}
              — Informational system targets only. A lower conservative yield
              target means less yield opportunity within this structure.
            </span>
          </li>
          <li>
            <span className="font-medium text-slate-700">Balances</span>
            <span className="text-slate-600">
              {' '}
              — Your ledger shows what you hold—not these percentages. These are
              target shares of the structure, not your spendable balance.
            </span>
          </li>
          <li>
            <span className="font-medium text-slate-700">Movement</span>
            <span className="text-slate-600">
              {' '}
              — Targets do not mean funds have already moved.
            </span>
          </li>
        </ul>
      </div>

      <div className="space-y-3" data-testid="engine-allocation-structure">
        {(() => {
          const value = engineState[PRIMARY_LANE.key];
          const descId = `engine-allocation-band-${PRIMARY_LANE.key}-desc`;

          return (
            <div
              className="relative overflow-hidden rounded-2xl border border-slate-800/70 bg-slate-900 p-5 pl-6"
              data-testid={`engine-allocation-band-${PRIMARY_LANE.key}`}
              data-allocation-lane="primary"
              aria-describedby={descId}
            >
              {/* Primary Stability Edge: a subtle, static architectural cue owned
                  only by the Stable balance lane—not a chart, bar, or progress rail. */}
              <span
                aria-hidden="true"
                className="absolute inset-y-3 left-0 w-1 rounded-full bg-slate-400/70"
              />
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-base font-semibold tracking-tight text-white">
                  {PRIMARY_LANE.label}
                </span>
                <span className="text-sm font-medium tabular-nums text-slate-300">
                  {formatPct(value)}
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {PRIMARY_LANE.role}
              </p>
              <p
                id={descId}
                className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200"
              >
                {laneDescription(PRIMARY_LANE.key, value)}
              </p>
            </div>
          );
        })()}

        <div className="grid gap-3 sm:grid-cols-2">
          {SUPPORTING_LANES.map(({ key, label }) => {
            const value = engineState[key];
            const descId = `engine-allocation-band-${key}-desc`;

            return (
              <div
                key={key}
                className="rounded-xl border border-slate-200/70 bg-white/60 p-4"
                data-testid={`engine-allocation-band-${key}`}
                data-allocation-lane="supporting"
                aria-describedby={descId}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-slate-700">
                    {label}
                  </span>
                  <span className="text-xs font-medium tabular-nums text-slate-500">
                    {formatPct(value)}
                  </span>
                </div>
                <p
                  id={descId}
                  className="mt-2 text-xs leading-relaxed text-slate-500"
                >
                  {laneDescription(key, value)}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <EngineProtectiveGuidance />
      <EngineStabilityReviewSnapshot engineState={engineState} />
      <EngineStabilityExplainer />
    </section>
  );
}
