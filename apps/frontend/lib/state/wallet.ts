'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type WalletStore = {
  usdBalance: number;
  creditUSD: (amount: number) => void;
  debitUSD: (amount: number) => void;
  reset: () => void;
};

function normalizeWalletBalance(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    return 0;
  }
  return +value.toFixed(2);
}

function isPositiveFiniteAmount(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

const memoryStorage: Storage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  key: () => null,
  length: 0,
};

export const useWalletStore = create<WalletStore>()(
  persist(
    (set, get) => ({
      usdBalance: 0,
      creditUSD: (amt) => {
        if (!isPositiveFiniteAmount(amt)) return;
        const current = normalizeWalletBalance(get().usdBalance);
        set({ usdBalance: normalizeWalletBalance(current + amt) });
      },
      debitUSD: (amt) => {
        if (!isPositiveFiniteAmount(amt)) return;
        const current = normalizeWalletBalance(get().usdBalance);
        set({ usdBalance: normalizeWalletBalance(Math.max(0, current - amt)) });
      },
      reset: () => set({ usdBalance: 0 }),
    }),
    {
      name: 'hedgr:wallet',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage)
      ),
      merge: (persistedState, currentState) => {
        const persistedBalance =
          persistedState && typeof persistedState === 'object'
            ? (persistedState as Partial<WalletStore>).usdBalance
            : 0;
        return {
          ...currentState,
          usdBalance: normalizeWalletBalance(persistedBalance),
        };
      },
    }
  )
);
