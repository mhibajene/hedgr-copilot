'use client';
import { create } from 'zustand';
import { persist, type PersistStorage, type StorageValue } from 'zustand/middleware';

/** Bump when ledger Tx shape or persisted format changes; mismatch on load → clear. */
export const LEDGER_SCHEMA_VERSION = 2;

/**
 * Ledger transaction contract — txn_ref is canonical identifier.
 * Status uses backend-aligned values: pending | settled | failed.
 * @see docs/contracts and Sprint 1.1 MC-S11-005
 */
export type LedgerTxStatus = 'pending' | 'settled' | 'failed';

export type Tx = {
  txn_ref: string;
  type: 'deposit' | 'withdrawal';
  status: LedgerTxStatus;
  amount_zmw: number;
  amount_usd: number;
  fx_rate: number;
  created_at: number;
  updated_at: number;
  /** Set when status is 'failed' */
  failure_reason?: string;
};

export type LedgerStore = {
  transactions: Tx[];
  append: (tx: Tx) => void;
  confirm: (txn_ref: string) => void;
  fail: (txn_ref: string, reason?: string) => void;
  clear: () => void;
  getByTxnRef: (txn_ref: string) => Tx | undefined;
};

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};

/** Persisted slice only (actions are not serialized). Must match partialize. */
export type LedgerPersistedState = { transactions: Tx[] };

/** JSON shape stored in underlying Storage (includes schema version). */
type PersistedLedger = { version: number; transactions: Tx[] };

/** Custom persist adapter: validates LEDGER_SCHEMA_VERSION and returns StorageValue. */
function createLedgerStorage(base: Storage): PersistStorage<LedgerPersistedState> {
  return {
    getItem: (name: string): StorageValue<LedgerPersistedState> | null => {
      const raw = base.getItem(name);
      if (raw == null) return null;
      try {
        const parsed = JSON.parse(raw) as PersistedLedger;
        if (parsed.version !== LEDGER_SCHEMA_VERSION) return null;
        return { state: { transactions: parsed.transactions ?? [] }, version: 0 };
      } catch {
        return null;
      }
    },
    setItem: (name: string, value: StorageValue<LedgerPersistedState>): void => {
      try {
        const transactions = value.state.transactions ?? [];
        const toStore: PersistedLedger = {
          version: LEDGER_SCHEMA_VERSION,
          transactions,
        };
        base.setItem(name, JSON.stringify(toStore));
      } catch {
        // no-op on write error
      }
    },
    removeItem: (name: string): void => base.removeItem(name),
  };
}

export const useLedgerStore = create<LedgerStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      append: (tx) => {
        // Idempotency: if ledger already has this txn_ref, do not duplicate
        const existing = get().transactions.find((t) => t.txn_ref === tx.txn_ref);
        if (existing) return;
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...tx, updated_at: tx.updated_at ?? tx.created_at },
          ],
        }));
      },
      confirm: (txn_ref) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.txn_ref === txn_ref
              ? {
                  ...t,
                  status: 'settled' as const,
                  updated_at: Date.now(),
                }
              : t
          ),
        })),
      fail: (txn_ref, reason) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.txn_ref === txn_ref
              ? {
                  ...t,
                  status: 'failed' as const,
                  updated_at: Date.now(),
                  failure_reason: reason ?? 'Transaction could not be processed',
                }
              : t
          ),
        })),
      clear: () => set({ transactions: [] }),
      getByTxnRef: (txn_ref) => get().transactions.find((t) => t.txn_ref === txn_ref),
    }),
    {
      name: 'hedgr:ledger',
      storage: createLedgerStorage(
        typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage)
      ),
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
