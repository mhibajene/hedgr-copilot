import type { DefiAdapter } from './types';
import { getDefiMode } from './mode';
import { mockDefi } from './mock';
import { fetchAaveNetApy } from './providers/aave';

/**
 * Aave adapter implementation
 */
const aaveDefi: DefiAdapter = {
  async getNetApy() {
    return fetchAaveNetApy();
  },
};

/**
 * Get the appropriate DeFi adapter based on environment mode
 */
export function getDefiAdapter(): DefiAdapter {
  const mode = getDefiMode();
  return mode === 'aave' ? aaveDefi : mockDefi;
}

/**
 * Default export for convenience
 */
export const defiAdapter = getDefiAdapter();

