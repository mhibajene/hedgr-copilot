'use client';
import { useUserStore } from '../state/user';
import { getAuthMode } from './mode';

export async function loginWithEmail(email: string): Promise<{ ok: true }> {
  if (getAuthMode() !== 'mock') {
    throw new Error('Auth mode not implemented - use magic.client.ts for Magic auth');
  }
  await new Promise((r) => setTimeout(r, 150));
  useUserStore.getState().login(email);
  return { ok: true };
}
