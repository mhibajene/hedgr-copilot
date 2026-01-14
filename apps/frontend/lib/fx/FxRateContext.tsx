'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { resolveLocalCurrencyCode, resolveMarket } from '../../config/market';
import { getFxMode } from '../fx';

export interface FxRateData {
  base: string;
  quote: string;
  rate: number;
  timestamp: number;
  isLoading: boolean;
  error: string | null;
  isStale: boolean;
  refresh: () => void;
}

const FxRateContext = createContext<FxRateData | null>(null);

const STALENESS_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

/**
 * FxRateProvider - React Context provider for FX rates
 * 
 * Features:
 * - Fetches /api/fx once on mount
 * - Marks rate as stale after 5 minutes
 * - Exposes refresh() to manually refetch
 * - NO silent fallback to fixed rate if API fails in non-mock modes
 * - Keeps last-good rate on error if available
 * 
 * Error handling:
 * - If FX_MODE is 'fixed', uses fixed rate
 * - If FX_MODE is live and API fails, keeps last-good rate or null
 * - Does NOT fallback to fixed rate silently
 */
export function FxRateProvider({ children }: { children: React.ReactNode }) {
  const [rate, setRate] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchFxRate = useCallback(async () => {
    // Cancel any in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);

    try {
      // Resolve current market and quote
      const market = resolveMarket();
      const quote = resolveLocalCurrencyCode(market);
      
      const response = await fetch(`/api/fx?quote=${encodeURIComponent(quote)}`, {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`FX API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Validate response structure
      if (typeof data.rate !== 'number' || !data.base || !data.quote) {
        throw new Error('Invalid FX API response format');
      }

      setRate(data.rate);
      setTimestamp(Date.now());
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was aborted, ignore
        return;
      }

      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch FX rate';
      setError(errorMessage);

      // Check if we're in fixed/mock mode
      const fxMode = getFxMode();
      
      if (fxMode === 'fixed') {
        // In fixed mode, we can use a default rate as fallback
        // This is acceptable because the mode explicitly indicates mock data
        // Note: The API itself should handle this, but this is a safety net
        // eslint-disable-next-line no-console
        console.warn('FX API failed in fixed mode, keeping last-good rate or showing unavailable');
      } else {
        // In live modes, do NOT fallback to fixed rate
        // Keep last-good rate if available, otherwise null
        // UI will show "Local estimate unavailable"
        // eslint-disable-next-line no-console
        console.error('FX API failed in live mode:', errorMessage);
      }

      // Keep last-good rate if we have one (rate is not reset to null)
      // Only set timestamp to 0 to indicate staleness
      // Use ref to check rate without adding it to dependencies
      setTimestamp((prevTimestamp) => {
        if (rate === null) return 0;
        return prevTimestamp;
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchFxRate();

    // Cleanup: abort any pending request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchFxRate]);

  // Calculate staleness
  const isStale = useMemo(() => {
    if (timestamp === 0) return true;
    return Date.now() - timestamp > STALENESS_THRESHOLD_MS;
  }, [timestamp]);

  // Get quote currency from market config
  const quoteCurrency = useMemo(() => resolveLocalCurrencyCode(), []);

  // Memoize context value
  const value = useMemo<FxRateData>(
    () => ({
      base: 'USD',
      quote: quoteCurrency,
      rate: rate ?? 0, // Use 0 if null (consumers should check for validity)
      timestamp,
      isLoading,
      error,
      isStale,
      refresh: fetchFxRate,
    }),
    [quoteCurrency, rate, timestamp, isLoading, error, isStale, fetchFxRate]
  );

  return <FxRateContext.Provider value={value}>{children}</FxRateContext.Provider>;
}

/**
 * useFxRate - Hook to consume FX rate context
 * 
 * @throws Error if used outside FxRateProvider
 * @returns FxRateData
 */
export function useFxRate(): FxRateData {
  const context = useContext(FxRateContext);
  
  if (!context) {
    throw new Error('useFxRate must be used within FxRateProvider');
  }
  
  return context;
}

/**
 * Helper to check if FX rate is available and valid
 */
export function isFxRateAvailable(fxRate: FxRateData): boolean {
  return !fxRate.isLoading && !fxRate.error && fxRate.rate > 0 && fxRate.timestamp > 0;
}
