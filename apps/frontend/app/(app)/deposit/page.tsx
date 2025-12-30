'use client';

import { useState, useEffect } from 'react';
import { zmwToUsd } from '../../../lib/fx';
import { momoMock } from '../../../lib/payments/momo.mock';
import { useBalance } from '../../../lib/hooks/useBalance';
import { useLedgerStore } from '../../../lib/state/ledger';
import { useWalletStore } from '../../../lib/state/wallet';
import { getBalanceMode } from '../../../lib/state/balance.mode';

interface FxRate {
  base: string;
  quote: string;
  rate: number;
  ts: number;
}

export default function DepositPage() {
  const { refresh } = useBalance();
  const appendTx = useLedgerStore((s) => s.append);
  const confirmTx = useLedgerStore((s) => s.confirm);
  const failTx = useLedgerStore((s) => s.fail);
  
  // Legacy wallet store for backward compatibility
  const creditWallet = useWalletStore((s) => s.creditUSD);
  
  const [zmw, setZmw] = useState(100);
  const [usdPreview, setUsdPreview] = useState(0);
  const [txId, setTxId] = useState<string | null>(null);
  const [usdToCredit, setUsdToCredit] = useState(0);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED' | 'FAILED'>('IDLE');
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
        
        const mode = getBalanceMode();
        if (mode === 'ledger') {
          // SSoT: Confirm transaction in ledger
          confirmTx(txId);
        } else {
          // Legacy: Update wallet store
          creditWallet(usdToCredit);
          // Force-flush persisted wallet state
          try {
            if (typeof window !== 'undefined') {
              const next = useWalletStore.getState().usdBalance;
              window.localStorage.setItem('hedgr:wallet', JSON.stringify({ state: { usdBalance: +next.toFixed(2) }, version: 0 }));
            }
          } catch {
            void 0;
          }
        }
        
        refresh();
        setStatus('CONFIRMED');
      } else if (s === 'FAILED') {
        clearInterval(h);
        
        const mode = getBalanceMode();
        if (mode === 'ledger') {
          // SSoT: Mark transaction as failed (no net effect on balance)
          failTx(txId);
        }
        // Legacy mode: no action needed for failed tx
        
        refresh();
        setStatus('FAILED');
      }
    }, 500);
    return () => clearInterval(h);
  }, [txId, usdToCredit, creditWallet, confirmTx, failTx, refresh]);

  const confirm = async () => {
    setStatus('PENDING');
    setUsdToCredit(usdPreview);
    const tx = await momoMock.createDeposit(zmw);
    setTxId(tx.id);
    
    const mode = getBalanceMode();
    if (mode === 'ledger') {
      // SSoT: Record pending deposit in ledger
      appendTx({
        id: tx.id,
        type: 'DEPOSIT',
        amountUSD: usdPreview,
        amountZMW: zmw,
        status: 'PENDING',
        createdAt: Date.now(),
      });
    }
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
      <button 
        onClick={confirm} 
        disabled={status === 'PENDING'} 
        className="rounded-xl p-3 shadow"
      >
        {status === 'PENDING' ? 'Processing…' : 'Confirm'}
      </button>
      {status === 'CONFIRMED' && <div className="text-green-600" data-testid="deposit-confirmed">Deposit CONFIRMED</div>}
      {status === 'FAILED' && <div className="text-red-600">Deposit FAILED</div>}
    </main>
  );
}
