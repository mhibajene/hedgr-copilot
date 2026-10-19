'use client';

import { useLedgerStore, type Tx } from '../state/ledger';
import { getEnvironmentMode } from '../env/mode';
import { resolveTxReviewSimulatorFlags } from '../tx/tx-review-simulator';

export type WithdrawStatus = 'PENDING' | 'CONFIRMED' | 'FAILED';

export type WithdrawTx = { txn_ref: string; amountUSD: number; createdAt: number };

const reg = new Map<string, { status: WithdrawStatus; held?: boolean }>();
const pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const DEFAULT_DELAY = Number(process.env.NEXT_PUBLIC_WITHDRAW_CONFIRM_DELAY_MS ?? '1500');
const DELAY_MS = clamp(DEFAULT_DELAY, 200, 5000);

export type CreateWithdrawOptions = {
  /**
   * When true, mock stays PENDING (no auto-confirm timer). MC-S2-021 review seam only;
   * caller must only set this when local dev simulation guard allows tx review flags.
   */
  skipAutoConfirm?: boolean;
};

function scheduleWithdrawal(tx: Tx, delay: number): void {
  if (pendingTimers.has(tx.txn_ref)) return;
  const original = { ...tx };
  pendingTimers.set(tx.txn_ref, setTimeout(() => {
    try {
      const ledger = useLedgerStore.getState();
      const current = ledger.getByTxnRef(original.txn_ref);
      // A reset, replacement, failure or prior settlement cannot become a debit.
      if (!current || current.type !== 'withdrawal' || current.status !== 'pending' ||
          current.created_at !== original.created_at || current.amount_usd !== original.amount_usd ||
          current.amount_zmw !== original.amount_zmw || current.fx_rate !== original.fx_rate) return;
      ledger.confirm(original.txn_ref);
      reg.set(original.txn_ref, { status: 'CONFIRMED' });
    } finally {
      pendingTimers.delete(original.txn_ref);
    }
  }, delay));
}

export function recoverSyntheticWithdrawals(): void {
  if (getEnvironmentMode() === 'live' || typeof window === 'undefined' ||
      resolveTxReviewSimulatorFlags(window.location.search).holdWithdrawPending) return;
  for (const tx of useLedgerStore.getState().transactions) {
    if (tx.type === 'withdrawal' && tx.status === 'pending' && !reg.get(tx.txn_ref)?.held) {
      scheduleWithdrawal(tx, Math.max(0, DELAY_MS - (Date.now() - tx.created_at)));
    }
  }
}

export const withdrawMock = {
  async createWithdraw(
    amountUSD: number,
    options?: CreateWithdrawOptions,
  ): Promise<WithdrawTx> {
    const txn_ref = crypto.randomUUID();
    const now = Date.now();

    reg.set(txn_ref, { status: 'PENDING', held: options?.skipAutoConfirm });

    useLedgerStore.getState().append({
      txn_ref,
      type: 'withdrawal',
      status: 'pending',
      amount_zmw: 0,
      amount_usd: amountUSD,
      fx_rate: 0,
      created_at: now,
      updated_at: now,
    });

    if (!options?.skipAutoConfirm) {
      scheduleWithdrawal(useLedgerStore.getState().getByTxnRef(txn_ref)!, DELAY_MS);
    }

    return { txn_ref, amountUSD, createdAt: now };
  },
  async status(txn_ref: string): Promise<WithdrawStatus> {
    const tx = useLedgerStore.getState().getByTxnRef(txn_ref);
    return tx?.status === 'settled' ? 'CONFIRMED' : tx?.status === 'pending' ? 'PENDING' : 'FAILED';
  },
};
