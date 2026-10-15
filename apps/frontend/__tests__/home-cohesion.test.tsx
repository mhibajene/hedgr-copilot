// @vitest-environment jsdom
import React from 'react';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, cleanup, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useSearchParams: vi.fn() }));
vi.mock('../lib/defi', () => ({ defiAdapter: { getNetApy: () => Promise.resolve(0.05) } }));
vi.mock('../lib/policy/usePolicy', () => ({ usePolicy: () => ({ isFeatureEnabled: () => false }) }));
vi.mock('../lib/fx/FxRateContext', () => ({ useFxRate: () => ({ rate: 20, status: 'ready' }), isFxRateAvailable: () => true }));

import DashboardPage from '../app/(app)/dashboard/page';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLedgerStore, type Tx } from '../lib/state/ledger';
import { computeBalanceFromLedger } from '../lib/state/balance';
import * as lastVisit from '../lib/state/last-visit';
import { DANIEL_HOME_READ } from '../lib/state/daniel-home-fixture';
import { SARAH_HOME_READ } from '../lib/state/sarah-home-fixture';
import { SYNTHETIC_JOURNEY_EXAMPLES } from '../lib/state/synthetic-journey';
import { SIMULATION_DISPLAY_CURRENCIES, SIMULATION_DISPLAY_ESTIMATE_CAPTION, formatSimulationDisplayFigure, getSimulationDisplayRate } from '../lib/state/simulation-display-currency';

const source = (path: string) => readFileSync(resolve(__dirname, '..', path), 'utf8');
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const ROUTES = ['/dashboard-synthetic-journey', '/dashboard?journey=class-a-val-002'];
const OPTIONS = ['Your own simulation', "Daniel's reserve", "Sarah's course fee"];
const RATE = 'Example rate: ZMW 27 per US dollar. Not a live rate.';
const NOW = Date.parse('2026-10-15T00:00:00Z');
const row = (type: Tx['type'], amount: number, at: number, status: Tx['status'] = 'settled'): Tx => ({
  txn_ref: `${type}-${at}`, type, status, amount_usd: amount, amount_zmw: amount * 20, fx_rate: 20, created_at: at, updated_at: at,
});
async function home(example = 'own', route = ROUTES[0], rows = [row('deposit', 800, 1000)]) {
  cleanup();
  const url = new URL(`${route}${route.includes('?') ? '&' : '?'}example=${example}`, 'http://localhost');
  window.history.replaceState(null, '', url.pathname + url.search);
  vi.mocked(usePathname).mockReturnValue(url.pathname);
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(url.search) as ReturnType<typeof useSearchParams>);
  // Exercise the actual persisted schema, store hydration, projection and useBalance.
  localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: rows }));
  await act(async () => { await useLedgerStore.persist.rehydrate(); });
  const view = render(<DashboardPage />);
  await act(async () => { await Promise.resolve(); });
  return view;
}
beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock'); vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub'); vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod');
  vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(NOW);
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  localStorage.clear(); sessionStorage.clear();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.useRealTimers(); });

