'use client';
import { useState, useEffect } from 'react';
import { zmwToUsd } from '../../../lib/fx';
import { momoMock } from '../../../lib/payments/momo.mock';
import { useWalletStore } from '../../../lib/state/wallet';

export default function DepositPage() {
  const credit = useWalletStore((s) => s.creditUSD);
  const [zmw, setZmw] = useState(100);
  const [usdPreview, setUsdPreview] = useState(0);
  const [txId, setTxId] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED'>('IDLE');

  useEffect(() => { setUsdPreview(zmwToUsd(zmw)); }, [zmw]);

  useEffect(() => {
    if (!txId) return;
    const h = setInterval(async () => {
      const s = await momoMock.status(txId);
      if (s === 'CONFIRMED') {
        clearInterval(h);
        credit(usdPreview);
        setStatus('CONFIRMED');
      }
    }, 500);
    return () => clearInterval(h);
  }, [txId, credit, usdPreview]);

  const confirm = async () => {
    setStatus('PENDING');
    const tx = await momoMock.createDeposit(zmw);
    setTxId(tx.id);
  };

  return (
    <main className="p-6 space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Deposit</h1>
      <label className="block space-y-2">
        <span>Amount (ZMW)</span>
        <input type="number" value={zmw} onChange={(e) => setZmw(parseFloat(e.target.value))} className="border rounded-xl p-3 w-full" />
      </label>
      <div className="rounded-xl p-3 bg-gray-50">FX Preview: <strong>${usdPreview.toFixed(2)}</strong></div>
      <button onClick={confirm} disabled={status==='PENDING'} className="rounded-xl p-3 shadow">{status==='PENDING'?'Processing…':'Confirm'}</button>
      {status==='CONFIRMED' && <div className="text-green-600">Deposit CONFIRMED</div>}
    </main>
  );
}

