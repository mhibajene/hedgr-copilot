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
      <div className="space-y-3">
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
          How the system weights liquidity, core stability, and yield capacity
          for this posture.
        </p>
        <ul
          className="max-w-2xl list-none space-y-2 p-0 text-sm text-slate-600"
          data-testid="engine-allocation-trust-legend"
        >
          <li>
            <span className="font-medium text-slate-700">Targets</span>
            <span className="text-slate-600">
              {' '}
              — Informational system targets only. A lower yield cap means less
              yield opportunity within this structure.
            </span>
          </li>
          <li>
            <span className="font-medium text-slate-700">Balances</span>
            <span className="text-slate-600">
              {' '}
              — Your ledger shows what you hold—not these percentages.
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
