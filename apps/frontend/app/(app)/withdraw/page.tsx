'use client';

import { useState, useEffect } from 'react';
import { withdrawMock } from '../../../lib/payments/withdraw.mock';
import { useBalance } from '../../../lib/hooks/useBalance';
import { useLedgerStore } from '../../../lib/state/ledger';
import { useWalletStore } from '../../../lib/state/wallet';
import { getBalanceMode } from '../../../lib/state/balance.mode';
import { EmptyState, ErrorState } from '@hedgr/ui';
import { BalanceWithLocalEstimate } from '../../../components';

interface WithdrawMethod {
  id: string;
  name: string;
  available: boolean;
}

export default function WithdrawPage() {
  const { available, refresh, isLoading: balanceLoading, error: balanceError } = useBalance();
  const appendTx = useLedgerStore((s) => s.append);
  const confirmTx = useLedgerStore((s) => s.confirm);
  const failTx = useLedgerStore((s) => s.fail);
  
  // Legacy wallet store for backward compatibility
  const debitWallet = useWalletStore((s) => s.debitUSD);
  
  const [usd, setUsd] = useState(1);
  const [txId, setTxId] = useState<string | null>(null);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED' | 'FAILED'>('IDLE');
  
  // Withdraw methods state
  const [withdrawMethods, setWithdrawMethods] = useState<WithdrawMethod[]>([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsError, setMethodsError] = useState<string | null>(null);

  // Fetch withdrawal methods
  useEffect(() => {
    const fetchWithdrawMethods = async () => {
      setMethodsLoading(true);
      setMethodsError(null);
      try {
        // Simulate fetching withdrawal methods
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 300));
        setWithdrawMethods([
          { id: 'bank', name: 'Bank Transfer', available: true },
          { id: 'momo', name: 'Mobile Money', available: true },
        ]);
      } catch {
        setMethodsError('Unable to load withdrawal methods');
      } finally {
        setMethodsLoading(false);
      }
    };
    fetchWithdrawMethods();
  }, []);

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

  const retryLoadMethods = () => {
    setMethodsLoading(true);
    setMethodsError(null);
    // Simulate re-fetching
    setTimeout(() => {
      setWithdrawMethods([
        { id: 'bank', name: 'Bank Transfer', available: true },
        { id: 'momo', name: 'Mobile Money', available: true },
      ]);
      setMethodsLoading(false);
    }, 300);
  };

  const availableMethods = withdrawMethods.filter((m) => m.available);

  // Error state for loading balance
  if (balanceError) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Withdraw</h1>
        <ErrorState
          title="Unable to load your balance"
          description="We couldn't fetch your account balance. Please try again."
          primaryAction={{ label: 'Retry', onClick: refresh }}
          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}
          data-testid="withdraw-balance-error"
        />
      </main>
    );
  }

  // Error state for loading withdrawal methods
  if (methodsError) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Withdraw</h1>
        <ErrorState
          title="Unable to load withdrawal methods"
          description="We couldn't fetch the available withdrawal methods. Please try again."
          primaryAction={{ label: 'Retry', onClick: retryLoadMethods }}
          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}
          data-testid="withdraw-methods-error"
        />
      </main>
    );
  }

  // Loading state
  if (methodsLoading || balanceLoading) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Withdraw</h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </main>
    );
  }

  // Empty state for no available withdrawal methods
  if (availableMethods.length === 0) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Withdraw</h1>
        <EmptyState
          title="No withdrawal methods available"
          description="There are currently no payment methods available for withdrawals. Please check back later or contact support."
          icon={
            <svg
              className="h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
              />
            </svg>
          }
          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}
          data-testid="withdraw-no-methods"
        />
      </main>
    );
  }

  // Empty state for zero balance
  if (available === 0) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Withdraw</h1>
        <EmptyState
          title="No funds to withdraw"
          description="You don't have any balance available for withdrawal. Make a deposit first to fund your account."
          icon={
            <svg
              className="h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
              />
            </svg>
          }
          primaryAction={{ label: 'Make a deposit', href: '/deposit' }}
          data-testid="withdraw-no-funds"
        />
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Withdraw</h1>
      <div className="rounded-xl p-3 bg-gray-50">
        Current balance: <BalanceWithLocalEstimate usdAmount={available} inline />
      </div>
      <label htmlFor="amount-usd" className="block space-y-2">Amount (USD)</label>
      <input
        id="amount-usd"
        type="number"
        value={usd}
        onChange={(e) => setUsd(Number(e.target.value || 0))}
        className="border rounded-xl p-3 w-full"
        max={available}
      />
      {usd > available && (
        <p className="text-sm text-red-500">Amount exceeds available balance</p>
      )}
      <button 
        onClick={confirm} 
        disabled={status === 'PENDING' || usd <= 0 || usd > available} 
        className="rounded-xl p-3 shadow w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'PENDING' ? 'Processing…' : 'Confirm'}
      </button>
      {status === 'CONFIRMED' && <div className="text-green-600">Withdraw CONFIRMED</div>}
      {status === 'FAILED' && (
        <ErrorState
          title="Withdrawal failed"
          description="Your withdrawal could not be processed. Please try again."
          primaryAction={{ label: 'Try again', onClick: () => setStatus('IDLE') }}
          className="py-6"
          data-testid="withdraw-failed-state"
        />
      )}
    </main>
  );
}
