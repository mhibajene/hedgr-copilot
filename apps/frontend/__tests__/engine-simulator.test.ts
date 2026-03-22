import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  isLocalEngineSimulatorEnabled,
  resolveEngineSimulatorPosture,
} from '../lib/engine/simulator';

const ORIGINAL_CI = process.env.CI;
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

describe('engine simulator', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    if (ORIGINAL_CI === undefined) {
      delete process.env.CI;
    } else {
      process.env.CI = ORIGINAL_CI;
    }
    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    process.env.NEXT_PUBLIC_APP_ENV = ORIGINAL_APP_ENV;
  });

  /**
   * Blocked contexts: simulator must be off; valid query params must not change posture.
   */
  describe('blocked contexts (fallback to normal)', () => {
    test.each([
      {
        label: 'CI',
        env: () => {
          process.env.CI = 'true';
          process.env.NODE_ENV = 'development';
          process.env.NEXT_PUBLIC_APP_ENV = 'dev';
        },
      },
      {
        label: 'NODE_ENV=test',
        env: () => {
          delete process.env.CI;
          process.env.NODE_ENV = 'test';
          process.env.NEXT_PUBLIC_APP_ENV = 'dev';
        },
      },
      {
        label: 'NEXT_PUBLIC_APP_ENV not dev',
        env: () => {
          delete process.env.CI;
          process.env.NODE_ENV = 'development';
          process.env.NEXT_PUBLIC_APP_ENV = 'stg';
        },
      },
      {
        label: 'NODE_ENV=production',
        env: () => {
          delete process.env.CI;
          process.env.NODE_ENV = 'production';
          process.env.NEXT_PUBLIC_APP_ENV = 'dev';
        },
      },
    ])('disables simulator when $label', ({ env }) => {
      env();

      expect(isLocalEngineSimulatorEnabled()).toBe(false);
      expect(resolveEngineSimulatorPosture('?enginePosture=tightening')).toBe(
        'normal',
      );
    });
  });

  /**
   * Approved local/dev-safe context only: NODE_ENV=development, no CI, APP_ENV=dev.
   * Valid enginePosture query values must resolve to that posture.
   */
  describe('approved local dev (valid overrides honored)', () => {
    beforeEach(() => {
      vi.unstubAllEnvs();
      delete process.env.CI;
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_APP_ENV = 'dev';
    });

    test('enables the simulator only in local dev context', () => {
      expect(isLocalEngineSimulatorEnabled()).toBe(true);
    });

    test.each([
      ['normal'],
      ['tightening'],
      ['tightened'],
      ['recovery'],
    ] as const)(
      'resolves %s when enginePosture query matches',
      (posture) => {
        expect(
          resolveEngineSimulatorPosture(`?enginePosture=${posture}`),
        ).toBe(posture);
      },
    );

    test('falls back to normal when the override is missing or invalid', () => {
      expect(resolveEngineSimulatorPosture(undefined)).toBe('normal');
      expect(resolveEngineSimulatorPosture('')).toBe('normal');
      expect(resolveEngineSimulatorPosture('?enginePosture=')).toBe('normal');
      expect(resolveEngineSimulatorPosture('?enginePosture=invalid')).toBe(
        'normal',
      );
    });
  });
});
