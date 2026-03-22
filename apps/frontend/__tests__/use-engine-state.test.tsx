// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useEngineState } from '../lib/engine/useEngineState';

const ORIGINAL_CI = process.env.CI;
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

/**
 * Sets `window.location.search` using a relative `history.replaceState` target.
 * Full URLs like `http://localhost/` trigger jsdom SecurityError; query-only paths work.
 */
function setLocationSearch(search: string) {
  if (search === '') {
    window.history.replaceState({}, '', window.location.pathname || '/');
  } else {
    window.history.replaceState(
      {},
      '',
      search.startsWith('?') ? search : `?${search}`,
    );
  }
}

describe('useEngineState', () => {
  beforeEach(() => {
    process.env.CI = undefined;
    process.env.NEXT_PUBLIC_APP_ENV = 'dev';
    setLocationSearch('');
  });

  afterEach(() => {
    setLocationSearch('');
    process.env.CI = ORIGINAL_CI;
    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    process.env.NEXT_PUBLIC_APP_ENV = ORIGINAL_APP_ENV;
  });

  describe('simulator suppressed (blocked contexts)', () => {
    test('resolves to normal posture with no notice when NODE_ENV is test', () => {
      process.env.NODE_ENV = 'test';
      setLocationSearch('?enginePosture=tightening');

      const { result } = renderHook(() => useEngineState());

      expect(result.current.posture).toBe('normal');
      expect(result.current.notice).toBeUndefined();
    });

    test('resolves to normal when CI is set even if NODE_ENV is development', () => {
      process.env.NODE_ENV = 'development';
      process.env.CI = 'true';
      setLocationSearch('?enginePosture=recovery');

      const { result } = renderHook(() => useEngineState());

      expect(result.current.posture).toBe('normal');
      expect(result.current.notice).toBeUndefined();
    });

    test('resolves to normal in production NODE_ENV', () => {
      process.env.NODE_ENV = 'production';
      setLocationSearch('?enginePosture=tightened');

      const { result } = renderHook(() => useEngineState());

      expect(result.current.posture).toBe('normal');
      expect(result.current.notice).toBeUndefined();
    });

    test('resolves to normal when NEXT_PUBLIC_APP_ENV is not dev', () => {
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_APP_ENV = 'stg';
      setLocationSearch('?enginePosture=tightening');

      const { result } = renderHook(() => useEngineState());

      expect(result.current.posture).toBe('normal');
      expect(result.current.notice).toBeUndefined();
    });
  });

  describe('local dev simulator enabled', () => {
    beforeEach(() => {
      process.env.NODE_ENV = 'development';
      process.env.CI = undefined;
      process.env.NEXT_PUBLIC_APP_ENV = 'dev';
    });

    test.each([
      ['normal', false],
      ['tightening', true],
      ['tightened', true],
      ['recovery', true],
    ] as const)(
      'posture %s yields notice present=%s for the trust surface',
      (posture, expectNotice) => {
        setLocationSearch(`?enginePosture=${posture}`);

        const { result } = renderHook(() => useEngineState());

        expect(result.current.posture).toBe(posture);
        if (expectNotice) {
          expect(result.current.notice).toBeDefined();
          expect(result.current.notice?.title.length).toBeGreaterThan(0);
          expect(result.current.notice?.body).toContain('informational');
        } else {
          expect(result.current.notice).toBeUndefined();
        }
      },
    );

    test('invalid enginePosture query falls back to normal with no notice', () => {
      setLocationSearch('?enginePosture=not-a-posture');

      const { result } = renderHook(() => useEngineState());

      expect(result.current.posture).toBe('normal');
      expect(result.current.notice).toBeUndefined();
    });
  });
});
