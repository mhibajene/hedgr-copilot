// @vitest-environment jsdom

import { describe, test, expect } from 'vitest';
import { computeBalanceFromLedger, getUserBalanceFromLedger } from '../lib/state/balance';
import type { Tx } from '../lib/state/ledger';

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
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.pending).toBe(0);
    });

    test('pending deposit increases pending and total but not available', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 50,
          status: 'PENDING',
          createdAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(0);
      expect(result.pending).toBe(50);
      expect(result.total).toBe(50);
    });

    test('failed deposit has no effect on balance', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        {
          id: 'tx_2',
          type: 'DEPOSIT',
          amountUSD: 50,
          status: 'FAILED',
          createdAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.pending).toBe(0);
    });

    test('confirmed withdrawal decreases available balance', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        {
          id: 'tx_2',
          type: 'WITHDRAW',
          amountUSD: 30,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      expect(result.available).toBe(70);
      expect(result.total).toBe(70);
      expect(result.pending).toBe(0);
    });

    test('pending withdrawal reduces available and shows as negative pending', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        {
          id: 'tx_2',
          type: 'WITHDRAW',
          amountUSD: 25,
          status: 'PENDING',
          createdAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      // Available is reduced by pending withdrawal (hold)
      expect(result.available).toBe(75);
      // Pending shows negative for pending withdrawals
      expect(result.pending).toBe(-25);
      // Total is available + pending deposits (none here)
      expect(result.total).toBe(75);
    });

    test('failed/reversed withdrawal has no net effect on balance', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        {
          id: 'tx_2',
          type: 'WITHDRAW',
          amountUSD: 50,
          status: 'FAILED',
          createdAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      // Failed withdrawal should not affect balance
      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.pending).toBe(0);
    });

    test('complex scenario: multiple deposits and withdrawals', () => {
      const transactions: Tx[] = [
        // Initial deposit: +100
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        // Second deposit: +50
        {
          id: 'tx_2',
          type: 'DEPOSIT',
          amountUSD: 50,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        // Withdrawal: -30
        {
          id: 'tx_3',
          type: 'WITHDRAW',
          amountUSD: 30,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        // Failed deposit: no effect
        {
          id: 'tx_4',
          type: 'DEPOSIT',
          amountUSD: 1000,
          status: 'FAILED',
          createdAt: Date.now(),
        },
        // Pending deposit: +20 pending
        {
          id: 'tx_5',
          type: 'DEPOSIT',
          amountUSD: 20,
          status: 'PENDING',
          createdAt: Date.now(),
        },
        // Pending withdrawal: -10 available, -10 pending
        {
          id: 'tx_6',
          type: 'WITHDRAW',
          amountUSD: 10,
          status: 'PENDING',
          createdAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      // Available: 100 + 50 - 30 - 10 (pending hold) = 110
      expect(result.available).toBe(110);
      // Pending: +20 (deposit) - 10 (withdrawal) = 10
      expect(result.pending).toBe(10);
      // Total: 110 + 20 = 130
      expect(result.total).toBe(130);
    });

    test('handles floating point precision correctly', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 0.1,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
        {
          id: 'tx_2',
          type: 'DEPOSIT',
          amountUSD: 0.2,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      // Should be 0.30, not 0.30000000000000004
      expect(result.available).toBe(0.3);
    });

    test('balance never goes negative', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'WITHDRAW',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
      ];

      const result = computeBalanceFromLedger(transactions);

      // Should clamp to 0, not go negative
      expect(result.available).toBe(0);
    });
  });

  describe('getUserBalanceFromLedger', () => {
    test('computes balance for user from transactions', () => {
      const transactions: Tx[] = [
        {
          id: 'tx_1',
          type: 'DEPOSIT',
          amountUSD: 100,
          status: 'CONFIRMED',
          createdAt: Date.now(),
          confirmedAt: Date.now(),
        },
      ];

      const result = getUserBalanceFromLedger('user_123', transactions);

      expect(result.available).toBe(100);
      expect(result.total).toBe(100);
      expect(result.currency).toBe('USD');
    });
  });
});

