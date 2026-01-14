import { test, expect, describe, beforeEach, vi } from 'vitest';
import { getFxMode, FX_RATE_ZMW_PER_USD_DEFAULT, zmwToUsd } from '../lib/fx';

describe('FX Service', () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_FX_MODE;
  });

  describe('getFxMode', () => {
    test('returns fixed by default', () => {
      expect(getFxMode()).toBe('fixed');
    });

    test('returns fixed when NEXT_PUBLIC_FX_MODE=fixed', () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'fixed';
      expect(getFxMode()).toBe('fixed');
    });

    test('returns coingecko when NEXT_PUBLIC_FX_MODE=coingecko', () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'coingecko';
      expect(getFxMode()).toBe('coingecko');
    });
  });

  describe('FX_RATE_ZMW_PER_USD_DEFAULT', () => {
    test('default rate is 20', () => {
      expect(FX_RATE_ZMW_PER_USD_DEFAULT).toBe(20);
    });
  });

  describe('zmwToUsd', () => {
    test('converts 100 ZMW to 5.00 USD', () => {
      expect(zmwToUsd(100)).toBe(5);
    });

    test('converts 200 ZMW to 10.00 USD', () => {
      expect(zmwToUsd(200)).toBe(10);
    });

    test('converts 50 ZMW to 2.50 USD', () => {
      expect(zmwToUsd(50)).toBe(2.5);
    });

    test('throws error for negative input', () => {
      expect(() => zmwToUsd(-100)).toThrow('zmwToUsd: amount must be a finite, non-negative number');
    });

    test('throws error for NaN input', () => {
      expect(() => zmwToUsd(NaN)).toThrow('zmwToUsd: amount must be a finite, non-negative number');
    });

    test('throws error for Infinity input', () => {
      expect(() => zmwToUsd(Infinity)).toThrow('zmwToUsd: amount must be a finite, non-negative number');
    });

    test('throws error for -Infinity input', () => {
      expect(() => zmwToUsd(-Infinity)).toThrow('zmwToUsd: amount must be a finite, non-negative number');
    });

    test('handles zero input', () => {
      expect(zmwToUsd(0)).toBe(0);
    });
  });

  describe('FX API endpoint', () => {
    test('fixed mode returns constant rate 20 for ZMW', async () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'fixed';
      process.env.CI = undefined;
      
      const { GET } = await import('../app/api/fx/route');
      const mockRequest = {
        nextUrl: {
          searchParams: new URLSearchParams('quote=ZMW')
        }
      } as any;
      const response = await GET(mockRequest);
      const data = await response.json();
      
      expect(data.rate).toBe(20);
      expect(data.base).toBe('USD');
      expect(data.quote).toBe('ZMW');
      expect(typeof data.ts).toBe('number');
    });

    test('fixed mode returns rate 1500 for NGN', async () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'fixed';
      process.env.CI = undefined;
      
      const { GET } = await import('../app/api/fx/route');
      const mockRequest = {
        nextUrl: {
          searchParams: new URLSearchParams('quote=NGN')
        }
      } as any;
      const response = await GET(mockRequest);
      const data = await response.json();
      
      expect(data.rate).toBe(1500);
      expect(data.base).toBe('USD');
      expect(data.quote).toBe('NGN');
    });

    test('fixed mode returns rate 130 for KES', async () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'fixed';
      process.env.CI = undefined;
      
      const { GET } = await import('../app/api/fx/route');
      const mockRequest = {
        nextUrl: {
          searchParams: new URLSearchParams('quote=KES')
        }
      } as any;
      const response = await GET(mockRequest);
      const data = await response.json();
      
      expect(data.rate).toBe(130);
      expect(data.base).toBe('USD');
      expect(data.quote).toBe('KES');
    });

    test('returns 503 in CI when mode is coingecko', async () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'coingecko';
      process.env.CI = 'true';
      
      const { GET } = await import('../app/api/fx/route');
      const mockRequest = {
        nextUrl: {
          searchParams: new URLSearchParams('quote=ZMW')
        }
      } as any;
      const response = await GET(mockRequest);
      const data = await response.json();
      
      expect(response.status).toBe(503);
      expect(data.error).toContain('FX unavailable in CI');
    });
  });

  describe('CoinGecko provider', () => {
    test('throws error when called in CI', async () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'coingecko';
      process.env.CI = 'true';
      
      const { fetchCoinGeckoRate } = await import('../lib/fx/providers/coingecko');
      
      await expect(fetchCoinGeckoRate('ZMW')).rejects.toThrow('CoinGecko provider must not run in CI');
    });

    test('throws error when FX_MODE is not coingecko', async () => {
      process.env.NEXT_PUBLIC_FX_MODE = 'fixed';
      process.env.CI = undefined;
      
      const { fetchCoinGeckoRate } = await import('../lib/fx/providers/coingecko');
      
      await expect(fetchCoinGeckoRate('ZMW')).rejects.toThrow('CoinGecko provider requires NEXT_PUBLIC_FX_MODE=coingecko');
    });
  });
});

