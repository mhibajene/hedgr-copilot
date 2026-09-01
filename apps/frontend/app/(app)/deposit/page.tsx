'use client';

import Link from 'next/link';
import { Suspense, useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { postDeposit } from '../../../lib/deposits/client';
import { LOCAL_STUB_DEPOSIT_FAILURE_REVIEW_HINTS } from '../../../lib/deposits/local-stub-deposit-review-hints';
import { isLocalDevSimulationSeamEnabled } from '../../../lib/dev/local-simulation-guard';
import { useBalance } from '../../../lib/hooks/useBalance';
import { useLedgerStore } from '../../../lib/state/ledger';
import { useWalletStore } from '../../../lib/state/wallet';
import { getBalanceMode } from '../../../lib/state/balance.mode';
import { getEnvironmentMode } from '../../../lib/env/mode';
import { useLatestFx } from '../../../lib/hooks/useLatestFx';
import { resolveMarket, resolveLocalCurrencyCode } from '../../../config/market';
import { EmptyState, ErrorState } from '@hedgr/ui';
import { FxRateBlock, MarketDataContinuityPanel, TxReviewSimulatorBanner } from '../../../components';
import { CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER } from '../../../lib/fx/market-data-continuity-copy';
import {
  resolveTxReviewSimulatorFlags,
  isTxReviewSeamActive,
} from '../../../lib/tx';
import {
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
  getSyntheticJourneyHref,
  getSyntheticJourneyRate,
  isSyntheticJourneyPrimaryCondition,
  isSyntheticJourneyUnavailableDataScenario,
} from '../../../lib/state/synthetic-journey';

interface PaymentMethod {
  id: string;
  name: string;
  available: boolean;
}

const STUB_CONFIRM_DELAY_MS = Number(process.env.NEXT_PUBLIC_MOMO_CONFIRM_DELAY_MS ?? '1500');

function DepositPageContent() {
  const searchParams = useSearchParams();
  const search = useMemo(() => {
    const s = searchParams?.toString() ?? '';
    return s ? `?${s}` : undefined;
  }, [searchParams]);

  const txReviewFlags = useMemo(() => resolveTxReviewSimulatorFlags(search), [search]);
  const reviewSeamActive = isTxReviewSeamActive(txReviewFlags);
  const syntheticJourneyActive =
    isSyntheticJourneyPrimaryCondition(search) &&
    searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===
      CLASS_A_VAL_002_JOURNEY_VALUE;
  const unavailableDataScenario = isSyntheticJourneyUnavailableDataScenario(search);
  const simulatedEnvironment = getEnvironmentMode() !== 'live';
  const productSimulationActive = syntheticJourneyActive || simulatedEnvironment;

  const { refresh } = useBalance();
  const appendTx = useLedgerStore((s) => s.append);
  const confirmTx = useLedgerStore((s) => s.confirm);

  const creditWallet = useWalletStore((s) => s.creditUSD);

  const market = resolveMarket();
  const quote = resolveLocalCurrencyCode(market);
  const fx = useLatestFx(`USD${quote}`);
  const backendRate = fx.status === 'success' && fx.data ? fx.data.rate : null;
  const rate = syntheticJourneyActive
    ? getSyntheticJourneyRate(quote)
    : unavailableDataScenario
      ? null
      : backendRate;

  const [amountLocalStr, setAmountLocalStr] = useState<string>('100');
  const [txnRef, setTxnRef] = useState<string | null>(null);
  const [usdToCredit, setUsdToCredit] = useState(0);
  const [status, setStatus] = useState<'IDLE' | 'PENDING' | 'CONFIRMED' | 'FAILED'>('IDLE');

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsError, setMethodsError] = useState<string | null>(null);

  const parsedAmountLocal = amountLocalStr === '' ? null : Number(amountLocalStr);
  const amountLocalNum =
    parsedAmountLocal !== null && Number.isFinite(parsedAmountLocal)
      ? parsedAmountLocal
      : null;
  const hasPositiveAmount = amountLocalNum !== null && amountLocalNum > 0;
  const amountIsInvalid = amountLocalStr !== '' && !hasPositiveAmount;
  const usdPreview =
    hasPositiveAmount && rate !== null ? +(amountLocalNum / rate).toFixed(2) : null;

  const stubConfirmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canConfirmWithoutRate = txReviewFlags.bypassFxForConfirm;
  const rateAllowsConfirm = rate !== null || canConfirmWithoutRate;

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

  useEffect(() => {
    if (!txnRef || status !== 'PENDING') return;
    stubConfirmTimerRef.current = setTimeout(() => {
      const mode = getBalanceMode();
      confirmTx(txnRef);
      if (mode === 'wallet') {
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
    if (!rateAllowsConfirm) return;

    const usdForStub = rate !== null && usdPreview !== null ? usdPreview : 0;
    setStatus('PENDING');
    setUsdToCredit(usdForStub);

    const txn_ref = crypto.randomUUID();
    if (!syntheticJourneyActive && !simulatedEnvironment) {
      try {
        await postDeposit({ txn_ref, amount_zmw: amountLocalNum });
      } catch {
        setStatus('FAILED');
        return;
      }
    }

    const now = Date.now();
    // When rate is missing, zeros are technical simulation placeholders only (MC-S2-021);
    // UI must keep conversion preview unavailable — not economic truth.
    const amountUsdLedger = rate !== null && usdPreview !== null ? usdPreview : 0;
    const fxRateLedger = rate !== null ? rate : 0;
    appendTx({
      txn_ref,
      type: 'deposit',
      status: 'pending',
      amount_zmw: amountLocalNum,
      amount_usd: amountUsdLedger,
      fx_rate: fxRateLedger,
      created_at: now,
      updated_at: now,
    });

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
    status === 'PENDING' ||
    !hasPositiveAmount ||
    !rateAllowsConfirm;

  if (methodsError) {
    return (
      <main className="mx-auto max-w-xl space-y-4 p-6">
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
      <main className="mx-auto max-w-xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold">Deposit</h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </main>
    );
  }

  if (availableMethods.length === 0) {
    return (
      <main className="mx-auto max-w-xl space-y-4 p-6">
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
    <main className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Deposit</h1>
      {reviewSeamActive ? (
        <TxReviewSimulatorBanner data-testid="deposit-tx-review-simulator-banner" />
      ) : null}

      {syntheticJourneyActive ? (
        <section
          className="rounded-xl border border-hedgr-300 bg-hedgr-100 p-4 text-hedgr-800"
          data-testid="deposit-synthetic-condition"
          aria-label="Simulated deposit condition"
        >
          <p className="text-sm font-semibold">
            Step 2 · see how the simulated position changes
          </p>
          <p className="mt-1 text-sm leading-relaxed text-hedgr-dark">
            Enter an amount to see the change in context. Confirming records only
            a simulated deposit. No account is charged and no real money moves.
          </p>
        </section>
      ) : null}

      {syntheticJourneyActive ? (
        <div
          className="rounded-xl border border-hedgr-200 bg-white p-3 text-sm text-hedgr-dark"
          data-testid="deposit-fx-block"
        >
          Simulated example rate: 1 USD = {rate?.toFixed(2)} {quote}
        </div>
      ) : unavailableDataScenario || fx.status === 'error' ? (
        <MarketDataContinuityPanel
          route="deposit"
          onRetryFx={fx.retry}
          data-testid="deposit-market-data-continuity"
        />
      ) : (
        <FxRateBlock fx={fx} quoteLabel={quote} data-testid="deposit-fx-block" />
      )}

      {!syntheticJourneyActive && simulatedEnvironment ? (
        <section
          className="rounded-xl border border-hedgr-200 bg-hedgr-100/40 p-4 text-hedgr-800"
          data-testid="deposit-simulation-context"
          aria-label="Simulated deposit"
        >
          <p className="text-sm font-semibold">Add to the simulated position</p>
          <p className="mt-1 text-sm leading-relaxed text-hedgr-dark">
            Enter an amount to preview the change. Confirming records a local
            simulated deposit only; no account is charged and no real money moves.
          </p>
        </section>
      ) : null}

      <div className="block space-y-2">
        <label htmlFor="deposit-amount">
          {productSimulationActive ? 'Amount to simulate' : 'Amount'} ({quote})
        </label>
        <input
          id="deposit-amount"
          type="text"
          inputMode="numeric"
          value={amountLocalStr}
          onChange={(e) => {
            const next = e.target.value;
            if (/^-?\d*$/.test(next)) setAmountLocalStr(next);
          }}
          onBlur={() => {
            if (!hasPositiveAmount || amountLocalNum === null) return;
            const parsed = Math.trunc(amountLocalNum);
            setAmountLocalStr(String(parsed));
          }}
          data-testid="deposit-amount"
          aria-label={productSimulationActive ? 'Simulated deposit amount' : 'Deposit amount'}
          aria-invalid={amountIsInvalid}
          aria-describedby={amountIsInvalid ? 'deposit-amount-error' : undefined}
          className="border rounded-xl p-3 w-full"
        />
        {amountIsInvalid ? (
          <p id="deposit-amount-error" className="text-sm text-hedgr-800" role="alert">
            Enter a deposit amount greater than 0 {quote}.
          </p>
        ) : null}
      </div>
      <div
        className="rounded-xl border border-hedgr-100 bg-hedgr-100/40 p-3 text-sm text-hedgr-dark"
        data-testid="deposit-conversion-preview"
      >
        {rate !== null && usdPreview !== null && amountLocalNum !== null ? (
          productSimulationActive ? (
            <div className="space-y-1" data-testid="deposit-balance-change">
              <p className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">
                Simulated balance change
              </p>
              <p>
                The simulation shows {amountLocalNum.toFixed(0)} {quote} as{' '}
                <strong className="tabular-nums text-hedgr-800">
                  +${usdPreview.toFixed(2)}
                </strong>
                .
              </p>
              <p className="text-hedgr-500">
                Confirming adds this amount to the simulated balance.
              </p>
            </div>
          ) : (
            <>
              FX Preview: <strong>${usdPreview.toFixed(2)}</strong>
            </>
          )
        ) : (
          <span className="text-gray-600">{CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER}</span>
        )}
      </div>
      <button
        onClick={confirm}
        disabled={isConfirmDisabled}
        className="w-full rounded-xl bg-[#1F2747] p-3 text-white transition-colors hover:bg-[#36447C] focus:outline-none focus:ring-2 focus:ring-[#4658A0] focus:ring-offset-2 disabled:cursor-not-allowed disabled:border disabled:border-[#A6B0D8] disabled:bg-[#CAD0E8] disabled:text-[#1F2747]"
      >
        {status === 'PENDING' ? 'Processing…' : 'Confirm'}
      </button>
      {status === 'CONFIRMED' && (
        <section
          className="rounded-xl border border-hedgr-200 bg-white p-4 text-hedgr-800"
          data-testid="deposit-confirmation-region"
        >
          <p className="font-semibold" data-testid="deposit-confirmed">
            {productSimulationActive ? 'Simulated deposit recorded' : 'Deposit confirmed'}
          </p>
          {productSimulationActive ? (
            <>
              <p className="mt-1 text-sm leading-relaxed text-hedgr-dark">
                The simulated balance increased by{' '}
                <strong className="tabular-nums">${usdToCredit.toFixed(2)}</strong>.
                Activity now shows the matching simulated deposit. No account was
                charged and no real money moved.
              </p>
              <Link
                href={
                  syntheticJourneyActive
                    ? getSyntheticJourneyHref('/withdraw')
                    : '/withdraw'
                }
                className="mt-3 inline-flex rounded-xl bg-hedgr-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-hedgr-600 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
              >
                Continue to simulated withdrawal
              </Link>
            </>
          ) : null}
        </section>
      )}
      {status === 'FAILED' && (
        <div className="space-y-3">
          <ErrorState
            title="Deposit failed"
            description="Your deposit could not be processed. Please try again."
            primaryAction={{ label: 'Try again', onClick: () => setStatus('IDLE') }}
            className="py-6"
            data-testid="deposit-failed-state"
          />
          {isLocalDevSimulationSeamEnabled() ? (
            <aside
              className="rounded-lg border border-amber-200/90 bg-amber-50/90 p-3 text-xs text-gray-800"
              data-testid="deposit-local-stub-failure-hints"
              aria-label="Local review troubleshooting hints"
            >
              <p className="mb-2 font-medium text-gray-700">Local review only</p>
              <ul className="list-disc space-y-1 pl-4">
                {LOCAL_STUB_DEPOSIT_FAILURE_REVIEW_HINTS.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      )}
      {syntheticJourneyActive ? (
        <p className="text-sm text-hedgr-dark">
          Optional trust check:{' '}
          <Link
            href={getSyntheticJourneyHref('/deposit', { unavailableData: true })}
            className="font-medium text-hedgr-primary underline underline-offset-2 hover:text-hedgr-600"
          >
            View unavailable-rate example
          </Link>
          .
        </p>
      ) : unavailableDataScenario ? (
        <Link
          href={getSyntheticJourneyHref('/deposit')}
          className="inline-flex text-sm font-medium text-[#1F2747] underline underline-offset-2 hover:text-[#36447C]"
        >
          Return to the simulated deposit
        </Link>
      ) : null}
    </main>
  );
}

function DepositPageFallback() {
  return (
    <main className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Deposit</h1>
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    </main>
  );
}

export default function DepositPage() {
  return (
    <Suspense fallback={<DepositPageFallback />}>
      <DepositPageContent />
    </Suspense>
  );
}
