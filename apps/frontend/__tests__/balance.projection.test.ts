// @vitest-environment jsdom

import { describe, test, expect } from 'vitest';
import { computeBalanceFromLedger, getUserBalanceFromLedger } from '../lib/state/balance';
import type { Tx } from '../lib/state/ledger';

function mkTx(
  txn_ref: string,
  type: Tx['type'],
  status: Tx['status'],
  amount_usd: number,
  extra?: Partial<Tx>
): Tx {
  const now = Date.now();
  return {
    txn_ref,
    type,
    status,
    amount_zmw: 0,
    amount_usd,
    fx_rate: 1,
    created_at: now,
    updated_at: now,
    ...extra,
  };
}

describe('Balance Projection from Ledger', () => {
  describe('computeBalanceFromLedger', () => {
    test('empty ledger returns zero balances', () => {
      const result = computeBalanceFromLedger([]);

      expect(result.total).toBe(0);
      expect(result.available).toBe(0);
      expect(result.pending).toBe(0);
      expect(result.currency).toBe('USD');
      expect(result.asOf).toBeGreaterThan(0);
    });

    test('confirmed deposit increases available balance', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 100),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.pending).toBe(0);
    });

    test('pending deposit increases pending and total but not available', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'pending', 50),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(0);
      expect(result.pending).toBe(50);
      expect(result.total).toBe(50);
    });

    test('failed deposit has no effect on balance', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 100),
        mkTx('ref2', 'deposit', 'failed', 50),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.pending).toBe(0);
    });

    test('confirmed withdrawal decreases available balance', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 100),
        mkTx('ref2', 'withdrawal', 'settled', 30),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(70);
      expect(result.total).toBe(70);
      expect(result.pending).toBe(0);
    });

    test('pending withdrawal reduces available and shows as negative pending', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 100),
        mkTx('ref2', 'withdrawal', 'pending', 25),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(75);
      expect(result.pending).toBe(-25);
      expect(result.total).toBe(75);
    });

    test('failed/reversed withdrawal has no net effect on balance', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 100),
        mkTx('ref2', 'withdrawal', 'failed', 50),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.pending).toBe(0);
    });

    test('complex scenario: multiple deposits and withdrawals', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 100),
        mkTx('ref2', 'deposit', 'settled', 50),
        mkTx('ref3', 'withdrawal', 'settled', 30),
        mkTx('ref4', 'deposit', 'failed', 1000),
        mkTx('ref5', 'deposit', 'pending', 20),
        mkTx('ref6', 'withdrawal', 'pending', 10),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(110);
      expect(result.pending).toBe(10);
      expect(result.total).toBe(130);
    });

    test('handles floating point precision correctly', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 0.1),
        mkTx('ref2', 'deposit', 'settled', 0.2),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(0.3);
    });

    test('balance never goes negative', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'withdrawal', 'settled', 100),
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(0);
    });
  });

  describe('getUserBalanceFromLedger', () => {
    test('computes balance for user from transactions', () => {
      const transactions: Tx[] = [
        mkTx('ref1', 'deposit', 'settled', 100),
      ];

      const result = getUserBalanceFromLedger('user_123', transactions);

      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.currency).toBe('USD');
    });
  });
});
