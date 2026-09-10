/** D-133 invented scenario samples. Read-only; never market or transaction pricing. */
export type ExampleRate = {
  rate: number | null;
  status: 'available' | 'missing' | 'stale';
};

export type CurrencyExample = { earlier: ExampleRate; latest: ExampleRate };

export function makeCurrencyExample(latestRate: number): CurrencyExample {
  return {
    earlier: { rate: latestRate * 95 / 100, status: 'available' },
    latest: { rate: latestRate, status: 'available' },
  };
}

export type CurrencyComparison =
  | { kind: 'empty' }
  | { kind: 'unavailable'; reason: string }
  | {
      kind: 'comparison';
      earlierCents: bigint;
      latestCents: bigint;
      deltaCents: bigint;
      direction: 'higher' | 'lower' | 'equal' | 'rounded-zero';
      earlierRate: number;
      latestRate: number;
    };

// Parse the decimal representation, including scientific notation, before multiplying.
// This avoids binary floating-point half-cent errors without adding a pricing dependency.
function decimalFraction(value: number): [bigint, bigint] {
  const [mantissa, exponent = '0'] = value.toString().split('e');
  const [whole, fraction = ''] = mantissa.split('.');
  const scale = fraction.length - Number(exponent);
  const coefficient = BigInt(whole + fraction);
  return scale >= 0
    ? [coefficient, 10n ** BigInt(scale)]
    : [coefficient * 10n ** BigInt(-scale), 1n];
}

function estimateCents(amount: number, rate: number): bigint {
  const [a, aScale] = decimalFraction(amount);
  const [r, rScale] = decimalFraction(rate);
  const numerator = a * r * 100n;
  const denominator = aScale * rScale;
  // Non-negative inputs only; round half a local cent up.
  return (numerator * 2n + denominator) / (denominator * 2n);
}

export function formatComparisonCents(cents: bigint, compact = false): string {
  const absolute = cents < 0n ? -cents : cents;
  const fraction = (absolute % 100n).toString().padStart(2, '0');
  return `${(absolute / 100n).toLocaleString('en-US')}${compact && fraction === '00' ? '' : `.${fraction}`}`;
}

export function compareCurrencyExample({
  usdAmount,
  latestDisplayRate,
  example,
  pending = false,
}: {
  usdAmount: number;
  latestDisplayRate: number;
  example: CurrencyExample;
  pending?: boolean;
}): CurrencyComparison {
  const unavailable = (reason: string): CurrencyComparison => ({ kind: 'unavailable', reason });
  if (!Number.isFinite(usdAmount) || usdAmount < 0) {
    return unavailable('The simulated position is unavailable.');
  }
  if (pending) return unavailable('Waiting for the simulated position to settle.');
  if (usdAmount === 0) return { kind: 'empty' };
  const { earlier, latest } = example;
  if (latest.status === 'stale') return unavailable('The latest example rate is out of date.');
  if (latest.status !== 'available' || latest.rate === null || !Number.isFinite(latest.rate) || latest.rate <= 0) {
    return unavailable('The latest example rate is unavailable.');
  }
  if (!Number.isFinite(latestDisplayRate) || latestDisplayRate <= 0 || latest.rate !== latestDisplayRate) {
    return unavailable('The latest example rate does not match the display rate.');
  }
  if (earlier.status !== 'available' || earlier.rate === null || !Number.isFinite(earlier.rate) || earlier.rate <= 0) {
    return unavailable('The earlier example rate is unavailable.');
  }
  const earlierCents = estimateCents(usdAmount, earlier.rate);
  const latestCents = estimateCents(usdAmount, latest.rate);
  const deltaCents = latestCents - earlierCents;
  return {
    kind: 'comparison', earlierCents, latestCents, deltaCents,
    direction: deltaCents > 0n ? 'higher' : deltaCents < 0n ? 'lower' : earlier.rate === latest.rate ? 'equal' : 'rounded-zero',
    earlierRate: earlier.rate, latestRate: latest.rate,
  };
}
