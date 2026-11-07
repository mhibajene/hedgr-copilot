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
import { getPlanningReadOrder, getSimulationIntent, setSimulationIntent, type SimulationPurpose } from '../lib/state/simulation-intent';

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

const orders = {
  regular: ['regular', 'reserve', 'goals'],
  dated: ['goals', 'regular', 'reserve'],
  reserve: ['reserve', 'regular', 'goals'],
} as const;
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

test('PLAN-INTENT-001 purpose selection preserves the hero after the movement group', async () => {
  const view = await home();
  const card = checkCard();
  expect(screen.getByRole('group', { name: copy.question })).not.toBeNull();
  const hero = view.container.querySelector('[data-component="HomeHero"]')!;
  expect(screen.getByTestId('dashboard-position-line').nextElementSibling).toBe(card);
  expect(screen.queryByTestId('research-planning-targets')).toBeNull();
  const heroBefore = hero.innerHTML;
  fireEvent.click(screen.getByRole('radio', { name: copy.answers.dated, exact: true }));
  expect(hero.innerHTML).toBe(heroBefore);
  expect(screen.queryByTestId('research-planning-targets')).toBeNull();
  expect(hero.querySelector('[data-testid="usd-balance"]')?.textContent).toBe('$0.00');
});

test('default read has the approved words-only order; Skip leaves only its stance', () => {
  render(<PlanningReadCard />);
  for (const skip of [false, true]) {
    if (skip) fireEvent.click(screen.getByRole('radio', { name: copy.answers.skip }));
    checkCard();
    expect(screen.getByTestId('planning-read-stance').textContent).toBe(copy.skipped);
    if (skip) expect(screen.queryByTestId('planning-read-labels')).toBeNull();
    else expect(within(screen.getByTestId('planning-read-labels')).getAllByRole('heading').map(n => n.textContent)).toEqual(['Regular costs', 'Reserve', 'Goals']);
    expect(screen.queryByTestId('planning-read-why')).toBeNull();
    expect(screen.queryByTestId('planning-read-dated')).toBeNull();
  }
});

for (const purpose of Object.keys(orders) as SimulationPurpose[]) {
  test(`${purpose} choice, exact merged copy, mapping and change to skip`, () => {
    render(<PlanningReadCard />);
    fireEvent.click(screen.getByRole('radio', { name: copy.answers[purpose], exact: true }));
    checkCard();
    expect(getPlanningReadOrder(purpose)).toEqual(orders[purpose]);
    expect(screen.getByTestId('planning-read-stance').textContent).toBe(copy.confirmation(copy.answers[purpose]));
    expect(screen.getByTestId('planning-read-stance').textContent).toBe(`You said this portion is meant to support ${copy.answers[purpose]}. A planning view, not money set aside.`);
    expect(screen.getByTestId('planning-read-why').textContent).toBe(copy.why[orders[purpose][0]]);
    const rows = within(screen.getByTestId('planning-read-labels')).getAllByRole('listitem');
    expect(rows.map(row => row.textContent)).toEqual(orders[purpose].map(label => copy.labels[label] + copy.sentences[label]));
    expect(screen.queryByTestId('planning-read-dated')?.textContent ?? null).toBe(purpose === 'dated' ? copy.dated : null);
    fireEvent.click(screen.getByRole('radio', { name: copy.answers.skip }));
    expect(screen.getByTestId('planning-read-stance').textContent).toBe(copy.skipped);
    expect(getPlanningReadOrder(getSimulationIntent())).toEqual(['regular', 'reserve', 'goals']);
  });
}

test('choice changes affect the words and order only, and survive an in-session remount without persistence', () => {
  const storageRead = vi.spyOn(Storage.prototype, 'getItem');
  const storageWrite = vi.spyOn(Storage.prototype, 'setItem');
  const storageRemove = vi.spyOn(Storage.prototype, 'removeItem');
  const view = render(<PlanningReadCard />);
  for (const purpose of ['regular', 'reserve', 'dated'] as const) {
    fireEvent.click(screen.getByRole('radio', { name: copy.answers[purpose], exact: true }));
    expect(getSimulationIntent()).toBe(purpose);
  }
  view.unmount(); render(<PlanningReadCard />);
  expect((screen.getByRole('radio', { name: copy.answers.dated, exact: true }) as HTMLInputElement).checked).toBe(true);
  expect(storageRead).not.toHaveBeenCalled();
  expect(storageWrite).not.toHaveBeenCalled();
  expect(storageRemove).not.toHaveBeenCalled();
});

for (const route of ['/dashboard', '/dashboard?example=own', '/dashboard-synthetic-journey?example=sarah', '/dashboard-synthetic-journey?example=daniel', '/dashboard?journey=class-a-val-002&example=sarah', '/dashboard?journey=class-a-val-002&example=daniel']) {
  test(`no card on ${route}`, async () => {
    await home(route);
    expect(screen.queryByTestId('planning-read-card')).toBeNull();
  });
}
test('the existing journey parameter also gates own simulation', async () => {
  await home('/dashboard?journey=class-a-val-002&example=own');
  checkCard();
});

test('locked copy is exact and includes no removed confirmation variant', () => {
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

test('PLAN-INTENT-001 skipped read omits every purpose definition and Why line', () => {
  render(<PlanningReadCard />);
  fireEvent.click(screen.getByRole('radio', { name: copy.answers.skip, exact: true }));
  checkCard();
  expect(screen.getByTestId('planning-read-stance').textContent).toBe(copy.skipped);
  expect(screen.queryByTestId('planning-read-labels')).toBeNull();
  expect(screen.queryByTestId('planning-read-why')).toBeNull();
  for (const text of [...Object.values(copy.sentences), ...Object.values(copy.why)]) expect(screen.queryByText(text, { exact: true })).toBeNull();
});

test('PLAN-INTENT-001 fresh chooser has three purpose radios and no echo', () => {
  render(<PlanningReadCard />);
  expect(screen.getAllByRole('radio')).toHaveLength(3);
  expect(screen.queryByTestId('planning-read-stance')).toBeNull();
});

test('PLAN-INTENT-001 selecting a purpose collapses the chooser', () => {
  render(<PlanningReadCard />);
  fireEvent.click(screen.getAllByRole('radio')[0]);
  expect(screen.queryByRole('group', { name: copy.question })).toBeNull();
  expect(screen.getByTestId('planning-read-stance')).not.toBeNull();
});
