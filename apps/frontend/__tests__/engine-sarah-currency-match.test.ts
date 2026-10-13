// @vitest-environment jsdom

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { computeSarahRead, SARAH_EXAMPLE_INPUTS, SARAH_READ_ENGINE_VERSION } from '../lib/engine/sarah-read';
import { SARAH_GOLDEN_GRID } from './engine-sarah-read.golden';
import { SARAH_CURRENCY_MATCH_GOLDENS as GOLDENS } from './engine-sarah-currency-match.golden';

// BEGIN TYPE CONTRACT — checked separately by TypeScript, never just Vitest transpilation.
import type { SarahCurrencyMatch, SarahCurrencyMatchInput, SARAH_CURRENCY_MATCH_ENGINE_VERSION, computeSarahCurrencyMatch } from '../lib/engine/sarah-currency-match';

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;
type ExpectedInput = {
  savingsCurrency: 'ZMW';
  feeFixedCurrency: 'USD' | 'ZMW';
  priorFeeFixedCurrency?: 'USD' | 'ZMW';
  asOf?: string;
};
type ExpectedRead = {
  engineVersion: 'sarah-currency-match-v1';
  asOf?: string;
  savingsCurrency: 'ZMW';
  feeFixedCurrency: 'USD' | 'ZMW';
  relationship: 'different-currency' | 'same-currency';
  rateAffectsFeeLocalCost: boolean;
  framing: 'present-state' | 'changed-from-prior';
  explanation: string;
};
export type SarahCurrencyMatchContractAssertions = [
  Assert<Equal<SarahCurrencyMatchInput, ExpectedInput>>,
  Assert<Equal<keyof SarahCurrencyMatchInput, keyof ExpectedInput>>,
  Assert<Equal<SarahCurrencyMatch, ExpectedRead>>,
  Assert<Equal<keyof SarahCurrencyMatch, keyof ExpectedRead>>,
  Assert<Equal<typeof SARAH_CURRENCY_MATCH_ENGINE_VERSION, 'sarah-currency-match-v1'>>,
  Assert<Equal<typeof computeSarahCurrencyMatch, (input: SarahCurrencyMatchInput) => SarahCurrencyMatch>>,
  Assert<Equal<Extract<keyof SarahCurrencyMatchInput | keyof SarahCurrencyMatch,
    'amount' | 'savingsAmount' | 'feeAmount' | 'rate' | 'fixtureRateZmwPerUsd' | 'displayCurrency' | 'preference' | 'contribution' | 'limits' | 'priorState'>, never>>,
];
// END TYPE CONTRACT

// Variable import collects all nine named contracts when the module is absent in RED.
const MODULE_PATH = '../lib/engine/sarah-currency-match';
const load = async () => await import(MODULE_PATH) as typeof import('../lib/engine/sarah-currency-match');
const source = () => readFileSync(resolve(__dirname, '../lib/engine/sarah-currency-match.ts'), 'utf8');
const VARIANTS: readonly { name: keyof typeof GOLDENS; input: SarahCurrencyMatchInput }[] = [
  { name: 'P-USD', input: { savingsCurrency: 'ZMW', feeFixedCurrency: 'USD' } },
  { name: 'P-ZMW', input: { savingsCurrency: 'ZMW', feeFixedCurrency: 'ZMW' } },
  { name: 'C-ZMW', input: { savingsCurrency: 'ZMW', feeFixedCurrency: 'ZMW', priorFeeFixedCurrency: 'USD' } },
];
const OBSERVATIONS = [
  '2026-10-09T00:00:00.000Z', '2026-10-09T08:30:00.123+08:00',
  '2026-10-09T12:34Z', '2026-10-09T12:34:56Z',
  '2024-02-29T23:59:59.999-05:30', '2000-02-29T00:00+00:00',
  '2020-01-01T00:00:00Z', '2031-06-15T12:34:56Z',
] as const;
const acceptedInputs = () => VARIANTS.flatMap(({ name, input }) => [
  { name, input }, ...OBSERVATIONS.map((asOf) => ({ name, input: { ...input, asOf } })),
]);
const OUTPUT_KEYS = ['engineVersion', 'savingsCurrency', 'feeFixedCurrency', 'relationship', 'rateAffectsFeeLocalCost', 'framing', 'explanation'];

function expected(name: keyof typeof GOLDENS, input: SarahCurrencyMatchInput): SarahCurrencyMatch {
  return {
    engineVersion: 'sarah-currency-match-v1',
    ...(input.asOf === undefined ? {} : { asOf: input.asOf }),
    savingsCurrency: 'ZMW', feeFixedCurrency: input.feeFixedCurrency,
    relationship: input.feeFixedCurrency === 'USD' ? 'different-currency' : 'same-currency',
    rateAffectsFeeLocalCost: input.feeFixedCurrency === 'USD',
    framing: name === 'C-ZMW' ? 'changed-from-prior' : 'present-state',
    explanation: GOLDENS[name],
  };
}

