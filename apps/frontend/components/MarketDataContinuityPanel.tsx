'use client';

import React from 'react';
import {
  getMarketDataContinuityCopy,
  type MarketDataContinuityRoute,
} from '../lib/fx/market-data-continuity-copy';

export interface MarketDataContinuityPanelProps {
  route: MarketDataContinuityRoute;
  onRetryFx: () => void;
  /** HOME-EXPERIENCE-001 T2: row labels, shown only in simulated contexts. */
  labelled?: boolean;
  'data-testid'?: string;
}

const ROW_LABELS = ['What happened', 'What it affects', 'What still works', 'What is paused'] as const;

/**
 * Presentational only: MC-S2-020 degraded-state continuity + FX retry.
 * No route logic, pricing, or confirm gating — pages own those.
 */
export function MarketDataContinuityPanel({
  route,
  onRetryFx,
  labelled = false,
  'data-testid': dataTestId,
}: MarketDataContinuityPanelProps) {
  const { headline, lines } = getMarketDataContinuityCopy(route);

  return (
    <section
      role="region"
      aria-label="Exchange rate availability"
      data-testid={dataTestId}
      className="rounded-[1.25rem] border border-hedgr-300 bg-white p-5 text-hedgr-800 shadow-sm"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hedgr-100 text-hedgr-primary" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="h-5 w-5" focusable="false">
            <circle cx="12" cy="12" r="9" />
            <path d="M10 9v6M14 9v6" />
          </svg>
        </span>
        <h2 className="min-w-0 flex-1 basis-40 break-words text-base font-semibold text-hedgr-800">{headline}</h2>
      </div>
      {labelled ? (
        <dl className="mt-3">
          {lines.map((line, index) => (
            <div key={line} className="border-t border-hedgr-100 py-3">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-hedgr-500">{ROW_LABELS[index]}</dt>
              <dd className="mt-1 text-sm leading-relaxed">{line}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-hedgr-dark">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      <div className="mt-4">
        <button
          type="button"
          onClick={onRetryFx}
          className="flex min-h-12 w-full items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-hedgr-700 shadow-[inset_0_0_0_1.5px_var(--color-hedgr-700)] hover:bg-hedgr-100/20 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hedgr-500"
        >
          Retry rate
        </button>
      </div>
    </section>
  );
}
