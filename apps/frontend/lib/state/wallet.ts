'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type WalletStore = {
  usdBalance: number;
  creditUSD: (amount: number) => void;
  debitUSD: (amount: number) => void;
  reset: () => void;
};

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
      creditUSD: (amt) => set({ usdBalance: +(get().usdBalance + amt).toFixed(2) }),
      debitUSD: (amt) => set({ usdBalance: +(get().usdBalance - amt).toFixed(2) }),
      reset: () => set({ usdBalance: 0 }),
    }),
    { name: 'hedgr:wallet', storage: createJSONStorage(() => (typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage))) }
  )
);