test('T1 each-figure-renders-once on all three real Homes', async () => {
  for (const route of ROUTES) for (const example of ['own', 'daniel', 'sarah']) {
    const view = await home(example, route);
    const main = view.container.querySelector('main')!.cloneNode(true) as HTMLElement;
    main.querySelector('label[for="dashboard-example-picker"]')?.parentElement?.remove();
    main.querySelectorAll('details:not([open]), .sr-only, [aria-hidden="true"]').forEach(n => n.remove());
    const usd = example === 'sarah' ? '$1000.00' : '$800.00';
    const local = example === 'sarah' ? '≈ ZMW 27,000.00' : '≈ ZMW 21,600.00';
    for (const figure of [usd, local, RATE]) expect(main.textContent!.split(figure).length - 1, `${example}: ${figure}`).toBe(1);
  }
});
test('T2 shared-component-used-by-all-three and T3 caption-constant', async () => {
  for (const example of ['own', 'daniel', 'sarah']) {
    const view = await home(example);
    const hero = view.container.querySelector('[data-component="HomeHero"]');
    expect(hero, `${example} must use HomeHero`).not.toBeNull();
    expect(hero!.querySelectorAll('[data-component="LocalFigure"]')).toHaveLength(1);
    expect(hero!.querySelector('[data-component="LocalFigure"]')!.textContent).toContain(SIMULATION_DISPLAY_ESTIMATE_CAPTION);
    expect(view.container.querySelectorAll('[data-component="RateLine"]')).toHaveLength(1);
  }
  for (const file of ['HomeHero', 'DanielExampleHome', 'SarahExampleHome']) {
    const contents = source(`app/(app)/dashboard/${file}.tsx`);
    expect(contents).not.toMatch(/exampleHero|gridColumn|gridRow|function exampleDate|Example figure, not a quote/);
  }
});
test('T4 rate-line-matches-engine byte for byte', async () => {
  const path = resolve(__dirname, '../app/(app)/dashboard/RateLine.tsx');
  expect(existsSync(path), 'shared rate rendering is absent').toBe(true);
  const modulePath = '../app/(app)/dashboard/RateLine';
  const { formatExampleRateLine } = await import(modulePath);
  expect(formatExampleRateLine('ZMW', getSimulationDisplayRate('ZMW'))).toBe(RATE);
  expect(DANIEL_HOME_READ.explanation.rateAssumption).toBe(RATE);
  expect(SARAH_HOME_READ.explanation.rateAssumption).toBe(RATE);
  await home(); expect(screen.getByText(RATE, { exact: true })).toBeDefined();
});
test('T5 engine-byte-identical including tests and goldens', () => {
  // Immutable 56ce3e6 Git blob IDs, copied from the activation receipt before green.
  const blobs: Record<string, string> = ENGINE_BASELINE_BLOBS;
  for (const [path, expected] of Object.entries(blobs)) {
    const bytes = readFileSync(resolve(__dirname, '..', path));
    expect(createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex'), path).toBe(expected);
  }
});
test('T7 one-name-per-example excludes the complete unchanged picker', async () => {
  expect(SYNTHETIC_JOURNEY_EXAMPLES).toEqual([
    { id: 'daniel', name: 'Daniel’s reserve', label: OPTIONS[1] }, { id: 'sarah', name: 'Sarah’s course fee', label: OPTIONS[2] },
  ]);
  for (const [index, example] of ['daniel', 'sarah'].entries()) {
    const view = await home(example);
    const picker = screen.getByRole('combobox', { name: 'Choose an example' }) as HTMLSelectElement;
    expect(Array.from(picker.options).map(o => o.textContent)).toEqual(OPTIONS);
    expect(picker.selectedOptions[0].textContent).toBe(OPTIONS[index + 1]);
    expect(screen.getByTestId('example-picker-value').textContent).toBe(OPTIONS[index + 1]);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Example');
    const clone = view.container.cloneNode(true) as HTMLElement;
    clone.querySelector('label[for="dashboard-example-picker"]')!.parentElement!.remove();
    const name = example === 'daniel' ? 'Daniel’s reserve' : 'Sarah’s course fee';
    expect(clone.textContent!.split(name).length - 1).toBe(1);
    expect(document.getElementById(`dashboard-${example}-label`)!.textContent).toBe(`Fictional example · ${name}`);
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(example === 'daniel' ? 'Figures over time' : 'Course fee');
    if (example === 'daniel') expect(screen.getAllByTestId('daniel-observation').at(-1)!.textContent).toBe('9 Oct 2026 · shown above');
  }
});
test('T8 single-formatUsd feeds all real heroes and shared UTC date formatting', async () => {
  expect(source('lib/utils/money.ts')).not.toMatch(/export function formatUsd/);
  expect(lastVisit.formatUsd(1000)).toBe('$1000.00');
  const heroPath = resolve(__dirname, '../app/(app)/dashboard/HomeHero.tsx');
  expect(existsSync(heroPath), 'shared canonical hero is absent').toBe(true);
  expect(source('app/(app)/dashboard/HomeHero.tsx')).toMatch(/import.*formatUsd.*last-visit/);
  const formatter = vi.spyOn(lastVisit, 'formatUsd');
  for (const example of ['own', 'daniel', 'sarah']) {
    formatter.mockClear(); const view = await home(example);
    expect(view.container.querySelector('[data-component="HomeHero"]')).not.toBeNull();
    expect(formatter).toHaveBeenCalledWith(example === 'sarah' ? 1000 : 800);
  }
  expect(existsSync(resolve(__dirname, '../lib/utils/date.ts'))).toBe(true);
  const datePath = '../lib/utils/date'; const { formatExampleDate } = await import(datePath);
  expect(formatExampleDate('2026-10-09T23:59:59Z')).toBe('9 Oct 2026');
  for (const file of ['DanielExampleHome', 'SarahExampleHome']) expect(source(`app/(app)/dashboard/${file}.tsx`)).toMatch(/import.*formatExampleDate.*utils\/date/);
});
test('T8 F5 negative-pending retains accepted signed USD and local figures', async () => {
  const rows = [row('deposit', -25, 1000, 'pending')];
  expect(computeBalanceFromLedger(rows)).toMatchObject({ available: 0, pending: -25, total: -25 });
  const view = await home('own', ROUTES[0], rows);
  expect(useLedgerStore.getState().transactions).toEqual(rows);
  expect(screen.getByTestId('usd-balance').textContent).toBe('$-25.00');
  expect(screen.getByTestId('local-balance-figure').textContent).toBe('≈ ZMW -675.00');
  expect(view.container.querySelector('[data-component="HomeHero"]')).not.toBeNull();
});
test('T8 F5 negative-historical-animation retains the current interpolation and sign', async () => {
  const rows = [row('withdrawal', 100, 1000), row('deposit', 200, 3000)];
  localStorage.setItem('hedgr:last-home-visit', '2000');
  vi.stubGlobal('matchMedia', () => ({ matches: false }));
  const frames: FrameRequestCallback[] = [];
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => { frames.push(cb); return frames.length; });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  const start = vi.spyOn(performance, 'now').mockReturnValue(0);
  const view = await home('own', ROUTES[0], rows);
  expect(useLedgerStore.getState().transactions).toEqual(rows);
  expect(screen.getByTestId('usd-balance').textContent).toBe('$-100.00');
  expect(screen.getByTestId('local-balance-figure').textContent).toBe('≈ ZMW -2,700.00');
  // Existing cubic easing at progress .25, without replacing page arithmetic.
  await act(async () => { frames.shift()!(600 * (1 - Math.cbrt(0.75))); });
  expect(screen.getByTestId('usd-balance').textContent).toBe('$-50.00');
  expect(screen.getByTestId('local-balance-figure').textContent).toBe('≈ ZMW -1,350.00');
  await act(async () => { frames.shift()!(600); });
  expect(screen.getByTestId('usd-balance').textContent).toBe('$100.00');
  expect(view.container.querySelector('[data-component="HomeHero"]')).not.toBeNull();
  start.mockRestore();
});
test('T9 dead-code-removed without removing exception-state contracts', () => {
  expect(existsSync(resolve(__dirname, '../components/SyntheticTxExceptionNotice.tsx'))).toBe(false);
  expect(source('components/index.ts')).not.toMatch(/SyntheticTxExceptionNotice/);
  const files = readdirSync(resolve(__dirname, '../components')).filter(f => /\.[jt]sx?$/.test(f));
  for (const file of files) expect(source(`components/${file}`)).not.toMatch(/SyntheticTxExceptionNotice/);
});
test('T10 preservation: immutable default/live text at and above grouping threshold and since states', async () => {
  const results: Record<string, string> = {};
  for (const mode of ['simulated', 'live']) for (const state of ['first', 'one', 'several', 'no-change']) {
    vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', mode === 'live' ? 'magic' : 'mock');
    vi.stubEnv('NEXT_PUBLIC_FX_MODE', mode === 'live' ? 'live' : 'stub');
    localStorage.removeItem('hedgr:last-home-visit');
    const rows = [row('deposit', 1000, 1000)];
    if (state !== 'first') { rows.push(row('deposit', 205.37, 3000)); localStorage.setItem('hedgr:last-home-visit', state === 'no-change' ? '4000' : '2000'); }
    if (state === 'several') rows.push(row('withdrawal', 5, 3500));
    const view = await home('own', '/dashboard', rows);
    results[`${mode}:${state}`] = digest(view.container.querySelector('main')!.textContent!);
    expect(view.container.querySelector('[data-component="HomeHero"]')).toBeNull();
  }
  expect(results).toEqual(PRE_GREEN_HOME_TEXT);
});
test('T11 own-sim-rate-line-all-currencies from the unedited registry', async () => {
  const locked = ['Example rate: ZMW 27 per US dollar. Not a live rate.', 'Example rate: KES 130 per US dollar. Not a live rate.', 'Example rate: NGN 1,500 per US dollar. Not a live rate.', 'Example rate: GHS 15 per US dollar. Not a live rate.', 'Example rate: PHP 56 per US dollar. Not a live rate.'];
  for (const [index, { code }] of SIMULATION_DISPLAY_CURRENCIES.entries()) {
    localStorage.setItem('hedgr.simulation.display-currency', code); const view = await home();
    expect(within(view.container).getAllByText(locked[index], { exact: true })).toHaveLength(1);
    expect(screen.getByTestId('local-balance-figure').textContent).toBe(formatSimulationDisplayFigure(800, code));
  }
  const rate = source('app/(app)/dashboard/RateLine.tsx');
  expect(rate).not.toMatch(/\b(?:27|130|1500|15|56)\b/);
  expect(source('app/(app)/dashboard/page.tsx')).toMatch(/getSimulationDisplayRate\(displayCurrency\)/);
});

