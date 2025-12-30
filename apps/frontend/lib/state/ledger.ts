'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Tx = {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW';
  amountUSD: number;
  amountZMW?: number;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED';
  createdAt: number;
  confirmedAt?: number;
};

export type LedgerStore = {
  transactions: Tx[];
  append: (tx: Tx) => void;
  confirm: (id: string) => void;
  fail: (id: string) => void;
  clear: () => void;
};

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};

export const useLedgerStore = create<LedgerStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      append: (tx) => {
        // Guard: Prevent duplicate transactions (handles React Strict Mode double-invocation)
        const existing = get().transactions.find((t) => t.id === tx.id);
        if (existing) return;
        set((state) => ({ transactions: [...state.transactions, tx] }));
      },
      confirm: (id) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, status: 'CONFIRMED' as const, confirmedAt: Date.now() } : tx
          ),
        })),
      fail: (id) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, status: 'FAILED' as const } : tx
          ),
        })),
      clear: () => set({ transactions: [] }),
    }),
    {
      name: 'hedgr:ledger',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage)
      ),
    }
  )
);
