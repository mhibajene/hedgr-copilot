// @vitest-environment jsdom

import React from 'react';
import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import type { FxRateData } from '../lib/fx/FxRateContext';

// Mock the FX rate context
vi.mock('../lib/fx/FxRateContext', () => ({
  useFxRate: vi.fn(),
  isFxRateAvailable: vi.fn(),
}));

// Mock market config
vi.mock('../config/market', () => ({
  getCurrentMarketConfig: vi.fn(() => ({
    code: 'ZM',
    name: 'Zambia',
    localCurrency: 'ZMW',
    localCurrencySymbol: 'ZK',
  })),
}));

import { BalanceWithLocalEstimate } from '../components/BalanceWithLocalEstimate';
import { useFxRate, isFxRateAvailable } from '../lib/fx/FxRateContext';

describe('BalanceWithLocalEstimate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Block mode (default)', () => {
    test('renders USD amount correctly', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      render(<BalanceWithLocalEstimate usdAmount={50} data-testid="usd-balance" />);

      // The passed data-testid now goes on the USD element itself
      expect(screen.getByTestId('usd-balance').textContent).toBe('$50.00');
    });

    test('shows local estimate with ≈ symbol when FX available', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      render(<BalanceWithLocalEstimate usdAmount={50} />);

      // Local estimate now uses unified 'local-balance' testid
      const localEstimate = screen.getByTestId('local-balance');
      expect(localEstimate.textContent).toBe('≈ ZMW 1,000.00');
    });

    test('calculates conversion correctly for different amounts', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      const { rerender } = render(<BalanceWithLocalEstimate usdAmount={100} />);
      expect(screen.getByTestId('local-balance').textContent).toBe('≈ ZMW 2,000.00');

      rerender(<BalanceWithLocalEstimate usdAmount={25.50} />);
      expect(screen.getByTestId('local-balance').textContent).toBe('≈ ZMW 510.00');
    });

    test('shows fallback text when FX unavailable (loading)', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 0,
        timestamp: 0,
        isLoading: true,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(false);

      render(<BalanceWithLocalEstimate usdAmount={50} />);

      // Now uses unified 'local-balance' testid for both available and unavailable states
      expect(screen.getByTestId('local-balance').textContent).toBe('Local estimate unavailable');
    });

    test('shows fallback text when FX unavailable (error)', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 0,
        timestamp: 0,
        isLoading: false,
        error: 'API error',
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(false);

      render(<BalanceWithLocalEstimate usdAmount={50} />);

      expect(screen.getByTestId('local-balance').textContent).toBe('Local estimate unavailable');
    });

    test('shows fallback text when rate is zero', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 0,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(false);

      render(<BalanceWithLocalEstimate usdAmount={50} />);

      expect(screen.getByTestId('local-balance').textContent).toBe('Local estimate unavailable');
    });

    test('applies custom className to container', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      const { container } = render(<BalanceWithLocalEstimate usdAmount={50} className="text-gray-600" />);

      // className now applies to the container div (parent of USD element)
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('text-gray-600');
    });
  });

  describe('Inline mode', () => {
    test('renders compactly with inline prop', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      render(<BalanceWithLocalEstimate usdAmount={50} inline data-testid="inline-balance" />);

      // In inline mode, the testid goes on the <strong> element containing USD
      const usdElement = screen.getByTestId('inline-balance');
      expect(usdElement.tagName).toBe('STRONG');
      expect(usdElement.textContent).toBe('$50.00');
      expect(screen.getByTestId('local-balance').textContent).toBe('≈ ZMW 1,000.00');
    });

    test('shows compact unavailable text in inline mode', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 0,
        timestamp: 0,
        isLoading: true,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(false);

      render(<BalanceWithLocalEstimate usdAmount={50} inline />);

      // Uses unified 'local-balance' testid
      expect(screen.getByTestId('local-balance').textContent).toBe('(estimate unavailable)');
    });
  });

  describe('Currency code display', () => {
    test('uses currency code from market config (not symbol)', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      render(<BalanceWithLocalEstimate usdAmount={50} />);

      // Should use 'ZMW' currency code from mocked market config
      expect(screen.getByTestId('local-balance').textContent).toBe('≈ ZMW 1,000.00');
    });
  });

  describe('Edge cases', () => {
    test('handles zero USD amount', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      render(<BalanceWithLocalEstimate usdAmount={0} data-testid="usd-balance" />);

      expect(screen.getByTestId('usd-balance').textContent).toBe('$0.00');
      expect(screen.getByTestId('local-balance').textContent).toBe('≈ ZMW 0.00');
    });

    test('handles decimal USD amounts', () => {
      const mockFxRate: FxRateData = {
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        timestamp: Date.now(),
        isLoading: false,
        error: null,
        isStale: false,
        refresh: vi.fn(),
      };
      
      vi.mocked(useFxRate).mockReturnValue(mockFxRate);
      vi.mocked(isFxRateAvailable).mockReturnValue(true);

      render(<BalanceWithLocalEstimate usdAmount={123.45} data-testid="usd-balance" />);

      expect(screen.getByTestId('usd-balance').textContent).toBe('$123.45');
      expect(screen.getByTestId('local-balance').textContent).toBe('≈ ZMW 2,469.00');
    });
  });
});
