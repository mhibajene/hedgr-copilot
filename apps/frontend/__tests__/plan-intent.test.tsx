// @vitest-environment jsdom
import React from 'react';
import { act, cleanup, render, screen, fireEvent, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useSearchParams: vi.fn() }));
vi.mock('../lib/defi', () => ({ defiAdapter: { getNetApy: () => Promise.resolve(0.05) } }));
vi.mock('../lib/policy/usePolicy', () => ({ usePolicy: () => ({ isFeatureEnabled: () => false }) }));
vi.mock('../lib/fx/FxRateContext', () => ({ useFxRate: () => ({ rate: 20, status: 'ready' }), isFxRateAvailable: () => true }));

import DashboardPage from '../app/(app)/dashboard/page';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLedgerStore } from '../lib/state/ledger';
import { PlanningReadCard } from '../app/(app)/dashboard/PlanningReadCard';
import { PLAN_INTENT_COPY as copy } from '../lib/copy/plan-intent-copy';
import { getPlanningReadOrder, getSimulationIntent, setSimulationIntent, SIMULATION_INTENT_KEY, type SimulationPurpose } from '../lib/state/simulation-intent';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod');
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  localStorage.clear(); sessionStorage.clear(); setSimulationIntent(null);
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

async function home(route = '/dashboard-synthetic-journey') {
  const url = new URL(route, 'http://localhost');
  window.history.replaceState(null, '', url.pathname + url.search);
  vi.mocked(usePathname).mockReturnValue(url.pathname);
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(url.search) as ReturnType<typeof useSearchParams>);
  await act(async () => { await useLedgerStore.persist.rehydrate(); });
  const view = render(<DashboardPage />);
  await act(async () => { await Promise.resolve(); });
  return view;
}

const labels = { regular: 'regular', reserve: 'reserve', dated: 'goals' } as const;
function checkCard() {
  const card = screen.getByTestId('planning-read-card');
  const text = card.textContent!;
  expect(text.split(copy.limits)).toHaveLength(2);
  expect(text).not.toMatch(/\d|[$£€%]|\b(?:USD|ZMW|KES|NGN|GHS|PHP|yield|first|then|before|priority|ready|covered|enough|safe|protected|locked|growth|earnings|returns)\b|your money|emergency fund|will be there/i);
  expect(within(card).queryByRole('switch')).toBeNull();
  expect(within(card).queryByRole('checkbox')).toBeNull();
  expect(text).not.toMatch(/You told us|Nothing has moved/);
  return card;
}
function expectChooser() {
  checkCard();
  expect(screen.getByRole('group', { name: copy.question })).not.toBeNull();
  expect(screen.getAllByRole('radio').map(n => n.parentElement!.textContent)).toEqual([copy.labels.regular, copy.labels.reserve, copy.labels.goals]);
  expect(screen.getByRole('button', { name: copy.answers.skip })).not.toBeNull();
  expect(screen.queryByRole('button', { name: copy.change })).toBeNull();
  expect(screen.queryByTestId('planning-read-stance')).toBeNull();
  expect(screen.queryByTestId('planning-read-why')).toBeNull();
  expect(document.querySelectorAll('input:checked')).toHaveLength(0);
}

