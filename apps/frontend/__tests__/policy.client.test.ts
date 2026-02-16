// @vitest-environment jsdom

import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor, cleanup } from '@testing-library/react';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const MOCK_RESOLVED_POLICY = {
  version: 'v1',
  market: 'KE',
  resolvedAt: '2026-01-01T00:00:00.000Z',
  policy: {
    features: {
      earn: true,
      earnMode: 'on' as const,
      payLinks: false,
      stablecoinSend: false,
    },
    limits: { maxDepositUSD: 500, maxWithdrawUSD: 500, maxSingleTransferUSD: 200 },
    settlement: { localCurrencyFirst: true, localCurrency: 'KES' },
    fx: { requireProvenance: false, requiredFields: [] },
    disclosures: { requiredKeys: [] },
    bannedClaims: [],
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mockFetchOk() {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => MOCK_RESOLVED_POLICY,
  });
}

function mockFetchNon200() {
  global.fetch = vi.fn().mockResolvedValue({
    ok: false,
    status: 500,
    statusText: 'Internal Server Error',
  });
}

function mockFetchReject() {
  global.fetch = vi.fn().mockRejectedValue(new Error('Network failure'));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('usePolicy hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  // -----------------------------------------------------------------------
  // AC1: deny-by-default while loading, enabled when ready
  // -----------------------------------------------------------------------
  test('isFeatureEnabled returns false while loading, true when ready', async () => {
    mockFetchOk();

    const { usePolicy, __resetPolicyCacheForTests } = await import(
      '../lib/policy/usePolicy'
    );
    __resetPolicyCacheForTests();

    const { result } = renderHook(() => usePolicy());

    // Synchronous first render — still loading
    expect(result.current.status).toBe('loading');
    expect(result.current.isFeatureEnabled('earn')).toBe(false);

    await waitFor(() => {
      expect(result.current.status).toBe('ready');
    });

    expect(result.current.isFeatureEnabled('earn')).toBe(true);
    expect(result.current.isFeatureEnabled('payLinks')).toBe(false);
    expect(result.current.isFeatureEnabled('stablecoinSend')).toBe(false);
    expect(result.current.market).toBe('KE');
    expect(result.current.version).toBe('v1');
    expect(result.current.resolvedAt).toBe('2026-01-01T00:00:00.000Z');
    expect(result.current.policy).toEqual(MOCK_RESOLVED_POLICY.policy);
  });

  // -----------------------------------------------------------------------
  // AC2: fetch de-duplication — called once across two hook instances
  // -----------------------------------------------------------------------
  test('fetch called once even when usePolicy is invoked twice', async () => {
    mockFetchOk();

    const { usePolicy, __resetPolicyCacheForTests } = await import(
      '../lib/policy/usePolicy'
    );
    __resetPolicyCacheForTests();

    const { result: r1 } = renderHook(() => usePolicy());
    const { result: r2 } = renderHook(() => usePolicy());

    await waitFor(() => {
      expect(r1.current.status).toBe('ready');
    });
    await waitFor(() => {
      expect(r2.current.status).toBe('ready');
    });

    // The singleton promise means fetch is invoked exactly once
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/api/policy');
  });

  // -----------------------------------------------------------------------
  // AC3: fetch rejects → error + deny-by-default
  // -----------------------------------------------------------------------
  test('status is error and isFeatureEnabled returns false when fetch rejects', async () => {
    mockFetchReject();

    const { usePolicy, __resetPolicyCacheForTests } = await import(
      '../lib/policy/usePolicy'
    );
    __resetPolicyCacheForTests();

    const { result } = renderHook(() => usePolicy());

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.isFeatureEnabled('earn')).toBe(false);
    expect(result.current.policy).toBeNull();
  });

  // -----------------------------------------------------------------------
  // AC4: non-200 response → error, no json parse attempted
  // -----------------------------------------------------------------------
  test('non-200 response yields error status without parsing body', async () => {
    mockFetchNon200();

    const { usePolicy, __resetPolicyCacheForTests } = await import(
      '../lib/policy/usePolicy'
    );
    __resetPolicyCacheForTests();

    const { result } = renderHook(() => usePolicy());

    await waitFor(() => {
      expect(result.current.status).toBe('error');
    });

    expect(result.current.isFeatureEnabled('earn')).toBe(false);
    expect(result.current.policy).toBeNull();

    // Verify .json() was never called on the non-200 response
    const fetchMock = global.fetch as ReturnType<typeof vi.fn>;
    const response = await fetchMock.mock.results[0].value;
    expect(response.json).toBeUndefined();
  });
});
