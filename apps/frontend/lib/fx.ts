export const FX_RATE_ZMW_PER_USD_DEFAULT = 20;

export function getFxMode(): 'fixed' | 'coingecko' {
  return process.env.NEXT_PUBLIC_FX_MODE === 'coingecko' ? 'coingecko' : 'fixed';
}

export function zmwToUsd(amount: number): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error(`zmwToUsd: amount must be a finite, non-negative number, got ${amount}`);
  }
  return +(amount / FX_RATE_ZMW_PER_USD_DEFAULT).toFixed(2);
}

