'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLedgerStore } from '../state/ledger';
import { useWalletStore } from '../state/wallet';
import { computeBalanceFromLedger, type BalanceProjection } from '../state/balance';
import { getBalanceMode } from '../state/balance.mode';

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
 * When BALANCE_FROM_LEDGER is enabled (default), it computes balance from
 * the ledger store. Otherwise, it falls back to the legacy wallet store.
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
  const walletBalance = useWalletStore((s) => s.usdBalance);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [balance, setBalance] = useState<BalanceProjection>({
    total: 0,
    available: 0,
    pending: 0,
    currency: 'USD',
    asOf: Date.now(),
  });

  const computeBalance = useCallback(() => {
    try {
      setIsLoading(true);
      setError(null);

      const mode = getBalanceMode();

      if (mode === 'ledger') {
        // SSoT: Compute balance from ledger transactions
        const computed = computeBalanceFromLedger(transactions);
        setBalance(computed);
      } else {
        // Legacy: Use wallet store balance
        setBalance({
          total: walletBalance,
          available: walletBalance,
          pending: 0,
          currency: 'USD',
          asOf: Date.now(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compute balance');
    } finally {
      setIsLoading(false);
    }
  }, [transactions, walletBalance]);

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

