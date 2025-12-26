// @vitest-environment jsdom

import { describe, test, expect, beforeEach } from 'vitest';
import { useLedgerStore } from '../lib/state/ledger';
import type { Tx } from '../lib/state/ledger';

describe('LedgerStore', () => {
  beforeEach(() => {
    // Clear localStorage first
    window.localStorage.clear();
    // Reset store after localStorage is cleared
    useLedgerStore.getState().clear();
  });

  test('append → confirmed → list contains entry', () => {
    const tx: Tx = {
      id: 'tx_1',
      type: 'DEPOSIT',
      amountUSD: 5.0,
      amountZMW: 100,
      status: 'PENDING',
      createdAt: Date.now(),
    };

    useLedgerStore.getState().append(tx);
    const state1 = useLedgerStore.getState();
    expect(state1.transactions).toHaveLength(1);
    expect(state1.transactions[0]).toMatchObject({
      id: 'tx_1',
      type: 'DEPOSIT',
      amountUSD: 5.0,
      status: 'PENDING',
    });

    useLedgerStore.getState().confirm('tx_1');
    const state2 = useLedgerStore.getState();
    expect(state2.transactions[0].status).toBe('CONFIRMED');
    expect(state2.transactions[0].confirmedAt).toBeDefined();
  });

  test('persist works after page reload (mock localStorage)', async () => {
    const tx: Tx = {
      id: 'tx_2',
      type: 'WITHDRAW',
      amountUSD: 1.0,
      status: 'PENDING',
      createdAt: Date.now(),
    };

    useLedgerStore.getState().append(tx);
    const state = useLedgerStore.getState();
    expect(state.transactions).toHaveLength(1);

    // Wait for Zustand persist to write to localStorage (it's async and debounced)
    // Zustand persist batches writes, so we need to wait a bit longer
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Assert against window.localStorage
    const stored = window.localStorage.getItem('hedgr:ledger');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.state.transactions).toHaveLength(1);
    expect(parsed.state.transactions[0].id).toBe('tx_2');
  });
});

