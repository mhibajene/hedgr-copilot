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
 * - deposit + settled → increases available
 * - deposit + pending → increases pending (and total)
 * - deposit + failed → no effect
 * - withdrawal + settled → decreases available
 * - withdrawal + pending → decreases available, increases pending hold
 * - withdrawal + failed → no effect (reversal)
 *
 * @param transactions - Array of ledger transactions
 * @returns BalanceProjection with total, available, pending
 */
export function computeBalanceFromLedger(transactions: Tx[]): BalanceProjection {
  let available = 0;
  let pendingDeposits = 0;
  let pendingWithdrawals = 0;

  for (const tx of transactions) {
    if (tx.status === 'failed') {
      continue;
    }

    if (tx.type === 'deposit') {
      if (tx.status === 'settled') {
        available += tx.amount_usd;
      } else if (tx.status === 'pending') {
        pendingDeposits += tx.amount_usd;
      }
    } else if (tx.type === 'withdrawal') {
      if (tx.status === 'settled') {
        available -= tx.amount_usd;
      } else if (tx.status === 'pending') {
        available -= tx.amount_usd;
        pendingWithdrawals += tx.amount_usd;
      }
    }
  }

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
  return computeBalanceFromLedger(transactions);
}
