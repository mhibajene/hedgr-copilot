// CoinGecko FX provider (server-only, isolated)
// Must never run in CI - guard with env check

import { getFxMode } from '../../fx';

export interface FxRate {
  base: string;
  quote: string;
  rate: number;
  ts: number;
}

/**
 * Fetches USD/ZMW rate from CoinGecko API
 * @throws Error if called in CI or when FX_MODE is not coingecko
 */
export async function fetchCoinGeckoRate(): Promise<FxRate> {
  // Guard: Ensure we're in coingecko mode
  if (getFxMode() !== 'coingecko') {
    throw new Error('CoinGecko provider requires NEXT_PUBLIC_FX_MODE=coingecko');
  }

  // Guard: Never run in CI
  if (process.env.CI === 'true') {
    throw new Error('CoinGecko provider must not run in CI. Use FX_MODE=fixed instead.');
  }

  // Note: CoinGecko doesn't have direct ZMW/USD pair
  // This is a placeholder implementation
  // In production, you would:
  // 1. Fetch USD/ZMW from a provider that supports it
  // 2. Or use a proxy rate (e.g., USD/ZAR * ZAR/ZMW approximation)
  // 3. Handle rate limits and errors appropriately

  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd',
    { next: { revalidate: 60 } } // Cache for 60 seconds
  );

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.statusText}`);
  }

  // Placeholder: Return default rate for now
  // TODO: Implement actual ZMW/USD fetching logic
  return {
    base: 'USD',
    quote: 'ZMW',
    rate: 20, // Placeholder
    ts: Date.now(),
  };
}

