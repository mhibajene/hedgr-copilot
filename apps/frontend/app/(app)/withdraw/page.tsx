'use client';

import { useState, useEffect } from 'react';
import { withdrawMock } from '../../../lib/payments/withdraw.mock';
import { useBalance } from '../../../lib/hooks/useBalance';
import { useLedgerStore } from '../../../lib/state/ledger';
import { useWalletStore } from '../../../lib/state/wallet';
import { getBalanceMode } from '../../../lib/state/balance.mode';

export default function WithdrawPage() {
  const { available, refresh } = useBalance();
  const appendTx = useLedgerStore((s) => s.append);
  const confirmTx = useLedgerStore((s) => s.confirm);
  const failTx = useLedgerStore((s) => s.fail);
  
  // Legacy wallet store for backward compatibility
  const debitWallet = useWalletStore((s) => s.debitUSD);
  
  const [usd, setUsd] = useState(1);
  const [txId, setTxId] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED' | 'FAILED'>('IDLE');

  useEffect(() => {
    if (!txId) return;

    const h = setInterval(async () => {
      const s = await withdrawMock.status(txId);
      if (s === 'CONFIRMED') {
        clearInterval(h);
        
        const mode = getBalanceMode();
        if (mode === 'ledger') {
          // SSoT: Confirm transaction in ledger
          confirmTx(txId);
        } else {
          // Legacy: Update wallet store
          debitWallet(usd);
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
          // SSoT: Mark transaction as failed (reversal - no net effect)
          failTx(txId);
        }
        // Legacy mode: no action needed for failed tx
        
        refresh();
        setStatus('FAILED');
      }
    }, 500);

    return () => clearInterval(h);
  }, [txId, debitWallet, usd, confirmTx, failTx, refresh]);

  const confirm = async () => {
    if (usd <= 0 || usd > available) return;

    setStatus('PENDING');
    
    const tx = await withdrawMock.createWithdraw(usd);
    
    const mode = getBalanceMode();
    if (mode === 'ledger') {
      // SSoT: Record pending withdrawal in ledger
      // Note: appendTx guards against duplicates internally
      appendTx({
        id: tx.id,
        type: 'WITHDRAW',
        amountUSD: usd,
        status: 'PENDING',
        createdAt: Date.now(),
      });
    }
    
    setTxId(tx.id);
  };

  return (
    <main className="p-6 space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Withdraw</h1>
      <div>Current balance: <strong>${available.toFixed(2)}</strong></div>
      <label htmlFor="amount-usd" className="block space-y-2">Amount (USD)</label>
      <input
        id="amount-usd"
        type="number"
        value={usd}
        onChange={(e) => setUsd(Number(e.target.value || 0))}
        className="border rounded-xl p-3 w-full"
      />
      <button 
        onClick={confirm} 
        disabled={status === 'PENDING' || usd <= 0 || usd > available} 
        className="rounded-xl p-3 shadow"
      >
        {status === 'PENDING' ? 'Processing…' : 'Confirm'}
      </button>
      {status === 'CONFIRMED' && <div className="text-green-600">Withdraw CONFIRMED</div>}
      {status === 'FAILED' && <div className="text-red-600">Withdraw FAILED</div>}
    </main>
  );
}
