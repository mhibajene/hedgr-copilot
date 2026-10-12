// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import type { SarahReadInput } from '../lib/engine/sarah-read';
import { SARAH_GOLDEN_GRID } from './engine-sarah-read.golden';

// Variable import lets all 13 assertions collect when the module is absent in the red commit.
const MODULE_PATH = '../lib/engine/sarah-read';
const load = async () => await import(MODULE_PATH) as typeof import('../lib/engine/sarah-read');
const source = () => readFileSync(resolve(__dirname, '../lib/engine/sarah-read.ts'), 'utf8');
const LIMITS = 'Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.';
const USD: SarahReadInput = structuredClone(SARAH_GOLDEN_GRID[2].input);
const ZMW: SarahReadInput = structuredClone(SARAH_GOLDEN_GRID[5].input);

function changedPaths(a: unknown, b: unknown, prefix = ''): string[] {
  if (Object.is(a, b)) return [];
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return [prefix];
  const left = a as Record<string, unknown>;
  const right = b as Record<string, unknown>;
  return [...new Set([...Object.keys(left), ...Object.keys(right)])].flatMap((key) =>
    changedPaths(left[key], right[key], prefix ? `${prefix}.${key}` : key));
}

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (!value || typeof value !== 'object') return [];
  return Object.values(value).flatMap(strings);
}

function keys(value: unknown): string[] {
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, child]) => [key, ...keys(child)]);
}

function displayMinor(display: string): bigint {
  const [whole, fraction = '00'] = display.slice(1).replaceAll(',', '').split('.');
  return BigInt(whole) * 100n + BigInt(fraction);
}

