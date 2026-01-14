'use client';

import React from 'react';
import { useFxRate, isFxRateAvailable } from '../lib/fx/FxRateContext';
import { getCurrentMarketConfig } from '../config/market';
import { formatLocalCurrency } from '../lib/utils/money';

export interface BalanceWithLocalEstimateProps {
  usdAmount: number;
  /**
   * If true, renders in a compact inline format suitable for text flows.
   * If false (default), renders with block-level styling for cards.
   */
  inline?: boolean;
  /**
   * Optional CSS class name for the container
   */
  className?: string;
  /**
   * Optional test ID for the component
   */
  'data-testid'?: string;
}

/**
 * BalanceWithLocalEstimate
 * 
 * Displays a USD balance with an optional local currency estimate.
 * 
 * Features:
 * - Shows primary USD amount (e.g., "$50.00")
 * - Shows secondary local estimate when FX rate is available (e.g., "≈ ZK 1,000.00")
 * - Gracefully handles FX unavailability (loading, error, or zero rate)
 * - Supports inline and block display modes
 * 
 * Requirements:
 * - Must be rendered within FxRateProvider context
 * - Uses market config for currency symbols
 */
export function BalanceWithLocalEstimate({
  usdAmount,
  inline = false,
  className = '',
  'data-testid': dataTestId,
}: BalanceWithLocalEstimateProps) {
  const fxRate = useFxRate();
  const marketConfig = getCurrentMarketConfig();
  
  // Check if FX rate is available and valid
  const hasFxRate = isFxRateAvailable(fxRate);
  
  // Calculate local currency amount (rate is guaranteed non-null when hasFxRate is true)
  const localAmount = hasFxRate && fxRate.rate !== null ? usdAmount * fxRate.rate : 0;
  
  // Format USD amount
  const formattedUsd = `$${usdAmount.toFixed(2)}`;
  
  // Format local amount with currency code (not symbol)
  const formattedLocal = hasFxRate 
    ? `≈ ${formatLocalCurrency(localAmount, marketConfig.localCurrency)}`
    : null;

  if (inline) {
    // Inline mode: compact rendering for text flows
    return (
      <span className={className}>
        <strong data-testid={dataTestId}>{formattedUsd}</strong>
        {formattedLocal && (
          <span className="text-xs text-gray-500 ml-2" data-testid="local-balance">
            {formattedLocal}
          </span>
        )}
        {!formattedLocal && (
          <span className="text-xs text-gray-400 ml-2" data-testid="local-balance">
            (estimate unavailable)
          </span>
        )}
      </span>
    );
  }

  // Block mode: card-style rendering
  return (
    <div className={className}>
      <div
        className="text-3xl font-bold"
        data-testid={dataTestId}
        aria-label="USD Balance amount"
      >
        {formattedUsd}
      </div>
      {formattedLocal && (
        <div className="text-xs text-gray-500 mt-1" data-testid="local-balance">
          {formattedLocal}
        </div>
      )}
      {!formattedLocal && (
        <div className="text-xs text-gray-400 mt-1" data-testid="local-balance">
          Local estimate unavailable
        </div>
      )}
    </div>
  );
}
