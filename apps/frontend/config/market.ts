/**
 * Market Configuration SSoT
 * 
 * Defines supported markets and their local currencies.
 * This is the single source of truth for market/currency resolution.
 */

export type MarketCode = 'ZM' | 'NG' | 'KE';

export type SupportedQuote = 'ZMW' | 'NGN' | 'KES';

export interface MarketConfig {
  code: MarketCode;
  name: string;
  localCurrency: string;
  localCurrencySymbol: string;
}

export const MARKET_CONFIG: Record<MarketCode, MarketConfig> = {
  ZM: {
    code: 'ZM',
    name: 'Zambia',
    localCurrency: 'ZMW',
    localCurrencySymbol: 'ZK',
  },
  NG: {
    code: 'NG',
    name: 'Nigeria',
    localCurrency: 'NGN',
    localCurrencySymbol: '₦',
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    localCurrency: 'KES',
    localCurrencySymbol: 'KSh',
  },
};

/** Storage key for market selection (single source of truth) */
export const MARKET_STORAGE_KEY = 'hedgr.market';

/** Custom event name for same-tab market changes */
export const MARKET_CHANGE_EVENT = 'hedgr:market-change';

/**
 * SSR-safe: Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Resolve the current market from:
 * 1. localStorage["hedgr.market"] (if in browser and valid)
 * 2. Environment default (NEXT_PUBLIC_DEFAULT_MARKET)
 * 3. Hardcoded fallback: ZM
 * 
 * @returns MarketCode - SSR-safe, never throws
 */
export function resolveMarket(): MarketCode {
  // 1. Check localStorage if in browser (regardless of feature flag for reads)
  if (isBrowser()) {
    try {
      const stored = localStorage.getItem(MARKET_STORAGE_KEY);
      if (stored && isValidMarketCode(stored)) {
        return stored;
      }
    } catch {
      // localStorage access failed (e.g., private browsing), continue to fallback
    }
  }
  
  // 2. Check environment variable
  const envMarket = process.env.NEXT_PUBLIC_DEFAULT_MARKET;
  if (envMarket && isValidMarketCode(envMarket)) {
    return envMarket;
  }
  
  // 3. Final fallback
  return 'ZM';
}

/**
 * Resolve the local currency code for the current market.
 * 
 * @param market - Optional market code. If not provided, resolves current market.
 * @returns string - e.g., "ZMW", "NGN", "KES"
 */
export function resolveLocalCurrencyCode(market?: MarketCode): string {
  const marketCode = market ?? resolveMarket();
  return MARKET_CONFIG[marketCode].localCurrency;
}

/**
 * Get the full market config for the current market.
 */
export function getCurrentMarketConfig(): MarketConfig {
  const market = resolveMarket();
  return MARKET_CONFIG[market];
}

/**
 * Set the demo market (only works if NEXT_PUBLIC_ENABLE_MARKET_SWITCHER=true).
 * Dispatches a custom event to notify subscribers of the change.
 * 
 * @param market - MarketCode to set
 * @throws Error if not in browser or feature flag is off
 */
export function setMarket(market: MarketCode): void {
  const marketSwitcherEnabled = process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER === 'true';
  
  if (!marketSwitcherEnabled) {
    throw new Error('Market switcher is not enabled. Set NEXT_PUBLIC_ENABLE_MARKET_SWITCHER=true');
  }
  
  if (!isBrowser()) {
    throw new Error('setMarket can only be called in browser environment');
  }
  
  if (!isValidMarketCode(market)) {
    throw new Error(`Invalid market code: ${market}`);
  }
  
  try {
    localStorage.setItem(MARKET_STORAGE_KEY, market);
    // Dispatch custom event for same-tab reactivity (no reload needed)
    window.dispatchEvent(new Event(MARKET_CHANGE_EVENT));
  } catch (error) {
    throw new Error('Failed to save market selection: ' + (error instanceof Error ? error.message : String(error)));
  }
}

/**
 * Check if market switcher is enabled via feature flag.
 */
export function isMarketSwitcherEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER === 'true';
}

/**
 * Type guard for MarketCode
 */
function isValidMarketCode(value: unknown): value is MarketCode {
  return typeof value === 'string' && value in MARKET_CONFIG;
}

/**
 * Type guard for SupportedQuote
 * Validates that a string is a supported quote currency
 */
export function isSupportedQuote(value: string): value is SupportedQuote {
  return value === 'ZMW' || value === 'NGN' || value === 'KES';
}

// Re-export the hook from the client module for convenience
export { useSelectedMarket } from './useSelectedMarket';