test('PLAN-INTENT-001 fresh chooser has three purpose radios and no echo', () => {
  render(<PlanningReadCard />); expectChooser();
});
for (const purpose of Object.keys(labels) as SimulationPurpose[]) {
  test(`${purpose}: collapse, exact merged echo/Why, Change clears the remembered answer`, () => {
    render(<PlanningReadCard />);
    const label = labels[purpose];
    fireEvent.click(screen.getByRole('radio', { name: copy.labels[label], exact: true }));
    const card = checkCard();
    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
    expect(screen.queryByRole('button', { name: copy.answers.skip })).toBeNull();
    expect(screen.getByTestId('planning-read-stance').textContent).toBe(copy.confirmation(copy.labels[label]));
    expect(screen.getByTestId('planning-read-stance').textContent).toBe(`You said this portion is meant to support ${copy.labels[label]}. A planning view, not money set aside.`);
    expect(screen.getByTestId('planning-read-why').textContent).toBe(copy.why[label]);
    expect(screen.getAllByTestId('planning-read-why')).toHaveLength(1);
    for (const other of ['regular', 'reserve', 'goals'] as const) if (other !== label) expect(screen.queryByText(copy.why[other], { exact: true })).toBeNull();
    for (const sentence of Object.values(copy.sentences)) expect(screen.queryByText(sentence, { exact: true })).toBeNull();
    expect(within(card).queryByRole('list')).toBeNull();
    expect(screen.queryByTestId('planning-read-dated')?.textContent ?? null).toBe(purpose === 'dated' ? copy.dated : null);
    expect(getPlanningReadOrder(purpose)[0]).toBe(label);
    expect(localStorage.getItem(SIMULATION_INTENT_KEY)).toBe(purpose);
    fireEvent.click(screen.getByRole('button', { name: copy.change }));
    expectChooser();
    expect(getSimulationIntent()).toBeNull();
    expect(localStorage.getItem(SIMULATION_INTENT_KEY)).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: copy.answers.skip }));
    expect(screen.getByTestId('planning-read-stance').textContent).toBe(copy.skipped);
    fireEvent.click(screen.getByRole('button', { name: copy.change }));
    fireEvent.click(screen.getByRole('radio', { name: copy.labels[label], exact: true }));
    expect(getSimulationIntent()).toBe(purpose);
  });
}
test('Skip collapses to only the exact skipped line and Change, with no Why or definitions', () => {
  render(<PlanningReadCard />);
  fireEvent.click(screen.getByRole('button', { name: copy.answers.skip }));
  const card = checkCard();
  expect(card.textContent).toBe(copy.skipped + copy.change);
  expect(screen.queryByRole('group')).toBeNull();
  expect(screen.queryByTestId('planning-read-why')).toBeNull();
  expect(screen.queryByTestId('planning-read-dated')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: copy.change })); expectChooser();
});
test('device storage hydrates valid answers, ignores malformed values and retains a blocked-store fallback', () => {
  localStorage.setItem(SIMULATION_INTENT_KEY, 'dated');
  const view = render(<PlanningReadCard />);
  expect(screen.getByTestId('planning-read-stance').textContent).toBe(copy.confirmation(copy.labels.goals));
  view.unmount(); localStorage.setItem(SIMULATION_INTENT_KEY, 'malformed'); render(<PlanningReadCard />); expectChooser();
  const write = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked fixture'); });
  fireEvent.click(screen.getByRole('radio', { name: copy.labels.reserve, exact: true }));
  expect(getSimulationIntent()).toBe('reserve');
  fireEvent.click(screen.getByRole('button', { name: copy.change })); expectChooser();
  write.mockRestore();
});
test('choice changes only intent; Restart cancel retains it and accepted Restart clears it', async () => {
  await home();
  const hero = screen.getByTestId('dashboard-balance').outerHTML;
  const activity = screen.getByTestId('dashboard-position-line').outerHTML;
  fireEvent.click(screen.getByRole('radio', { name: copy.labels.goals, exact: true }));
  expect(screen.getByTestId('dashboard-balance').outerHTML).toBe(hero);
  expect(screen.getByTestId('dashboard-position-line').outerHTML).toBe(activity);
  cleanup();
  const now = Date.now();
  localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: [{ txn_ref:'intent-reset', type:'deposit', status:'settled', amount_zmw:100, amount_usd:5, fx_rate:20, created_at:now, updated_at:now }] }));
  await home();
  const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
  fireEvent.click(screen.getByRole('button', { name: 'Restart simulated journey' }));
  expect(getSimulationIntent()).toBe('dated');
  confirm.mockReturnValue(true);
  fireEvent.click(screen.getByRole('button', { name: 'Restart simulated journey' }));
  expectChooser(); expect(localStorage.getItem(SIMULATION_INTENT_KEY)).toBeNull();
});
test('eligible reset URL clears intent, while Sarah and Daniel neither render nor clear it', async () => {
  setSimulationIntent('reserve');
  await home('/dashboard?reset=1');
  expect(getSimulationIntent()).toBe('reserve'); cleanup();
  for (const example of ['sarah','daniel']) {
    await home(`/dashboard-synthetic-journey?example=${example}`);
    expect(screen.queryByTestId('planning-read-card')).toBeNull(); expect(getSimulationIntent()).toBe('reserve'); cleanup();
  }
  await home('/dashboard-synthetic-journey?reset=1');
  expectChooser(); expect(getSimulationIntent()).toBeNull();
});
for (const route of ['/dashboard', '/dashboard?example=own', '/dashboard-synthetic-journey?example=sarah', '/dashboard-synthetic-journey?example=daniel', '/dashboard?journey=class-a-val-002&example=sarah', '/dashboard?journey=class-a-val-002&example=daniel']) {
  test(`no card on ${route}`, async () => { await home(route); expect(screen.queryByTestId('planning-read-card')).toBeNull(); });
}
test('the existing journey parameter also gates own simulation', async () => {
  await home('/dashboard?journey=class-a-val-002&example=own'); expectChooser();
});
test('locked copy is exact and includes no removed confirmation variant', () => {
  expect(copy.change).toBe('Change');
  expect(copy.question).toBe('What is this portion meant to support?');
  expect(copy.answers).toEqual({ regular: 'A regular cost', dated: 'A payment on a date', reserve: 'A reserve for the unexpected', skip: 'Skip for now' });
  expect(copy.skipped).toBe('This portion could go towards regular costs, a reserve, or something ahead. A planning view, not money set aside.');
  expect(copy.dated).toBe('A payment on a date: see the Planning read.');
  expect(copy.why).toEqual({ regular: "Regular costs: you'd use this for costs that come round often.", reserve: "Reserve: you'd want this to cover a surprise.", goals: "Goals: you'd keep this in view for something you're planning." });
  expect(copy.sentences).toEqual({ regular: 'For costs that come round often, like rent or bills.', reserve: 'For something unexpected.', goals: "For something you're planning, like a payment on a date." });
  expect(Object.keys(copy).join(' ')).not.toMatch(/standalone|toggle/i);
});

test('PLAN-INTENT-001 hierarchy keeps movement above intent, currency and disclosures without Home targets', async () => {
  const view = await home();
  const regions = [
    view.container.querySelector('[data-component="HomeHero"]')!,
    screen.getByTestId('dashboard-current-status'),
    screen.getByTestId('dashboard-simulation-utilities'),
    screen.getByTestId('dashboard-position-line'),
    screen.getByTestId('planning-read-card'),
    screen.getByTestId('currency-insight'),
    screen.getByTestId('dashboard-disclosures'),
  ];
  for (let i = 1; i < regions.length; i++) {
    expect(regions[i - 1].compareDocumentPosition(regions[i]) & Node.DOCUMENT_POSITION_FOLLOWING).not.toBe(0);
  }
  expect(screen.queryByTestId('research-planning-targets')).toBeNull();
  const rate = view.container.querySelector('[data-component="RateLine"]')!;
  expect(rate.textContent).toBe('Example rate: ZMW 27 per US dollar. Not a live rate.');
  expect(screen.getByTestId('currency-insight').parentElement!.contains(rate)).toBe(true);
  expect(screen.getByTestId('dashboard-current-status').parentElement!.contains(rate)).toBe(false);
});
