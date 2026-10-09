import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  getSyntheticJourneyHref,
  getSyntheticJourneyRate,
  isSyntheticJourneyEnvironment,
  isSyntheticJourneyPrimaryCondition,
  isSyntheticJourneyResetRequested,
  isSyntheticJourneyUnavailableDataScenario,
} from '../lib/state/synthetic-journey';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/daniel-read';
import { FIXED_RATE_BY_QUOTE, FX_RATE_ZMW_PER_USD_DEFAULT, getFixedRate, zmwToUsd } from '../lib/fx';

afterEach(() => {
  vi.unstubAllEnvs();
});

function stubSyntheticEnvironment() {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'dev');
}

describe('CLASS-A-VAL-002 synthetic journey state', () => {
  test('is available only inside a mock, non-live environment', () => {
    stubSyntheticEnvironment();
    expect(isSyntheticJourneyEnvironment()).toBe(true);

    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'magic');
    expect(isSyntheticJourneyEnvironment()).toBe(false);

    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
    vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'live');
    expect(isSyntheticJourneyEnvironment()).toBe(false);
  });

  test('allows an explicit primary journey in tests without creating live authority', () => {
    stubSyntheticEnvironment();
    vi.stubEnv('NODE_ENV', 'test');

    expect(isSyntheticJourneyPrimaryCondition()).toBe(false);
    expect(
      isSyntheticJourneyPrimaryCondition('?journey=class-a-val-002'),
    ).toBe(true);
  });

  test('recognizes the human-readable entry path outside local development', () => {
    stubSyntheticEnvironment();
    vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod');

    expect(
      isSyntheticJourneyPrimaryCondition('', '/dashboard-synthetic-journey'),
    ).toBe(true);
    expect(isSyntheticJourneyPrimaryCondition('', '/dashboard')).toBe(false);
  });

  test('keeps unavailable data as a deterministic secondary scenario', () => {
    stubSyntheticEnvironment();
    const search = '?journey=class-a-val-002&scenario=unavailable-data';

    expect(isSyntheticJourneyPrimaryCondition(search)).toBe(false);
    expect(isSyntheticJourneyUnavailableDataScenario(search)).toBe(true);
  });

  test('recognizes only the bounded one-shot clean-start marker', () => {
    stubSyntheticEnvironment();

    expect(isSyntheticJourneyResetRequested('?reset=1')).toBe(true);
    expect(isSyntheticJourneyResetRequested('?reset=0')).toBe(false);

    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'magic');
    expect(isSyntheticJourneyResetRequested('?reset=1')).toBe(false);
  });

  test('builds bounded route links and uses governed fixed preview rates', () => {
    expect(getSyntheticJourneyHref('/dashboard')).toBe(
      '/dashboard-synthetic-journey',
    );
    expect(getSyntheticJourneyHref('/withdraw')).toBe(
      '/withdraw?journey=class-a-val-002',
    );
    expect(getSyntheticJourneyHref('/settings')).toBe(
      '/settings?journey=class-a-val-002',
    );
    expect(
      getSyntheticJourneyHref('/deposit', { unavailableData: true }),
    ).toBe('/deposit?journey=class-a-val-002&scenario=unavailable-data');
    expect(getSyntheticJourneyRate('ZMW')).toBe(DANIEL_FIXTURE_RATE_ZMW_PER_USD);
  });
});

describe('imports the Engine ZMW fixture while preserving all other display and fixed FX rates', () => {
  test('imports the Engine ZMW fixture while preserving all other display and fixed FX rates', async () => {
    expect(getSyntheticJourneyRate('ZMW')).toBe(DANIEL_FIXTURE_RATE_ZMW_PER_USD);
    expect(getSyntheticJourneyRate('ZMW')).toBe(27);
    // Other supported quotes keep their fixed behaviour.
    expect(getSyntheticJourneyRate('KES')).toBe(130);
    expect(getSyntheticJourneyRate('NGN')).toBe(1500);
    expect(() => getSyntheticJourneyRate('GHS')).toThrow(/Unsupported synthetic journey quote/);
    const source = readFileSync(resolve(__dirname, '../lib/state/synthetic-journey.ts'), 'utf8');
    expect(source).toMatch(/import \{ DANIEL_FIXTURE_RATE_ZMW_PER_USD \} from '\.\.\/engine\/daniel-read';/);
    expect(source).not.toMatch(/\b27\b/);
    vi.resetModules();
    vi.doMock('../lib/engine/daniel-read', async (importOriginal) => ({
      ...(await importOriginal<typeof import('../lib/engine/daniel-read')>()),
      DANIEL_FIXTURE_RATE_ZMW_PER_USD: 31,
    }));
    const rewired = await import('../lib/state/synthetic-journey');
    expect(rewired.getSyntheticJourneyRate('ZMW')).toBe(31);
    expect(rewired.getSyntheticJourneyRate('KES')).toBe(130);
    vi.doUnmock('../lib/engine/daniel-read');
    vi.resetModules();
    // Fixed FX separation: the live/API boundary stays at 20.
    expect(getFixedRate('ZMW')).toBe(20);
    expect(FIXED_RATE_BY_QUOTE).toEqual({ ZMW: 20, NGN: 1500, KES: 130 });
    expect(FX_RATE_ZMW_PER_USD_DEFAULT).toBe(20);
    expect(zmwToUsd(100)).toBe(5);
  });
});
