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

/**
 * Merge policy for upsert (existing txn_ref):
 * - Updatable: status, updated_at, failure_reason (only if explicitly provided in update;
 *   if update.failure_reason is undefined, keep existing; when status → 'settled', clear failure_reason).
 * - Immutable: type, amount_zmw, amount_usd, fx_rate, created_at, txn_ref.
 * - If incoming has different immutable values than stored, keep stored; optional console.debug.
 */
export type TxUpdate = Partial<Tx> & Pick<Tx, 'txn_ref'>;

export type LedgerStore = {
  transactions: Tx[];
  append: (tx: Tx) => void;
  upsertTx: (update: TxUpdate) => void;
  confirm: (txn_ref: string) => void;
  fail: (txn_ref: string, reason?: string) => void;
  clear: () => void;
  getByTxnRef: (txn_ref: string) => Tx | undefined;
};

const REQUIRED_FIELDS_FOR_CREATE: (keyof Tx)[] = [
  'type',
  'amount_zmw',
  'amount_usd',
  'fx_rate',
  'created_at',
];

function hasRequiredForCreate(update: TxUpdate): update is TxUpdate & Pick<Tx, 'type' | 'amount_zmw' | 'amount_usd' | 'fx_rate' | 'created_at'> {
  return REQUIRED_FIELDS_FOR_CREATE.every((k) => update[k] !== undefined && update[k] !== null);
}

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
        get().upsertTx({ ...tx, updated_at: tx.updated_at ?? tx.created_at });
      },
      upsertTx: (update) => {
        const existing = get().getByTxnRef(update.txn_ref);
        if (existing) {
          // Merge: only status, updated_at, failure_reason (failure_reason only if provided; clear when status → settled)
          const status = update.status !== undefined ? update.status : existing.status;
          const updated_at = update.updated_at !== undefined ? update.updated_at : existing.updated_at;
          const failure_reason =
            status === 'settled'
              ? undefined
              : update.failure_reason !== undefined
                ? update.failure_reason
                : existing.failure_reason;
          if (
            existing.status !== status ||
            existing.updated_at !== updated_at ||
            existing.failure_reason !== failure_reason
          ) {
            const merged: Tx = {
              ...existing,
              status,
              updated_at,
              failure_reason,
            };
            set((state) => {
              const idx = state.transactions.findIndex((t) => t.txn_ref === update.txn_ref);
              if (idx < 0) return state;
              const next = [...state.transactions];
              next[idx] = merged;
              return { transactions: next };
            });
          }
          const immutableMismatch =
            (update.type !== undefined && update.type !== existing.type) ||
            (update.amount_zmw !== undefined && update.amount_zmw !== existing.amount_zmw) ||
            (update.amount_usd !== undefined && update.amount_usd !== existing.amount_usd) ||
            (update.fx_rate !== undefined && update.fx_rate !== existing.fx_rate) ||
            (update.created_at !== undefined && update.created_at !== existing.created_at);
          if (immutableMismatch && typeof console !== 'undefined' && console.debug) {
            console.debug('[ledger] upsertTx: immutable field mismatch for txn_ref', update.txn_ref, 'keeping stored values');
          }
          return;
        }
        // Create only if update has all required immutable fields
        if (!hasRequiredForCreate(update)) return;
        const created: Tx = {
          txn_ref: update.txn_ref,
          type: update.type!,
          status: update.status ?? 'pending',
          amount_zmw: update.amount_zmw!,
          amount_usd: update.amount_usd!,
          fx_rate: update.fx_rate!,
          created_at: update.created_at!,
          updated_at: update.updated_at ?? update.created_at!,
          ...(update.failure_reason !== undefined ? { failure_reason: update.failure_reason } : {}),
        };
        set((state) => ({
          transactions: [...state.transactions, created],
        }));
      },
      confirm: (txn_ref) => {
        const existing = get().getByTxnRef(txn_ref);
        if (existing) {
          get().upsertTx({ ...existing, status: 'settled', updated_at: Date.now() });
        }
      },
      fail: (txn_ref, reason) => {
        const existing = get().getByTxnRef(txn_ref);
        if (existing) {
          get().upsertTx({
            ...existing,
            status: 'failed',
            updated_at: Date.now(),
            failure_reason: reason ?? 'Transaction could not be processed',
          });
        }
      },
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
