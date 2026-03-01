'use client';

import { useState, useEffect, useRef } from 'react';
import { postDeposit } from '../../../lib/deposits/client';
import { useBalance } from '../../../lib/hooks/useBalance';
import { useLedgerStore } from '../../../lib/state/ledger';
import { useWalletStore } from '../../../lib/state/wallet';
import { getBalanceMode } from '../../../lib/state/balance.mode';
import { useLatestFx } from '../../../lib/hooks/useLatestFx';
import { resolveMarket, resolveLocalCurrencyCode } from '../../../config/market';
import { EmptyState, ErrorState } from '@hedgr/ui';
import { FxRateBlock } from '../../../components';

interface PaymentMethod {
  id: string;
  name: string;
  available: boolean;
}

const STUB_CONFIRM_DELAY_MS = Number(process.env.NEXT_PUBLIC_MOMO_CONFIRM_DELAY_MS ?? '1500');

export default function DepositPage() {
  const { refresh } = useBalance();
  const appendTx = useLedgerStore((s) => s.append);
  const confirmTx = useLedgerStore((s) => s.confirm);

  const creditWallet = useWalletStore((s) => s.creditUSD);

  const fx = useLatestFx('USDZMW');
  const market = resolveMarket();
  const quote = resolveLocalCurrencyCode(market);
  const rate = fx.status === 'success' && fx.data ? fx.data.rate : null;

  const [amountLocalStr, setAmountLocalStr] = useState<string>('100');
  const [txnRef, setTxnRef] = useState<string | null>(null);
  const [usdToCredit, setUsdToCredit] = useState(0);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED' | 'FAILED'>('IDLE');

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsError, setMethodsError] = useState<string | null>(null);

  const amountLocalNum = amountLocalStr === '' ? null : parseInt(amountLocalStr, 10);
  const usdPreview =
    amountLocalNum !== null && rate !== null ? +(amountLocalNum / rate).toFixed(2) : 0;

  const stubConfirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      setMethodsLoading(true);
      setMethodsError(null);
      try {
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

  // Stub: after POST success we simulate settlement so E2E/CI see CONFIRMED
  useEffect(() => {
    if (!txnRef || status !== 'PENDING') return;
    stubConfirmTimerRef.current = setTimeout(() => {
      const mode = getBalanceMode();
      if (mode === 'ledger') {
        confirmTx(txnRef);
      } else {
        creditWallet(usdToCredit);
        try {
          if (typeof window !== 'undefined') {
            const next = useWalletStore.getState().usdBalance;
            window.localStorage.setItem(
              'hedgr:wallet',
              JSON.stringify({ state: { usdBalance: +next.toFixed(2) }, version: 0 })
            );
          }
        } catch {
          void 0;
        }
      }
      refresh();
      setStatus('CONFIRMED');
    }, STUB_CONFIRM_DELAY_MS);
    return () => {
      if (stubConfirmTimerRef.current) clearTimeout(stubConfirmTimerRef.current);
    };
  }, [txnRef, status, usdToCredit, creditWallet, confirmTx, refresh]);

  const confirm = async () => {
    if (amountLocalNum === null || amountLocalNum <= 0) return;
    if (rate === null) return;

    setStatus('PENDING');
    setUsdToCredit(usdPreview);

    const txn_ref = crypto.randomUUID();
    try {
      await postDeposit({ txn_ref, amount_zmw: amountLocalNum });
    } catch {
      setStatus('FAILED');
      return;
    }

    const mode = getBalanceMode();
    if (mode === 'ledger') {
      const now = Date.now();
      appendTx({
        txn_ref,
        type: 'deposit',
        status: 'pending',
        amount_zmw: amountLocalNum,
        amount_usd: usdPreview,
        fx_rate: rate,
        created_at: now,
        updated_at: now,
      });
    }

    setTxnRef(txn_ref);
  };

  const retryLoadMethods = () => {
    setMethodsLoading(true);
    setMethodsError(null);
    setTimeout(() => {
      setPaymentMethods([
        { id: 'momo', name: 'Mobile Money (MTN/Airtel)', available: true },
      ]);
      setMethodsLoading(false);
    }, 300);
  };

  const availableMethods = paymentMethods.filter((m) => m.available);
  const isConfirmDisabled =
    status === 'PENDING' || amountLocalNum === null || amountLocalNum <= 0 || rate === null;

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

  if (fx.status === 'error') {
    return (
      <main className="p-6 space-y-4 max-w-xl">
        <h1 className="text-2xl font-semibold">Deposit</h1>
        <FxRateBlock fx={fx} quoteLabel={quote} data-testid="deposit-fx-error" />
      </main>
    );
  }

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

      <FxRateBlock fx={fx} quoteLabel={quote} data-testid="deposit-fx-block" />

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
            if (!Number.isFinite(parsed)) return;
            setAmountLocalStr(String(parsed));
          }}
          data-testid="deposit-amount"
          aria-label="Deposit amount"
          className="border rounded-xl p-3 w-full"
        />
      </div>
      <div className="rounded-xl p-3 bg-gray-50">
        FX Preview: <strong>${usdPreview.toFixed(2)}</strong>
      </div>
      <button
        onClick={confirm}
        disabled={isConfirmDisabled}
        className="rounded-xl p-3 shadow w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'PENDING' ? 'Processing…' : 'Confirm'}
      </button>
      {status === 'CONFIRMED' && (
        <div className="text-green-600" data-testid="deposit-confirmed">
          Deposit CONFIRMED
        </div>
      )}
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
