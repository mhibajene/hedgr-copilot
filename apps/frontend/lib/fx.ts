import type { SupportedQuote } from '../config/market';

export const FX_RATE_ZMW_PER_USD_DEFAULT = 20;

/**
 * Fixed exchange rates for demo/mock mode
 * Maps quote currency to rate (local currency per 1 USD)
 * These are demo-credible rates, not real-time data
 */
export const FIXED_RATE_BY_QUOTE: Record<SupportedQuote, number> = {
  ZMW: 20,    // Zambian Kwacha
  NGN: 1500,  // Nigerian Naira
  KES: 130,   // Kenyan Shilling
};

/**
 * Get fixed rate for a given quote currency
 * @throws Error if quote is not supported
 */
export function getFixedRate(quote: SupportedQuote): number {
  const rate = FIXED_RATE_BY_QUOTE[quote];
  if (rate === undefined) {
    throw new Error(`No fixed rate defined for quote currency: ${quote}`);
  }
  return rate;
}

export function getFxMode(): 'fixed' | 'coingecko' {
  return process.env.NEXT_PUBLIC_FX_MODE === 'coingecko' ? 'coingecko' : 'fixed';
}

export function zmwToUsd(amount: number): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error(`zmwToUsd: amount must be a finite, non-negative number, got ${amount}`);
  }
  return +(amount / FX_RATE_ZMW_PER_USD_DEFAULT).toFixed(2);
}

