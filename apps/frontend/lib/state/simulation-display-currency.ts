'use client';

import { useSyncExternalStore } from 'react';

export const SIMULATION_DISPLAY_CURRENCY_KEY = 'hedgr.simulation.display-currency';
export const DEFAULT_SIMULATION_DISPLAY_CURRENCY = 'ZMW';

/** D-132 fixed simulation fixtures, also used by the bounded synthetic Deposit adapter; never live rates. */
export const SIMULATION_DISPLAY_CURRENCIES = [
  { code: 'ZMW', name: 'Zambian kwacha', unitsPerUsd: 20 },
  { code: 'KES', name: 'Kenyan shilling', unitsPerUsd: 130 },
  { code: 'NGN', name: 'Nigerian naira', unitsPerUsd: 1500 },
  { code: 'GHS', name: 'Ghanaian cedi', unitsPerUsd: 15 },
  { code: 'PHP', name: 'Philippine peso', unitsPerUsd: 56 },
] as const;

export type SimulationDisplayCurrency = typeof SIMULATION_DISPLAY_CURRENCIES[number]['code'];

export function isSimulationDisplayCurrency(value: unknown): value is SimulationDisplayCurrency {
  return SIMULATION_DISPLAY_CURRENCIES.some(({ code }) => code === value);
}

export function getSimulationDisplayRate(currency: SimulationDisplayCurrency): number {
  return SIMULATION_DISPLAY_CURRENCIES.find(({ code }) => code === currency)!.unitsPerUsd;
}

export function formatSimulationDisplayEstimate(usd: number, currency: SimulationDisplayCurrency): string {
  const amount = (usd * getSimulationDisplayRate(currency)).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `≈ ${currency} ${amount} display estimate`;
}

let memoryCurrency: SimulationDisplayCurrency = DEFAULT_SIMULATION_DISPLAY_CURRENCY;
let memoryOnly = false;
const listeners = new Set<() => void>();
const serverSnapshot = (): SimulationDisplayCurrency => DEFAULT_SIMULATION_DISPLAY_CURRENCY;

export function getSimulationDisplayCurrency(): SimulationDisplayCurrency {
  if (typeof window === 'undefined') return DEFAULT_SIMULATION_DISPLAY_CURRENCY;
  if (memoryOnly) return memoryCurrency;
  try {
    const stored = window.localStorage.getItem(SIMULATION_DISPLAY_CURRENCY_KEY);
    return isSimulationDisplayCurrency(stored) ? stored : DEFAULT_SIMULATION_DISPLAY_CURRENCY;
  } catch {
    return memoryCurrency;
  }
}

export function setSimulationDisplayCurrency(value: unknown): void {
  if (!isSimulationDisplayCurrency(value) || typeof window === 'undefined') return;
  memoryCurrency = value;
  try {
    window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, value);
    memoryOnly = false;
  } catch {
    // A blocked or full store must not block the walkthrough.
    memoryOnly = true;
  }
  // Local subscribers only: never dispatch a market, ledger or transaction event.
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SIMULATION_DISPLAY_CURRENCY_KEY || event.key === null) {
      memoryOnly = false;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

const subscribeDisabled = () => () => {};

export function useSimulationDisplayCurrency(enabled = true): SimulationDisplayCurrency {
  return useSyncExternalStore(
    enabled ? subscribe : subscribeDisabled,
    enabled ? getSimulationDisplayCurrency : serverSnapshot,
    serverSnapshot,
  );
}
