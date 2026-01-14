'use client';

/**
 * Client-side React hook for reactive market selection.
 * 
 * This module is separated from market.ts to allow server components
 * to import market config without pulling in client-only React hooks.
 */

import { useSyncExternalStore } from 'react';
import { resolveMarket, MARKET_CHANGE_EVENT, type MarketCode } from './market';

/**
 * Subscribe to market changes (cross-tab via 'storage' event + same-tab via custom event).
 * SSR-safe: returns noop unsubscribe on server.
 * 
 * @param onStoreChange - Function to call when market changes
 * @returns Unsubscribe function
 */
function subscribeMarket(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handler = () => onStoreChange();

  // Listen for cross-tab storage changes
  window.addEventListener('storage', handler);
  // Listen for same-tab market changes
  window.addEventListener(MARKET_CHANGE_EVENT, handler);

  return () => {
    window.removeEventListener('storage', handler);
    window.removeEventListener(MARKET_CHANGE_EVENT, handler);
  };
}

/**
 * Get snapshot of current market (for useSyncExternalStore).
 * Client-side snapshot reads from localStorage.
 */
function getMarketSnapshot(): MarketCode {
  return resolveMarket();
}

/**
 * Server snapshot for useSyncExternalStore.
 * Returns the default market for SSR (never reads localStorage).
 */
function getMarketServerSnapshot(): MarketCode {
  const env = process.env.NEXT_PUBLIC_DEFAULT_MARKET;
  return (env === 'ZM' || env === 'NG' || env === 'KE') ? env : 'ZM';
}

/**
 * React hook for reactive market selection.
 * Uses useSyncExternalStore for tear-free reads.
 * 
 * @returns Current MarketCode, reactively updated on market change
 */
export function useSelectedMarket(): MarketCode {
  return useSyncExternalStore(subscribeMarket, getMarketSnapshot, getMarketServerSnapshot);
}
