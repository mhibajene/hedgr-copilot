'use client';

import React from 'react';
import { ErrorState } from '@hedgr/ui';
import type { UseLatestFxResult } from '../lib/hooks/useLatestFx';

/** Format Unix seconds to a short "Updated at HH:MM" style string */
export function formatFxUpdatedAt(ts: number): string {
  const date = new Date(ts * 1000);
  return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}

export interface FxRateBlockProps {
  /** Result from useLatestFx('USDZMW') */
  fx: UseLatestFxResult;
  /** Quote currency label for display, e.g. "ZMW" */
  quoteLabel: string;
  /** Optional test id for the block container */
  'data-testid'?: string;
}

/**
 * Presentational block: backend FX rate + updated time, or loading/error.
 * Formatting of ts happens here (UI boundary). Used by Deposit and Withdraw.
 */
export function FxRateBlock({ fx, quoteLabel, 'data-testid': dataTestId }: FxRateBlockProps) {
  if (fx.status === 'loading') {
    return (
      <div
        className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm"
        data-testid={dataTestId ?? 'fx-rate-block'}
      >
        Loading rate...
      </div>
    );
  }

  if (fx.status === 'error') {
    return (
      <ErrorState
        title="Unable to load exchange rate"
        description="We couldn't fetch the latest rate. Please try again."
        primaryAction={{ label: 'Retry', onClick: fx.retry }}
        secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}
        data-testid="fx-rate-error"
      />
    );
  }

  if (fx.status === 'success' && fx.data) {
    const { rate, ts } = fx.data;
    return (
      <div
        className="inline-flex flex-col gap-0.5"
        data-testid={dataTestId ?? 'fx-rate-block'}
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
          1 USD = {rate} {quoteLabel}
        </span>
        <span className="text-xs text-gray-500">
          Updated at {formatFxUpdatedAt(ts)}
        </span>
      </div>
    );
  }

  return null;
}
