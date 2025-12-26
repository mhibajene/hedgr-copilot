'use client';
import { useState, useEffect } from 'react';
import { zmwToUsd } from '../../../lib/fx';
import { momoMock } from '../../../lib/payments/momo.mock';
import { useWalletStore } from '../../../lib/state/wallet';

interface FxRate {
  base: string;
  quote: string;
  rate: number;
  ts: number;
}

export default function DepositPage() {
  const credit = useWalletStore((s) => s.creditUSD);
  const [zmw, setZmw] = useState(100);
  const [usdPreview, setUsdPreview] = useState(0);
  const [txId, setTxId] = useState<string | null>(null);
  const [usdToCredit, setUsdToCredit] = useState(0);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED'>('IDLE');
  const [fxRate, setFxRate] = useState<FxRate | null>(null);

  useEffect(() => {
    const fetchFxRate = async () => {
      try {
        const response = await fetch('/api/fx');
        const data: FxRate = await response.json();
        setFxRate(data);
        // Update preview with fetched rate
        setUsdPreview(+(zmw / data.rate).toFixed(2));
      } catch (error) {
        console.error('Failed to fetch FX rate:', error);
        // Fallback to default calculation
        setUsdPreview(zmwToUsd(zmw));
      }
    };
    fetchFxRate();
  }, []);

  useEffect(() => {
    if (fxRate) {
      setUsdPreview(+(zmw / fxRate.rate).toFixed(2));
    } else {
      setUsdPreview(zmwToUsd(zmw));
    }
  }, [zmw, fxRate]);

  useEffect(() => {
    if (!txId) return;
    const h = setInterval(async () => {
      const s = await momoMock.status(txId);
      if (s === 'CONFIRMED') {
        clearInterval(h);
        credit(usdToCredit);
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
  }, [txId, usdToCredit, credit]);

  const confirm = async () => {
    setStatus('PENDING');
    setUsdToCredit(usdPreview);
    const tx = await momoMock.createDeposit(zmw);
    setTxId(tx.id);
  };

  return (
    <main className="p-6 space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Deposit</h1>
      {fxRate && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
          1 {fxRate.base} = {fxRate.rate} {fxRate.quote}
        </div>
      )}
      <div className="block space-y-2">
        <label htmlFor="amount-zmw">Amount (ZMW)</label>
        <input
          id="amount-zmw"
          type="number"
          value={zmw}
          onChange={(e) => setZmw(Number(e.target.value || 0))}
          className="border rounded-xl p-3 w-full"
        />
      </div>
      <div className="rounded-xl p-3 bg-gray-50">FX Preview: <strong>${usdPreview.toFixed(2)}</strong></div>
      <button onClick={confirm} disabled={status==='PENDING'} className="rounded-xl p-3 shadow">{status==='PENDING'?'Processing…':'Confirm'}</button>
      {status==='CONFIRMED' && <div className="text-green-600">Deposit CONFIRMED</div>}
    </main>
  );
}