function changedKeys(before: SarahCurrencyMatch, after: SarahCurrencyMatch): string[] {
  return [...new Set([...Object.keys(before), ...Object.keys(after)])]
    .filter((key) => before[key as keyof SarahCurrencyMatch] !== after[key as keyof SarahCurrencyMatch]).sort();
}

function rejects(compute: typeof computeSarahCurrencyMatch, input: unknown, name: string): void {
  let read: unknown;
  expect(() => { read = compute(input as SarahCurrencyMatchInput); }, name).toThrow(RangeError);
  expect(read, name).toBeUndefined();
}

describe('Sarah currency match (§382)', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  test('amount independence: denomination-only derivation ignores savings and fee amounts', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    for (const { input: feeInput } of SARAH_EXAMPLE_INPUTS) {
      for (const prior of [false, true]) {
        if (prior && feeInput.declaredFee.currency === 'USD') continue;
        const denomination: SarahCurrencyMatchInput = {
          savingsCurrency: 'ZMW', feeFixedCurrency: feeInput.declaredFee.currency,
          ...(prior ? { priorFeeFixedCurrency: 'USD' as const } : {}), asOf: feeInput.asOf,
        };
        const baseline = compute(denomination);
        for (const savingsAmount of [600, 6000, 60000]) {
          for (const feeAmount of [0, 1, 1000, 29500, 60000]) {
            // Amount-bearing external fixture data is projected to denominations before this API.
            const external = { savings: { currency: 'ZMW' as const, amount: savingsAmount },
              fee: { ...feeInput.declaredFee, amount: feeAmount } };
            const input: SarahCurrencyMatchInput = { ...denomination,
              savingsCurrency: external.savings.currency, feeFixedCurrency: external.fee.currency };
            expect(compute(input)).toStrictEqual(baseline);
            expect(compute(input).explanation).toBe(baseline.explanation);
          }
        }
      }
    }
    for (const { name, input } of acceptedInputs()) {
      expect(compute(input)).toStrictEqual(expected(name, input));
      expect(compute(input)).toStrictEqual(compute(input));
    }
  });

  test('denomination not display: unknown keys are rejected (E5)', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    for (const { name, input } of acceptedInputs()) {
      const before = structuredClone(input);
      const read = compute(input);
      expect(read).toStrictEqual(expected(name, input));
      expect(Object.keys(read).sort()).toEqual([...OUTPUT_KEYS, ...(input.asOf === undefined ? [] : ['asOf'])].sort());
      expect(Object.hasOwn(read, 'asOf')).toBe(input.asOf !== undefined);
      expect(input).toStrictEqual(before);
      for (const [key, value] of [
        ['displayCurrency', 'USD'], ['preference', 'ZMW'], ['amount', 1000], ['savingsAmount', 600],
        ['feeAmount', 29500], ['rate', 27], ['contribution', 50], ['engineVersion', 'caller-version'],
        ['fixtureName', 'Z3'], ['unexpected', undefined],
      ] as const) rejects(compute, { ...input, [key]: value }, `E5 ${key}`);
      rejects(compute, Object.defineProperty({ ...input }, 'amount', { value: 1 }), 'E5 non-enumerable amount');
      rejects(compute, { ...input, [Symbol('unknown')]: 1 }, 'E5 symbol key');
    }
    expect(compute(Object.assign(Object.create(null), VARIANTS[0].input))).toStrictEqual(expected('P-USD', VARIANTS[0].input));
  });

  test('missing or unsupported inputs throw: E1–E6', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    const usd = VARIANTS[0].input;
    const zmw = VARIANTS[1].input;
    for (const input of [undefined, null, false, 1, 'USD', [], [usd], new Date(), new Map(), () => usd]) rejects(compute, input, 'E1 invalid record');
    for (const savingsCurrency of [undefined, null, '', 'USD', 'zmw', 0, {}, ['ZMW']]) rejects(compute, { ...usd, savingsCurrency }, 'E2 savingsCurrency');
    rejects(compute, { feeFixedCurrency: 'USD' }, 'E2 missing savingsCurrency');
    for (const feeFixedCurrency of [undefined, null, '', 'EUR', 'usd', 'zmw', 0, {}, ['USD']]) rejects(compute, { ...usd, feeFixedCurrency }, 'E3 feeFixedCurrency');
    rejects(compute, { savingsCurrency: 'ZMW' }, 'E3 missing feeFixedCurrency');
    for (const priorFeeFixedCurrency of [undefined, null, '', 'EUR', 'usd', 0, {}, ['USD']]) {
      for (const input of [usd, zmw]) rejects(compute, { ...input, priorFeeFixedCurrency }, 'E4 unsupported/present invalid prior');
    }
    rejects(compute, { ...usd, priorFeeFixedCurrency: 'USD' }, 'E4 prior=current USD');
    rejects(compute, { ...zmw, priorFeeFixedCurrency: 'ZMW' }, 'E4 prior=current ZMW');
    rejects(compute, { ...usd, priorFeeFixedCurrency: 'ZMW' }, 'E4 ZMW→USD');
    rejects(compute, { ...usd, amount: 0 }, 'E5 amount key');
    for (const asOf of [
      undefined, null, 0, new Date(OBSERVATIONS[0]), '', 'not-a-date', '2026-10-09',
      '2026-10-09T00:00:00', '2026-02-30T00:00:00.000Z', '1900-02-29T00:00:00Z',
      '2026-04-31T00:00:00Z', '2026-00-01T00:00:00Z', '2026-13-01T00:00:00Z',
      '2026-01-00T00:00:00Z', '2026-01-32T00:00:00Z', '2026-10-09T24:00:00Z',
      '2026-10-09T00:60:00Z', '2026-10-09T00:00:60Z', '2026-10-09T00:00:00+24:00',
      '2026-10-09T00:00:00+08:60', '2026-10-09T00:00:00+0800',
      '2026-10-09T00:00.123Z', ' 2026-10-09T00:00:00Z', '2026-10-09T00:00:00Z ',
    ]) for (const { input } of VARIANTS) rejects(compute, { ...input, asOf }, `E6 ${String(asOf)}`);
    for (const { name, input } of acceptedInputs()) expect(compute(input)).toStrictEqual(expected(name, input));
  });

  test('cross-read alignment: original U3 and changed Z3', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    for (const name of ['U3', 'Z3']) {
      const row = SARAH_EXAMPLE_INPUTS.find((example) => example.name === name)!;
      const original = structuredClone(row.input);
      const fee = computeSarahRead(row.input);
      const input: SarahCurrencyMatchInput = { savingsCurrency: 'ZMW', feeFixedCurrency: row.input.declaredFee.currency, asOf: row.input.asOf };
      const read = compute(input);
      expect(read.feeFixedCurrency).toBe(fee.declaredFee.currency);
      expect(read.asOf).toBe(fee.asOf);
      expect(read.rateAffectsFeeLocalCost).toBe(fee.rateBasis.kind === 'example-rate');
      expect(read).toStrictEqual(expected(name === 'U3' ? 'P-USD' : 'P-ZMW', input));
      expect(fee).toStrictEqual(SARAH_GOLDEN_GRID.find((golden) => golden.name === name)!.read);
      if (name === 'Z3') {
        const changed = { ...input, priorFeeFixedCurrency: 'USD' as const };
        expect(compute(changed)).toStrictEqual(expected('C-ZMW', changed));
        expect(fee.explanation.fee).toContain('The exchange rate does not change this declared amount.');
      }
      expect(fee.explanation.limits).toBe('Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.');
      expect(row.input).toStrictEqual(original);
    }
  });

  test('no-claim lexicon and exact explanation pinning', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    for (const { name, input } of acceptedInputs()) {
      const explanation = compute(input).explanation;
      expect(explanation).toBe(GOLDENS[name]);
      expect(explanation).not.toMatch(/\p{N}/u);
      expect(explanation).not.toMatch(/\p{Sc}/u);
      expect(explanation).not.toMatch(/\u2014/u);
      expect(explanation).not.toMatch(/\bK(?:\b|(?=\p{N}))/iu);
      expect(explanation).not.toMatch(/(?:your|safe|stable|affordable|afford|mistake|success|warning|risk|should|recommend|enough|cover|progress|hedge|hedging)/iu);
      expect(explanation).not.toMatch(/\b(?:USD|ZMW)\b/iu);
    }
  });

  test('now/no longer only in changed-from-prior framing', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    for (const { name, input } of acceptedInputs()) {
      const read = compute(input);
      const count = name === 'C-ZMW' ? 1 : 0;
      expect(read.explanation.match(/\bnow\b/giu) ?? []).toHaveLength(count);
      expect(read.explanation.match(/\bno\s+longer\b/giu) ?? []).toHaveLength(count);
      expect(read.framing).toBe(count ? 'changed-from-prior' : 'present-state');
      expect(read.explanation).toBe(GOLDENS[name]);
      if (count) {
        expect(input).toMatchObject({ savingsCurrency: 'ZMW', feeFixedCurrency: 'ZMW', priorFeeFixedCurrency: 'USD' });
        expect(read.explanation).toContain('course fee is now fixed');
        expect(read.explanation).toContain('kwacha cost no longer depends');
      }
    }
    for (const [feeFixedCurrency, priorFeeFixedCurrency] of [['USD', 'USD'], ['ZMW', 'ZMW'], ['USD', 'ZMW']]) {
      rejects(compute, { savingsCurrency: 'ZMW', feeFixedCurrency, priorFeeFixedCurrency }, 'E4 no explanation');
    }
  });

  test('version: sarah-currency-match-v1 and unchanged sarah-read-v1', async () => {
    const { computeSarahCurrencyMatch: compute, SARAH_CURRENCY_MATCH_ENGINE_VERSION: version } = await load();
    expect(version).toBe('sarah-currency-match-v1');
    for (const { input } of acceptedInputs()) expect(compute(input).engineVersion).toBe(version);
    rejects(compute, { ...VARIANTS[0].input, engineVersion: 'caller-version' }, 'E5 version chooser');
    expect(SARAH_READ_ENGINE_VERSION).toBe('sarah-read-v1');
    expect(SARAH_EXAMPLE_INPUTS).toStrictEqual(SARAH_GOLDEN_GRID.map(({ name, input }) => ({ name, input })));
    for (const row of SARAH_GOLDEN_GRID) expect(computeSarahRead(row.input)).toStrictEqual(row.read);
  });

  test('golden: three character-exact explanation literals', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    expect(Object.keys(GOLDENS)).toEqual(['P-USD', 'P-ZMW', 'C-ZMW']);
    expect(new Set(Object.values(GOLDENS)).size).toBe(3);
    for (const { name, input } of acceptedInputs()) {
      expect(compute(input).explanation).toBe(GOLDENS[name]);
      expect([...compute(input).explanation].filter((character) => character === '’')).toHaveLength(2);
      expect(compute(input).explanation).not.toContain("'");
    }
  });

  test('purity: fake and advanced clock and storage cannot change the read', async () => {
    const { computeSarahCurrencyMatch: compute } = await load();
    const inputs = acceptedInputs().map(({ input }) => Object.freeze({ ...input }));
    const original = structuredClone(inputs);
    const originalFeeReads = SARAH_EXAMPLE_INPUTS.map(({ input }) => computeSarahRead(input));
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2020-01-01T00:00:00Z'));
    const before = inputs.map(compute);
    window.localStorage.setItem('hedgr:simulation:displayCurrency', 'USD');
    window.sessionStorage.setItem('preference', 'ZMW');
    for (const method of ['getItem', 'setItem', 'removeItem', 'clear', 'key'] as const) {
      vi.spyOn(Storage.prototype, method).mockImplementation(() => { throw new Error('Storage accessed'); });
    }
    vi.spyOn(Date, 'now').mockImplementation(() => { throw new Error('Clock accessed'); });
    const network = vi.fn(() => { throw new Error('Network accessed'); });
    vi.stubGlobal('fetch', network);
    vi.setSystemTime(new Date('2031-06-15T12:34:56Z'));
    vi.advanceTimersByTime(86400000);
    expect(inputs.map(compute)).toStrictEqual(before);
    expect(inputs).toStrictEqual(original);
    expect(network).not.toHaveBeenCalled();
    for (const { input } of VARIANTS) {
      const baseline = compute(input);
      expect(Object.hasOwn(baseline, 'asOf')).toBe(false);
      for (const asOf of OBSERVATIONS) {
        const after = compute({ ...input, asOf });
        expect(changedKeys(baseline, after)).toEqual(['asOf']);
        expect(after.asOf).toBe(asOf);
      }
    }
    expect(changedKeys(compute(VARIANTS[0].input), compute(VARIANTS[1].input)))
      .toEqual(['explanation', 'feeFixedCurrency', 'rateAffectsFeeLocalCost', 'relationship']);
    expect(changedKeys(compute(VARIANTS[1].input), compute(VARIANTS[2].input)))
      .toEqual(['explanation', 'framing']);
    expect(SARAH_EXAMPLE_INPUTS.map(({ input }) => computeSarahRead(input))).toStrictEqual(originalFeeReads);
    expect(source()).not.toMatch(/Date\.now|new Date|localStorage|sessionStorage|fetch\s*\(|provider|__tests__|\.golden/);
    expect([...source().matchAll(/\bfrom\s*['"]([^'"\n]+)['"]/g)]).toEqual([]);
  });
});
