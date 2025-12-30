/**
 * Balance Projection from Ledger (Single Source of Truth)
 * 
 * This module provides the canonical way to compute user balances
 * from ledger transactions. All balance displays should use this
 * projection when BALANCE_FROM_LEDGER is enabled.
 */

import type { Tx } from './ledger';

export type BalanceProjection = {
  /** Total balance including pending transactions */
  total: number;
  /** Available balance (confirmed transactions only) */
  available: number;
  /** Pending balance (unconfirmed deposits minus pending withdrawals) */
  pending: number;
  /** Currency code */
  currency: 'USD';
  /** Timestamp of the projection calculation */
  asOf: number;
};

/**
 * Computes balance projection from ledger transactions.
 * 
 * Rules:
 * - DEPOSIT + CONFIRMED → increases available
 * - DEPOSIT + PENDING → increases pending (and total)
 * - DEPOSIT + FAILED → no effect
 * - WITHDRAW + CONFIRMED → decreases available
 * - WITHDRAW + PENDING → decreases available, increases pending hold
 * - WITHDRAW + FAILED → no effect (reversal)
 * 
 * @param transactions - Array of ledger transactions
 * @returns BalanceProjection with total, available, pending
 */
export function computeBalanceFromLedger(transactions: Tx[]): BalanceProjection {
  let available = 0;
  let pendingDeposits = 0;
  let pendingWithdrawals = 0;

  for (const tx of transactions) {
    // Skip failed transactions - they have no effect on balance
    if (tx.status === 'FAILED') {
      continue;
    }

    if (tx.type === 'DEPOSIT') {
      if (tx.status === 'CONFIRMED') {
        available += tx.amountUSD;
      } else if (tx.status === 'PENDING') {
        pendingDeposits += tx.amountUSD;
      }
    } else if (tx.type === 'WITHDRAW') {
      if (tx.status === 'CONFIRMED') {
        available -= tx.amountUSD;
      } else if (tx.status === 'PENDING') {
        // Pending withdrawals reduce available (hold) but show as pending
        available -= tx.amountUSD;
        pendingWithdrawals += tx.amountUSD;
      }
    }
  }

  // Ensure no negative balances due to rounding
  available = Math.max(0, +available.toFixed(2));
  const pending = +(pendingDeposits - pendingWithdrawals).toFixed(2);
  const total = +(available + pendingDeposits).toFixed(2);

  return {
    total,
    available,
    pending,
    currency: 'USD',
    asOf: Date.now(),
  };
}

/**
 * Gets balance for a specific user from ledger.
 * In the current implementation, we use a single global ledger,
 * but this function signature supports future multi-user scenarios.
 * 
 * @param _userId - User ID (currently unused, reserved for future)
 * @param transactions - Ledger transactions
 * @returns BalanceProjection
 */
export function getUserBalanceFromLedger(
  _userId: string,
  transactions: Tx[]
): BalanceProjection {
  // Currently, all transactions belong to the single authenticated user
  // Future: filter transactions by userId
  return computeBalanceFromLedger(transactions);
}

