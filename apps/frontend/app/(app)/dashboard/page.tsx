'use client';

import { useEffect, useState } from 'react';

import { useWalletStore } from '../../../lib/state/wallet';

import { defiAdapter } from '../../../lib/defi';

export default function DashboardPage() {
  const balance = useWalletStore((s) => s.usdBalance);
  const [apy, setApy] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { defiAdapter.getNetApy().then(setApy); }, []);

  useEffect(() => { setReady(true); }, []); // ensure client hydration complete

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl shadow p-4">
          <div className="text-sm opacity-70">USD Balance</div>
          {/* Always render the test id (even before ready) */}
          <div
            className="text-3xl font-bold"
            data-testid="usd-balance"
            aria-label="USD Balance amount"
          >
            ${ready ? balance.toFixed(2) : '0.00'}
          </div>
        </div>
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

