/**
 * §350 Daniel thin vertical slice — the one authoritative computation path from declared
 * inputs to a Daniel read. Pure and deterministic: no clock, storage, display preference or
 * copy layer is an input. The amount is user-declared, USD-denominated and read-only; it is
 * not custody, a balance, a settled amount or verified wealth (ADR 0027 decision 3; ADR 0013).
 */
export const DANIEL_READ_ENGINE_VERSION = 'daniel-read-v2';

/** Named, disclosed fixture rate (ZMW per USD). Not a live or market rate. */
export const DANIEL_FIXTURE_RATE_ZMW_PER_USD = 27;

export type DanielReadInput = {
  declaredHoldingUsd: number;
  fixtureRateZmwPerUsd: number;
  asOf: string;
};

export type DanielRead = {
  engineVersion: string;
  asOf: string;
  pair: 'USD/ZMW';
  declaredHolding: { amount: number; currency: 'USD'; source: 'user-declared'; access: 'read-only' };
  /** §357 canonical local amount: integer ngwee from the same BigInt cents as `localDisplay`. */
  localAmountZmwMinor: number;
  localDisplay: string;
  explanation: { rateAssumption: string; holding: string };
};

// Decimal-to-BigInt cents with the non-negative half-a-local-cent-up rule, as in
// lib/narrative/simulation-currency-insight.ts; avoids binary floating-point half-cent errors.
function decimalFraction(value: number): [bigint, bigint] {
  const [mantissa, exponent = '0'] = value.toString().split('e');
  const [whole, fraction = ''] = mantissa.split('.');
  const scale = fraction.length - Number(exponent);
  const coefficient = BigInt(whole + fraction);
  return scale >= 0
    ? [coefficient, 10n ** BigInt(scale)]
    : [coefficient * 10n ** BigInt(-scale), 1n];
}

function formatNumber(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 20 });
}

export function computeDanielRead({ declaredHoldingUsd, fixtureRateZmwPerUsd, asOf }: DanielReadInput): DanielRead {
  if (!Number.isFinite(declaredHoldingUsd) || declaredHoldingUsd < 0) {
    throw new RangeError('Declared USD amount must be a finite non-negative number.');
  }
  if (!Number.isFinite(fixtureRateZmwPerUsd) || fixtureRateZmwPerUsd <= 0) {
    throw new RangeError('Fixture rate must be a finite positive number.');
  }
  if (typeof asOf !== 'string' || !Number.isFinite(Date.parse(asOf))) {
    throw new RangeError('asOf must be an explicit valid timestamp.');
  }
  const [a, aScale] = decimalFraction(declaredHoldingUsd);
  const [r, rScale] = decimalFraction(fixtureRateZmwPerUsd);
  const denominator = aScale * rScale;
  const cents = (a * r * 100n * 2n + denominator) / (denominator * 2n);
  if (cents > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError('Local amount exceeds the safe-integer ngwee limit.');
  }
  const fraction = (cents % 100n).toString().padStart(2, '0');
  const localDisplay = `K${(cents / 100n).toLocaleString('en-US')}${fraction === '00' ? '' : `.${fraction}`}`;
  return {
    engineVersion: DANIEL_READ_ENGINE_VERSION,
    asOf,
    pair: 'USD/ZMW',
    declaredHolding: { amount: declaredHoldingUsd, currency: 'USD', source: 'user-declared', access: 'read-only' },
    localAmountZmwMinor: Number(cents),
    localDisplay,
    explanation: {
      rateAssumption: `Disclosed fixture rate: ZMW ${formatNumber(fixtureRateZmwPerUsd)} per USD. Not a live rate.`,
      holding: `Declared USD ${formatNumber(declaredHoldingUsd)} shows as ${localDisplay} at this rate.`,
    },
  };
}
