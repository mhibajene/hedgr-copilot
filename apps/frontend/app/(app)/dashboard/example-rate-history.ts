import { ZMW_EXAMPLE_RATES } from '../../../lib/narrative/simulation-currency-insight';

const STORAGE_KEY = 'hedgr:example-rate-history';
type ExampleRate = (typeof ZMW_EXAMPLE_RATES)[number];

export function readPreviousExampleRate(previousVisit: number | null): ExampleRate | null {
  if (previousVisit === null) return null;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null');
    if (saved?.visit !== previousVisit) return null;
    return ZMW_EXAMPLE_RATES.find(rate => rate === saved.rate) ?? null;
  } catch {
    return null;
  }
}

export function recordExampleRateVisit(visit: number, previousRate: ExampleRate | null): void {
  // This visit advances a scripted comparison only. The displayed Today rate stays 27.
  const nextIndex = previousRate === null ? 0 : (ZMW_EXAMPLE_RATES.indexOf(previousRate) + 1) % ZMW_EXAMPLE_RATES.length;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ visit, rate: ZMW_EXAMPLE_RATES[nextIndex] }));
  } catch {
    // A blocked store leaves the comparison at Today on the next visit.
  }
}

export function clearExampleRateHistory(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // The last-visit marker must still match before any stored example is used.
  }
}
