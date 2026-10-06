// @vitest-environment jsdom

import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  computeDanielRead,
  DANIEL_FIXTURE_RATE_ZMW_PER_USD,
  DANIEL_READ_ENGINE_VERSION,
  type DanielReadInput,
} from '../lib/engine/daniel-read';
import { REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY } from '../lib/engine/review-snapshot-memory';
import { SIMULATION_DISPLAY_CURRENCY_KEY } from '../lib/state/simulation-display-currency';
import { DANIEL_GOLDEN_AS_OF, DANIEL_GOLDEN_GRID } from './engine-daniel-read.golden';

const BASELINE: DanielReadInput = {
  declaredHoldingUsd: 800,
  fixtureRateZmwPerUsd: 27,
  asOf: DANIEL_GOLDEN_AS_OF,
};

/** Leaf paths whose values differ between two reads. */
function changedPaths(a: unknown, b: unknown, path = ''): string[] {
  if (a !== null && b !== null && typeof a === 'object' && typeof b === 'object') {
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    return [...keys].flatMap((key) =>
      changedPaths(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
        path ? `${path}.${key}` : key,
      ),
    );
  }
  return Object.is(a, b) ? [] : [path];
}

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (value !== null && typeof value === 'object') return Object.values(value).flatMap(collectStrings);
  return [];
}

function collectKeys(value: unknown): string[] {
  if (value === null || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, child]) => [key, ...collectKeys(child)]);
}