describe('Sarah read (§372)', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.doUnmock('../lib/engine/daniel-read');
    vi.resetModules();
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  test('replays identical fee inputs to a deep-equal Sarah read', async () => {
    const { computeSarahRead, SARAH_EXAMPLE_INPUTS } = await load();
    expect(SARAH_GOLDEN_GRID.map((row) => row.name)).toEqual(['U1', 'U2', 'U3', 'Z1', 'Z2', 'Z3']);
    expect(SARAH_EXAMPLE_INPUTS).toEqual(SARAH_GOLDEN_GRID.map(({ name, input }) => ({ name, input })));
    for (const row of SARAH_GOLDEN_GRID) {
      const input = structuredClone(row.input);
      const before = structuredClone(input);
      const first = computeSarahRead(input);
      expect(first, row.name).toStrictEqual(row.read);
      expect(computeSarahRead(input), row.name).toStrictEqual(first);
      expect(input).toStrictEqual(before);
    }
  });

  test('USD fee responds only to the rate', async () => {
    const { computeSarahRead, SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD } = await load();
    const baseline = computeSarahRead(USD);
    for (const [rate, minor, display] of [[24.5, 2450000, 'K24,500'], [29.5, 2950000, 'K29,500'], [SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD, 2700000, 'K27,000']] as const) {
      const read = computeSarahRead({ ...USD, fixtureRateZmwPerUsd: rate });
      expect(read.localAmountZmwMinor).toBe(minor);
      expect(read.localDisplay).toBe(display);
      expect(changedPaths(baseline, read).sort()).toEqual(rate === USD.fixtureRateZmwPerUsd ? [] : [
        'explanation.fee', 'explanation.rateAssumption', 'localAmountZmwMinor', 'localDisplay', 'rateBasis.zmwPerUsd',
      ]);
    }
    expect(SARAH_GOLDEN_GRID.slice(0, 3).map((row) => row.input.asOf)).toEqual([
      '2026-09-09T00:00:00.000Z', '2026-09-25T00:00:00.000Z', '2026-10-09T00:00:00.000Z',
    ]);
    for (const row of SARAH_GOLDEN_GRID.slice(0, 3)) expect(computeSarahRead(row.input).asOf).toBe(row.input.asOf);
  });

  test('ZMW fee ignores the rate', async () => {
    const { computeSarahRead, SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD } = await load();
    const baseline = computeSarahRead(ZMW);
    for (const rate of [24.5, 29.5, SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD]) {
      const read = computeSarahRead({ ...ZMW, fixtureRateZmwPerUsd: rate });
      expect(read).toStrictEqual(baseline);
      expect(read.localAmountZmwMinor).toBe(2950000);
      expect(read.localDisplay).toBe('K29,500');
      expect(read.rateBasis).toStrictEqual({ kind: 'declared-zmw' });
      expect(Object.hasOwn(read.explanation, 'rateAssumption')).toBe(false);
    }
  });

  test('fee denomination changes only fee-derived outputs', async () => {
    const { computeSarahRead } = await load();
    const baseline = computeSarahRead(USD);
    const zmw = computeSarahRead({ ...USD, declaredFee: { ...USD.declaredFee, currency: 'ZMW' } });
    expect(changedPaths(baseline, zmw).sort()).toEqual([
      'declaredFee.currency', 'explanation.fee', 'explanation.rateAssumption', 'localAmountZmwMinor', 'localDisplay', 'rateBasis.kind', 'rateBasis.zmwPerUsd',
    ]);
    expect(zmw.localAmountZmwMinor).toBe(100000);
    expect(zmw.localDisplay).toBe('K1,000');
    for (const input of [USD, ZMW]) {
      const before = computeSarahRead(input);
      const amount = input.declaredFee.amount + 0.5;
      const after = computeSarahRead({ ...input, declaredFee: { ...input.declaredFee, amount } });
      expect(changedPaths(before, after).sort()).toEqual([
        'declaredFee.amount', 'explanation.fee', 'localAmountZmwMinor', 'localDisplay',
      ]);
      expect(after.localAmountZmwMinor).toBe(input.declaredFee.currency === 'USD' ? 2701350 : 2950050);
    }
  });

  test('never infers a rate from the ZMW fee', async () => {
    const { computeSarahRead } = await load();
    for (const amount of [1000, 29500, 42000.5]) {
      const observations = [0.1, 7, 41].map((fixtureRateZmwPerUsd) => computeSarahRead({
        ...ZMW, declaredFee: { ...ZMW.declaredFee, amount }, fixtureRateZmwPerUsd,
      }));
      expect(observations[1]).toStrictEqual(observations[0]);
      expect(observations[2]).toStrictEqual(observations[0]);
      expect(observations[0].localAmountZmwMinor).toBe(amount === 1000 ? 100000 : amount === 29500 ? 2950000 : 4200050);
      expect(observations[0].rateBasis).toStrictEqual({ kind: 'declared-zmw' });
      expect(strings(observations[0]).join(' ')).not.toContain('29.5');
    }
  });

  test('uses the locked explanation strings', async () => {
    const { computeSarahRead } = await load();
    for (const row of SARAH_GOLDEN_GRID) {
      const read = computeSarahRead(row.input);
      expect(read.explanation).toStrictEqual(row.read.explanation);
      expect(read.explanation.limits).toBe(LIMITS);
      expect(Object.keys(read.explanation).sort()).toEqual(row.input.declaredFee.currency === 'USD' ? ['fee', 'limits', 'rateAssumption'] : ['fee', 'limits']);
    }
    const fractional = computeSarahRead({ ...USD, declaredFee: { ...USD.declaredFee, amount: 1000.5 }, fixtureRateZmwPerUsd: 0.125 });
    expect(fractional.explanation).toStrictEqual({
      fee: 'Course fee USD 1,000.5, due 1 Oct 2027, shows as K125.06 at this example rate.',
      rateAssumption: 'Example rate: ZMW 0.125 per US dollar. Not a live rate.', limits: LIMITS,
    });
    expect(computeSarahRead({ ...ZMW, declaredFee: { amount: 1.005, currency: 'ZMW', dueDate: '2028-02-29' } }).explanation).toStrictEqual({
      fee: 'Course fee K1.005, due 29 Feb 2028, is set in kwacha. The exchange rate does not change this declared amount.', limits: LIMITS,
    });
  });

  test('rejects invalid dates, amounts and overflow without a read', async () => {
    const { computeSarahRead } = await load();
    const invalid: unknown[] = [undefined, null, {}, { ...USD, declaredFee: null }];
    for (const asOf of [undefined, null, 0, new Date(USD.asOf), '', 'not-a-date', '2026-10-09', '2026-10-09T00:00:00', '2026-02-30T00:00:00.000Z', '2026-13-01T00:00:00Z', '2026-10-09T24:00:00Z', '2026-10-09T00:60:00Z', '2026-10-09T00:00:00+24:00']) invalid.push({ ...USD, asOf });
    for (const dueDate of [undefined, null, 0, new Date('2027-10-01'), '', 'not-a-date', '2027-2-01', '2027-02-29', '2027-04-31', '2027-00-01', '2027-13-01', '2027-01-00', '2027-01-32', '2027-10-01T00:00:00Z']) invalid.push({ ...USD, declaredFee: { ...USD.declaredFee, dueDate } });
    for (const amount of [undefined, null, '1000', NaN, Infinity, -Infinity, -1]) {
      for (const input of [USD, ZMW]) invalid.push({ ...input, declaredFee: { ...input.declaredFee, amount } });
    }
    for (const fixtureRateZmwPerUsd of [undefined, null, '27', NaN, Infinity, -Infinity, 0, -1]) {
      for (const input of [USD, ZMW]) invalid.push({ ...input, fixtureRateZmwPerUsd });
    }
    for (const currency of [undefined, null, 'KES', 'usd']) invalid.push({ ...USD, declaredFee: { ...USD.declaredFee, currency } });
    for (const input of [USD, ZMW]) {
      for (const amount of [90071992547409.92, Number.MAX_VALUE]) invalid.push({ ...input, declaredFee: { ...input.declaredFee, amount }, fixtureRateZmwPerUsd: 1 });
      const safe = computeSarahRead({ ...input, declaredFee: { ...input.declaredFee, amount: 90071992547409.9 }, fixtureRateZmwPerUsd: 1 });
      expect(safe.localAmountZmwMinor).toBe(9007199254740990);
      expect(safe.localDisplay).toBe('K90,071,992,547,409.90');
      expect(computeSarahRead({ ...input, declaredFee: { ...input.declaredFee, amount: 0 } }).localDisplay).toBe('K0');
    }
    expect(computeSarahRead({ ...USD, declaredFee: { ...USD.declaredFee, amount: Number.MAX_SAFE_INTEGER }, fixtureRateZmwPerUsd: 0.01 }).localAmountZmwMinor).toBe(Number.MAX_SAFE_INTEGER);
    invalid.push({ ...USD, declaredFee: { ...USD.declaredFee, amount: Number.MAX_SAFE_INTEGER }, fixtureRateZmwPerUsd: 0.010000000000000002 });
    for (const input of invalid) {
      let read: unknown;
      expect(() => { read = computeSarahRead(input as SarahReadInput); }, JSON.stringify(input)).toThrow(RangeError);
      expect(read).toBeUndefined();
    }
    const offset = '2026-10-09T08:30:00.123+08:00';
    expect(computeSarahRead({ ...USD, asOf: offset }).asOf).toBe(offset);
  });

  test('rounds exact minor units', async () => {
    const { computeSarahRead } = await load();
    for (const [currency, amount, rate, minor, display] of [
      ['USD', 1.005, 1, 101, 'K1.01'], ['USD', 0.05, 0.1, 1, 'K0.01'], ['USD', 0.04, 0.1, 0, 'K0'],
      ['ZMW', 1.005, 27, 101, 'K1.01'], ['ZMW', 1.5, 27, 150, 'K1.50'], ['USD', 1.5, 1, 150, 'K1.50'],
      ['USD', 1e-7, 1e7, 100, 'K1'], ['ZMW', 1e-7, 27, 0, 'K0'],
    ] as const) {
      const read = computeSarahRead({ ...USD, declaredFee: { ...USD.declaredFee, currency, amount }, fixtureRateZmwPerUsd: rate });
      expect(read.localAmountZmwMinor).toBe(minor);
      expect(read.localDisplay).toBe(display);
      expect(Number.isSafeInteger(read.localAmountZmwMinor)).toBe(true);
      expect(displayMinor(read.localDisplay)).toBe(BigInt(read.localAmountZmwMinor));
    }
  });

  test('reports sarah-read-v1', async () => {
    const { computeSarahRead, SARAH_READ_ENGINE_VERSION } = await load();
    expect(SARAH_READ_ENGINE_VERSION).toBe('sarah-read-v1');
    for (const row of SARAH_GOLDEN_GRID) {
      for (const read of [row.read, computeSarahRead({ ...row.input, engineVersion: 'caller-version' } as SarahReadInput)]) {
        expect(read.engineVersion).toBe('sarah-read-v1');
        expect(Object.keys(read).sort()).toEqual(['asOf', 'declaredFee', 'engineVersion', 'explanation', 'localAmountZmwMinor', 'localDisplay', 'rateBasis']);
        expect(Object.keys(read.declaredFee).sort()).toEqual(['access', 'amount', 'currency', 'dueDate', 'source']);
        expect(Object.keys(read.rateBasis).sort()).toEqual(row.input.declaredFee.currency === 'USD' ? ['kind', 'zmwPerUsd'] : ['kind']);
        expect(Object.keys(read.explanation).sort()).toEqual(row.input.declaredFee.currency === 'USD' ? ['fee', 'limits', 'rateAssumption'] : ['fee', 'limits']);
      }
    }
  });

  test('excludes progress, comparison, sufficiency and action claims', async () => {
    const { computeSarahRead } = await load();
    const controls = [USD, ZMW, { ...USD, declaredFee: { ...USD.declaredFee, amount: 1.005 } }, { ...ZMW, declaredFee: { ...ZMW.declaredFee, amount: 0 } }];
    const reads = [...SARAH_GOLDEN_GRID.flatMap((row) => [row.read, computeSarahRead(row.input)]), ...controls.map(computeSarahRead)];
    for (const read of reads) {
      expect(read.explanation.limits).toBe(LIMITS);
      for (const key of keys(read)) expect(key).not.toMatch(/progress|compar|trend|history|timeline|gap|percent|coverage|target|saving|contribut|sufficien|capacity|action|permission|allow|execute|can[A-Z]|cta|href|route|forecast|countdown|custody|wealth|balance/i);
      for (const value of strings(read)) {
        expect(value).not.toMatch(/\bhedg(e|es|ed|ing)\b/i);
        expect(value).not.toMatch(/\b(progress|comparison|trend|savings?|contributions?|coverage|sufficient|enough|custody|verified|wealth|balance|gap|percent|target|closer|higher|lower|gain|loss)\b|%|on[ -]track|anchored to|tracking.*(obligation|payment|goal)|toward.*(fee|goal|payment)/i);
        if (value.includes('can pay')) expect(value).toBe(LIMITS);
      }
    }
    expect(source()).not.toMatch(/\bhedg(e|es|ed|ing)\b|anchored to the obligation/i);
  });

  test('current rate derives from the Engine constant', async () => {
    const runtime = await load();
    const daniel = await import('../lib/engine/daniel-read');
    expect(runtime.SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD).toBe(daniel.DANIEL_FIXTURE_RATE_ZMW_PER_USD);
    expect(runtime.SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD).toBe(27);
    expect(source()).toMatch(/import\s*\{\s*DANIEL_FIXTURE_RATE_ZMW_PER_USD\s*\}\s*from\s*['"]\.\/daniel-read['"]/);
    expect(source()).toMatch(/SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD\s*=\s*DANIEL_FIXTURE_RATE_ZMW_PER_USD/);
    expect(source()).not.toMatch(/\b27\b/);
    vi.resetModules();
    vi.doMock('../lib/engine/daniel-read', () => ({ DANIEL_FIXTURE_RATE_ZMW_PER_USD: 31 }));
    const mocked = await load();
    expect(mocked.SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD).toBe(31);
    expect(mocked.SARAH_EXAMPLE_INPUTS.map(({ input }) => input.fixtureRateZmwPerUsd)).toEqual([24.5, 29.5, 31, 24.5, 29.5, 31]);
    expect(mocked.computeSarahRead(mocked.SARAH_EXAMPLE_INPUTS[2].input).localAmountZmwMinor).toBe(3100000);
    expect(mocked.computeSarahRead(mocked.SARAH_EXAMPLE_INPUTS[5].input).localAmountZmwMinor).toBe(2950000);
  });

  test('ignores ambient clock storage and display preference', async () => {
    const { computeSarahRead } = await load();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2020-01-01T00:00:00Z'));
    const before = [USD, ZMW].map(computeSarahRead);
    vi.setSystemTime(new Date('2031-06-15T12:34:56Z'));
    window.localStorage.setItem('hedgr:simulation:displayCurrency', 'NGN');
    window.sessionStorage.setItem('displayPreference', 'PHP');
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Ambient storage accessed'); });
    vi.spyOn(Date, 'now').mockImplementation(() => { throw new Error('Ambient clock accessed'); });
    vi.unstubAllGlobals();
    vi.stubGlobal('fetch', vi.fn(() => { throw new Error('Network accessed'); }));
    expect([USD, ZMW].map(computeSarahRead)).toStrictEqual(before);
    expect(fetch).not.toHaveBeenCalled();
    expect(source()).not.toMatch(/Date\.now|new Date|localStorage|sessionStorage|displayPreference|fetch\s*\(|provider|__tests__|\.golden/);
    expect([...source().matchAll(/\b(?:import|from)\b[^\n]*['"]([^'"]+)['"]/g)].map((match) => match[1])).toEqual(['./daniel-read']);
  });

  test('deadline and observation changes stay isolated', async () => {
    const { computeSarahRead } = await load();
    for (const input of [USD, ZMW]) {
      const before = computeSarahRead(input);
      const deadline = computeSarahRead({ ...input, declaredFee: { ...input.declaredFee, dueDate: '2028-02-29' } });
      expect(changedPaths(before, deadline).sort()).toEqual(['declaredFee.dueDate', 'explanation.fee']);
      expect(deadline.explanation.fee).toContain('due 29 Feb 2028');
      for (const asOf of ['2020-01-01T00:00:00Z', '2031-06-15T12:34:56Z']) {
        const observation = computeSarahRead({ ...input, asOf });
        expect(changedPaths(before, observation)).toEqual(['asOf']);
        expect(observation.asOf).toBe(asOf);
      }
    }
  });
});
