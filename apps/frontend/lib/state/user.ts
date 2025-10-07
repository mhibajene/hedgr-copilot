'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserSession = { email?: string; isAuthed: boolean };
export type UserStore = UserSession & { login: (email: string) => void; logout: () => void };

type StorageLike = {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
};

const memoryStorage: StorageLike = (() => {
  const mem: Record<string, string> = {};
  return {
    getItem: (n) => (n in mem ? mem[n] : null),
    setItem: (n, v) => { mem[n] = v; },
    removeItem: (n) => { delete mem[n]; },
  };
})();

const storageProvider = () => (typeof window !== 'undefined' ? window.localStorage : (memoryStorage as unknown as Storage));

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      email: undefined,
      isAuthed: false,
      login: (email) => set({ email, isAuthed: true }),
      logout: () => set({ email: undefined, isAuthed: false }),
    }),
    { name: 'hedgr:user', storage: createJSONStorage(storageProvider) }
  )
);
