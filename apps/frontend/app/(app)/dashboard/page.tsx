'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { EngineAllocationBands } from './EngineAllocationBands';
import { EnginePostureHeader } from './EnginePostureHeader';
import { useBalance } from '../../../lib/hooks/useBalance';
import { defiAdapter } from '../../../lib/defi';
import { useLedgerStore } from '../../../lib/state/ledger';
import { EmptyState, ErrorState } from '@hedgr/ui';
import { BalanceWithLocalEstimate, PolicyDisclosure } from '../../../components';
import { useEngineState } from '../../../lib/engine/useEngineState';
import { usePolicy } from '../../../lib/policy/usePolicy';
import { txToLifecycle, type TxLifecycle } from '../../../lib/tx';

function formatActivityDayLabel(timestamp: number): string {
  const date = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function activityTitle(tx: TxLifecycle): string {
  return tx.type === 'DEPOSIT' ? 'Deposit' : 'Withdrawal';
}

export default function DashboardPage() {
  const { total, available, pending, isLoading, error, currency, refresh } = useBalance();
  const engineState = useEngineState();
  const { isFeatureEnabled } = usePolicy();
  const transactions = useLedgerStore((s) => s.transactions);
  const [apy, setApy] = useState<number | null>(null);
  const [apyError, setApyError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    defiAdapter.getNetApy()
      .then(setApy)
      .catch(() => setApyError('Unable to load APY'));
  }, []);

  useEffect(() => { setReady(true); }, []);

  const hasNoTransactions = transactions.length === 0;
  const isFirstTimeUser = ready && hasNoTransactions && available === 0 && !isLoading;

  const recentActivity = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => b.created_at - a.created_at);
    return sorted.slice(0, 3).map(txToLifecycle);
  }, [transactions]);

  const balanceHero = (
    <section className="space-y-1" aria-labelledby="dashboard-total-balance-label">
      <p
        id="dashboard-total-balance-label"
        className="text-xs font-medium uppercase tracking-wide text-slate-500"
      >
        Total balance
      </p>
      {isLoading ? (
        <div className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-4xl">
          …
        </div>
      ) : (
        <BalanceWithLocalEstimate
          usdAmount={ready ? total : 0}
          data-testid="usd-balance"
          className="text-3xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-4xl"
        />
      )}
      {ready && !isLoading && total !== available ? (
        <p className="pt-1 text-sm text-slate-500">
          Available now:{' '}
          <span className="font-medium text-slate-700 tabular-nums">
            ${available.toFixed(2)}
          </span>
          {pending !== 0 ? (
            <span className="text-slate-400">
              {' '}
              · Pending {pending > 0 ? '+' : ''}
              {pending.toFixed(2)} {currency}
            </span>
          ) : null}
        </p>
      ) : null}
    </section>
  );

  if (error) {
    return (
      <main className="p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {balanceHero}
          <div className="mt-4">
            <EnginePostureHeader engineState={engineState} />
          </div>
          <div className="mt-6">
            <EngineAllocationBands engineState={engineState} />
          </div>
          <ErrorState
            title="Unable to load your balance"
            description="We couldn't fetch your account balance. Please try again."
            primaryAction={{ label: 'Retry', onClick: refresh }}
            data-testid="dashboard-error-state"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="p-6">
      <div className="mx-auto max-w-2xl">
        {balanceHero}

        <div className="mt-4">
          <EnginePostureHeader engineState={engineState} />
        </div>

        {isFirstTimeUser && (
          <div
            className="mt-5 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
            data-testid="dashboard-empty-state"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900">Welcome to Hedgr!</h2>
                <p className="mt-1 text-sm text-gray-600">
                  Get started by making your first deposit. Your balance and transaction history will appear here once you begin.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="/deposit"
                    className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                  >
                    Make your first deposit
                  </a>
                  <a
                    href="/settings"
                    className="inline-flex items-center rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100"
                  >
                    Learn how it works
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isFirstTimeUser && !hasNoTransactions && (
          <section className="mt-6 border-t border-slate-200/80 pt-6" aria-labelledby="dashboard-recent-activity-heading">
            <div className="flex items-baseline justify-between gap-3">
              <h2
                id="dashboard-recent-activity-heading"
                className="text-base font-semibold tracking-tight text-slate-900"
              >
                Recent activity
              </h2>
              <Link
                href="/activity"
                className="shrink-0 text-sm font-medium text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-slate-200/80 border-t border-slate-200/80">
              {recentActivity.map((tx) => (
                <li key={tx.id} className="flex items-baseline justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900">{activityTitle(tx)}</p>
                    <p className="text-sm text-slate-500">{formatActivityDayLabel(tx.createdAt)}</p>
                  </div>
                  <p
                    className={`shrink-0 tabular-nums text-sm font-semibold ${
                      tx.type === 'DEPOSIT' ? 'text-emerald-700' : 'text-slate-800'
                    }`}
                  >
                    {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amountUSD.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-6">
          <EngineAllocationBands engineState={engineState} />
        </div>

        {isFeatureEnabled('earn') && (
          <div className="mt-5 max-w-sm">
            <div
              className="rounded-xl border border-slate-200/70 bg-white/80 p-3 shadow-sm"
              data-testid="dashboard-earn-tile"
            >
              <div className="text-xs font-medium text-slate-500">APY (context)</div>
              {apyError ? (
                <div className="mt-1 text-xs text-red-600">{apyError}</div>
              ) : (
                <div className="mt-1 text-xl font-semibold tabular-nums text-slate-800">
                  {apy !== null ? `${(apy * 100).toFixed(2)}%` : '—'}
                </div>
              )}
            </div>
          </div>
        )}

        {!isFirstTimeUser && hasNoTransactions && (
          <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Recommended Actions</h2>
            <EmptyState
              title="No recommended actions"
              description="You're all caught up! Check back later for personalized recommendations."
              className="py-8"
              data-testid="dashboard-no-actions"
            />
          </div>
        )}

        <div className="mt-8">
          <PolicyDisclosure />
        </div>
      </div>
    </main>
  );
}
