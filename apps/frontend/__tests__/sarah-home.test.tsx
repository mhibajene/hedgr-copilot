// @vitest-environment jsdom
import React from 'react';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import type { EngineState } from '../lib/engine/types';
import type { Tx } from '../lib/state/ledger';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const mocks = vi.hoisted(() => ({ transactions: [] as Tx[], clear: vi.fn() }));
vi.mock('../lib/hooks/useBalance', () => ({ useBalance: vi.fn() }));
vi.mock('../lib/engine/useEngineState', () => ({ useEngineState: vi.fn() }));
vi.mock('../lib/state/ledger', () => ({ useLedgerStore: (select: (s: unknown) => unknown) => select({ transactions: mocks.transactions, clear: mocks.clear }) }));
vi.mock('../lib/defi', () => ({ defiAdapter: { getNetApy: () => Promise.resolve(0.05) } }));
vi.mock('../lib/policy/usePolicy', () => ({ usePolicy: () => ({ isFeatureEnabled: () => false }) }));
vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useSearchParams: vi.fn() }));
vi.mock('../components', () => ({
  BalanceWithLocalEstimate: ({ usdAmount }: { usdAmount: number }) => <div>{usdAmount}</div>,
  PolicyDisclosure: () => <p data-testid="policy-disclosure" />,
}));
vi.mock('@hedgr/ui', () => ({ EmptyState: () => <div />, ErrorState: () => <div data-testid="balance-retry">Retry</div> }));

import DashboardPage from '../app/(app)/dashboard/page';
import { usePathname, useSearchParams } from 'next/navigation';
import { useBalance } from '../lib/hooks/useBalance';
import { useEngineState } from '../lib/engine/useEngineState';
import { getMockEngineState } from '../lib/engine/mock';
import { computeSarahRead, SARAH_EXAMPLE_INPUTS, SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/sarah-read';
import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from '../lib/engine/daniel-read';
import { parseSyntheticJourneyExample, SYNTHETIC_JOURNEY_EXAMPLES } from '../lib/state/synthetic-journey';
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from './engine-trust-framing-denylist';

const ROUTES = ['/dashboard?journey=class-a-val-002', '/dashboard-synthetic-journey'];
const OPTIONS = ['Your own simulation', "Daniel's reserve", "Sarah's course fee"];
const COPY = {
  h1: 'Example', heading: 'Fictional example · Sarah’s course fee', caption: '≈ ZMW 27,000.00 Example figure, not a quote', card: 'Course fee',
  date: 'Example date: 9 Oct 2026',
  due: 'Due 1 Oct 2027.',
  rate: 'Example rate: ZMW 27 per US dollar. Not a live rate.',
  limits: 'Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.',
};
const AS_OF = '2026-10-09T00:00:00.000Z';
const HIDDEN = ['dashboard-daniel-read', 'dashboard-current-overview', 'dashboard-balance', 'dashboard-position-line',
  'dashboard-current-status', 'dashboard-date-line', 'dashboard-arrival-announcement', 'dashboard-simulation-utilities',
  'dashboard-restart-journey', 'research-planning-targets', 'dashboard-education', 'engine-posture-context',
  'engine-posture-banner', 'engine-protective-guidance', 'dashboard-earn-tile', 'dashboard-error-state'];
const row: Tx = { txn_ref: 'd1', type: 'deposit', status: 'settled', amount_usd: 800, amount_zmw: 16000,
  fx_rate: 20, created_at: 1, updated_at: 1 };
const source = (file: string) => readFileSync(resolve(__dirname, '..', file), 'utf8');
const picker = () => screen.getByRole('combobox', { name: 'Choose an example' }) as HTMLSelectElement;
const panel = () => screen.getByTestId('dashboard-sarah-read');

function at(route: string, example?: string, extra = '') {
  const url = new URL(route, 'http://localhost');
  if (example) url.searchParams.set('example', example);
  for (const [key, value] of new URLSearchParams(extra)) url.searchParams.set(key, value);
  window.history.replaceState(null, '', url.pathname + url.search);
  vi.mocked(usePathname).mockReturnValue(url.pathname);
  vi.mocked(useSearchParams).mockReturnValue(url.searchParams as ReturnType<typeof useSearchParams>);
}
function snapshot() {
  const dump = (store: Storage) => Object.fromEntries(Object.keys(store).sort().map(k => [k, store.getItem(k)]));
  return { local: dump(localStorage), session: dump(sessionStorage) };
}
function seed() {
  for (const store of [localStorage, sessionStorage]) {
    store.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [row] }));
    store.setItem('hedgr:wallet', 'retired-wallet');
    store.setItem('hedgr:last-home-visit', '2');
    store.setItem('hedgr:engine-review-snapshot-memory', '{corrupt review');
    store.setItem('hedgr:engine-review-snapshot-fingerprint', 'prior-fingerprint');
    store.setItem('hedgr.simulation.display-currency', 'KES');
    store.setItem('unrelated', ' byte-preserved ');
  }
}
function assertRead() {
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(COPY.h1);
  expect(screen.getAllByTestId('dashboard-sarah-read')).toHaveLength(1);
  expect(screen.getByTestId('sarah-read-figure').textContent).toBe('$1000.00 USD');
}
beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock'); vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub'); vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod');
  vi.mocked(useBalance).mockReturnValue({ total: 800, available: 800, pending: 0, asOf: 3, isLoading: false,
    error: null, currency: 'USD', refresh: vi.fn() });
  vi.mocked(useEngineState).mockReturnValue(getMockEngineState('normal') as EngineState);
});
afterEach(() => {
  cleanup(); vi.restoreAllMocks(); vi.unstubAllEnvs(); mocks.clear.mockClear(); mocks.transactions = [];
  localStorage.clear(); sessionStorage.clear(); window.history.replaceState(null, '', '/');
});

