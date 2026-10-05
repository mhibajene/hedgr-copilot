'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLedgerStore } from '../state/ledger';
import { computeBalanceFromLedger, type BalanceProjection } from '../state/balance';

export type UseBalanceResult = BalanceProjection & {
  isLoading: boolean;
  error: string | null;
  /** Refresh balance from ledger */
  refresh: () => void;
};

/**
 * useBalance Hook - Single Source of Truth for Balance Display
 * 
 * This hook provides the canonical way to access user balance in the frontend.
 * It computes balance from the ledger store, the only balance source.
 * 
 * Usage:
 * ```tsx
 * const { total, available, pending, isLoading, error } = useBalance();
 * ```
 * 
 * All balance displays (Dashboard, header, etc.) should use this hook exclusively.
 */
export function useBalance(): UseBalanceResult {
  const transactions = useLedgerStore((s) => s.transactions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<BalanceProjection>({
    total: 0,
    available: 0,
    pending: 0,
    currency: 'USD',
    asOf: 0, // Use stable initial value to avoid SSR/client hydration mismatch
  });

  const computeBalance = useCallback(() => {
    try {
      setError(null);
      setBalance(computeBalanceFromLedger(transactions));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compute balance');
    } finally {
      setIsLoading(false);
    }
  }, [transactions]);

  // Compute balance on mount and when transactions change
  useEffect(() => {
    computeBalance();
  }, [computeBalance]);

  return {
    ...balance,
    isLoading,
    error,
    refresh: computeBalance,
  };
}

/**
 * useBalanceValue Hook - Simplified balance accessor
 * 
 * Returns just the available balance as a number.
 * Useful for components that only need the balance value.
 */
export function useBalanceValue(): number {
  const { available } = useBalance();
  return available;
}

