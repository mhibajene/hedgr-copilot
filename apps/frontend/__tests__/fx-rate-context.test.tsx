// @vitest-environment jsdom

import React from 'react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, waitFor, screen, cleanup } from '@testing-library/react';
import { FxRateProvider, useFxRate, isFxRateAvailable } from '../lib/fx/FxRateContext';

// Mock fetch
global.fetch = vi.fn();

// Mock market config
vi.mock('../config/market', () => ({
  resolveMarket: () => 'ZM',
  resolveLocalCurrencyCode: () => 'ZMW',
}));

// Mock getFxMode
vi.mock('../lib/fx', () => ({
  getFxMode: () => 'fixed',
}));

describe('FxRateContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  describe('FxRateProvider', () => {
    test('fetches FX rate on mount', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          base: 'USD',
          quote: 'ZMW',
          rate: 20,
          ts: Date.now(),
        }),
      });
      global.fetch = mockFetch;

      function TestComponent() {
        const fxRate = useFxRate();
        return (
          <div>
            <div data-testid="rate">{fxRate.rate}</div>
            <div data-testid="loading">{fxRate.isLoading ? 'loading' : 'loaded'}</div>
          </div>
        );
      }

      render(
        <FxRateProvider>
          <TestComponent />
        </FxRateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('loaded');
      });

      expect(screen.getByTestId('rate').textContent).toBe('20');
      expect(mockFetch).toHaveBeenCalledWith('/api/fx?quote=ZMW', expect.any(Object));
    });

    test('handles API error gracefully', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });
      global.fetch = mockFetch;

      function TestComponent() {
        const fxRate = useFxRate();
        return (
          <div>
            <div data-testid="error">{fxRate.error || 'no-error'}</div>
            <div data-testid="loading">{fxRate.isLoading ? 'loading' : 'loaded'}</div>
          </div>
        );
      }

      render(
        <FxRateProvider>
          <TestComponent />
        </FxRateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('loading').textContent).toBe('loaded');
      });

      expect(screen.getByTestId('error').textContent).toContain('FX API error');
    });

    test('validates response structure', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          // Missing required fields
          base: 'USD',
        }),
      });
      global.fetch = mockFetch;

      function TestComponent() {
        const fxRate = useFxRate();
        return <div data-testid="error">{fxRate.error || 'no-error'}</div>;
      }

      render(
        <FxRateProvider>
          <TestComponent />
        </FxRateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('error').textContent).toContain('Invalid FX API response');
      });
    });

    test('exposes refresh function', async () => {
      let callCount = 0;
      const mockFetch = vi.fn().mockImplementation(() => {
        callCount++;
        return Promise.resolve({
          ok: true,
          json: async () => ({
            base: 'USD',
            quote: 'ZMW',
            rate: 20 + callCount,
            ts: Date.now(),
          }),
        });
      });
      global.fetch = mockFetch;

      function TestComponent() {
        const fxRate = useFxRate();
        return (
          <div>
            <div data-testid="rate-refresh-test">{fxRate.rate}</div>
            <button onClick={fxRate.refresh} data-testid="refresh-button">
              Refresh
            </button>
          </div>
        );
      }

      const { getByTestId } = render(
        <FxRateProvider>
          <TestComponent />
        </FxRateProvider>
      );

      await waitFor(() => {
        expect(getByTestId('rate-refresh-test').textContent).toBe('21');
      });

      // Reset call count to only count calls from this point
      mockFetch.mockClear();
      
      // Click refresh
      getByTestId('refresh-button').click();

      await waitFor(() => {
        expect(getByTestId('rate-refresh-test').textContent).toBe('22');
      });

      // Should have been called once for the refresh
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('useFxRate', () => {
    test('throws error when used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      function TestComponent() {
        useFxRate(); // This should throw
        return <div>Test</div>;
      }

      expect(() => render(<TestComponent />)).toThrow(
        'useFxRate must be used within FxRateProvider'
      );

      console.error = originalError;
    });
  });

  describe('isFxRateAvailable', () => {
    test('returns true for valid rate', () => {
      const validRate = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: () => {},
      };
      expect(isFxRateAvailable(validRate)).toBe(true);
    });

    test('returns false when loading', () => {
      const loadingRate = {
        base: 'USD',
        quote: 'ZMW',
        rate: 0,
        timestamp: 0,
        isLoading: true,
        error: null,
        isStale: false,
        refresh: () => {},
      };
      expect(isFxRateAvailable(loadingRate)).toBe(false);
    });

    test('returns false when error exists', () => {
      const errorRate = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: 'API error',
        isStale: false,
        refresh: () => {},
      };
      expect(isFxRateAvailable(errorRate)).toBe(false);
    });

    test('returns false when rate is zero', () => {
      const zeroRate = {
        base: 'USD',
        quote: 'ZMW',
        rate: 0,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: () => {},
      };
      expect(isFxRateAvailable(zeroRate)).toBe(false);
    });

    test('returns false when timestamp is zero', () => {
      const noTimestamp = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: 0,
        isLoading: false,
        error: null,
        isStale: false,
        refresh: () => {},
      };
      expect(isFxRateAvailable(noTimestamp)).toBe(false);
    });
  });
});
