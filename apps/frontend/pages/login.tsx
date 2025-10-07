'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { loginWithEmail } from '../lib/auth/magic';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await loginWithEmail(email);
    router.replace('/dashboard');
  };
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl shadow p-6">
        <h1 className="text-xl font-semibold">Log in</h1>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded-xl p-3"
        />
        <button disabled={busy} className="w-full rounded-xl p-3 shadow">
          {busy ? 'Signing in…' : 'Continue'}
        </button>
      </form>
    </main>
  );
}
