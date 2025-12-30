'use client';

import { useEffect, useState } from 'react';
import { useBalance } from '../../../lib/hooks/useBalance';
import { defiAdapter } from '../../../lib/defi';

export default function DashboardPage() {
  const { total, available, pending, isLoading, currency } = useBalance();
  const [apy, setApy] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { defiAdapter.getNetApy().then(setApy); }, []);

  useEffect(() => { setReady(true); }, []); // ensure client hydration complete

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl shadow p-4">
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
          <div className="rounded-2xl shadow p-4">
            <div className="text-sm opacity-70">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">
              {pending > 0 ? '+' : ''}{pending.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{currency}</div>
          </div>
        )}
        {total !== available && (
          <div className="rounded-2xl shadow p-4">
            <div className="text-sm opacity-70">Total (incl. pending)</div>
            <div className="text-3xl font-bold text-gray-600">
              ${total.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{currency}</div>
          </div>
        )}
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm opacity-70">APY</div>
          <div className="text-3xl font-bold">
            {apy !== null ? `${(apy * 100).toFixed(2)}%` : '—'}
          </div>
        </div>
      </div>
    </main>
  );
}
