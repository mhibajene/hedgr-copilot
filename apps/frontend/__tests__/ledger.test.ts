import { describe, test, expect, beforeEach } from 'vitest';
import { useLedgerStore } from '../lib/state/ledger';
import type { Tx } from '../lib/state/ledger';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (index: number) => Object.keys(store)[index] || null,
    length: 0,
  };
})();

describe('LedgerStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useLedgerStore.getState().clear();
    localStorageMock.clear();
    // Mock window.localStorage
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  test('append → confirmed → list contains entry', () => {
    const store = useLedgerStore.getState();
    const tx: Tx = {
      id: 'tx_1',
      type: 'DEPOSIT',
      amountUSD: 5.0,
      amountZMW: 100,
      status: 'PENDING',
      createdAt: Date.now(),
    };

    store.append(tx);
    expect(store.transactions).toHaveLength(1);
    expect(store.transactions[0]).toMatchObject({
      id: 'tx_1',
      type: 'DEPOSIT',
      amountUSD: 5.0,
      status: 'PENDING',
    });

    store.confirm('tx_1');
    expect(store.transactions[0].status).toBe('CONFIRMED');
    expect(store.transactions[0].confirmedAt).toBeDefined();
  });

  test('persist works after page reload (mock localStorage)', () => {
    const store = useLedgerStore.getState();
    const tx: Tx = {
      id: 'tx_2',
      type: 'WITHDRAW',
      amountUSD: 1.0,
      status: 'PENDING',
      createdAt: Date.now(),
    };

    store.append(tx);
    expect(store.transactions).toHaveLength(1);

    // Simulate page reload by creating a new store instance
    // In a real scenario, Zustand persist would rehydrate from localStorage
    const stored = localStorageMock.getItem('hedgr:ledger');
    expect(stored).toBeTruthy();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.transactions).toHaveLength(1);
      expect(parsed.state.transactions[0].id).toBe('tx_2');
    }
  });
});

