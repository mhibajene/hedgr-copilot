'use client';

import { useLedgerStore, type Tx } from '../state/ledger';
import { getEnvironmentMode } from '../env/mode';

const pendingTimers = new Map<string, ReturnType<typeof setTimeout>>();

function matchesDeposit(current: Tx | undefined, original: Tx): current is Tx {
  return current !== undefined &&
    current.type === 'deposit' &&
    current.txn_ref === original.txn_ref &&
    current.created_at === original.created_at &&
    current.amount_usd === original.amount_usd &&
    current.amount_zmw === original.amount_zmw &&
    current.fx_rate === original.fx_rate;
}

/**
 * Own a newly-created local simulation's timer outside the page lifetime.
 * In-app navigation is supported; hydration resumes the remaining delay below.
 */
export function scheduleSyntheticDeposit(txnRef: string, delayMs: number): void {
  if (pendingTimers.has(txnRef)) return;
  const transaction = useLedgerStore.getState().getByTxnRef(txnRef);
  if (transaction?.type !== 'deposit' || transaction.status !== 'pending') return;

  const original = { ...transaction };
  const timer = setTimeout(() => {
    try {
      const ledger = useLedgerStore.getState();
      const current = ledger.getByTxnRef(txnRef);
      // Reset, failure, previous settlement or replacement cannot become a credit.
      if (!matchesDeposit(current, original) || current.status !== 'pending') return;
      ledger.confirm(txnRef);
    } finally {
      pendingTimers.delete(txnRef);
    }
  }, delayMs);
  pendingTimers.set(txnRef, timer);
}

/** Resume only simulation deposits with the existing entered-source metadata. */
export function recoverSyntheticDeposits(): void {
  if (getEnvironmentMode() === 'live') return;
  const delay = Number(process.env.NEXT_PUBLIC_MOMO_CONFIRM_DELAY_MS ?? '1500');
  for (const tx of useLedgerStore.getState().transactions) {
    if (tx.type === 'deposit' && tx.status === 'pending' &&
        tx.source_local_amount !== undefined && tx.source_local_currency) {
      scheduleSyntheticDeposit(tx.txn_ref, Math.max(0, delay - (Date.now() - tx.created_at)));
    }
  }
}
