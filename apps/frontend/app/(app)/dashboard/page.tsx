'use client';

import { useEffect, useState } from 'react';
import { useBalance } from '../../../lib/hooks/useBalance';
import { defiAdapter } from '../../../lib/defi';
import { useLedgerStore } from '../../../lib/state/ledger';
import { EmptyState, ErrorState } from '@hedgr/ui';

export default function DashboardPage() {
  const { total, available, pending, isLoading, error, currency, refresh } = useBalance();
  const transactions = useLedgerStore((s) => s.transactions);
  const [apy, setApy] = useState<number | null>(null);
  const [apyError, setApyError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    defiAdapter.getNetApy()
      .then(setApy)
      .catch(() => setApyError('Unable to load APY'));
  }, []);

  useEffect(() => { setReady(true); }, []); // ensure client hydration complete

  // Determine if this is a first-time user with no data
  const hasNoTransactions = transactions.length === 0;
  const isFirstTimeUser = ready && hasNoTransactions && available === 0 && !isLoading;

  // Handle balance loading error
  if (error) {
    return (
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <ErrorState
          title="Unable to load your balance"
          description="We couldn't fetch your account balance. Please try again."
          primaryAction={{ label: 'Retry', onClick: refresh }}
          data-testid="dashboard-error-state"
        />
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      
      {/* Welcome banner for first-time users - shown alongside balance */}
      {isFirstTimeUser && (
        <div 
          className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6"
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
              <p className="text-sm text-gray-600 mt-1">
                Get started by making your first deposit. Your balance and transaction history will appear here once you begin.
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="/deposit"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Make your first deposit
                </a>
                <a
                  href="/settings"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Learn how it works
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Balance cards - always shown */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl shadow p-4 bg-white">
          <div className="text-sm opacity-70">Available Balance</div>
          <div
            className="text-3xl font-bold"
            data-testid="usd-balance"
            aria-label="USD Balance amount"
          >
            {isLoading ? '...' : `$${ready ? available.toFixed(2) : '0.00'}`}
          </div>
          <div className="text-xs text-gray-500 mt-1">{currency}</div>
        </div>
        {pending !== 0 && (
          <div className="rounded-2xl shadow p-4 bg-white">
            <div className="text-sm opacity-70">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">
              {pending > 0 ? '+' : ''}{pending.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{currency}</div>
          </div>
        )}
        {total !== available && (
          <div className="rounded-2xl shadow p-4 bg-white">
            <div className="text-sm opacity-70">Total (incl. pending)</div>
            <div className="text-3xl font-bold text-gray-600">
              ${total.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{currency}</div>
          </div>
        )}
        <div className="rounded-2xl shadow p-4 bg-white">
          <div className="text-sm opacity-70">APY</div>
          {apyError ? (
            <div className="text-sm text-red-500 mt-2">{apyError}</div>
          ) : (
            <div className="text-3xl font-bold">
              {apy !== null ? `${(apy * 100).toFixed(2)}%` : '—'}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Actions - show empty state when applicable */}
      {!isFirstTimeUser && hasNoTransactions && (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recommended Actions</h2>
          <EmptyState
            title="No recommended actions"
            description="You're all caught up! Check back later for personalized recommendations."
            className="py-8"
            data-testid="dashboard-no-actions"
          />
        </div>
      )}
    </main>
  );
}
