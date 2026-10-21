import type { Tx } from '../../lib/state/ledger';

const KEY = 'hedgr:simulation-receipt';
export type ReceiptView = {
  recordedAt: number;
  balanceBefore: number | null;
  amountInput: string;
  quote: string;
  rate: number | null;
};
export type SimulationReceipt = {
  version: 1;
  txnRef: string;
  type: Tx['type'];
  identity: string;
  view: ReceiptView;
};

// Identity only. These existing immutable fields never feed financial arithmetic.
const identity = (tx: Tx) => JSON.stringify([tx.txn_ref, tx.type, tx.created_at, tx.amount_usd, tx.amount_zmw, tx.fx_rate, tx.source_local_amount, tx.source_local_currency]);

export function isDocumentReload(recordedAt: number): boolean {
  if (typeof window === 'undefined' || typeof performance.getEntriesByType !== 'function') return false;
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
  return navigation?.type === 'reload' && recordedAt <= performance.timeOrigin &&
    new URL(navigation.name).pathname === window.location.pathname;
}

export function clearSimulationReceipt(txnRef?: string): void {
  try {
    if (txnRef) {
      const current = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
      if (current?.txnRef !== txnRef) return;
    }
    sessionStorage.removeItem(KEY);
  } catch { /* Storage availability is not a financial precondition. */ }
}

/** One session-local view marker, never a transaction writer or recovery scheduler. */
export function rememberSimulationReceipt(tx: Tx, view: ReceiptView): void {
  if (tx.status === 'failed') { clearSimulationReceipt(tx.txn_ref); return; }
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ version: 1, txnRef: tx.txn_ref, type: tx.type, identity: identity(tx), view } satisfies SimulationReceipt));
  } catch { /* Reload restoration is unavailable when storage cannot persist. */ }
}

export function readSimulationReceipt(type: Tx['type'], transactions: readonly Tx[]): SimulationReceipt | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const marker = JSON.parse(raw) as SimulationReceipt | null;
    const view = marker?.view;
    const tx = transactions.at(-1);
    if (!marker || marker.version !== 1 || !tx || tx.status === 'failed' ||
        marker.txnRef !== tx.txn_ref || marker.type !== tx.type || marker.identity !== identity(tx) ||
        !view || !Number.isFinite(view.recordedAt) ||
        !(view.balanceBefore === null || (Number.isFinite(view.balanceBefore) && view.balanceBefore >= 0)) ||
        typeof view.amountInput !== 'string' || !Number.isFinite(Number(view.amountInput)) ||
        typeof view.quote !== 'string' || !/^[A-Z]{3}$/.test(view.quote) ||
        !(view.rate === null || (Number.isFinite(view.rate) && view.rate > 0))) {
      clearSimulationReceipt(); return null;
    }
    return marker.type === type ? marker : null;
  } catch { clearSimulationReceipt(); return null; }
}