test('Sarah is selectable on both journey Homes', () => {
  expect(SYNTHETIC_JOURNEY_EXAMPLES.map(({ id, name, label }) => ({ id, name, label }))).toEqual([{ id: 'daniel', name: 'Daniel’s reserve', label: OPTIONS[1] }, { id: 'sarah', name: 'Sarah’s course fee', label: OPTIONS[2] }]);
  expect(parseSyntheticJourneyExample('example=sarah')).toBe('sarah');
  for (const route of ROUTES) {
    at(route, 'sarah'); const view = render(<DashboardPage />); assertRead();
    expect(Array.from(picker().options).map(n => n.textContent)).toEqual(OPTIONS);
    expect(picker().value).toBe('sarah'); view.unmount();
    for (const value of ['unknown', '', 'SARAH', 'sarah ', '__proto__', 'toString']) {
      at(route, value); const fallback = render(<DashboardPage />);
      expect(picker().value).toBe('own'); expect(screen.queryByTestId('dashboard-sarah-read')).toBeNull(); fallback.unmount();
    }
  }
  for (const route of ['/dashboard?example=sarah', ...ROUTES.map(r => `${r}${r.includes('?') ? '&' : '?'}scenario=unavailable-data&example=sarah`)]) {
    at(route); const view = render(<DashboardPage />);
    expect(screen.queryByTestId('dashboard-sarah-read')).toBeNull(); expect(screen.queryByRole('combobox', { name: 'Choose an example' })).toBeNull(); view.unmount();
  }
  for (const [key, value] of [['NEXT_PUBLIC_FX_MODE', 'live'], ['NEXT_PUBLIC_AUTH_MODE', 'magic']]) {
    vi.stubEnv(key, value);
    for (const route of ROUTES) { at(route, 'sarah'); const view = render(<DashboardPage />);
      expect(screen.queryByTestId('dashboard-sarah-read')).toBeNull(); expect(screen.queryByRole('combobox', { name: 'Choose an example' })).toBeNull(); view.unmount(); }
    vi.stubEnv(key, key.includes('FX') ? 'stub' : 'mock');
  }
});

