// @vitest-environment jsdom

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useLatestFx } from '../lib/hooks/useLatestFx';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal('fetch', mockFetch);
  process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:5050';
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe('useLatestFx', () => {
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
});
