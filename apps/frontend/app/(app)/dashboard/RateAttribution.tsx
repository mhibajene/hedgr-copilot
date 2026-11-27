import { useSyncExternalStore } from 'react';

let mount: HTMLDivElement | null = null;
const listeners = new Set<() => void>();

export function mountRateAttribution(element: HTMLDivElement | null) {
  mount = element;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function useRateAttributionMount() {
  return useSyncExternalStore(subscribe, () => mount, () => null);
}

export function RateAttribution() {
  return (
    <p>
      The daily rate on the currency sheet is for display only and is not used in any figure.{' '}
      <a href="https://www.exchangerate-api.com" target="_blank" rel="noopener noreferrer">Rates By Exchange Rate API</a>.
    </p>
  );
}
