'use client';

import { useState, useEffect } from 'react';

import { withdrawMock } from '../../../lib/payments/withdraw.mock';

import { useWalletStore } from '../../../lib/state/wallet';

export default function WithdrawPage() {
  const balance = useWalletStore((s) => s.usdBalance);
  const debit = useWalletStore((s) => s.debitUSD);
  const [usd, setUsd] = useState(1);
  const [txId, setTxId] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED'>('IDLE');

  useEffect(() => {
    if (!txId) return;

    const h = setInterval(async () => {
      const s = await withdrawMock.status(txId);
      if (s === 'CONFIRMED') {
        clearInterval(h);
        debit(usd);
        // Force-flush persisted wallet state so that navigating to /dashboard
        // immediately after this page shows the correct balance, even if the
        // zustand persistence layer hasn't flushed yet.
        try {
          if (typeof window !== 'undefined') {
            const next = useWalletStore.getState().usdBalance;
            window.localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: +next.toFixed(2) }, version: 0 }));
          }
        } catch {
          // Intentionally ignore storage write errors (e.g., disabled storage in CI)
          void 0;
        }
        setStatus('CONFIRMED');
      }
    }, 500);

    return () => clearInterval(h);
  }, [txId, debit, usd]);

  const confirm = async () => {
    if (usd <= 0 || usd > balance) return;

    setStatus('PENDING');
    const tx = await withdrawMock.createWithdraw(usd);
    setTxId(tx.id);
  };

  return (
    <main className="p-6 space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Withdraw</h1>
      <div>Current balance: <strong>${balance.toFixed(2)}</strong></div>
      <div className="block space-y-2">
        <label htmlFor="amount-usd">Amount (USD)</label>
        <input
          id="amount-usd"
          type="number"
          value={usd}
          onChange={(e) => setUsd(Number(e.target.value || 0))}
          className="border rounded-xl p-3 w-full"
        />
      </div>
      <button onClick={confirm} disabled={status==='PENDING' || usd<=0 || usd>balance} className="rounded-xl p-3 shadow">{status==='PENDING'?'Processing…':'Confirm'}</button>
      {status==='CONFIRMED' && <div className="text-green-600">Withdraw CONFIRMED</div>}
    </main>
  );
}

