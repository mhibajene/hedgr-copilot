'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthMode } from '@/lib/auth/mode';
import { loginWithEmail as loginWithEmailMock } from '@/lib/auth/magic';
import { loginWithEmail as loginWithEmailMagic } from '@/lib/auth/magic.client';
import { useUserStore } from '@/lib/state/user';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const authMode = getAuthMode();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      if (authMode === 'mock') {
        // Mock login flow
        await loginWithEmailMock(email);
        router.replace('/dashboard');
      } else {
        // Magic login flow
        const didToken = await loginWithEmailMagic(email);
        
        // Verify token with backend
        const verifyResponse = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ didToken }),
        });

        if (!verifyResponse.ok) {
          const errorData = await verifyResponse.json();
          throw new Error(errorData.error || 'Verification failed');
        }

        const { email: verifiedEmail } = await verifyResponse.json();
        
        // Set session in Zustand store
        useUserStore.getState().login(verifiedEmail);
        
        router.replace('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 rounded-2xl shadow p-6">
        <h1 className="text-xl font-semibold">Log in</h1>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
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

