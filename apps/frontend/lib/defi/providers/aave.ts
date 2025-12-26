// Aave DeFi provider (server-only, isolated)
// Must never run in CI - guard with env check

import { getDefiMode } from '../mode';

/**
 * Fetches net APY from Aave protocol
 * @throws Error if called in CI or when DEFI_MODE is not aave
 */
export async function fetchAaveNetApy(): Promise<number> {
  // Guard: Ensure we're in aave mode
  if (getDefiMode() !== 'aave') {
    throw new Error('Aave provider requires NEXT_PUBLIC_DEFI_MODE=aave');
  }

  // Guard: Never run in CI
  if (process.env.CI === 'true') {
    throw new Error('Aave provider must not run in CI. Use DEFI_MODE=mock instead.');
  }

  // TODO: Implement actual Aave APY fetching logic
  // This would typically involve:
  // 1. Connecting to Aave protocol (e.g., via ethers.js or viem)
  // 2. Querying the lending pool for current APY
  // 3. Calculating net APY (supply APY - borrow APY if applicable)
  // 4. Handling errors and rate limits appropriately

  // Placeholder: Return default APY for now
  // In production, replace with actual Aave API call
  const response = await fetch(
    'https://api.aave.com/v1/lendingPool/currentAPY', // Placeholder URL
    { next: { revalidate: 300 } } // Cache for 5 minutes
  );

  if (!response.ok) {
    throw new Error(`Aave API error: ${response.statusText}`);
  }

  // Placeholder: Return default APY
  // TODO: Parse actual response from Aave
  return 0.08; // 8% APY placeholder
}

