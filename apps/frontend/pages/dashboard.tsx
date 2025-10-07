'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '../lib/state/user';
import { useWalletStore } from '../lib/state/wallet';
import { mockDefi } from '../lib/defi/mock';

export default function DashboardPage() {
  const router = useRouter();
  const isAuthed = useUserStore((s) => s.isAuthed);
  const logout = useUserStore((s) => s.logout);
  const balance = useWalletStore((s) => s.usdBalance);
  const [apy, setApy] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthed) router.replace('/login');
  }, [isAuthed, router]);

  useEffect(() => { 
    mockDefi.getNetApy().then(setApy); 
  }, []);

  if (!isAuthed) return <div className="p-6">Redirecting…</div>;

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <span className="font-semibold">Hedgr</span>
        <button onClick={() => { logout(); router.replace('/login'); }} className="rounded-xl p-2 shadow">Sign out</button>
      </header>
      <main className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl shadow p-4">
            <div className="text-sm opacity-70">USD Balance</div>
            <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
          </div>
          <div className="rounded-2xl shadow p-4">
            <div className="text-sm opacity-70">APY</div>
            <div className="text-3xl font-bold">{apy !== null ? `${(apy * 100).toFixed(2)}%` : '—'}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
