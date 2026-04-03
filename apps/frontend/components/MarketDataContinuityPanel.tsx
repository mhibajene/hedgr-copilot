'use client';

import React from 'react';
import {
  getMarketDataContinuityCopy,
  type MarketDataContinuityRoute,
} from '../lib/fx/market-data-continuity-copy';

export interface MarketDataContinuityPanelProps {
  route: MarketDataContinuityRoute;
  onRetryFx: () => void;
  'data-testid'?: string;
}

/**
 * Presentational only: MC-S2-020 degraded-state continuity + FX retry.
 * No route logic, pricing, or confirm gating — pages own those.
 */
export function MarketDataContinuityPanel({
  route,
  onRetryFx,
  'data-testid': dataTestId,
}: MarketDataContinuityPanelProps) {
  const { headline, lines } = getMarketDataContinuityCopy(route);

  return (
    <section
      role="region"
      aria-label="Exchange rate availability"
      data-testid={dataTestId}
      className="rounded-r-lg border border-amber-200 border-l-4 border-l-amber-500 bg-amber-50 p-4 shadow-sm"
    >
      <h2 className="text-base font-semibold text-amber-950">{headline}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-amber-950/90">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onRetryFx}
          className="rounded-lg bg-amber-900 px-3 py-2 text-sm font-medium text-white hover:bg-amber-950"
        >
          Retry rate
        </button>
      </div>
    </section>
  );
}
