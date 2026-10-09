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
import { DANIEL_GOLDEN_AS_OF, DANIEL_GOLDEN_GRID, type DanielGoldenRead } from './engine-daniel-read.golden';

const BASELINE: DanielReadInput = {
  declaredHoldingUsd: 800,
  fixtureRateZmwPerUsd: 27,
  asOf: DANIEL_GOLDEN_AS_OF,
};

const readOf = (input: DanielReadInput) => computeDanielRead(input) as DanielGoldenRead;

/** Independently decodes a K display string to integer ngwee, without the engine. */
function decodeDisplayMinor(display: string): bigint {
  const match = /^K(\d{1,3}(?:,\d{3})*)(?:\.(\d{2}))?$/.exec(display);
  if (!match) throw new Error(`Unexpected display: ${display}`);
  return BigInt(match[1].replace(/,/g, '')) * 100n + BigInt(match[2] ?? '0');
}

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
    expect(first.engineVersion).toBe(DANIEL_READ_ENGINE_VERSION);
    expect(input).toEqual(frozen);
  });

  test('changes only the canonical local amount display and rate explanation when the fixture rate changes', () => {
    expect(DANIEL_FIXTURE_RATE_ZMW_PER_USD).toBe(27);
    const base = readOf(BASELINE);
    expect(base.localDisplay).toBe('K21,600');
    expect(base.localAmountZmwMinor).toBe(2160000);
    for (const [rate, expected, minor] of [[29.5, 'K23,600', 2360000], [24.5, 'K19,600', 1960000]] as const) {
      const moved = readOf({ ...BASELINE, fixtureRateZmwPerUsd: rate });
      expect(moved.localDisplay).toBe(expected);
      expect(moved.localAmountZmwMinor).toBe(minor);
      expect(changedPaths(base, moved).sort()).toEqual(
        ['explanation.holding', 'explanation.rateAssumption', 'localAmountZmwMinor', 'localDisplay'],
      );
      expect(moved.explanation.rateAssumption).toContain(`ZMW ${rate} per USD`);
    }
  });

  test('changes only holding-derived fields when the declared USD holding changes', () => {
    const base = readOf(BASELINE);
    const moved = readOf({ ...BASELINE, declaredHoldingUsd: 1000 });
    expect(changedPaths(base, moved).sort()).toEqual(
      ['declaredHolding.amount', 'explanation.holding', 'localAmountZmwMinor', 'localDisplay'],
    );
    expect(moved.declaredHolding.amount).toBe(1000);
    expect(moved.localDisplay).toBe('K27,000');
    expect(moved.localAmountZmwMinor).toBe(2700000);
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
    expect(after.asOf).toBe(DANIEL_GOLDEN_AS_OF);
  });

  test('matches the engine-owned golden fixture grid', () => {
    expect(DANIEL_GOLDEN_GRID.map((row) => row.name)).toEqual([
      'baseline fixture rate 27',
      'fixture rate 29.5',
      'fixture rate 24.5',
      'holding-change control at fixture rate 27',
      'fractional-cent control 1.005 at fixture rate 1',
    ]);
    for (const row of DANIEL_GOLDEN_GRID) {
      expect(computeDanielRead(row.input), row.name).toEqual(row.read);
    }
  });

  test('exposes exact safe-integer ngwee across the engine-owned golden grid', () => {
    const literal = DANIEL_GOLDEN_GRID.map((row) => [
      row.input.declaredHoldingUsd,
      row.input.fixtureRateZmwPerUsd,
      row.read.localDisplay,
      row.read.localAmountZmwMinor,
    ]);
    expect(literal).toEqual([
      [800, 27, 'K21,600', 2160000],
      [800, 29.5, 'K23,600', 2360000],
      [800, 24.5, 'K19,600', 1960000],
      [1000, 27, 'K27,000', 2700000],
      [1.005, 1, 'K1.01', 101],
    ]);
    for (const row of DANIEL_GOLDEN_GRID) {
      const read = readOf(row.input);
      expect(typeof read.localAmountZmwMinor, row.name).toBe('number');
      expect(Number.isSafeInteger(read.localAmountZmwMinor), row.name).toBe(true);
      expect(read.localAmountZmwMinor, row.name).toBe(row.read.localAmountZmwMinor);
      expect(read.localDisplay, row.name).toBe(row.read.localDisplay);
    }
  });

  test('keeps localAmountZmwMinor and localDisplay identical in minor units', () => {
    const cases: [DanielReadInput, string, number][] = [
      ...DANIEL_GOLDEN_GRID.map((row) => [row.input, row.read.localDisplay, row.read.localAmountZmwMinor] as [DanielReadInput, string, number]),
      [{ ...BASELINE, declaredHoldingUsd: 1.005, fixtureRateZmwPerUsd: 1 }, 'K1.01', 101],
      [{ ...BASELINE, declaredHoldingUsd: 0.05, fixtureRateZmwPerUsd: 0.1 }, 'K0.01', 1],
      [{ ...BASELINE, declaredHoldingUsd: 0.04, fixtureRateZmwPerUsd: 0.1 }, 'K0', 0],
      [{ ...BASELINE, declaredHoldingUsd: 1000.5, fixtureRateZmwPerUsd: 27 }, 'K27,013.50', 2701350],
    ];
    for (const [input, display, minor] of cases) {
      const read = readOf(input);
      expect(read.localDisplay).toBe(display);
      expect(read.localAmountZmwMinor).toBe(minor);
      expect(BigInt(read.localAmountZmwMinor)).toBe(decodeDisplayMinor(read.localDisplay));
    }
  });

  test('throws RangeError without a read above the safe-integer cents limit', () => {
    const nearLimit = readOf({ ...BASELINE, declaredHoldingUsd: 90071992547409.9, fixtureRateZmwPerUsd: 1 });
    expect(nearLimit.localAmountZmwMinor).toBe(9007199254740990);
    expect(Number.isSafeInteger(nearLimit.localAmountZmwMinor)).toBe(true);
    expect(nearLimit.localDisplay).toBe('K90,071,992,547,409.90');
    expect(BigInt(nearLimit.localAmountZmwMinor)).toBe(decodeDisplayMinor(nearLimit.localDisplay));

    // 90071992547409.92 × 1 → 9007199254740992 cents, one above Number.MAX_SAFE_INTEGER.
    for (const [declaredHoldingUsd, fixtureRateZmwPerUsd] of [[90071992547409.92, 1], [Number.MAX_VALUE, 27]]) {
      let read: unknown;
      expect(() => {
        read = computeDanielRead({ ...BASELINE, declaredHoldingUsd, fixtureRateZmwPerUsd });
      }).toThrow(RangeError);
      expect(read).toBeUndefined();
    }
  });

  test('reports daniel-read-v2 as the explicit engine version', () => {
    expect(DANIEL_READ_ENGINE_VERSION).toBe('daniel-read-v2');
    for (const row of DANIEL_GOLDEN_GRID) {
      expect(row.read.engineVersion, row.name).toBe('daniel-read-v2');
      expect(computeDanielRead(row.input).engineVersion, row.name).toBe('daniel-read-v2');
    }
  });

  test('adds only localAmountZmwMinor to the Daniel read output envelope', () => {
    for (const row of DANIEL_GOLDEN_GRID) {
      for (const read of [row.read, computeDanielRead(row.input)]) {
        expect(Object.keys(read).sort(), row.name).toEqual(
          ['asOf', 'declaredHolding', 'engineVersion', 'explanation', 'localAmountZmwMinor', 'localDisplay', 'pair'],
        );
        expect(Object.keys(read.declaredHolding).sort(), row.name).toEqual(['access', 'amount', 'currency', 'source']);
        expect(Object.keys(read.explanation).sort(), row.name).toEqual(['holding', 'rateAssumption']);
        expect(collectKeys(read).sort(), row.name).toEqual([
          'access', 'amount', 'asOf', 'currency', 'declaredHolding', 'engineVersion', 'explanation',
          'holding', 'localAmountZmwMinor', 'localDisplay', 'pair', 'rateAssumption', 'source',
        ]);
      }
    }
  });

  test('reuses BigInt cents half-cent-up rounding with fixed en-US formatting', () => {
    window.localStorage.setItem(SIMULATION_DISPLAY_CURRENCY_KEY, 'PHP');
    const read = (declaredHoldingUsd: number, fixtureRateZmwPerUsd: number) =>
      computeDanielRead({ declaredHoldingUsd, fixtureRateZmwPerUsd, asOf: DANIEL_GOLDEN_AS_OF }).localDisplay;
    // 1.005 is below 1.005 in binary floating point; decimal cents still round half up.
    expect(read(1.005, 1)).toBe('K1.01');
    expect(read(0.05, 0.1)).toBe('K0.01');
    expect(read(0.04, 0.1)).toBe('K0');
    expect(read(1234567, 27)).toBe('K33,333,309');
    expect(read(1000.5, 27)).toBe('K27,013.50');
    expect(() => read(-1, 27)).toThrow(RangeError);
    expect(() => read(800, 0)).toThrow(RangeError);
  });

  test('returns no read for an invalid or missing asOf', () => {
    for (const asOf of [0, 1759708800000, null, undefined, '', 'not-a-date', new Date(DANIEL_GOLDEN_AS_OF)]) {
      expect(() => computeDanielRead({ ...BASELINE, asOf } as unknown as DanielReadInput)).toThrow(RangeError);
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