test('Sarah hero uses $1000.00 USD and one independent fee observation', async () => {
  at(ROUTES[0], 'sarah'); const view = render(<DashboardPage />); assertRead();
  const fixturePath = '../lib/state/sarah-home-fixture';
  expect(existsSync(resolve(__dirname, fixturePath + '.ts'))).toBe(true);
  // Import only after the route assertion: pre-runtime red loads without the new module.
  const fixture = await import(fixturePath);
  const u3 = SARAH_EXAMPLE_INPUTS.find(example => example.name === 'U3')!.input;
  expect(fixture.SARAH_HOME_FIXTURE_INPUT).toBe(u3);
  expect(fixture.SARAH_HOME_READ).toEqual(computeSarahRead(u3));
  expect(fixture.SARAH_HOME_READ.localAmountZmwMinor).toBe(2700000);
  expect(u3.fixtureRateZmwPerUsd).toBe(SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD);
  expect(SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD).toBe(DANIEL_FIXTURE_RATE_ZMW_PER_USD);
  expect(screen.getByTestId('sarah-read-as-of').textContent).toBe(COPY.date);
  expect(screen.getByTestId('sarah-read-as-of').querySelector('time')?.getAttribute('datetime')).toBe(AS_OF);
  expect(panel().querySelectorAll('time')).toHaveLength(4);
  expect(screen.getByTestId('sarah-fee-card').querySelector('time')?.getAttribute('datetime')).toBe('2027-10-01');
  expect(panel().textContent?.split('≈ ZMW 27,000.00')).toHaveLength(2);
  expect(panel().textContent).not.toContain('Course fee USD 1,000');
  expect(screen.getAllByTestId('sarah-fee-card')).toHaveLength(1);
  expect(screen.getByTestId('sarah-fee-card').querySelector('time')?.parentElement?.textContent).toBe(COPY.due);
  expect(within(panel()).getAllByText(COPY.rate, { exact: true })).toHaveLength(1);
  expect(within(panel()).getAllByText(COPY.limits, { exact: true })).toHaveLength(1);
  const fixtureSource = source('lib/state/sarah-home-fixture.ts');
  expect(fixtureSource).toMatch(/SARAH_EXAMPLE_INPUTS/); expect(fixtureSource).toMatch(/name === 'U3'/);
  expect(fixtureSource.match(/computeSarahRead\(/g)).toHaveLength(1);
  expect(fixtureSource).not.toMatch(/\b27\b|research|golden|__tests__|Date\.now|localStorage|sessionStorage/);
  expect(panel().querySelectorAll('canvas, progress, meter, [role="progressbar"], [data-delta], [data-direction]')).toHaveLength(0);
  expect(panel().textContent).not.toMatch(/history|last visit|before|after|difference|countdown|progress/i);
  view.unmount();
  // Arbitrary read proves both dates, declaration and local text without clock/visit dependence.
  const { SarahExampleHome } = await import('../app/(app)/dashboard/SarahExampleHome');
  const read = computeSarahRead(u3);
  const sentinel = {...read, rateBasis:{kind:'example-rate' as const,zmwPerUsd:DANIEL_FIXTURE_RATE_ZMW_PER_USD}, asOf:'2030-02-03T23:45:00.000Z',declaredFee:{...read.declaredFee,amount:1234.56,dueDate:'2031-04-05'},localDisplay:'ENGINE FIGURE',
    explanation:{fee:'ENGINE FEE',rateAssumption:'ENGINE RATE',limits:'ENGINE LIMITS'}};
  render(<SarahExampleHome read={sentinel}/>);
  expect(screen.getByTestId('sarah-read-figure').textContent).toBe('$1234.56 USD');
  expect(screen.getByTestId('sarah-read-caption').textContent).toBe('≈ ZMW 33,333.12 Example figure, not a quote');
  expect(screen.getByTestId('sarah-read-as-of').textContent).toBe('Example date: 3 Feb 2030');
  expect(screen.getByTestId('sarah-fee-card').querySelector('time')?.textContent).toBe('5 Apr 2031');
  expect(Array.from(panel().querySelectorAll('time')).map(n=>n.getAttribute('datetime'))).toEqual(['2026-04-14T00:00:00.000Z','2026-07-21T00:00:00.000Z',sentinel.asOf,sentinel.declaredFee.dueDate]);
  for (const text of ['ENGINE RATE','ENGINE LIMITS']) expect(screen.getByText(text,{exact:true})).toBeDefined();
  expect(screen.queryByText('ENGINE FEE')).toBeNull();
});

test('Sarah Home has no fee selector or kwacha read', () => {
  for (const route of ROUTES) for (const fee of ['zmw', 'usd', 'unknown']) {
    at(route, 'sarah', `fee=${fee}&keep=1`); const view = render(<DashboardPage />); assertRead();
    expect(screen.getAllByRole('combobox')).toHaveLength(1);
    expect(panel().querySelectorAll('select, input, button:not([aria-controls]), a')).toHaveLength(0);
    expect(document.body.textContent).not.toMatch(/K29,500|is set in kwacha|USD 1,000 fee|K29,500 fee/);
    expect(screen.queryByLabelText('Example fee')).toBeNull();
    fireEvent.change(picker(), { target: { value: 'daniel' } });
    expect(new URLSearchParams(window.location.search).get('fee')).toBe(fee);
    expect(new URLSearchParams(window.location.search).get('keep')).toBe('1'); view.unmount();
  }
  for (const file of ['lib/state/synthetic-journey.ts', 'lib/state/sarah-home-fixture.ts', 'app/(app)/dashboard/page.tsx', 'app/(app)/dashboard/SarahExampleHome.tsx']) {
    expect(source(file)).not.toMatch(/['"]fee['"]|fee=|FEE_PARAM|parse\w*Fee|Z3|K29,500/);
  }
});

test('Example navigation restores the URL without changing simulation state', () => {
  for (const route of ROUTES) {
    seed(); at(route, undefined, 'keep=1'); const view = render(<DashboardPage />);
    const before = snapshot(); const write = vi.spyOn(Storage.prototype, 'setItem'); const remove = vi.spyOn(Storage.prototype, 'removeItem');
    for (const selection of ['sarah', 'daniel', 'own']) {
      fireEvent.change(picker(), { target: { value: selection } });
      expect(new URLSearchParams(window.location.search).get('example')).toBe(selection === 'own' ? null : selection);
      vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(window.location.search) as ReturnType<typeof useSearchParams>);
      view.rerender(<DashboardPage />);
      if (selection === 'sarah') assertRead();
      expect(snapshot()).toEqual(before); expect(write).not.toHaveBeenCalled(); expect(remove).not.toHaveBeenCalled();
      expect(new URLSearchParams(window.location.search).get('keep')).toBe('1');
    }
    write.mockRestore(); remove.mockRestore(); view.unmount();
    at(route, 'sarah'); const directBefore = snapshot(); const directWrite = vi.spyOn(Storage.prototype, 'setItem');
    const direct = render(<DashboardPage />); assertRead();
    at(route); direct.rerender(<DashboardPage />);
    expect(snapshot()).toEqual(directBefore); expect(directWrite).not.toHaveBeenCalled(); directWrite.mockRestore(); direct.unmount();
  }
});

test('Sarah refuses reset without clearing stored simulation', () => {
  for (const route of ROUTES) for (const reset of ['1', '0', 'unknown']) {
    seed(); at(route, 'sarah', `reset=${reset}&keep=1`); const before = snapshot();
    const write = vi.spyOn(Storage.prototype, 'setItem'); const remove = vi.spyOn(Storage.prototype, 'removeItem'); const clear = vi.spyOn(Storage.prototype, 'clear');
    const view = render(<DashboardPage />);
    expect(snapshot()).toEqual(before); expect(mocks.clear).not.toHaveBeenCalled();
    expect(write).not.toHaveBeenCalled(); expect(remove).not.toHaveBeenCalled(); expect(clear).not.toHaveBeenCalled(); assertRead();
    const url = new URL(window.location.href); expect(url.searchParams.has('reset')).toBe(false);
    expect(url.searchParams.get('example')).toBe('sarah'); expect(url.searchParams.get('keep')).toBe('1');
    expect(url.pathname).toBe(new URL(route, url).pathname);
    if (route.includes('journey=')) expect(url.searchParams.get('journey')).toBe('class-a-val-002');
    write.mockRestore(); remove.mockRestore(); clear.mockRestore(); view.unmount();
    for (const selection of ['daniel', 'own']) {
      seed(); at(route, selection, 'reset=1'); const control = render(<DashboardPage />);
      expect(mocks.clear).toHaveBeenCalledTimes(1); expect(localStorage.getItem('hedgr:wallet')).toBeNull();
      expect(localStorage.getItem('hedgr:last-home-visit')).toBe(selection === 'daniel' ? '2' : null);
      control.unmount(); mocks.clear.mockClear();
    }
  }
  // An ineligible Sarah sentinel retains the existing own/default reset policy.
  seed(); at('/dashboard', 'sarah', 'reset=1'); render(<DashboardPage />);
  expect(mocks.clear).toHaveBeenCalledTimes(1); expect(screen.queryByTestId('dashboard-sarah-read')).toBeNull();
});

test('Sarah stays separate from simulation and mock guidance', () => {
  for (const route of ROUTES) for (const posture of ['normal', 'tightening', 'tightened', 'recovery'] as const) for (const balance of ['ready', 'loading', 'error'] as const) {
    seed(); mocks.transactions = [row]; localStorage.setItem('hedgr:engine-review-snapshot-memory', posture === 'normal' ? JSON.stringify([{ viewedAt: AS_OF, changeVsPrior: 'changed', posture: 'normal' }]) : '{bad');
    vi.mocked(useEngineState).mockReturnValue(getMockEngineState(posture) as EngineState);
    vi.mocked(useBalance).mockReturnValue({ total: 999, available: -1, pending: 1000, asOf: 0, isLoading: balance === 'loading',
      error: balance === 'error' ? 'stale balance' : null, currency: 'USD', refresh: vi.fn() });
    at(route, 'sarah'); const before = snapshot(); const view = render(<DashboardPage />); assertRead();
    for (const id of HIDDEN) expect(screen.queryByTestId(id), id).toBeNull();
    expect(screen.queryByTestId('balance-retry')).toBeNull(); expect(screen.getAllByRole('combobox')).toHaveLength(1);
    expect(panel().querySelectorAll('details')).toHaveLength(0); expect(screen.getByTestId('dashboard-disclosures')).toBeDefined();
    expect(document.body.textContent).not.toMatch(/Start here|Recent activity|Planning targets|mock guidance|APY|Retry|Today/);
    expect(snapshot()).toEqual(before); view.unmount();
  }
});

test('Sarah Home uses locked copy and no funding claims', () => {
  for (const route of ROUTES) {
    at(route, 'sarah'); const view = render(<DashboardPage />); assertRead();
    expect(document.getElementById('dashboard-sarah-label')?.textContent).toBe(COPY.heading);
    expect(screen.getByTestId('sarah-read-caption').textContent).toBe(COPY.caption);
    expect(withoutChart(screen.getByTestId('sarah-fee-card'))).toBe(COPY.card + COPY.due + COPY.rate + COPY.limits);
    expect(withoutChart(panel())).toBe(COPY.heading + '$1000.00 USD' + COPY.caption + COPY.date + COPY.card + COPY.due + COPY.rate + COPY.limits);
    expect(picker().selectedOptions[0].textContent).toBe(OPTIONS[2]);
    expect(screen.getAllByText(COPY.rate, { exact: true })).toHaveLength(1);
    const text = panel().textContent!.replace(COPY.limits, ''); // Keep the exact negative payment-ability statement.
    for (const denied of ENGINE_TRUST_INFORMATIONAL_DENYLIST) expect(text.toLowerCase()).not.toContain(denied);
    expect(text).not.toMatch(/hedg(?:e|ing)|sav(?:ing|ings)|contribut|sufficien|cover(?:age|ed|s)?|gap|progress|forecast|afford|can pay|on track|fund(?:ed|ing)|goal|guarantee|protect|gain|loss|higher|lower|increase|decrease/i);
    expect(panel().querySelectorAll('button:not([aria-controls]), a, input, select, progress, meter, [role="progressbar"]')).toHaveLength(0);
    const component = source('app/(app)/dashboard/SarahExampleHome.tsx');
    expect(component).not.toMatch(/CurrencyInsight|PositionLine|localStorage|sessionStorage|Date\.now|parseFloat|parseInt|Number\(.*localDisplay|research|golden|__tests__/);
    view.unmount();
  }
});

test('Sarah controls and disclosures fit and work by keyboard', () => {
  for (const route of ROUTES) {
    at(route, 'sarah'); const view = render(<DashboardPage />);
    expect(Array.from(picker().options).map(n => n.textContent)).toEqual(OPTIONS);
    const label = document.querySelector<HTMLLabelElement>('label[for="dashboard-example-picker"]');
    expect(label?.textContent).toBe('Choose an example'); expect(label?.control).toBe(picker()); expect(label?.className).not.toContain('sr-only');
    picker().focus(); expect(document.activeElement).toBe(picker());
    expect(screen.getByTestId('example-picker-value').textContent).toBe(OPTIONS[2]);
    expect(screen.getByTestId('dashboard-disclosures').querySelector('summary')?.textContent).toBe('Important disclosures');
    // Browser geometry and real keyboard/Back/Forward at 1440/390/320@200% live in the paired Playwright test.
    view.unmount();
  }
});

test('Sarah preserves immutable sources and the Founder-confirmed §389 journey boundaries', () => {
  // Founder yes, 15 Oct 2026 09:55 AWST: bounded replacement of exactly two pins.
  // Captured before any runtime edit; every byte before the example-only section is immutable.
  const stylesheet = source('app/(app)/dashboard/synthetic-home.module.css');
  const prefix = stylesheet.split(/\/\* §(?:377|389):/)[0];
  expect(createHash('sha256').update(prefix).digest('hex')).toBe('ac9e62cbbbe43a6438d4aa28e563aeec8dd2ae29c3cca6abbce76e03706cf4bc');
  expect(stylesheet).not.toMatch(/exampleHero/);
  expect(stylesheet).toMatch(/\.journeyHero/);
  expect(stylesheet).toMatch(/\.usdSuffix/);
  const hero = resolve(__dirname, '../app/(app)/dashboard/HomeHero.tsx');
  expect(existsSync(hero), 'shared journey hero is absent').toBe(true);
  if (existsSync(hero)) {
    const shared = readFileSync(hero, 'utf8');
    expect(shared).toMatch(/home\.amount/); expect(shared).toMatch(/home\.usdSuffix/);
    expect(shared).toMatch(/formatUsd/); expect(shared).toMatch(/SIMULATION_DISPLAY_ESTIMATE_CAPTION/);
  }
  const consumer = source('app/(app)/dashboard/DanielExampleHome.tsx');
  expect(consumer).not.toMatch(/PositionEntry|PositionLine|DEPOSIT|CurrencyInsight|compareCurrencyExample|estimateCents|getSimulationDisplayRate|formatSimulationDisplay|parseFloat|parseInt|Number\(.*localDisplay|research|golden/);
  for (const component of ['HomeHero', 'ExampleCard', 'RateLine', 'ExampleLineChart']) expect(consumer).toContain('<' + component);
  expect(consumer).toContain('currentRead.declaredHolding.amount');
  expect(consumer).toContain('currentRead.explanation.rateAssumption');
  expect(consumer).toContain('series={series}');
  expect(consumer).toContain('example.deposits');
  expect(source('app/(app)/dashboard/PositionLine.tsx')).toMatch(/ExampleLineChart/);
  expect(source('app/(app)/dashboard/PositionLine.tsx')).not.toMatch(/<svg/);
  expect(consumer).toContain('Figures over time');
  expect(consumer).toContain('shown above');
  expect(consumer).toMatch(/SYNTHETIC_JOURNEY_EXAMPLES/);
  expect(consumer).toMatch(/limitation/);

  const hashes: Record<string, string> = {
    "lib/engine/sarah-read.ts": "6114b2bc267a6a997115e604b5865bf6feb4760aff922d27823e5854ae9fa34b",
    "lib/engine/daniel-read.ts": "84fb14d81def62ffe3491fe9f3f6b64a9705e497952fa37ff4f604d018764e60",
    "__tests__/engine-sarah-read.golden.ts": "656fb25c528c85f8b8a02c026e1b95699dc5cdd6ed617e276e2cbc64ac2784f5",
    "__tests__/engine-daniel-read.golden.ts": "d2fe6c27bfe369e068958181da41d1d04594e41b192f47d2379fe1f9d62d8ab4",
    "lib/state/daniel-home-fixture.ts": "af81ee319ae5b4f97e1dcf9403e79d8f94a71f9bc68b37df1da5c3b530fb2081",
    "app/(app)/dashboard/CurrencyInsight.tsx": "769028b998087f94e53bc1b7ff875a1f916e6963537d06911f56bc19bd4f5b33"
};
  for (const [file, expected] of Object.entries(hashes)) {
    let contents = bundlePreRuntime(file, source(file));
    if (file === 'lib/engine/sarah-read.ts') {
      // §375: accept only the authorised literal declaration; preserve the original
      // source hash after reversing that exact line, including all other Engine bytes.
      const original = "export const SARAH_READ_ENGINE_VERSION = 'sarah-read-v1';";
      const corrected = "export const SARAH_READ_ENGINE_VERSION = 'sarah-read-v1' as const;";
      expect(contents.split('\n').filter(line => line.startsWith('export const SARAH_READ_ENGINE_VERSION'))).toEqual([
        contents.includes(corrected) ? corrected : original,
      ]);
      contents = contents.replace(corrected, original);
    }
    if (file === 'app/(app)/dashboard/CurrencyInsight.tsx') {
      contents = contents.replaceAll("This compares two example rates. It does not show earnings, buying power or a rate you would get.", "FX comparison only\u2014not earnings, purchasing power, guaranteed protection or a conversion quote.");
    }
    expect(createHash('sha256').update(contents).digest('hex'), file).toBe(expected);
  }
});

// §391: preserve all pre-chart fee copy in order, with the new list tested separately.
function withoutChart(node: HTMLElement) {
  const clone = node.cloneNode(true) as HTMLElement;
  clone.querySelector('[data-testid="example-line-chart"]')?.remove();
  return clone.textContent;
}

// HOME-SOFTHALO-RATESLIDER-BUNDLE-001 P2: exact bounded reversals to immutable 128887452af8add22234f6b4da34f74eb009e311.
// Every other source byte and all original pins remain protected.
const BUNDLE_SOURCE_EDITS: Record<string, [string, string][]> = {
  "app/(app)/dashboard/CurrencyInsight.tsx": [
    [
      "import { useRef } from 'react';\nimport wallet from '../research-wallet.module.css';\nimport type { SimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';\nimport {\n  compareCurrencyExample,\n  formatComparisonCents,\n  makeCurrencyExample,\n  type CurrencyExample,\n} from '../../../lib/narrative/simulation-currency-insight';\nimport styles from './currency-insight.module.css';\n\n",
      "import { useRef, useState } from 'react';\nimport wallet from '../research-wallet.module.css';\nimport type { SimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';\nimport { computeRateFigure, formatRateCents, ZMW_EXAMPLE_RATES } from '../../../lib/narrative/simulation-currency-insight';\nimport styles from './currency-insight.module.css';\n\n"
    ],
    [
      "  ready: boolean;\n  pending?: boolean;\n  /** Explicit synthetic samples for isolated review/tests, never a runtime selector. */\n  example?: CurrencyExample;\n  redesigned?: boolean;\n  /** Synthetic Home only: keep the complete comparison inside its dialog. */\n  compact?: boolean;\n};\n\nexport function CurrencyInsight({\n  usdAmount, currency, latestDisplayRate, ready, pending = false,\n  example = makeCurrencyExample(latestDisplayRate), redesigned = false, compact = false,\n}: CurrencyInsightProps) {\n  const dialogRef = useRef<HTMLDialogElement>(null);\n  const triggerRef = useRef<HTMLButtonElement>(null);\n  if (!ready) return null;\n  const result = compareCurrencyExample({ usdAmount, latestDisplayRate, example, pending });\n  const comparison = result.kind === 'comparison' ? result : null;\n  const headline = comparison\n    ? comparison.direction === 'equal' ? 'No exchange-rate difference'\n      : comparison.direction === 'rounded-zero' ? 'No difference at this display precision'\n        : `${currency} ${formatComparisonCents(comparison.deltaCents, true)} ${comparison.direction} from the rate change`\n    : result.kind === 'empty' ? 'No position to compare yet.' : 'Currency comparison unavailable.';\n\n  if (redesigned) {\n    const limit = 'This compares two example rates. It does not show earnings, buying power or a rate you would get.';\n    const summary = (<>{comparison && (comparison.direction === 'higher' || comparison.direction === 'lower') ? <>\n          <p className={styles.estimateLabel}>Change in {currency} estimate</p>\n          <p className={styles.summary} data-testid=\"currency-insight-headline\">\n            <span className={styles.difference} data-testid=\"currency-insight-difference\">{currency} {formatComparisonCents(comparison.deltaCents, true)}</span>{' '}\n            <span className={styles.cause}><span className={styles.direction} aria-hidden=\"true\" data-testid=\"currency-insight-direction\" data-direction={comparison.direction} />{comparison.direction} from the rate change</span>\n          </p>\n        </> : <p className={wallet.headline} data-testid=\"currency-insight-headline\">\n          {comparison ? <span className={styles.direction} aria-hidden=\"true\" data-testid=\"currency-insight-direction\">\u2014</span> : null}\n          <span>{headline}</span>\n        </p>}</>);\n    return (\n      <section className={`${wallet.context} ${styles.refined} ${compact ? styles.compact : \"\"}`} aria-label=\"Currency context\" data-testid=\"currency-insight\">\n        {!compact || !comparison ? <p className={styles.period}>30-day example \u00b7 Simulated</p> : null}\n        {(!compact || !comparison) ? summary : null}\n        {comparison ? <>\n          {!compact ? <p>Your USD amount is held constant in this comparison.</p> : null}\n          <button ref={triggerRef} type=\"button\" className={compact ? styles.launcher : wallet.link} aria-label={compact ? 'Currency context' : undefined} aria-describedby={compact ? 'currency-context-inline-insight' : undefined} aria-haspopup=\"dialog\" onClick={() => dialogRef.current?.showModal()}>\n            {compact ? <span className={styles.launcherContent}>\n              <span>Currency context</span>\n              <span className={styles.launcherSubtitle}>30-day example \u00b7 Simulated</span>\n              <span id=\"currency-context-inline-insight\" className={styles.launcherInsight} data-testid=\"currency-insight-inline\">\n                {comparison.direction === 'higher' || comparison.direction === 'lower' ? <>\n                  <span className={styles.launcherDelta}>{currency} {formatComparisonCents(comparison.deltaCents, true)} {comparison.direction}</span>{' '}\n                  <span className={styles.launcherCause}>from the rate change</span>\n                </> : headline}\n              </span>\n              <span className={styles.launcherAffordance}>Understand the comparison <span aria-hidden=\"true\">\u2192</span></span>\n            </span> : 'Understand the comparison'}\n          </button>\n          {!compact ? <p className={wallet.limit}>{limit}</p> : null}\n          <dialog ref={dialogRef} className={wallet.dialog} aria-labelledby=\"currency-context-title\" onClose={() => triggerRef.current?.focus()} onKeyDown={event => {\n            if (event.key !== 'Tab') return;\n            const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, summary');\n            const first = controls[0];\n            const last = controls[controls.length - 1];\n            if (event.shiftKey && document.activeElement === first) {\n              event.preventDefault();\n              last?.focus();\n            } else if (!event.shiftKey && document.activeElement === last) {\n              event.preventDefault();\n              first?.focus();\n            }\n          }}>\n            <div className={wallet.dialogStrip}>Simulation \u00b7 No real money</div>\n            <div className={wallet.page}>\n              <div className={wallet.dialogHeader}>\n                <button type=\"button\" onClick={() => dialogRef.current?.close()}>Back to Home</button>\n                <h2 id=\"currency-context-title\">Currency context</h2>\n              </div>\n              <p>30-day example \u00b7 Simulated</p>\n              <h3 className={wallet.dialogTitle}>Same USD amount.<br />{comparison.direction === 'equal' ? 'Same local estimate.' : comparison.direction === 'rounded-zero' ? 'Same estimate at this display precision.' : 'Different local estimate.'}</h3>\n              <p>This shows the same amount at two made-up exchange rates. No money is earned or exchanged, and it isn\u2019t what you\u2019d receive.</p>\n              <div className={wallet.comparison}>\n                <dl>\n                  <div className={wallet.comparisonRow}><dt>Day 0<span>1 USD = {comparison.earlierRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt><dd>{currency} {formatComparisonCents(comparison.earlierCents)}</dd></div>\n                  <div className={wallet.comparisonRow}><dt>Day 30<span>1 USD = {comparison.latestRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt><dd>{currency} {formatComparisonCents(comparison.latestCents)}</dd></div>\n                </dl>\n                {compact ? summary : <p className={wallet.headline}>{headline}</p>}\n              </div>\n              <section><h2>What this means</h2><p>{comparison.direction === 'equal' ? 'The exchange rates are equal in this comparison.' : 'Only the exchange rate changes in this comparison.'}</p></section>\n              <section><h2>What this does not show</h2><p>{limit}</p></section>\n              <p className={wallet.comparison}>Invented research example. Not your account history or live market data.</p>\n              <details><summary>How this is calculated</summary>\n                <p>A made-up example, shown today and 30 days later.</p>\n                <p>The current USD {usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 20 })} is applied to both rates. It does not mean you held this amount for 30 days.</p>\n                <p>Both estimates are rounded to two decimals; the difference uses those rounded amounts. Deposits, withdrawals, yield and asset-price changes are excluded, as are fees and spreads. No money has moved.</p>\n              </details>\n            </div>\n          </dialog>\n        </> : result.kind === 'unavailable' ? <p>{result.reason}</p> : null}\n      </section>\n    );\n  }\n\n  return (\n    <section className={styles.context} aria-label=\"Currency context\" data-testid=\"currency-insight\">\n      <div className={styles.heading}>\n        <h2>Currency context</h2>\n        <p>30-day example \u00b7 Simulated</p>\n      </div>\n      <p className={styles.headline} data-testid=\"currency-insight-headline\">\n        {comparison ? (\n          <span className={styles.direction} aria-hidden=\"true\" data-testid=\"currency-insight-direction\">\n            {comparison.direction === 'higher' ? '\u2191' : comparison.direction === 'lower' ? '\u2193' : '\u2014'}\n          </span>\n        ) : null}\n        <span>{headline}</span>\n      </p>\n      {comparison ? (\n        <>\n          <p>Your USD amount is held constant in this comparison.</p>\n          <p className={styles.limit}>This compares two example rates. It does not show earnings, buying power or a rate you would get.</p>\n          <details className={styles.calculation}>\n            <summary>How this is calculated</summary>\n            <div className={styles.explanation}>\n              <p>A made-up example, shown today and 30 days later.</p>\n              <p>The current USD {usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 20 })} is applied to both rates. It does not mean you held this amount for 30 days.</p>\n              <dl className={styles.values}>\n                <div>\n                  <dt>Earlier \u00b7 day 0 <span>1 USD = {comparison.earlierRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt>\n                  <dd>{currency} {formatComparisonCents(comparison.earlierCents)}</dd>\n                </div>\n                <div>\n                  <dt>Latest \u00b7 day 30 <span>1 USD = {comparison.latestRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} {currency}</span></dt>\n                  <dd>{currency} {formatComparisonCents(comparison.latestCents)}</dd>\n                </div>\n              </dl>\n              <p>Both estimates are rounded to two decimals; the difference uses those rounded amounts. Deposits, withdrawals, yield and asset-price changes are excluded, as are fees and spreads. No money has moved.</p>\n            </div>\n          </details>\n        </>\n      ) : result.kind === 'unavailable' ? <p>{result.reason}</p> : null}\n    </section>\n  );\n",
      "  ready: boolean;\n  pending?: boolean;\n  /** The frozen Home rate line already supplies the non-ZMW limit. */\n  rateLineOnHome?: boolean;\n};\n\nexport function CurrencyInsight({\n  usdAmount, currency, latestDisplayRate, ready, pending = false, rateLineOnHome = false,\n}: CurrencyInsightProps) {\n  const dialogRef = useRef<HTMLDialogElement>(null);\n  const triggerRef = useRef<HTMLButtonElement>(null);\n  const [stop, setStop] = useState(1);\n  const [opened, setOpened] = useState(false);\n  if (!ready) return null;\n  const selectedRate = currency === 'ZMW' ? ZMW_EXAMPLE_RATES[stop] : latestDisplayRate;\n  const result = computeRateFigure({ usdAmount, rate: selectedRate, pending });\n  const validDisplayRate = Number.isFinite(latestDisplayRate) && latestDisplayRate > 0;\n  if (result.kind !== 'figure' || !validDisplayRate) {\n    return <section className={styles.context} aria-label=\"Currency context\" data-testid=\"currency-insight\">\n      <p data-testid=\"currency-insight-headline\">{result.kind === 'empty' ? 'No position to compare yet.' : 'Currency comparison unavailable.'}</p>\n      {result.kind === 'unavailable' ? <p>{result.reason}</p> : !validDisplayRate ? <p>The latest example rate is unavailable.</p> : null}\n    </section>;\n  }\n  const localFigure = `${currency} ${formatRateCents(result.cents)}`;\n  return (\n    <section className={styles.context} aria-label=\"Currency context\" data-testid=\"currency-insight\">\n      <button ref={triggerRef} type=\"button\" className={styles.launcher} aria-label=\"Currency context\" aria-describedby=\"currency-context-description\" aria-haspopup=\"dialog\" onClick={() => {\n        setStop(1);\n        setOpened(true);\n        dialogRef.current?.showModal();\n      }}>\n        <span>Currency context</span>\n        <span id=\"currency-context-description\" className={styles.launcherSubtitle}>Try example exchange rates</span>\n      </button>\n      <dialog ref={dialogRef} className={`${wallet.dialog} ${styles.dialog}`} aria-labelledby=\"currency-context-title\" onClose={() => { setOpened(false); triggerRef.current?.focus(); }} onKeyDown={event => {\n        if (event.key !== 'Tab') return;\n        const controls = event.currentTarget.querySelectorAll<HTMLElement>('button, input, summary');\n        const first = controls[0];\n        const last = controls[controls.length - 1];\n        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }\n        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }\n      }}>\n        <div className={wallet.dialogStrip}>Simulation \u00b7 No real money</div>\n        <div className={wallet.page}>\n          <div className={wallet.dialogHeader}>\n            <button type=\"button\" onClick={() => dialogRef.current?.close()}>Back to Home</button>\n            <h2 id=\"currency-context-title\">Currency context</h2>\n          </div>\n          {opened ? <>\n          <div className={styles.card} data-testid=\"currency-rate-card\">\n            <p className={styles.usd}>${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>\n            <p className={styles.local} data-testid=\"currency-rate-figure\" aria-live=\"polite\" aria-atomic=\"true\">\u2248 {localFigure}</p>\n          </div>\n          {currency === 'ZMW' ? <div className={styles.slider}>\n            <label htmlFor=\"currency-example-rate\">Try an example rate</label>\n            <input id=\"currency-example-rate\" type=\"range\" min=\"0\" max=\"2\" step=\"1\" value={stop} aria-valuetext={`Example rate ZMW ${selectedRate} per US dollar, about ${localFigure}`} onChange={event => setStop(Number(event.currentTarget.value))} />\n            <div className={styles.stops}>{ZMW_EXAMPLE_RATES.map(rate => <span key={rate}>ZMW {rate}</span>)}</div>\n            <p className={styles.limit}>Three example rates. Not a live rate and not a forecast.</p>\n          </div> : !rateLineOnHome ? <p className={styles.limit}>Example rate: {currency} {latestDisplayRate.toLocaleString('en-US', { maximumFractionDigits: 20 })} per US dollar. Not a live rate.</p> : null}\n          <section className={styles.meaning}><h2>What this means</h2><p>The dollar amount is the same at each rate. The rate sets the local figure.</p></section>\n          <details className={styles.calculation}><summary>How this is calculated</summary>\n            <p>Your US dollar amount is multiplied by each example rate and rounded to two decimal places. Deposits, withdrawals, fees and spreads are not included. This is not your account history or live market data. No money moves.</p>\n          </details>\n          </> : null}\n        </div>\n      </dialog>\n    </section>\n  );\n"
    ]
  ]
};
function bundlePreRuntime(path: string, value: string): string {
  for (const [old, replacement] of BUNDLE_SOURCE_EDITS[path] ?? []) {
    if (value.includes(replacement)) {
      expect(value.split(replacement), path).toHaveLength(2);
      value = value.replace(replacement, old);
    } else expect(value, path).toContain(old);
  }
  return value;
}
