'use client';

import { useState, useEffect } from 'react';
import { momoMock } from '../../../lib/payments/momo.mock';
import { useBalance } from '../../../lib/hooks/useBalance';
import { useLedgerStore } from '../../../lib/state/ledger';
import { useWalletStore } from '../../../lib/state/wallet';
import { getBalanceMode } from '../../../lib/state/balance.mode';
import { useFxRate, isFxRateAvailable } from '../../../lib/fx/FxRateContext';
import { resolveMarket, resolveLocalCurrencyCode } from '../../../config/market';
import { EmptyState, ErrorState } from '@hedgr/ui';

interface PaymentMethod {
  id: string;
  name: string;
  available: boolean;
}

export default function DepositPage() {
  const { refresh } = useBalance();
  const appendTx = useLedgerStore((s) => s.append);
  const confirmTx = useLedgerStore((s) => s.confirm);
  const failTx = useLedgerStore((s) => s.fail);
  
  // Legacy wallet store for backward compatibility
  const creditWallet = useWalletStore((s) => s.creditUSD);
  
  // FX SSoT
  const fx = useFxRate();
  const market = resolveMarket();
  const fallbackQuote = resolveLocalCurrencyCode(market);
  const quote = fx.quote ?? fallbackQuote;
  const rate = isFxRateAvailable(fx) ? fx.rate : null;
  
  // Amount input as string for better UX
  const [amountLocalStr, setAmountLocalStr] = useState<string>('100');
  const [txId, setTxId] = useState<string | null>(null);
  const [usdToCredit, setUsdToCredit] = useState(0);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED' | 'FAILED'>('IDLE');
  
  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsError, setMethodsError] = useState<string | null>(null);

  // Compute preview deterministically
  // TODO: Store non-ZMW local amounts later (e.g., KES, GHS) when multi-market support lands
  const amountLocalNum = amountLocalStr === '' ? null : parseInt(amountLocalStr, 10);
  const usdPreview = (amountLocalNum !== null && rate !== null) ? +(amountLocalNum / rate).toFixed(2) : 0;

  // Fetch payment methods
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setMethodsLoading(true);
      setMethodsError(null);
      try {
        // Simulate fetching payment methods
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 300));
        setPaymentMethods([
          { id: 'momo', name: 'Mobile Money (MTN/Airtel)', available: true },
        ]);
      } catch {
        setMethodsError('Unable to load payment methods');
      } finally {
        setMethodsLoading(false);
      }
    };
    fetchPaymentMethods();
  }, []);

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
    // Guard: ensure valid amount and FX rate available
    if (amountLocalNum === null || amountLocalNum <= 0) return;
    if (rate === null) return;
    
    setStatus('PENDING');
    setUsdToCredit(usdPreview);
    
    const tx = await momoMock.createDeposit(amountLocalNum);
    
    const mode = getBalanceMode();
    if (mode === 'ledger') {
      // SSoT: Record pending deposit in ledger
      // Note: appendTx guards against duplicates internally
      appendTx({
        id: tx.id,
        type: 'DEPOSIT',
        amountUSD: usdPreview,
        amountZMW: quote === 'ZMW' ? amountLocalNum : undefined,
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
      setPaymentMethods([
        { id: 'momo', name: 'Mobile Money (MTN/Airtel)', available: true },
      ]);
      setMethodsLoading(false);
    }, 300);
  };

  const availableMethods = paymentMethods.filter((m) => m.available);

  // Confirm button disabled logic
  const isConfirmDisabled = status === 'PENDING' || amountLocalNum === null || amountLocalNum <= 0 || rate === null;

  // Error state for loading payment methods
  if (methodsError) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Deposit</h1>
        <ErrorState
          title="Unable to load payment methods"
          description="We couldn't fetch the available deposit methods. Please try again."
          primaryAction={{ label: 'Retry', onClick: retryLoadMethods }}
          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}
          data-testid="deposit-methods-error"
        />
      </main>
    );
  }

  // Loading state
  if (methodsLoading) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Deposit</h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </main>
    );
  }

  // Empty state for no available payment methods
  if (availableMethods.length === 0) {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Deposit</h1>
        <EmptyState
          title="No deposit methods available"
          description="There are currently no payment methods available for deposits. Please check back later or contact support."
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
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
              />
            </svg>
          }
          secondaryAction={{ label: 'Go to Dashboard', href: '/dashboard' }}
          data-testid="deposit-no-methods"
        />
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4 max-w-xl">
      <h1 className="text-2xl font-semibold">Deposit</h1>
      
      {/* FX Rate display */}
      {fx.isLoading ? (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-sm">
          Loading rate...
        </div>
      ) : rate !== null && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
          1 USD = {rate} {quote}
        </div>
      )}
      
      <div className="block space-y-2">
        <label htmlFor="deposit-amount">Amount ({quote})</label>
        <input
          id="deposit-amount"
          type="text"
          inputMode="numeric"
          value={amountLocalStr}
          onChange={(e) => {
            const next = e.target.value;
            if (next === '' || /^\d*$/.test(next)) setAmountLocalStr(next);
          }}
          onBlur={() => {
            if (amountLocalStr === '') return;
            const parsed = parseInt(amountLocalStr, 10);
            if (!Number.isFinite(parsed)) return; // Never set "NaN"
            setAmountLocalStr(String(parsed));
          }}
          data-testid="deposit-amount"
          aria-label="Deposit amount"
          className="border rounded-xl p-3 w-full"
        />
      </div>
      <div className="rounded-xl p-3 bg-gray-50">FX Preview: <strong>${usdPreview.toFixed(2)}</strong></div>
      <button 
        onClick={confirm} 
        disabled={isConfirmDisabled} 
        className="rounded-xl p-3 shadow w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'PENDING' ? 'Processing…' : 'Confirm'}
      </button>
      {status === 'CONFIRMED' && <div className="text-green-600" data-testid="deposit-confirmed">Deposit CONFIRMED</div>}
      {status === 'FAILED' && (
        <ErrorState
          title="Deposit failed"
          description="Your deposit could not be processed. Please try again."
          primaryAction={{ label: 'Try again', onClick: () => setStatus('IDLE') }}
          className="py-6"
          data-testid="deposit-failed-state"
        />
      )}
    </main>
  );
}
