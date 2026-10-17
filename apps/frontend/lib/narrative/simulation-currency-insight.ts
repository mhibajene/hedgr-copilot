/** HOME-SOFTHALO-RATESLIDER-BUNDLE-001: fixed illustrative stops, never pricing. */
export const ZMW_EXAMPLE_RATES = Object.freeze([24.5, 27, 29.5] as const);

export type RateFigure =
  | { kind: 'empty' }
  | { kind: 'unavailable'; reason: string }
  | { kind: 'figure'; cents: bigint };

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

export function formatRateCents(cents: bigint, compact = false): string {
  const absolute = cents < 0n ? -cents : cents;
  const fraction = (absolute % 100n).toString().padStart(2, '0');
  return `${(absolute / 100n).toLocaleString('en-US')}${compact && fraction === '00' ? '' : `.${fraction}`}`;
}

export function computeRateFigure({ usdAmount, rate, pending = false }: {
  usdAmount: number;
  rate: number;
  pending?: boolean;
}): RateFigure {
  if (!Number.isFinite(usdAmount) || usdAmount < 0) return { kind: 'unavailable', reason: 'The simulated position is unavailable.' };
  if (pending) return { kind: 'unavailable', reason: 'Waiting for the simulated position to settle.' };
  if (usdAmount === 0) return { kind: 'empty' };
  if (!Number.isFinite(rate) || rate <= 0) return { kind: 'unavailable', reason: 'The latest example rate is unavailable.' };
  return { kind: 'figure', cents: estimateCents(usdAmount, rate) };
}
