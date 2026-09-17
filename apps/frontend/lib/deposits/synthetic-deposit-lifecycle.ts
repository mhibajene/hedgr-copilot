'use client';

import { useLedgerStore, type Tx } from '../state/ledger';
import { useWalletStore } from '../state/wallet';
import { getBalanceMode } from '../state/balance.mode';

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
 * In-app navigation is supported; reloads and historical pending recovery are not.
 */
export function scheduleSyntheticDeposit(txnRef: string, delayMs: number): void {
  if (pendingTimers.has(txnRef)) return;
  const transaction = useLedgerStore.getState().getByTxnRef(txnRef);
  if (transaction?.type !== 'deposit' || transaction.status !== 'pending') return;

  const original = { ...transaction };
  const balanceMode = getBalanceMode();
  const timer = setTimeout(() => {
    try {
      const ledger = useLedgerStore.getState();
      const current = ledger.getByTxnRef(txnRef);
      // Reset, failure, previous settlement or replacement cannot become a credit.
      if (!matchesDeposit(current, original) || current.status !== 'pending') return;
      ledger.confirm(txnRef);
      const settled = useLedgerStore.getState().getByTxnRef(txnRef);
      if (balanceMode === 'wallet' && matchesDeposit(settled, original) && settled.status === 'settled') {
        useWalletStore.getState().creditUSD(original.amount_usd);
      }
    } finally {
      pendingTimers.delete(txnRef);
    }
  }, delayMs);
  pendingTimers.set(txnRef, timer);
}