const ENGINE_BASELINE_BLOBS: Record<string, string> = {
  "__tests__/engine-allocation-bands-panel-copy-contract.test.tsx": "68c733206e639153f577a4aca0a1a9b1817724f5",
  "__tests__/engine-allocation-bands.test.tsx": "eae19feaa02b735cb473f2733e6b0283f1d6d539",
  "__tests__/engine-daniel-read.golden.ts": "1dbfbfa4281becf7ccfe9a1a0cd487eefe029ed4",
  "__tests__/engine-daniel-read.test.ts": "5eb957dc406e000a6eb29c5468f1398e7eb7cb3f",
  "__tests__/engine-notices-and-mock-contract.test.ts": "085054d28cda8eeb2d37157d9f98f065d230c67d",
  "__tests__/engine-posture-context-contract.test.ts": "c7b3a7f9bdd5a4d9a624e0fc2680da10a93f8603",
  "__tests__/engine-posture-header.test.tsx": "faec6dad35cb61fc3f1fd06b470369aed9d08349",
  "__tests__/engine-protective-guidance-copy-contract.test.ts": "ee57ab2c3a926d8ec65292af43e81d644f085eec",
  "__tests__/engine-sarah-currency-match.golden.ts": "71c544e069437594c260f6f05d42f0f4c93f0f1b",
  "__tests__/engine-sarah-currency-match.test.ts": "056419a6302f0d593d14eb635a7359d9914867dd",
  "__tests__/engine-sarah-read.golden.ts": "452857e97e521922363e509322060f430ef44c54",
  "__tests__/engine-sarah-read.test.ts": "55962202a6be99b6aecadcbfb6cd41f3462644e1",
  "__tests__/engine-simulator.test.ts": "92bd3d8ea4674f4dfa802f099d4f581aa28c9667",
  "__tests__/engine-stability-explainer-copy-contract.test.ts": "166ec03d2e3ac6a0f9f25480fe605c4b725e09b0",
  "__tests__/engine-stability-review-snapshot-copy-contract.test.ts": "c0ce5fb2e017e1887e8921cd88daa11cf4fc664a",
  "__tests__/engine-stability-review-snapshot.test.tsx": "d5bca6bdd6d447f4dd2927e90e664675ef4dc64e",
  "__tests__/engine-trust-framing-denylist.ts": "dcc8c4d69558b09c05e028bd87c8f24006a68cdd",
  "__tests__/engine-types-contract.test.ts": "ead17b84ae0229dd256de19517feaf443b3556b2",
  "lib/engine/daniel-read.ts": "e1a20ba36337dc0a6a226872544811ce3ca9df64",
  "lib/engine/format-engine-snapshot-updated-at.ts": "55ed63437d91dda9ff3b244d98aa08a99c24f95e",
  "lib/engine/mock.ts": "78cfc12d4b607b2c5ed4affe2a4f67db0a9c5e25",
  "lib/engine/notices.ts": "caaeaaf326f811dcc191fc0f5e484e726d1e8f50",
  "lib/engine/posture-context.ts": "db30b8f3cd3bb484ddc03ed2c85a042873d17800",
  "lib/engine/protective-guidance-copy.ts": "12b863e06080e8b2a73c720ac4955f44998e7678",
  "lib/engine/review-snapshot-fingerprint.ts": "1a674661b605533004c014aac324c9d414c0e4df",
  "lib/engine/review-snapshot-memory.ts": "6d73fce9ba15e4f8b3b0a081d885b8453b366633",
  "lib/engine/sarah-currency-match.ts": "0b2a96d18c85d43f6affd34082d8cc195a753282",
  "lib/engine/sarah-read.ts": "85b51838aa160635c3116a3a86945d6964ae53a7",
  "lib/engine/simulator.ts": "25f4b61b2004ee726e8d582e0cb74caa57fec9ae",
  "lib/engine/stability-explainer-copy.ts": "edc46f44e2e878dd960cd59c3f7ed484d1757b4e",
  "lib/engine/stability-review-snapshot-copy.ts": "5323bff0c89d5851833b65e843b183c6af64f7ab",
  "lib/engine/types.ts": "4a5f499e2b1f2590486e49a6a0ce29db09619d05",
  "lib/engine/useEngineState.ts": "e6393da00df23b040b02ff302697344bea73cefb"
};
// Captured on unmodified 56ce3e6 runtime, before any runtime edit.
const PRE_GREEN_HOME_TEXT: Record<string, string> = {
  "simulated:first": "b256944abf408147d8bfd059698808f6431e9e9c81f98ecfe8f9a7b1760603d2",
  "simulated:one": "65e44f78957f3c6ed5ff5abb373571d23627737ec93874028e0b62a2619dade8",
  "simulated:several": "99be6737c14c52a34bf1c25d726c5ec1e66ec14166441f206bedc14a42189afb",
  "simulated:no-change": "935f9ef0f12d445e86bf31fa7c0b21fb5db08e0819aa9efd0c5af9b363d22dfc",
  "live:first": "aea467a989b8c20eef1c88965b2ceda682c18f5f392d48d1b9e4e6cc23b33559",
  "live:one": "65a2a38a5367633f1ccf741885fc1cc99ab23dd9c647263f00a9baf57c126e0f",
  "live:several": "de8f413795146782a68694e37fdd0cda95d31d459a60d853e4a6ef488894136b",
  "live:no-change": "65a2a38a5367633f1ccf741885fc1cc99ab23dd9c647263f00a9baf57c126e0f"
};
