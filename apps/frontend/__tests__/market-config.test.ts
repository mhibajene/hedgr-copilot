import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  resolveMarket,
  resolveLocalCurrencyCode,
  getCurrentMarketConfig,
  setMarket,
  isMarketSwitcherEnabled,
  MARKET_CONFIG,
  type MarketCode,
} from '../config/market';

describe('Market Config', () => {
  // Store original env and localStorage
  const originalEnv = { ...process.env };
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    // Reset env
    process.env = { ...originalEnv };
    
    // Mock localStorage
    localStorageMock = {};
    
    // Mock window object in Node test environment
    if (typeof window === 'undefined') {
      // @ts-expect-error - Creating window in Node test environment
      global.window = {
        localStorage: {
          getItem: vi.fn((key: string) => localStorageMock[key] || null),
          setItem: vi.fn((key: string, value: string) => {
            localStorageMock[key] = value;
          }),
          removeItem: vi.fn((key: string) => {
            delete localStorageMock[key];
          }),
          clear: vi.fn(() => {
            localStorageMock = {};
          }),
          key: vi.fn(),
          length: 0,
        },
        location: {
          reload: vi.fn(),
        },
      };
    }
    
    global.localStorage = global.window.localStorage as Storage;
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  describe('MARKET_CONFIG', () => {
    test('contains all expected markets', () => {
      expect(MARKET_CONFIG.ZM).toBeDefined();
      expect(MARKET_CONFIG.NG).toBeDefined();
      expect(MARKET_CONFIG.KE).toBeDefined();
    });

    test('each market has required fields', () => {
      Object.values(MARKET_CONFIG).forEach((config) => {
        expect(config.code).toBeDefined();
        expect(config.name).toBeDefined();
        expect(config.localCurrency).toBeDefined();
        expect(config.localCurrencySymbol).toBeDefined();
      });
    });

    test('ZM market has ZMW currency', () => {
      expect(MARKET_CONFIG.ZM.localCurrency).toBe('ZMW');
    });

    test('NG market has NGN currency', () => {
      expect(MARKET_CONFIG.NG.localCurrency).toBe('NGN');
    });

    test('KE market has KES currency', () => {
      expect(MARKET_CONFIG.KE.localCurrency).toBe('KES');
    });
  });

  describe('resolveMarket', () => {
    test('returns ZM as default fallback', () => {
      expect(resolveMarket()).toBe('ZM');
    });

    test('returns env default when set', () => {
      process.env.NEXT_PUBLIC_DEFAULT_MARKET = 'NG';
      expect(resolveMarket()).toBe('NG');
    });

    test('returns localStorage value when market switcher enabled', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'true';
      localStorageMock['hedgr:demo-market'] = 'KE';
      expect(resolveMarket()).toBe('KE');
    });

    test('ignores localStorage when market switcher disabled', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'false';
      localStorageMock['hedgr:demo-market'] = 'KE';
      expect(resolveMarket()).toBe('ZM');
    });

    test('falls back to env when localStorage has invalid value', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'true';
      process.env.NEXT_PUBLIC_DEFAULT_MARKET = 'NG';
      localStorageMock['hedgr:demo-market'] = 'INVALID' as MarketCode;
      expect(resolveMarket()).toBe('NG');
    });

    test('is SSR-safe (handles missing window)', () => {
      const originalWindow = global.window;
      // @ts-expect-error - Testing SSR scenario
      delete global.window;
      
      expect(() => resolveMarket()).not.toThrow();
      expect(resolveMarket()).toBe('ZM');
      
      global.window = originalWindow;
    });
  });

  describe('resolveLocalCurrencyCode', () => {
    test('returns ZMW for default market', () => {
      expect(resolveLocalCurrencyCode()).toBe('ZMW');
    });

    test('returns NGN when market is NG', () => {
      process.env.NEXT_PUBLIC_DEFAULT_MARKET = 'NG';
      expect(resolveLocalCurrencyCode()).toBe('NGN');
    });

    test('returns KES when market is KE', () => {
      process.env.NEXT_PUBLIC_DEFAULT_MARKET = 'KE';
      expect(resolveLocalCurrencyCode()).toBe('KES');
    });
  });

  describe('getCurrentMarketConfig', () => {
    test('returns config for default market', () => {
      const config = getCurrentMarketConfig();
      expect(config.code).toBe('ZM');
      expect(config.localCurrency).toBe('ZMW');
    });

    test('returns config for env market', () => {
      process.env.NEXT_PUBLIC_DEFAULT_MARKET = 'NG';
      const config = getCurrentMarketConfig();
      expect(config.code).toBe('NG');
      expect(config.localCurrency).toBe('NGN');
    });
  });

  describe('isMarketSwitcherEnabled', () => {
    test('returns false by default', () => {
      expect(isMarketSwitcherEnabled()).toBe(false);
    });

    test('returns true when env var is "true"', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'true';
      expect(isMarketSwitcherEnabled()).toBe(true);
    });

    test('returns false for any non-"true" value', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'false';
      expect(isMarketSwitcherEnabled()).toBe(false);

      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = '1';
      expect(isMarketSwitcherEnabled()).toBe(false);
    });
  });

  describe('setMarket', () => {
    test('throws error when market switcher disabled', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'false';
      expect(() => setMarket('NG')).toThrow('Market switcher is not enabled');
    });

    test('throws error for invalid market code', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'true';
      expect(() => setMarket('INVALID' as MarketCode)).toThrow('Invalid market code');
    });

    test('saves valid market to localStorage', () => {
      process.env.NEXT_PUBLIC_ENABLE_MARKET_SWITCHER = 'true';
      
      // Mock is already set up in beforeEach
      setMarket('NG');
      
      expect(localStorageMock['hedgr:demo-market']).toBe('NG');
      expect(global.window.location.reload).toHaveBeenCalled();
    });
  });
});
