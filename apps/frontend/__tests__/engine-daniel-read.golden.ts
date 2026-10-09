import type { DanielRead, DanielReadInput } from '../lib/engine/daniel-read';

/** §357 read shape: the shipped read plus the canonical safe-integer ngwee amount. */
export type DanielGoldenRead = DanielRead & { localAmountZmwMinor: number };

/**
 * Engine-owned golden grid for the Daniel read (§350; §357 amount and v2). Literal expected values only;
 * never generated from the function under test. Any update must be explained by a
 * deliberate Engine change in the same runtime PR.
 */
export const DANIEL_GOLDEN_AS_OF = '2026-10-06T00:00:00.000Z';

export const DANIEL_GOLDEN_GRID: readonly {
  name: string;
  input: DanielReadInput;
  read: DanielGoldenRead;
}[] = [
  {
    name: 'baseline fixture rate 27',
    input: { declaredHoldingUsd: 800, fixtureRateZmwPerUsd: 27, asOf: DANIEL_GOLDEN_AS_OF },
    read: {
      engineVersion: 'daniel-read-v2',
      asOf: DANIEL_GOLDEN_AS_OF,
      pair: 'USD/ZMW',
      declaredHolding: { amount: 800, currency: 'USD', source: 'user-declared', access: 'read-only' },
      localAmountZmwMinor: 2160000,
      localDisplay: 'K21,600',
      explanation: {
        rateAssumption: 'Disclosed fixture rate: ZMW 27 per USD. Not a live rate.',
        holding: 'Declared USD 800 shows as K21,600 at this rate.',
      },
    },
  },
  {
    name: 'fixture rate 29.5',
    input: { declaredHoldingUsd: 800, fixtureRateZmwPerUsd: 29.5, asOf: DANIEL_GOLDEN_AS_OF },
    read: {
      engineVersion: 'daniel-read-v2',
      asOf: DANIEL_GOLDEN_AS_OF,
      pair: 'USD/ZMW',
      declaredHolding: { amount: 800, currency: 'USD', source: 'user-declared', access: 'read-only' },
      localAmountZmwMinor: 2360000,
      localDisplay: 'K23,600',
      explanation: {
        rateAssumption: 'Disclosed fixture rate: ZMW 29.5 per USD. Not a live rate.',
        holding: 'Declared USD 800 shows as K23,600 at this rate.',
      },
    },
  },
  {
    name: 'fixture rate 24.5',
    input: { declaredHoldingUsd: 800, fixtureRateZmwPerUsd: 24.5, asOf: DANIEL_GOLDEN_AS_OF },
    read: {
      engineVersion: 'daniel-read-v2',
      asOf: DANIEL_GOLDEN_AS_OF,
      pair: 'USD/ZMW',
      declaredHolding: { amount: 800, currency: 'USD', source: 'user-declared', access: 'read-only' },
      localAmountZmwMinor: 1960000,
      localDisplay: 'K19,600',
      explanation: {
        rateAssumption: 'Disclosed fixture rate: ZMW 24.5 per USD. Not a live rate.',
        holding: 'Declared USD 800 shows as K19,600 at this rate.',
      },
    },
  },
  {
    name: 'holding-change control at fixture rate 27',
    input: { declaredHoldingUsd: 1000, fixtureRateZmwPerUsd: 27, asOf: DANIEL_GOLDEN_AS_OF },
    read: {
      engineVersion: 'daniel-read-v2',
      asOf: DANIEL_GOLDEN_AS_OF,
      pair: 'USD/ZMW',
      declaredHolding: { amount: 1000, currency: 'USD', source: 'user-declared', access: 'read-only' },
      localAmountZmwMinor: 2700000,
      localDisplay: 'K27,000',
      explanation: {
        rateAssumption: 'Disclosed fixture rate: ZMW 27 per USD. Not a live rate.',
        holding: 'Declared USD 1,000 shows as K27,000 at this rate.',
      },
    },
  },
  {
    name: 'fractional-cent control 1.005 at fixture rate 1',
    input: { declaredHoldingUsd: 1.005, fixtureRateZmwPerUsd: 1, asOf: DANIEL_GOLDEN_AS_OF },
    read: {
      engineVersion: 'daniel-read-v2',
      asOf: DANIEL_GOLDEN_AS_OF,
      pair: 'USD/ZMW',
      declaredHolding: { amount: 1.005, currency: 'USD', source: 'user-declared', access: 'read-only' },
      localAmountZmwMinor: 101,
      localDisplay: 'K1.01',
      explanation: {
        rateAssumption: 'Disclosed fixture rate: ZMW 1 per USD. Not a live rate.',
        holding: 'Declared USD 1.005 shows as K1.01 at this rate.',
      },
    },
  },
];
