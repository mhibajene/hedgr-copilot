// @vitest-environment jsdom

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useLatestFx } from '../lib/hooks/useLatestFx';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'magic');
  vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', 'http://localhost:5050');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'coingecko');
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe('useLatestFx', () => {
  test('fixed mode adapts the deterministic same-origin response without a backend base URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'fixed');
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', '');
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        base: 'USD',
        quote: 'ZMW',
        rate: 20,
        ts: 1700000000123,
        provider: 'fixed',
      }),
    });

    const { result } = renderHook(() => useLatestFx('USDZMW'));

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data).toEqual({
      pair: 'USDZMW',
      rate: 20,
      ts: 1700000000,
    });
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/fx?quote=ZMW',
      expect.objectContaining({})
    );
  });

  test('success: fetch returns { pair, rate, ts } and status becomes success', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ pair: 'USDZMW', rate: 20, ts: 1234567890 }),
    });

    const { result } = renderHook(() => useLatestFx('USDZMW'));

    expect(result.current.status).toBe('loading');

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });

    expect(result.current.data).toEqual({
      pair: 'USDZMW',
      rate: 20,
      ts: 1234567890,
    });
    expect(mockFetch).toHaveBeenCalledWith(
      'http://localhost:5050/v1/fx/latest?pair=USDZMW',
      expect.objectContaining({})
    );
  });

  test('failure: non-2xx response sets status to error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 503,
    });

    const { result } = renderHook(() => useLatestFx('USDZMW'));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.data).toBeUndefined();
  });

  test('failure: fetch reject sets status to error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const { result } = renderHook(() => useLatestFx('USDZMW'));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.data).toBeUndefined();
  });

  test('retry: after failure, retry() with success transitions to success', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ pair: 'USDZMW', rate: 20, ts: 1234567890 }),
      });

    const { result } = renderHook(() => useLatestFx('USDZMW'));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    await act(async () => {
      result.current.retry();
    });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
      expect(result.current.data?.rate).toBe(20);
    });

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  test('live mode fails closed when the backend base URL is absent', async () => {
    vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'live');
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', '');

    const { result } = renderHook(() => useLatestFx('USDZMW'));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });
});
