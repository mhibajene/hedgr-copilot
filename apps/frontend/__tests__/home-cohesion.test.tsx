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
    const raw = readFileSync(resolve(__dirname, '..', path));
    const bytes = SC_SOURCE_EDITS[path] ? Buffer.from(scPreRuntime(raw.toString(), SC_SOURCE_EDITS[path])) : raw;
    if (path === '__tests__/engine-posture-header.test.tsx') {
      // §391 F2: baseline prepared before runtime, only the three affected assertions.
      expect(digest(bytes.toString())).toBe('be01f75fd3baee972ca2ef72c641603809bac737341ddc0399a5317110786615');
      continue;
    }
    expect(createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex'), path).toBe(expected);
  }
});
test('T7 one-name-per-example excludes the complete unchanged picker', async () => {
  expect(SYNTHETIC_JOURNEY_EXAMPLES.map(({ id, name, label }) => ({ id, name, label }))).toEqual([
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
    if (example === 'daniel') expect(screen.getAllByTestId('daniel-observation').at(-1)!.textContent).toBe('9 Oct · shown above');
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
    results[`${mode}:${state}`] = digest(scPreRuntime(view.container.querySelector('main')!.textContent!, SC_HOME_TEXT_EDITS));
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

// §394: reverse only exact approved edits against immutable pre-runtime receipts.
const SC_SOURCE_EDITS: Record<string, string[][]> = {
  "__tests__/engine-allocation-bands-panel-copy-contract.test.tsx": [
    [
      "  test(\"locks non-empty shipped panel copy segments\", () => {\n    render(<EngineAllocationBands engineState={makeContractEngineState()} />);\n\n    expect(screen.getByText(\"Stability guidance\")).toBeDefined();\n\n    const caption =\n      screen.getByTestId(\"engine-allocation-bands-caption\").textContent ?? \"\";\n",
      "  test(\"locks non-empty shipped panel copy segments\", () => {\n    render(<EngineAllocationBands engineState={makeContractEngineState()} />);\n\n    expect(screen.getByRole(\"heading\", { name: \"Planning targets\", exact: true })).toBeDefined();\n\n    const caption =\n      screen.getByTestId(\"engine-allocation-bands-caption\").textContent ?? \"\";\n"
    ],
    [
      "      screen.getByTestId(\"engine-allocation-philosophy\").textContent ?? \"\";\n    const boundary =\n      screen.getByTestId(\"engine-allocation-boundary\").textContent ?? \"\";\n    const targetRoles =\n      screen.getByTestId(\"engine-allocation-target-roles\").textContent ?? \"\";\n    const targetsIntro =\n      screen.getByTestId(\"engine-allocation-targets-intro\").textContent ?? \"\";\n    const trustLegend =\n",
      "      screen.getByTestId(\"engine-allocation-philosophy\").textContent ?? \"\";\n    const boundary =\n      screen.getByTestId(\"engine-allocation-boundary\").textContent ?? \"\";\n    expect(screen.queryByTestId(\"engine-allocation-target-roles\")).toBeNull();\n    const targetRoles = screen.getByTestId(\"engine-allocation-structure\").textContent ?? \"\";\n    const targetsIntro =\n      screen.getByTestId(\"engine-allocation-targets-intro\").textContent ?? \"\";\n    const trustLegend =\n"
    ],
    [
      "    }\n\n    expect(caption).toMatch(/these targets are guidance, not current money/i);\n    expect(philosophy).toMatch(/preserve value/i);\n    expect(boundary).toMatch(/context, not an instruction/i);\n    expect(targetRoles).toMatch(/three distinct target roles/i);\n    expect(targetRoles).not.toMatch(/\\d+%/);\n    expect(targetsIntro).toMatch(/simulated planning structure/i);\n    expect(targetsIntro).toMatch(/guidance, not current money/i);\n  });\n\n  test(\"keeps shipped panel copy informational and non-accounting\", () => {\n",
      "    }\n\n    expect(caption).toMatch(/these targets are guidance, not current money/i);\n    expect(philosophy).toBe(\"Hedgr shows its targets here: what it sets first, how access works and what the risks are.\");\n    expect(boundary).toMatch(/not an instruction/i);\n    expect(targetRoles).toMatch(/Main target.*Conservative yield.*Reserve/s);\n    expect(targetRoles).toMatch(/50%|44%/);\n    expect(targetsIntro).toMatch(/Hedgr's planning targets/i);\n    expect(targetsIntro).toMatch(/They are not money/i);\n  });\n\n  test(\"keeps shipped panel copy informational and non-accounting\", () => {\n"
    ],
    [
      "      screen.getByTestId(\"engine-allocation-bands-caption\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-philosophy\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-boundary\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-target-roles\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-targets-intro\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-trust-legend\").textContent ?? \"\",\n      document.getElementById(\"engine-allocation-band-liquidityTargetPct-desc\")\n",
      "      screen.getByTestId(\"engine-allocation-bands-caption\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-philosophy\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-boundary\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-structure\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-targets-intro\").textContent ?? \"\",\n      screen.getByTestId(\"engine-allocation-trust-legend\").textContent ?? \"\",\n      document.getElementById(\"engine-allocation-band-liquidityTargetPct-desc\")\n"
    ]
  ],
  "__tests__/engine-allocation-bands.test.tsx": [
    [
      "  test(\"renders purpose-led stability guidance, target roles, values, and detailed distinction\", () => {\n    render(<EngineAllocationBands engineState={makeEngineState()} />);\n\n    expect(screen.getByText(\"Stability guidance\")).toBeDefined();\n    expect(\n      within(\n        screen.getByTestId(\"engine-allocation-band-coreTargetPct\")\n      ).getByText(\"Core stability target\")\n    ).toBeDefined();\n    expect(\n      within(\n",
      "  test(\"renders purpose-led stability guidance, target roles, values, and detailed distinction\", () => {\n    render(<EngineAllocationBands engineState={makeEngineState()} />);\n\n    expect(screen.getByRole(\"heading\", { name: \"Planning targets\", exact: true })).toBeDefined();\n    expect(\n      within(\n        screen.getByTestId(\"engine-allocation-band-coreTargetPct\")\n      ).getByText(\"Main target\")\n    ).toBeDefined();\n    expect(\n      within(\n"
    ],
    [
      "      \"engine-allocation-bands-caption\"\n    ).textContent;\n    expect(caption).toBe(\n      \"See the planning position shown in this simulation and why it is structured this way. These targets are guidance, not current money.\"\n    );\n\n    const philosophy = screen.getByTestId(\n      \"engine-allocation-philosophy\"\n    ).textContent;\n    expect(philosophy).toMatch(/preserve value/i);\n    expect(philosophy).toMatch(/keep access and risk visible/i);\n    expect(philosophy).toMatch(/before action/i);\n\n    const boundary = screen.getByTestId(\n      \"engine-allocation-boundary\"\n    ).textContent;\n    expect(boundary).toContain(\"Guidance only. This planning structure\");\n    expect(boundary).not.toContain(\"—\");\n    expect(boundary).toMatch(/context, not an instruction/i);\n    expect(boundary).toMatch(/does not show current money/i);\n    expect(boundary).toMatch(/divided or moved/i);\n    expect(boundary).not.toMatch(/funded|account|holding|allocated/i);\n\n    const targetsIntro = screen.getByTestId(\n      \"engine-allocation-targets-intro\"\n    ).textContent;\n    expect(targetsIntro).toMatch(/simulated planning structure/i);\n    expect(targetsIntro).toMatch(/guidance, not current money/i);\n\n    const roles = screen.getByTestId(\n      \"engine-allocation-target-roles\"\n    ).textContent;\n    expect(roles).toMatch(/three distinct target roles/i);\n    expect(roles).toMatch(/primary stability role/i);\n    expect(roles).toMatch(/supporting role/i);\n    expect(roles).not.toMatch(/\\d+%/);\n\n    const legend = screen.getByTestId(\n      \"engine-allocation-trust-legend\"\n",
      "      \"engine-allocation-bands-caption\"\n    ).textContent;\n    expect(caption).toBe(\n      \"See the planning position shown and why it is structured this way. These targets are guidance, not current money.\"\n    );\n\n    const philosophy = screen.getByTestId(\n      \"engine-allocation-philosophy\"\n    ).textContent;\n    expect(philosophy).toMatch(/Hedgr shows its targets here/i);\n    expect(philosophy).toMatch(/how access works/i);\n    expect(philosophy).toMatch(/what the risks are/i);\n\n    const boundary = screen.getByTestId(\n      \"engine-allocation-boundary\"\n    ).textContent;\n    expect(boundary).toBe(\"Targets only. They are not an instruction, and they do not divide or move your balance.\");\n    expect(boundary).not.toContain(\"—\");\n    expect(boundary).toMatch(/not an instruction/i);\n    expect(boundary).toMatch(/do not divide/i);\n    expect(boundary).toMatch(/move your balance/i);\n    expect(boundary).not.toMatch(/funded|account|holding|allocated/i);\n\n    const targetsIntro = screen.getByTestId(\n      \"engine-allocation-targets-intro\"\n    ).textContent;\n    expect(targetsIntro).toMatch(/Hedgr's planning targets/i);\n    expect(targetsIntro).toMatch(/They are not money/i);\n\n    expect(screen.queryByTestId(\"engine-allocation-target-roles\")).toBeNull();\n    for (const label of [\"Main target\", \"Conservative yield\", \"Reserve\"]) {\n      expect(screen.getAllByText(label, { exact: true })).toHaveLength(1);\n    }\n\n    const legend = screen.getByTestId(\n      \"engine-allocation-trust-legend\"\n"
    ],
    [
      "    expect(legend).toMatch(/target role/i);\n    expect(legend).toMatch(/conservative yield/i);\n    expect(legend).toMatch(/return opportunity/i);\n    expect(legend).toMatch(/percentages do not divide it/i);\n    expect(legend).toMatch(/guidance does not tell you what to do/i);\n    expect(legend).toMatch(/divide or move simulated money/i);\n    expect(legend).not.toMatch(/funded|account|holding|allocated/i);\n    expect(legend).not.toMatch(/fixture|informational posture|settlement/i);\n  });\n",
      "    expect(legend).toMatch(/target role/i);\n    expect(legend).toMatch(/conservative yield/i);\n    expect(legend).toMatch(/return opportunity/i);\n    expect(legend).toMatch(/balance shown above is separate from these targets/i);\n    expect(legend).toMatch(/what these targets mean/i);\n    expect(legend).toMatch(/how Hedgr divides its plan/i);\n    expect(legend).not.toMatch(/funded|account|holding|allocated/i);\n    expect(legend).not.toMatch(/fixture|informational posture|settlement/i);\n  });\n"
    ],
    [
      "\n    const purpose = screen.getByTestId(\"engine-allocation-bands-caption\");\n    const philosophy = screen.getByTestId(\"engine-allocation-philosophy\");\n    const roles = screen.getByTestId(\"engine-allocation-target-roles\");\n    const targetsIntro = screen.getByTestId(\"engine-allocation-targets-intro\");\n    const structure = screen.getByTestId(\"engine-allocation-structure\");\n    const boundary = screen.getByTestId(\"engine-allocation-boundary\");\n",
      "\n    const purpose = screen.getByTestId(\"engine-allocation-bands-caption\");\n    const philosophy = screen.getByTestId(\"engine-allocation-philosophy\");\n    expect(screen.queryByTestId(\"engine-allocation-target-roles\")).toBeNull();\n    const targetsIntro = screen.getByTestId(\"engine-allocation-targets-intro\");\n    const structure = screen.getByTestId(\"engine-allocation-structure\");\n    const boundary = screen.getByTestId(\"engine-allocation-boundary\");\n"
    ],
    [
      "      );\n\n    expect(comesBefore(purpose, philosophy)).toBe(true);\n    expect(comesBefore(philosophy, roles)).toBe(true);\n    expect(comesBefore(roles, targetsIntro)).toBe(true);\n    expect(comesBefore(targetsIntro, structure)).toBe(true);\n    expect(comesBefore(structure, boundary)).toBe(true);\n    expect(comesBefore(boundary, distinction)).toBe(true);\n",
      "      );\n\n    expect(comesBefore(purpose, philosophy)).toBe(true);\n    expect(comesBefore(philosophy, targetsIntro)).toBe(true);\n    expect(comesBefore(targetsIntro, structure)).toBe(true);\n    expect(comesBefore(structure, boundary)).toBe(true);\n    expect(comesBefore(boundary, distinction)).toBe(true);\n"
    ],
    [
      "    const stableBand = screen.getByTestId(\n      \"engine-allocation-band-coreTargetPct\"\n    );\n    expect(stableBand.textContent).toMatch(/largest target/i);\n    expect(stableBand.textContent).toMatch(/preserving value/i);\n    expect(stableBand.textContent).toMatch(/primary stability guidance/i);\n\n    const yieldBand = screen.getByTestId(\"engine-allocation-band-yieldCapPct\");\n    expect(yieldBand.textContent).toMatch(/limited target/i);\n",
      "    const stableBand = screen.getByTestId(\n      \"engine-allocation-band-coreTargetPct\"\n    );\n    expect(stableBand.textContent).toMatch(/one of the three targets/i);\n    expect(stableBand.textContent).toMatch(/Main target/i);\n    expect(stableBand.textContent).toMatch(/planning target/i);\n\n    const yieldBand = screen.getByTestId(\"engine-allocation-band-yieldCapPct\");\n    expect(yieldBand.textContent).toMatch(/limited target/i);\n"
    ],
    [
      "    expect(primary.getAttribute(\"data-guidance-row\")).toBe(\"true\");\n    expect(yieldLane.getAttribute(\"data-guidance-row\")).toBe(\"true\");\n    expect(reserveLane.getAttribute(\"data-guidance-row\")).toBe(\"true\");\n    expect(primary.textContent).toMatch(/primary stability guidance/i);\n    expect(yieldLane.textContent).toMatch(/supporting guidance/i);\n    expect(reserveLane.textContent).toMatch(/supporting guidance/i);\n    expect(\n",
      "    expect(primary.getAttribute(\"data-guidance-row\")).toBe(\"true\");\n    expect(yieldLane.getAttribute(\"data-guidance-row\")).toBe(\"true\");\n    expect(reserveLane.getAttribute(\"data-guidance-row\")).toBe(\"true\");\n    expect(primary.textContent).toMatch(/planning target/i);\n    expect(yieldLane.textContent).toMatch(/supporting guidance/i);\n    expect(reserveLane.textContent).toMatch(/supporting guidance/i);\n    expect(\n"
    ],
    [
      "      \"engine-allocation-band-liquidityTargetPct\",\n    ]) {\n      expect(screen.getByTestId(testId).textContent).toMatch(\n        /stability target\\s*\\d+%/i\n      );\n    }\n  });\n",
      "      \"engine-allocation-band-liquidityTargetPct\",\n    ]) {\n      expect(screen.getByTestId(testId).textContent).toMatch(\n        /target\\s*\\d+%/i\n      );\n    }\n  });\n"
    ],
    [
      "        expect(details.hasAttribute('open')).toBe(false);\n        details.setAttribute('open', '');\n      } else {\n        expect(screen.getByText('Stability guidance').nextElementSibling).toBe(qualifier);\n      }\n      const keys = collapsed ? ['coreTargetPct', 'liquidityTargetPct', 'yieldCapPct'] as const : ['coreTargetPct', 'yieldCapPct', 'liquidityTargetPct'] as const;\n      expect(Array.from(structure.children).map(row => row.getAttribute('data-testid'))).toEqual(keys.map(key => `engine-allocation-band-${key}`));\n",
      "        expect(details.hasAttribute('open')).toBe(false);\n        details.setAttribute('open', '');\n      } else {\n        expect(screen.getByRole('heading', { name: 'Planning targets', exact: true }).nextElementSibling).toBe(qualifier);\n      }\n      const keys = collapsed ? ['coreTargetPct', 'liquidityTargetPct', 'yieldCapPct'] as const : ['coreTargetPct', 'yieldCapPct', 'liquidityTargetPct'] as const;\n      expect(Array.from(structure.children).map(row => row.getAttribute('data-testid'))).toEqual(keys.map(key => `engine-allocation-band-${key}`));\n"
    ]
  ],
  "__tests__/engine-notices-and-mock-contract.test.ts": [
    [
      "      expect(notice.title.length).toBeGreaterThan(0);\n      expect(notice.body.length).toBeGreaterThan(0);\n      const body = notice.body.toLowerCase();\n      expect(body).toMatch(/informational/);\n      expect(body).toMatch(/not your ledger/);\n    },\n  );\n});\n",
      "      expect(notice.title.length).toBeGreaterThan(0);\n      expect(notice.body.length).toBeGreaterThan(0);\n      const body = notice.body.toLowerCase();\n      expect(body).toMatch(/these are targets/);\n      expect(body).toMatch(/not your balance/);\n    },\n  );\n});\n"
    ]
  ],
  "__tests__/engine-posture-context-contract.test.ts": [
    [
      "  );\n\n  test('uses promoted posture-language patterns without held or rejected primary terms', () => {\n    expect(ENGINE_POSTURE_CONTEXT.normal).toMatch(/within expected range/i);\n    expect(ENGINE_POSTURE_CONTEXT.recovery).toMatch(/within expected range/i);\n    expect(ENGINE_POSTURE_CONTEXT.tightening).toMatch(/protective posture/i);\n    expect(ENGINE_POSTURE_CONTEXT.tightened).toMatch(/protective posture/i);\n    expect(ENGINE_POSTURE_CONTEXT.normal).toMatch(/conservative yield/i);\n\n    for (const copy of Object.values(ENGINE_POSTURE_CONTEXT)) {\n      for (const forbidden of HELD_OR_REJECTED_PRIMARY_TERMS) {\n",
      "  );\n\n  test('uses promoted posture-language patterns without held or rejected primary terms', () => {\n    expect(ENGINE_POSTURE_CONTEXT.normal).toMatch(/within the usual range/i);\n    expect(ENGINE_POSTURE_CONTEXT.recovery).toMatch(/within the usual range/i);\n    expect(ENGINE_POSTURE_CONTEXT.tightening).toBe('The Reserve target is going up while conditions are reviewed.');\n    expect(ENGINE_POSTURE_CONTEXT.tightened).toBe('The Reserve target is higher than usual until conditions ease.');\n    expect(ENGINE_POSTURE_CONTEXT.normal).toBe('Within the usual range. The main target is the largest of the three planning targets.');\n\n    for (const copy of Object.values(ENGINE_POSTURE_CONTEXT)) {\n      for (const forbidden of HELD_OR_REJECTED_PRIMARY_TERMS) {\n"
    ]
  ],
  "__tests__/engine-stability-review-snapshot-copy-contract.test.ts": [
    [
      "\n  test('stance copy stays inside promoted or already-grounded protective posture language', () => {\n    expect(getEngineStabilityReviewSnapshotStance('normal')).toMatch(\n      /within expected range/i,\n    );\n    expect(getEngineStabilityReviewSnapshotStance('recovery')).toMatch(\n      /within expected range/i,\n    );\n    expect(getEngineStabilityReviewSnapshotStance('tightening')).toMatch(\n      /protective posture/i,\n    );\n    expect(getEngineStabilityReviewSnapshotStance('tightened')).toMatch(\n      /protective posture/i,\n    );\n\n    for (const posture of [\n",
      "\n  test('stance copy stays inside promoted or already-grounded protective posture language', () => {\n    expect(getEngineStabilityReviewSnapshotStance('normal')).toMatch(\n      /within the usual range|targets returning to usual/i,\n    );\n    expect(getEngineStabilityReviewSnapshotStance('recovery')).toMatch(\n      /within the usual range|targets returning to usual/i,\n    );\n    expect(getEngineStabilityReviewSnapshotStance('tightening')).toMatch(\n      /Reserve target/i,\n    );\n    expect(getEngineStabilityReviewSnapshotStance('tightened')).toMatch(\n      /Reserve target/i,\n    );\n\n    for (const posture of [\n"
    ]
  ],
  "__tests__/engine-stability-review-snapshot.test.tsx": [
    [
      "    expect(snapshot.textContent).toContain(\n      ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY\n    );\n    expect(snapshot.textContent).toContain(\n      ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY\n    );\n    expect(snapshot.textContent).toContain(ENGINE_STABILITY_REVIEW_CADENCE_CUE);\n",
      "    expect(snapshot.textContent).toContain(\n      ENGINE_STABILITY_REVIEW_AVAILABLE_CONTINUITY\n    );\n    expect(snapshot.textContent).not.toContain(\n      ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY\n    );\n    expect(snapshot.textContent).toContain(ENGINE_STABILITY_REVIEW_CADENCE_CUE);\n"
    ]
  ],
  "lib/engine/notices.ts": [
    [
      "\nexport const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {\n  tightening: {\n    title: 'Stability protection is tightening',\n    body: 'The system is moving toward a more protective mix while conditions are reviewed. When protection and the reserve take priority, the conservative yield target can be lower. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',\n  },\n  tightened: {\n    title: 'Stability protection is elevated',\n    body: 'The system is holding a more protective mix with the reserve prioritized while conditions stay elevated. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',\n  },\n  recovery: {\n    title: 'Stability protection is easing',\n    body: 'The system is moving toward steadier targets as conditions stabilize, with reserve discipline still in view. This is informational guidance about system intent. It is not your ledger balance, holdings, or confirmed positions.',\n  },\n};\n",
      "\nexport const ENGINE_NOTICE_COPY: Record<NonNormalEnginePosture, EngineNotice> = {\n  tightening: {\n    title: 'Targets are changing',\n    body: 'When the Reserve target goes up, the target for earning can go down. These are targets, not your balance.',\n  },\n  tightened: {\n    title: 'Targets are set higher than usual',\n    body: 'These are targets, not your balance.',\n  },\n  recovery: {\n    title: 'Targets are returning to usual',\n    body: 'These are targets, not your balance.',\n  },\n};\n"
    ]
  ],
  "lib/engine/posture-context.ts": [
    [
      "/** One short sentence per posture: definition only. No banner disclaimers duplicated here. */\nexport const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {\n  normal:\n    'Within expected range. Most of your balance stays steady, with conservative yield and reserve capacity kept visible.',\n  tightening:\n    'Protective posture is increasing. Reserve targets are more prominent while conditions are reviewed.',\n  tightened:\n    'Protective posture is elevated. Reserve targets stay prioritized until conditions ease.',\n  recovery:\n    'Within expected range. Targets are easing toward a steadier posture while reserve discipline remains visible.',\n};\n",
      "/** One short sentence per posture: definition only. No banner disclaimers duplicated here. */\nexport const ENGINE_POSTURE_CONTEXT: Record<EnginePosture, string> = {\n  normal:\n    'Within the usual range. The main target is the largest of the three planning targets.',\n  tightening:\n    'The Reserve target is going up while conditions are reviewed.',\n  tightened:\n    'The Reserve target is higher than usual until conditions ease.',\n  recovery:\n    'Within the usual range. Targets are returning to their usual levels.',\n};\n"
    ]
  ],
  "lib/engine/protective-guidance-copy.ts": [
    [
      " * Principle-level only. Does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.\n */\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_TITLE = 'Protection in plain terms';\n\n/** One framing paragraph: deliberate intent, not operational status. */\nexport const ENGINE_PROTECTIVE_GUIDANCE_FRAMING =\n  'Hedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield. That is visible intent you can review, not a nudge to move funds.';\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_POINTS: readonly string[] = [\n  'Caution can limit conservative yield before protection is stressed. The split reflects that priority, not completed movement.',\n  'The Reserve above still means readiness in principle. Targets are informational, not your ledger balance.',\n  'A protective posture does not by itself stop a withdrawal from processing or imply lockup.',\n];\n",
      " * Principle-level only. Does not duplicate ENGINE_POSTURE_CONTEXT or ENGINE_NOTICE_COPY.\n */\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_TITLE = 'When targets change';\n\n/** One framing paragraph: deliberate intent, not operational status. */\nexport const ENGINE_PROTECTIVE_GUIDANCE_FRAMING =\n  'In harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.';\n\nexport const ENGINE_PROTECTIVE_GUIDANCE_POINTS: readonly string[] = [\n  'The Reserve above still means readiness in principle. Targets are informational, not your ledger balance.',\n  'A higher Reserve target does not stop or delay a withdrawal.',\n];\n"
    ]
  ],
  "lib/engine/stability-explainer-copy.ts": [
    [
      "  definition: string;\n}> = [\n  {\n    term: 'Stable balance',\n    definition: 'The primary holding lane. It is held steady to preserve value.',\n  },\n  {\n    term: 'Conservative yield',\n",
      "  definition: string;\n}> = [\n  {\n    term: 'Main target',\n    definition: 'One of the three planning targets. It is a percentage, not money set aside.',\n  },\n  {\n    term: 'Conservative yield',\n"
    ],
    [
      "];\n\nexport const ENGINE_STABILITY_EXPLAINER_PRINCIPLES: readonly string[] = [\n  'Most of the structure is held steady. Conservative yield and a reserve are quieter supporting lanes. This shows system intent, not a map of where funds sit.',\n  'When the system is more cautious, protection and the reserve can outweigh conservative yield. Posture reflects that caution. It does not describe completed movement.',\n];\n\nexport const ENGINE_STABILITY_EXPLAINER_FOOTER =\n",
      "];\n\nexport const ENGINE_STABILITY_EXPLAINER_PRINCIPLES: readonly string[] = [\n  'The three planning targets show a plan. None of them shows where money sits.',\n  'When Hedgr is more cautious, the Reserve target goes up and the target for earning goes down. Nothing is moved.',\n];\n\nexport const ENGINE_STABILITY_EXPLAINER_FOOTER =\n"
    ]
  ],
  "lib/engine/stability-review-snapshot-copy.ts": [
    [
      "  'Illustrative example values, not live targets or advice';\n\nconst STANCE_BY_POSTURE: Record<EnginePosture, string> = {\n  normal: 'Where things stand: within expected range',\n  tightening: 'Where things stand: protective posture increasing',\n  tightened: 'Where things stand: protective posture elevated',\n  recovery: 'Where things stand: within expected range, easing steadily',\n};\n\nexport function getEngineStabilityReviewSnapshotStance(\n",
      "  'Illustrative example values, not live targets or advice';\n\nconst STANCE_BY_POSTURE: Record<EnginePosture, string> = {\n  normal: 'Where things stand: within the usual range',\n  tightening: 'Where things stand: Reserve target going up',\n  tightened: 'Where things stand: Reserve target higher than usual',\n  recovery: 'Where things stand: targets returning to usual',\n};\n\nexport function getEngineStabilityReviewSnapshotStance(\n"
    ],
    [
      "  '“Available” still means ready to use in principle; these targets stay informational.';\n\nexport const ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY =\n  'A protective posture does not, on its own, mean withdrawals are blocked or delayed.';\n\nexport const ENGINE_STABILITY_REVIEW_CADENCE_CUE =\n  'Use this snapshot for a calm, regular check-in. Protective conditions stay visible here without nudging you to act.';\n\nexport function getEngineStabilityReviewTimestampLine(\n  formattedUpdatedAt: string,\n",
      "  '“Available” still means ready to use in principle; these targets stay informational.';\n\nexport const ENGINE_STABILITY_REVIEW_WITHDRAWAL_CONTINUITY =\n  'A higher Reserve target does not stop or delay a withdrawal.';\n\nexport const ENGINE_STABILITY_REVIEW_CADENCE_CUE =\n  'Check in here whenever you like. Nothing here asks you to act.';\n\nexport function getEngineStabilityReviewTimestampLine(\n  formattedUpdatedAt: string,\n"
    ]
  ]
};
const SC_HOME_TEXT_EDITS = [
  [
    "eturn opportunity when conditions allow.Stability target20%ReserveSupporting guidanceA buffer target, kept ready if needed.Stability target30%Guidance only. This planning structure is context, not an instruction. It does not show current money or prove that simulated money was divided or moved.Planning targets. The percentages show intended stability priorities in this simulation only.Verify what stability targets meanTarget role. A lower Conser",
    "eturn opportunity when conditions allow.Target20%ReserveSupporting guidanceA buffer target, kept ready if needed.Target30%Targets only. They are not an instruction, and they do not divide or move your balance.Planning targets. The percentages show how Hedgr divides its plan.What these targets meanTarget role. A lower Conser"
  ],
  [
    "ts are guidance, not current money.Hedgr's guidance makes its priorities visible in this simulation: preserve value first, keep access and risk visible, and understand the situation before action.Hedgr represents those priorities through three distinct target roles.Core stability targetPrimary stability rolePreserve value as the primary stability priority.Conservative yieldSupporting roleKeep return opportunity limited and conditional.ReserveSupporting roleKeep a buffer ready if needed.These percentages describe a simulated planning structure for those roles. They are guidance, not current money.Core stability targetPrimary stability guidanceThe largest target, focused on preserving value.Stability target50%Conservative yieldSupporting gui",
    "ts are guidance, not current money.Hedgr shows its targets here: what it sets first, how access works and what the risks are.These percentages are Hedgr's planning targets for each role. They are not money.Main targetPlanning targetOne of the three targets.Target50%Conservative yieldSupporting gui"
  ],
  [
    " kept ready in principle if you need it.Most of the structure is held steady. Conservative yield and a reserve are quieter supporting lanes. This shows system intent, not a map of where funds sit.When the system is more cautious, protection and the reserve can outweigh conservative yield. Posture reflects that caution. It does not describe completed movement.Targets are not accounting truth. Your ",
    " kept ready in principle if you need it.The three planning targets show a plan. None of them shows where money sits.When Hedgr is more cautious, the Reserve target goes up and the target for earning goes down. Nothing is moved.Targets are not accounting truth. Your "
  ],
  [
    "ciple; these targets stay informational.A protective posture does not, on its own, mean withdrawals are blocked or delayed.Protection in plain termsViewHedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield. That is visible intent you can review, not a nudge to move funds.Caution can limit conservative yield before protection is stressed. The split reflects that priority, not completed movement.The Reserve above still means readiness",
    "ciple; these targets stay informational.When targets changeViewIn harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.The Reserve above still means readiness"
  ],
  [
    " your prior check.Oct 15, 2026, 12:00 AMProtection in plain termsViewHedgr treats stability and protection as deliberate design choices. In tougher conditions, these informational targets may emphasize protection and liquidity ahead of conservative yield. That is visible intent you can review, not a nudge to move funds.Caution can limit conservative yield before protection is stressed. The split reflects that priority, not completed movement.The Reserve above still means readiness",
    " your prior check.Oct 15, 2026, 12:00 AMWhen targets changeViewIn harder conditions, Hedgr may raise the Reserve target and lower the target for earning. You can see this here. It is not a prompt to do anything.The Reserve above still means readiness"
  ],
  [
    "ets or adviceWhere things stand: within expected rangeLast viewed locallyNo prior local view in this browser.Review detailsViewUse this snapshot for a calm, regular check-in. Protective conditions stay visible here without nudging you to act.“Available” still means read",
    "ets or adviceWhere things stand: within the usual rangeLast viewed locallyNo prior local view in this browser.Review detailsViewCheck in here whenever you like. Nothing here asks you to act.“Available” still means read"
  ],
  [
    "ets or adviceWhere things stand: within expected rangeLast viewed locallyOct 15, 2026, 12:00 AMReview detailsViewUse this snapshot for a calm, regular check-in. Protective conditions stay visible here without nudging you to act.Since you last opened this r",
    "ets or adviceWhere things stand: within the usual rangeLast viewed locallyOct 15, 2026, 12:00 AMReview detailsViewCheck in here whenever you like. Nothing here asks you to act.Since you last opened this r"
  ],
  [
    "informational posture, not ledger truth.Stable balance — The primary holding lane. It is held steady to preserve value.Conservative yield — A supporting lane",
    "informational posture, not ledger truth.Main target — One of the three planning targets. It is a percentage, not money set aside.Conservative yield — A supporting lane"
  ],
  [
    "hown within the guidance.Current state. The simulated balance shown above is separate from this guidance. The percentages do not divide it.No instruction or movement. Guidance does not tell you what to do, and a target does not divide or move simulated money.How Hedgr interprets stabilityReviewReview snapshotIllustrative exampl",
    "hown within the guidance.Current state. Your balance shown above is separate from these targets.How Hedgr sets its targetsReviewReview snapshotIllustrative exampl"
  ],
  [
    " not live targets or adviceNORMALWithin expected range. Most of your balance stays steady, with conservative yield and reserve capacity kept visible.There is nothing here you need to manag",
    " not live targets or adviceNORMALWithin the usual range. The main target is the largest of the three planning targets.There is nothing here you need to manag"
  ],
  [
    "nformational, not your ledger balance.A protective posture does not by itself stop a withdrawal from processing or imply lockup.Why your balance is structured this way",
    "nformational, not your ledger balance.A higher Reserve target does not stop or delay a withdrawal.Why your balance is structured this way"
  ],
  [
    " real money is split or moved.How Hedgr interprets stabilityReviewReview snapshotIllustrative exampl",
    " real money is split or moved.How Hedgr sets its targetsReviewReview snapshotIllustrative exampl"
  ],
  [
    "allDepositJan 1+$1000.00Planning targetsStability guidanceIllustrative example values, not live ta",
    "allDepositJan 1+$1000.00Planning targetsPlanning targetsIllustrative example values, not live ta"
  ],
  [
    ".37DepositJan 1+$1000.00Planning targetsStability guidanceIllustrative example values, not live ta",
    ".37DepositJan 1+$1000.00Planning targetsPlanning targetsIllustrative example values, not live ta"
  ],
  [
    "ckend events.Where things stand: within expected rangeInformational targets unchanged si",
    "ckend events.Where things stand: within the usual rangeInformational targets unchanged si"
  ],
  [
    "026, 12:00 AMWhere things stand: within expected rangeInformational targets unchanged si",
    "026, 12:00 AMWhere things stand: within the usual rangeInformational targets unchanged si"
  ],
  [
    "nciple; these targets stay informational.A protective posture does not, on its own, mean withdrawals are blocked or delayed.This comparison is about system targets",
    "nciple; these targets stay informational.This comparison is about system targets"
  ],
  [
    " or adviceSee the planning position shown in this simulation and why it is structured this way. The",
    " or adviceSee the planning position shown and why it is structured this way. The"
  ]
];

function scPreRuntime(value: string, edits: readonly (readonly string[])[]): string {
  for (const [before, after] of edits) value = value.replaceAll(after, before);
  return value;
}
