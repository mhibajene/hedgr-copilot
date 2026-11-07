'use client';

import { useSyncExternalStore } from 'react';

export type SimulationPurpose = 'regular' | 'dated' | 'reserve';
export type SimulationIntent = SimulationPurpose | 'skip' | null;
export type PlanningReadLabel = 'regular' | 'reserve' | 'goals';

const DEFAULT_ORDER: readonly PlanningReadLabel[] = ['regular', 'reserve', 'goals'];
const PURPOSE_LABEL: Record<SimulationPurpose, PlanningReadLabel> = {
  regular: 'regular', dated: 'goals', reserve: 'reserve',
};

export function getPlanningReadOrder(intent: SimulationIntent): readonly PlanningReadLabel[] {
  if (intent === null || intent === 'skip') return DEFAULT_ORDER;
  const selected = PURPOSE_LABEL[intent];
  return [selected, ...DEFAULT_ORDER.filter(label => label !== selected)];
}

// PLAN-INTENT-001: document-lifetime state only; no browser storage or external events.
let intent: SimulationIntent = null;
const listeners = new Set<() => void>();
const serverSnapshot = (): SimulationIntent => null;

export function getSimulationIntent(): SimulationIntent { return intent; }

export function setSimulationIntent(value: SimulationIntent): void {
  if (value === intent) return;
  intent = value;
  listeners.forEach(listener => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useSimulationIntent(): SimulationIntent {
  return useSyncExternalStore(subscribe, getSimulationIntent, serverSnapshot);
}
