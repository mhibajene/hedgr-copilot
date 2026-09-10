import { describe, expect, test } from 'vitest';
import { compareCurrencyExample, formatComparisonCents, makeCurrencyExample, type CurrencyExample } from '../lib/narrative/simulation-currency-insight';
import { SIMULATION_DISPLAY_CURRENCIES } from '../lib/state/simulation-display-currency';

const compare = (usdAmount = 300, rate = 20, example = makeCurrencyExample(rate), pending = false) =>
  compareCurrencyExample({ usdAmount, latestDisplayRate: rate, example, pending });

describe('invented currency comparison', () => {
  test.each([
    ['ZMW', 19, 570000n, 600000n, 30000n],
    ['KES', 123.5, 3705000n, 3900000n, 195000n],
    ['NGN', 1425, 42750000n, 45000000n, 2250000n],
    ['GHS', 14.25, 427500n, 450000n, 22500n],
    ['PHP', 53.2, 1596000n, 1680000n, 84000n],
  ] as const)('reconciles the approved %s fixture with its existing latest rate', (code, earlierRate, earlierCents, latestCents, deltaCents) => {
    const rate = SIMULATION_DISPLAY_CURRENCIES.find(currency => currency.code === code)!.unitsPerUsd;
    expect(compare(300, rate)).toEqual({ kind: 'comparison', earlierRate, latestRate: rate, earlierCents, latestCents, deltaCents, direction: 'higher' });
  });

  test.each(SIMULATION_DISPLAY_CURRENCIES)('supports lower and equal $code examples without changing the latest rate', ({ unitsPerUsd }) => {
    const example = makeCurrencyExample(unitsPerUsd);
    example.earlier.rate = unitsPerUsd * 105 / 100;
    expect(compare(300, unitsPerUsd, example)).toMatchObject({ direction: 'lower', latestRate: unitsPerUsd });
    example.earlier.rate = unitsPerUsd;
    expect(compare(300, unitsPerUsd, example)).toMatchObject({ direction: 'equal', deltaCents: 0n });
  });

  test('rounds half-cents in decimal and subtracts displayed amounts', () => {
    const result = compare(1, 1.005, { earlier: { rate: 0.995, status: 'available' }, latest: { rate: 1.005, status: 'available' } });
    expect(result).toMatchObject({ earlierCents: 100n, latestCents: 101n, deltaCents: 1n });
    expect(compare(0.01, 0.2)).toMatchObject({ direction: 'rounded-zero', deltaCents: 0n });
    expect(compare(1e-7, 20)).toMatchObject({ direction: 'rounded-zero' });
  });

  test('handles large finite inputs without numeric overflow or lost integer cents', () => {
    const result = compare(1e21, 20);
    expect(result).toMatchObject({ latestCents: 2000000000000000000000000n, deltaCents: 100000000000000000000000n });
    expect(formatComparisonCents(-2250000n, true)).toBe('22,500');
    expect(formatComparisonCents(1n, true)).toBe('0.01');
    expect(formatComparisonCents(100n)).toBe('1.00');
  });

  test('does not treat a zero position as unchanged rates or pending money as settled', () => {
    expect(compare(0)).toEqual({ kind: 'empty' });
    expect(compare(0, 20, makeCurrencyExample(20), true)).toEqual({ kind: 'unavailable', reason: 'Waiting for the simulated position to settle.' });
  });

  test.each([NaN, Infinity, -Infinity, -1])('rejects invalid amount %s', value => {
    expect(compare(value)).toEqual({ kind: 'unavailable', reason: 'The simulated position is unavailable.' });
  });

  test.each(['earlier', 'latest'] as const)('rejects missing, invalid and stale %s samples', side => {
    for (const value of [null, 0, -1, NaN, Infinity]) {
      const example = makeCurrencyExample(20);
      example[side].rate = value;
      expect(compare(300, 20, example)).toEqual({ kind: 'unavailable', reason: `The ${side} example rate is unavailable.` });
    }
    for (const status of ['missing', 'stale'] as const) {
      const example = makeCurrencyExample(20);
      example[side].status = status;
      expect(compare(300, 20, example)).toEqual({ kind: 'unavailable', reason: `The ${side} example rate is ${side === 'latest' && status === 'stale' ? 'out of date' : 'unavailable'}.` });
    }
  });

  test('rejects disagreement with the independent display rate', () => {
    expect(compare(300, 20, makeCurrencyExample(21))).toEqual({ kind: 'unavailable', reason: 'The latest example rate does not match the display rate.' });
  });

  test('does not mutate sample input', () => {
    const example: CurrencyExample = Object.freeze({ earlier: Object.freeze({ rate: 19, status: 'available' }), latest: Object.freeze({ rate: 20, status: 'available' }) });
    expect(compare(300, 20, example)).toMatchObject({ direction: 'higher' });
    expect(example.earlier.rate).toBe(19);
  });
});
