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
  h1: 'Sarah’s example', heading: 'Sarah’s course fee', caption: 'K27,000 · Example figure', card: 'Course fee',
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
  expect(screen.getByTestId('sarah-read-figure').textContent).toBe('$1,000.00 USD');
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
  expect(SYNTHETIC_JOURNEY_EXAMPLES).toEqual([{ id: 'daniel', label: OPTIONS[1] }, { id: 'sarah', label: OPTIONS[2] }]);
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

test('Sarah hero uses $1,000.00 USD and one independent fee observation', async () => {
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
  expect(panel().querySelector('time')?.getAttribute('datetime')).toBe(AS_OF);
  expect(panel().querySelectorAll('time')).toHaveLength(2);
  expect(panel().querySelectorAll('time')[1].getAttribute('datetime')).toBe('2027-10-01');
  expect(panel().textContent?.split('K27,000')).toHaveLength(2);
  expect(panel().textContent).not.toContain('Course fee USD 1,000');
  expect(screen.getAllByTestId('sarah-fee-card')).toHaveLength(1);
  expect(screen.getByTestId('sarah-fee-card').querySelector('time')?.parentElement?.textContent).toBe(COPY.due);
  expect(within(panel()).getAllByText(COPY.rate, { exact: true })).toHaveLength(1);
  expect(within(panel()).getAllByText(COPY.limits, { exact: true })).toHaveLength(1);
  const fixtureSource = source('lib/state/sarah-home-fixture.ts');
  expect(fixtureSource).toMatch(/SARAH_EXAMPLE_INPUTS/); expect(fixtureSource).toMatch(/name === 'U3'/);
  expect(fixtureSource.match(/computeSarahRead\(/g)).toHaveLength(1);
  expect(fixtureSource).not.toMatch(/\b27\b|research|golden|__tests__|Date\.now|localStorage|sessionStorage/);
  expect(panel().querySelectorAll('svg, canvas, progress, meter, [role="progressbar"], [data-delta], [data-direction]')).toHaveLength(0);
  expect(panel().textContent).not.toMatch(/history|last visit|before|after|difference|countdown|progress/i);
  view.unmount();
  // Arbitrary read proves both dates, declaration and local text without clock/visit dependence.
  const { SarahExampleHome } = await import('../app/(app)/dashboard/SarahExampleHome');
  const read = computeSarahRead(u3);
  const sentinel = {...read, rateBasis:{kind:'example-rate' as const,zmwPerUsd:DANIEL_FIXTURE_RATE_ZMW_PER_USD}, asOf:'2030-02-03T23:45:00.000Z',declaredFee:{...read.declaredFee,amount:1234.56,dueDate:'2031-04-05'},localDisplay:'ENGINE FIGURE',
    explanation:{fee:'ENGINE FEE',rateAssumption:'ENGINE RATE',limits:'ENGINE LIMITS'}};
  render(<SarahExampleHome read={sentinel}/>);
  expect(screen.getByTestId('sarah-read-figure').textContent).toBe('$1,234.56 USD');
  expect(screen.getByTestId('sarah-read-caption').textContent).toBe('ENGINE FIGURE · Example figure');
  expect(screen.getByTestId('sarah-read-as-of').textContent).toBe('Example date: 3 Feb 2030');
  expect(screen.getByTestId('sarah-fee-card').querySelector('time')?.textContent).toBe('5 Apr 2031');
  expect(Array.from(panel().querySelectorAll('time')).map(n=>n.getAttribute('datetime'))).toEqual([sentinel.asOf,sentinel.declaredFee.dueDate]);
  for (const text of ['ENGINE RATE','ENGINE LIMITS']) expect(screen.getByText(text,{exact:true})).toBeDefined();
  expect(screen.queryByText('ENGINE FEE')).toBeNull();
});

test('Sarah Home has no fee selector or kwacha read', () => {
  for (const route of ROUTES) for (const fee of ['zmw', 'usd', 'unknown']) {
    at(route, 'sarah', `fee=${fee}&keep=1`); const view = render(<DashboardPage />); assertRead();
    expect(screen.getAllByRole('combobox')).toHaveLength(1);
    expect(panel().querySelectorAll('select, input, button, a')).toHaveLength(0);
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
    expect(screen.getByTestId('sarah-fee-card').textContent).toBe(COPY.card + COPY.due + COPY.rate + COPY.limits);
    expect(panel().textContent).toBe(COPY.heading + '$1,000.00 USD' + COPY.caption + COPY.date + COPY.card + COPY.due + COPY.rate + COPY.limits);
    expect(picker().selectedOptions[0].textContent).toBe(OPTIONS[2]);
    expect(screen.getAllByText(COPY.rate, { exact: true })).toHaveLength(1);
    const text = panel().textContent!.replace(COPY.limits, ''); // Keep the exact negative payment-ability statement.
    for (const denied of ENGINE_TRUST_INFORMATIONAL_DENYLIST) expect(text.toLowerCase()).not.toContain(denied);
    expect(text).not.toMatch(/hedg(?:e|ing)|sav(?:ing|ings)|contribut|sufficien|cover(?:age|ed|s)?|gap|progress|forecast|afford|can pay|on track|fund(?:ed|ing)|goal|guarantee|protect|gain|loss|higher|lower|increase|decrease/i);
    expect(panel().querySelectorAll('button, a, input, select, progress, meter, [role="progressbar"]')).toHaveLength(0);
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

test('Sarah preserves Engine, golden, Daniel and shared style sources byte for byte', () => {
  const hashes: Record<string, string> = {
    "lib/engine/sarah-read.ts": "6114b2bc267a6a997115e604b5865bf6feb4760aff922d27823e5854ae9fa34b",
    "lib/engine/daniel-read.ts": "84fb14d81def62ffe3491fe9f3f6b64a9705e497952fa37ff4f604d018764e60",
    "__tests__/engine-sarah-read.golden.ts": "656fb25c528c85f8b8a02c026e1b95699dc5cdd6ed617e276e2cbc64ac2784f5",
    "__tests__/engine-daniel-read.golden.ts": "d2fe6c27bfe369e068958181da41d1d04594e41b192f47d2379fe1f9d62d8ab4",
    "lib/state/daniel-home-fixture.ts": "af81ee319ae5b4f97e1dcf9403e79d8f94a71f9bc68b37df1da5c3b530fb2081",
    "app/(app)/dashboard/DanielExampleHome.tsx": "8c58bf8734358e33b028b77e57dc8ae58e6bbcc1566299633828dadbb0008d9e",
    "app/(app)/dashboard/synthetic-home.module.css": "f29cded5ea10c162a13d297b2810d8842fb63b3cc7e008b6544f4cee50512a84",
    "app/(app)/dashboard/PositionLine.tsx": "d854781bd1b0950de0fc8e16a972e8ba7e47842e263a7c776664cb7deb8dae0a",
    "app/(app)/dashboard/CurrencyInsight.tsx": "769028b998087f94e53bc1b7ff875a1f916e6963537d06911f56bc19bd4f5b33"
};
  for (const [file, expected] of Object.entries(hashes)) {
    let contents = source(file);
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
    expect(createHash('sha256').update(contents).digest('hex'), file).toBe(expected);
  }
});
