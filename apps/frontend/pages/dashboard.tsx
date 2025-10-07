'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserStore } from '../lib/state/user';

export default function DashboardPage() {
  const router = useRouter();
  const isAuthed = useUserStore((s) => s.isAuthed);
  const logout = useUserStore((s) => s.logout);

  useEffect(() => {
    if (!isAuthed) router.replace('/login');
  }, [isAuthed, router]);

  if (!isAuthed) return <div className="p-6">Redirecting…</div>;

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <span className="font-semibold">Hedgr</span>
        <button onClick={() => { logout(); router.replace('/login'); }} className="rounded-xl p-2 shadow">Sign out</button>
      </header>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Welcome to your Hedgr dashboard!</p>
      </div>
    </div>
  );
}
