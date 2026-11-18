'use client';

import { useSyncExternalStore } from 'react';

export type SimulationPurpose = 'regular' | 'dated' | 'reserve';
export type SimulationIntent = SimulationPurpose | 'skip' | null;
export type PlanningReadLabel = 'regular' | 'reserve' | 'goals';

export const SIMULATION_INTENT_KEY = 'hedgr.simulation.intent';
const DEFAULT_ORDER: readonly PlanningReadLabel[] = ['regular', 'reserve', 'goals'];
const PURPOSE_LABEL: Record<SimulationPurpose, PlanningReadLabel> = {
  regular: 'regular', dated: 'goals', reserve: 'reserve',
};

export function getPlanningReadOrder(intent: SimulationIntent): readonly PlanningReadLabel[] {
  if (intent === null || intent === 'skip') return DEFAULT_ORDER;
  const selected = PURPOSE_LABEL[intent];
  return [selected, ...DEFAULT_ORDER.filter(label => label !== selected)];
}

let intent: SimulationIntent = null;
let memoryOnly = false;
const listeners = new Set<() => void>();
const serverSnapshot = (): SimulationIntent => null;
const valid = (value: unknown): value is Exclude<SimulationIntent, null> =>
  value === 'regular' || value === 'dated' || value === 'reserve' || value === 'skip';

export function getSimulationIntent(): SimulationIntent {
  if (typeof window === 'undefined') return null;
  if (memoryOnly) return intent;
  try {
    const stored = window.localStorage.getItem(SIMULATION_INTENT_KEY);
    return valid(stored) ? stored : null;
  } catch {
    return intent;
  }
}

export function setSimulationIntent(value: SimulationIntent): void {
  if ((value !== null && !valid(value)) || typeof window === 'undefined') return;
  intent = value;
  try {
    if (value === null) window.localStorage.removeItem(SIMULATION_INTENT_KEY);
    else window.localStorage.setItem(SIMULATION_INTENT_KEY, value);
    memoryOnly = false;
  } catch {
    // Match the existing display preference's in-memory fallback for blocked storage.
    memoryOnly = true;
  }
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === SIMULATION_INTENT_KEY || event.key === null) {
      memoryOnly = false;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(listener); window.removeEventListener('storage', onStorage); };
}

export function useSimulationIntent(): SimulationIntent {
  return useSyncExternalStore(subscribe, getSimulationIntent, serverSnapshot);
}
