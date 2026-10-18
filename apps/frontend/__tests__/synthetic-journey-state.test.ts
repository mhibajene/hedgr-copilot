// @vitest-environment jsdom
import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { usePathname, useSearchParams } from 'next/navigation';
import { getSimulationDisplayCurrency, setSimulationDisplayCurrency } from '../lib/state/simulation-display-currency';
vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useSearchParams: vi.fn() }));
vi.mock('../lib/defi', () => ({ defiAdapter: { getNetApy: () => Promise.resolve(.05) } }));
vi.mock('../lib/policy/usePolicy', () => ({ usePolicy: () => ({ isFeatureEnabled: () => false }) }));
vi.mock('../lib/fx/FxRateContext', () => ({ useFxRate: () => ({ rate: 20, status: 'ready' }), isFxRateAvailable: () => true }));
import DashboardPage from '../app/(app)/dashboard/page';
(globalThis as typeof globalThis & { React: typeof React }).React = React;
import {
  getSyntheticJourneyHref,
  getSyntheticJourneyRate,
  isSyntheticJourneyEnvironment,
  isSyntheticJourneyPrimaryCondition,
  isSyntheticJourneyResetRequested,
  isSyntheticJourneyUnavailableDataScenario,
  parseSyntheticJourneyExample,
} from '../lib/state/synthetic-journey';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/daniel-read';
import { FIXED_RATE_BY_QUOTE, FX_RATE_ZMW_PER_USD_DEFAULT, getFixedRate, zmwToUsd } from '../lib/fx';

afterEach(() => {
  cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); localStorage.clear();
  vi.unstubAllEnvs();
});

test.each(['PHP', 'NGN'])('RELEASE-GATE-FIX-001 T4 study reset %s', async (stored) => {
  stubSyntheticEnvironment();
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  for (const example of ['own', 'daniel', 'sarah']) for (const reset of [false, true]) for (const study of [false, true]) {
    cleanup(); localStorage.clear(); setSimulationDisplayCurrency(stored);
    const query = `example=${example}${reset ? '&reset=1' : ''}${study ? '&study=1' : ''}`;
    window.history.replaceState(null, '', `/dashboard-synthetic-journey?${query}`);
    vi.mocked(usePathname).mockReturnValue('/dashboard-synthetic-journey');
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(query) as ReturnType<typeof useSearchParams>);
    const { useSimulationDisplayCurrency } = await import('../lib/state/simulation-display-currency');
    function Subscriber() { return React.createElement('span', { 'data-testid': 'release-gate-fix-001-currency' }, useSimulationDisplayCurrency()); }
    await act(async () => { render(React.createElement(React.Fragment, null, React.createElement(Subscriber), React.createElement(DashboardPage))); });
    const expected = reset && study && example !== 'sarah' ? 'ZMW' : stored;
    expect(localStorage.getItem('hedgr.simulation.display-currency')).toBe(expected);
    expect(screen.getByTestId('release-gate-fix-001-currency').textContent).toBe(expected);
    if (reset) expect(new URLSearchParams(window.location.search).has('study')).toBe(false);
  }
});
test('RELEASE-GATE-FIX-001 T4 ordinary KES entry and blocked study storage', async () => {
  stubSyntheticEnvironment(); vi.stubGlobal('matchMedia', () => ({ matches: true }));
  localStorage.clear(); setSimulationDisplayCurrency('KES');
  vi.mocked(usePathname).mockReturnValue('/dashboard-synthetic-journey');
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('reset=1') as ReturnType<typeof useSearchParams>);
  await act(async () => { render(React.createElement(DashboardPage)); });
  expect(localStorage.getItem('hedgr.simulation.display-currency')).toBe('KES');
  expect(screen.getByTestId('local-balance-figure').textContent).toContain('KES');
  cleanup(); localStorage.clear(); setSimulationDisplayCurrency('NGN');
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('reset=1&study=1') as ReturnType<typeof useSearchParams>);
  await act(async () => { render(React.createElement(DashboardPage)); }); expect(getSimulationDisplayCurrency()).toBe('ZMW');
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

// §362 CLASS-A-VAL-002-HOME-EXAMPLE-PICKER-001 — the example is selected only by the URL.
describe('parses the example parameter with Daniel and Sarah as the recognised values', () => {
  test('parses the example parameter with Daniel and Sarah as the recognised values', () => {
    expect(parseSyntheticJourneyExample('example=daniel')).toBe('daniel');
    expect(parseSyntheticJourneyExample('example=sarah')).toBe('sarah');
    expect(parseSyntheticJourneyExample('?journey=class-a-val-002&example=daniel')).toBe('daniel');
    for (const search of [
      undefined,
      '',
      'example=',
      'example=unknown',
      'example=DANIEL',
      'example=daniel%20',
      'example=own',
      'journey=class-a-val-002',
      'scenario=daniel',
    ]) {
      expect(parseSyntheticJourneyExample(search), String(search)).toBe('own');
    }
  });
});
