'use client';

import React from 'react';
import type { EngineState } from '../../../lib/engine/types';

type EngineAllocationBandsProps = {
  engineState: EngineState;
};

const BANDS: Array<{
  key: 'liquidityTargetPct' | 'coreTargetPct' | 'yieldCapPct';
  label: string;
}> = [
  { key: 'liquidityTargetPct', label: 'Liquidity' },
  { key: 'coreTargetPct', label: 'Core allocation' },
  { key: 'yieldCapPct', label: 'Yield provision' },
];

function formatPct(value: number) {
  return `${value}%`;
}

export function EngineAllocationBands({
  engineState,
}: EngineAllocationBandsProps) {
  return (
    <section
      aria-labelledby="engine-allocation-bands-title"
      className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-5"
      data-testid="engine-allocation-bands"
    >
      <div className="space-y-1">
        <h2
          id="engine-allocation-bands-title"
          className="text-base font-semibold text-slate-900"
        >
          Target posture
        </h2>
        <p
          className="max-w-2xl text-sm text-slate-600"
          data-testid="engine-allocation-bands-caption"
        >
          These percentages reflect system targets for liquidity, core stability,
          and yield capacity in the current posture. They are informational
          only—not your balances, settled positions, or ledger truth. A lower
          yield cap leaves less room for yield opportunity within the target
          structure.
        </p>
      </div>

      <div className="space-y-4">
        {BANDS.map(({ key, label }) => {
          const value = engineState[key];

          return (
            <div
              key={key}
              className="space-y-2"
              data-testid={`engine-allocation-band-${key}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-slate-700">
                  {label}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {formatPct(value)}
                </span>
              </div>
              <div
                aria-hidden="true"
                className="h-2 overflow-hidden rounded-full bg-slate-200"
              >
                <div
                  className="h-full rounded-full bg-slate-500"
                  style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
