'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Internal transaction status - maps to public status via status-mapper
 * @see lib/tx/status-mapper.ts
 */
export type TxInternalStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export type Tx = {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAW';
  amountUSD: number;
  amountZMW?: number;
  status: TxInternalStatus;
  createdAt: number;
  /** Timestamp when the transaction was confirmed/completed */
  confirmedAt?: number;
  /** Timestamp of last status update */
  updatedAt?: number;
  /** Reason for failure (user-friendly) */
  failureReason?: string;
};

export type LedgerStore = {
  transactions: Tx[];
  append: (tx: Tx) => void;
  confirm: (id: string) => void;
  fail: (id: string, reason?: string) => void;
  /** Update transaction status with optional metadata */
  updateStatus: (id: string, status: TxInternalStatus, metadata?: { failureReason?: string }) => void;
  clear: () => void;
  /** Get a single transaction by ID */
  getById: (id: string) => Tx | undefined;
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
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...tx, updatedAt: tx.createdAt },
          ],
        }));
      },
      confirm: (id) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id
              ? {
                  ...tx,
                  status: 'CONFIRMED' as const,
                  confirmedAt: Date.now(),
                  updatedAt: Date.now(),
                }
              : tx
          ),
        })),
      fail: (id, reason) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id
              ? {
                  ...tx,
                  status: 'FAILED' as const,
                  updatedAt: Date.now(),
                  confirmedAt: Date.now(),
                  failureReason: reason ?? 'Transaction could not be processed',
                }
              : tx
          ),
        })),
      updateStatus: (id, status, metadata) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id
              ? {
                  ...tx,
                  status,
                  updatedAt: Date.now(),
                  ...(status === 'CONFIRMED' || status === 'FAILED'
                    ? { confirmedAt: Date.now() }
                    : {}),
                  ...(metadata?.failureReason
                    ? { failureReason: metadata.failureReason }
                    : {}),
                }
              : tx
          ),
        })),
      clear: () => set({ transactions: [] }),
      getById: (id) => get().transactions.find((tx) => tx.id === id),
    }),
    {
      name: 'hedgr:ledger',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage)
      ),
    }
  )
);
