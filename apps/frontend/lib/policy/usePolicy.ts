'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Policy, ResolvedPolicy } from './schema';

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type PolicyStatus = 'loading' | 'ready' | 'error';

export interface UsePolicyResult {
  status: PolicyStatus;
  market: string;
  version: string;
  resolvedAt: string;
  policy: Policy | null;
  /**
   * Returns `true` only when:
   *   1. status === 'ready'
   *   2. policy.features[key] === true (strict boolean check)
   *
   * Deny-by-default: returns `false` while loading, on error, or for
   * non-boolean feature values (e.g. earnMode).
   */
  isFeatureEnabled: (key: keyof Policy['features']) => boolean;
}

// ---------------------------------------------------------------------------
// Module-level singleton cache (de-duplication)
// ---------------------------------------------------------------------------

let cachedPromise: Promise<ResolvedPolicy> | null = null;
let cachedData: ResolvedPolicy | null = null;
let cachedError = false;

function fetchPolicy(): Promise<ResolvedPolicy> {
  if (cachedPromise) return cachedPromise;

  cachedPromise = fetch('/api/policy')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Policy API responded with ${res.status}`);
      }
      return res.json() as Promise<ResolvedPolicy>;
    })
    .then((data) => {
      cachedData = data;
      return data;
    })
    .catch((err) => {
      cachedError = true;
      throw err;
    });

  return cachedPromise;
}

/**
 * Reset the module-level cache. Exported exclusively for test isolation —
 * production code must never call this.
 */
export function __resetPolicyCacheForTests(): void {
  cachedPromise = null;
  cachedData = null;
  cachedError = false;
}

// ---------------------------------------------------------------------------
// Deny-by-default defaults
// ---------------------------------------------------------------------------

const DENY_RESULT: Omit<UsePolicyResult, 'status'> = {
  market: '',
  version: '',
  resolvedAt: '',
  policy: null,
  isFeatureEnabled: () => false,
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * usePolicy — single source of truth for client-side policy consumption.
 *
 * Fetches `GET /api/policy` once (module-level singleton promise) and
 * provides deny-by-default semantics while loading or on error.
 *
 * Usage:
 * ```tsx
 * const { status, isFeatureEnabled } = usePolicy();
 * if (isFeatureEnabled('earn')) { ... }
 * ```
 */
export function usePolicy(): UsePolicyResult {
  // If data is already cached, initialise straight to 'ready'
  const [status, setStatus] = useState<PolicyStatus>(
    cachedData ? 'ready' : cachedError ? 'error' : 'loading',
  );
  const [data, setData] = useState<ResolvedPolicy | null>(cachedData);

  useEffect(() => {
    // Skip fetch when data was already resolved synchronously
    if (cachedData) return;

    let mounted = true;

    fetchPolicy()
      .then((resolved) => {
        if (!mounted) return;
        setData(resolved);
        setStatus('ready');
      })
      .catch(() => {
        if (!mounted) return;
        setStatus('error');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const isFeatureEnabled = useCallback(
    (key: keyof Policy['features']): boolean => {
      if (status !== 'ready' || !data) return false;
      return data.policy.features[key] === true;
    },
    [status, data],
  );

  if (status !== 'ready' || !data) {
    return { ...DENY_RESULT, status };
  }

  return {
    status,
    market: data.market,
    version: data.version,
    resolvedAt: data.resolvedAt,
    policy: data.policy,
    isFeatureEnabled,
  };
}
