import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  isLocalEngineSimulatorEnabled,
  resolveEngineSimulatorPosture,
} from '../lib/engine/simulator';

const ORIGINAL_CI = process.env.CI;
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

describe('engine simulator', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    process.env.CI = undefined;
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_APP_ENV = 'dev';
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    process.env.CI = ORIGINAL_CI;
    process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    process.env.NEXT_PUBLIC_APP_ENV = ORIGINAL_APP_ENV;
  });

  test('enables the simulator only in local dev context', () => {
    expect(isLocalEngineSimulatorEnabled()).toBe(true);
  });

  test('disables the simulator in CI even when the query param is present', () => {
    process.env.CI = 'true';

    expect(isLocalEngineSimulatorEnabled()).toBe(false);
    expect(resolveEngineSimulatorPosture('?enginePosture=tightening')).toBe(
      'normal',
    );
  });

  test('disables the simulator in test environment', () => {
    process.env.NODE_ENV = 'test';

    expect(isLocalEngineSimulatorEnabled()).toBe(false);
    expect(resolveEngineSimulatorPosture('?enginePosture=tightened')).toBe(
      'normal',
    );
  });

  test('disables the simulator outside local app env', () => {
    process.env.NEXT_PUBLIC_APP_ENV = 'stg';

    expect(isLocalEngineSimulatorEnabled()).toBe(false);
    expect(resolveEngineSimulatorPosture('?enginePosture=recovery')).toBe(
      'normal',
    );
  });

  test('disables the simulator in production environment', () => {
    process.env.NODE_ENV = 'production';

    expect(isLocalEngineSimulatorEnabled()).toBe(false);
    expect(resolveEngineSimulatorPosture('?enginePosture=tightening')).toBe(
      'normal',
    );
  });

  test.each([
    ['normal'],
    ['tightening'],
    ['tightened'],
    ['recovery'],
  ] as const)(
    'resolves %s when enginePosture query matches in local dev',
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
