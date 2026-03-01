'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchLatestFx, type LatestFxResponse } from '../fx/client';

export type UseLatestFxStatus = 'loading' | 'success' | 'error';

export interface UseLatestFxResult {
  status: UseLatestFxStatus;
  data?: LatestFxResponse;
  retry: () => void;
}

/**
 * Fetches latest FX rate from backend contract. Shared by Deposit and Withdraw.
 * Aborts in-flight fetch on unmount; exposes retry(); does not expose raw errors to UI.
 */
export function useLatestFx(pair: string): UseLatestFxResult {
  const [status, setStatus] = useState<UseLatestFxStatus>('loading');
  const [data, setData] = useState<LatestFxResponse | undefined>(undefined);
  const retryKeyRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const runFetch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const ac = new AbortController();
    abortControllerRef.current = ac;

    setStatus('loading');

    fetchLatestFx(pair, ac.signal)
      .then((result) => {
        if (ac.signal.aborted) return;
        setData(result);
        setStatus('success');
      })
      .catch((err) => {
        if (err?.name === 'AbortError' || ac.signal.aborted) return;
        setStatus('error');
      })
      .finally(() => {
        if (abortControllerRef.current === ac) {
          abortControllerRef.current = null;
        }
      });
  }, [pair]);

  useEffect(() => {
    runFetch();
    return () => abortControllerRef.current?.abort();
  }, [runFetch]);

  const retry = useCallback(() => {
    retryKeyRef.current += 1;
    runFetch();
  }, [runFetch]);

  return { status, data, retry };
}
