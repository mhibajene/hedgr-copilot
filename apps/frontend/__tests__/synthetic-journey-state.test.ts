import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  getSyntheticJourneyHref,
  getSyntheticJourneyRate,
  isSyntheticJourneyEnvironment,
  isSyntheticJourneyPrimaryCondition,
  isSyntheticJourneyUnavailableDataScenario,
} from '../lib/state/synthetic-journey';

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

  test('keeps unavailable data as a deterministic secondary scenario', () => {
    stubSyntheticEnvironment();
    const search = '?journey=class-a-val-002&scenario=unavailable-data';

    expect(isSyntheticJourneyPrimaryCondition(search)).toBe(false);
    expect(isSyntheticJourneyUnavailableDataScenario(search)).toBe(true);
  });

  test('builds bounded route links and uses governed fixed preview rates', () => {
    expect(getSyntheticJourneyHref('/withdraw')).toBe(
      '/withdraw?journey=class-a-val-002',
    );
    expect(
      getSyntheticJourneyHref('/deposit', { unavailableData: true }),
    ).toBe('/deposit?journey=class-a-val-002&scenario=unavailable-data');
    expect(getSyntheticJourneyRate('ZMW')).toBe(20);
  });
});
