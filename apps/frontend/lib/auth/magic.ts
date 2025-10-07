'use client';
import { useUserStore } from '../state/user';

export type AuthMode = 'mock';
export function getAuthMode(): AuthMode { return 'mock'; }

export async function loginWithEmail(email: string): Promise<{ ok: true }>
{
  if (getAuthMode() !== 'mock') throw new Error('Auth mode not implemented');
  await new Promise((r) => setTimeout(r, 150));
  useUserStore.getState().login(email);
  return { ok: true };
}