describe('Daniel read (§350)', () => {
  afterEach(() => {
    vi.useRealTimers();
    window.localStorage.clear();
  });

  test('replays identical declared inputs to a deep-equal Daniel read', () => {
    const input = { ...BASELINE };
    const frozen = structuredClone(input);
    const first = computeDanielRead(input);
    const second = computeDanielRead(input);
    expect(second).toEqual(first);
    expect(second.localAmountZmw).toBe(first.localAmountZmw);
    expect(first.localAmountZmw).toBe(21600);
    expect(first.engineVersion).toBe(DANIEL_READ_ENGINE_VERSION);
    expect(input).toEqual(frozen);
  });

  test('changes only the local display and rate explanation when the fixture rate changes', () => {
    expect(DANIEL_FIXTURE_RATE_ZMW_PER_USD).toBe(27);
    const base = computeDanielRead(BASELINE);
    expect(base.localAmountZmw).toBe(21600);
    for (const [rate, expected] of [[29.5, 23600], [24.5, 19600]] as const) {
      const moved = computeDanielRead({ ...BASELINE, fixtureRateZmwPerUsd: rate });
      expect(moved.localAmountZmw).toBe(expected);
      expect(changedPaths(base, moved).sort()).toEqual(
        ['explanation.holding', 'explanation.rateAssumption', 'localAmountZmw', 'localDisplay'],
      );
      expect(moved.explanation.rateAssumption).toContain(`ZMW ${rate} per USD`);
    }
  });

  test('changes only holding-derived fields when the declared USD holding changes', () => {
    const base = computeDanielRead(BASELINE);
    const moved = computeDanielRead({ ...BASELINE, declaredHoldingUsd: 1000 });
    expect(changedPaths(base, moved).sort()).toEqual(
      ['declaredHolding.amount', 'explanation.holding', 'localAmountZmw', 'localDisplay'],
    );
    expect(moved.declaredHolding.amount).toBe(1000);
    expect(moved.localAmountZmw).toBe(27000);
    expect(moved.explanation.rateAssumption).toBe(base.explanation.rateAssumption);
  });

  test('ignores ambient clock storage and display preference', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2020-01-01T00:00:00.000Z'));
    const before = computeDanielRead(BASELINE);

    vi.setSystemTime(new Date('2031-06-15T12:34:56.000Z'));
    window.localStorage.setItem(
      REVIEW_SNAPSHOT_MEMORY_STORAGE_KEY,
      JSON.stringify([{ viewedAt: '2026-01-01T00:00:00.000Z', changeVsPrior: 'changed', posture: 'tightened' }]),
    );
    window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, 'NGN');
    const after = computeDanielRead(BASELINE);

    expect(after).toEqual(before);
    expect(after.localAmountZmw).toBe(before.localAmountZmw);
    expect(after.asOf).toBe(DANIEL_GOLDEN_AS_OF);
  });

  test('matches the engine-owned golden fixture grid', () => {
    expect(DANIEL_GOLDEN_GRID.map((row) => row.name)).toEqual([
      'baseline fixture rate 27',
      'fixture rate 29.5',
      'fixture rate 24.5',
      'holding-change control at fixture rate 27',
    ]);
    for (const row of DANIEL_GOLDEN_GRID) {
      expect(computeDanielRead(row.input), row.name).toEqual(row.read);
    }
  });

  test('reuses BigInt cents half-cent-up rounding with fixed en-US formatting', () => {
    window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, 'PHP');
    const read = (declaredHoldingUsd: number, fixtureRateZmwPerUsd: number) =>
      computeDanielRead({ declaredHoldingUsd, fixtureRateZmwPerUsd, asOf: DANIEL_GOLDEN_AS_OF });
    // 1.005 is below 1.005 in binary floating point; decimal cents still round half up.
    expect(read(1.005, 1).localAmountZmw).toBe(1.01);
    expect(read(0.05, 0.1).localAmountZmw).toBe(0.01);
    expect(read(0.04, 0.1).localAmountZmw).toBe(0);
    expect(read(1234567, 27).localAmountZmw).toBe(33333309);
    expect(read(1000.5, 27).localAmountZmw).toBe(27013.5);
    expect(read(1.005, 1).localDisplay).toBe('K1.01');
  });

  test('formats localDisplay from the canonical local amount with fixed en-US', () => {
    window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, 'NGN');
    const cases: [number, number, number, string][] = [
      [800, 27, 21600, 'K21,600'],
      [1234567, 27, 33333309, 'K33,333,309'],
      [1000.5, 27, 27013.5, 'K27,013.50'],
      [0.05, 0.1, 0.01, 'K0.01'],
      [0.04, 0.1, 0, 'K0'],
    ];
    for (const [declaredHoldingUsd, fixtureRateZmwPerUsd, amount, display] of cases) {
      const read = computeDanielRead({ declaredHoldingUsd, fixtureRateZmwPerUsd, asOf: DANIEL_GOLDEN_AS_OF });
      expect(read.localAmountZmw).toBe(amount);
      expect(read.localDisplay).toBe(display);
      expect(read.explanation.holding).toContain(display);
    }
  });

  test('returns no read for invalid or missing inputs', () => {
    const invalid: unknown[] = [
      { ...BASELINE, declaredHoldingUsd: -1 },
      { ...BASELINE, declaredHoldingUsd: Number.NaN },
      { ...BASELINE, declaredHoldingUsd: Number.POSITIVE_INFINITY },
      { ...BASELINE, declaredHoldingUsd: undefined },
      { ...BASELINE, fixtureRateZmwPerUsd: 0 },
      { ...BASELINE, fixtureRateZmwPerUsd: -27 },
      { ...BASELINE, fixtureRateZmwPerUsd: Number.NaN },
      { ...BASELINE, fixtureRateZmwPerUsd: undefined },
      { ...BASELINE, asOf: '' },
      { ...BASELINE, asOf: 'not-a-date' },
      { ...BASELINE, asOf: undefined },
      // Beyond exact integer cents: no plausible rounded number is returned.
      { ...BASELINE, declaredHoldingUsd: 1e15 },
    ];
    for (const input of invalid) {
      expect(() => computeDanielRead(input as DanielReadInput)).toThrow(RangeError);
    }
  });

  test('contains no prohibited language in slice strings', () => {
    const strings = DANIEL_GOLDEN_GRID.flatMap((row) => [
      row.name,
      ...collectStrings(row.read),
      ...collectStrings(computeDanielRead(row.input)),
    ]);
    expect(strings.length).toBeGreaterThan(0);
    for (const value of strings) {
      expect(value).not.toMatch(/\bhedg(e|es|ed|ing)\b/i);
    }
  });

  test('exposes no action permission or balance-held claims', () => {
    for (const row of DANIEL_GOLDEN_GRID) {
      const read = computeDanielRead(row.input);
      for (const key of collectKeys(read)) {
        expect(key).not.toMatch(/action|permission|allow|execute|can[A-Z]|cta|href|route/i);
      }
      for (const value of collectStrings(read)) {
        expect(value).not.toMatch(/\b(balance|held|holds|custody|settled|verified|wealth)\b/i);
      }
      expect(read.declaredHolding).toMatchObject({ currency: 'USD', source: 'user-declared', access: 'read-only' });
    }
  });
});
