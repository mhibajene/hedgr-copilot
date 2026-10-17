// @vitest-environment jsdom
import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { PositionLine } from '../app/(app)/dashboard/PositionLine';
import type { PositionEntry } from '../lib/state/last-visit';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
vi.mock('next/navigation', () => ({ usePathname: () => '/dashboard-synthetic-journey', useSearchParams: () => new URLSearchParams() }));
vi.mock('../lib/defi', () => ({ defiAdapter: { getNetApy: () => Promise.resolve(0.05) } }));
vi.mock('../lib/policy/usePolicy', () => ({ usePolicy: () => ({ isFeatureEnabled: () => false }) }));
vi.mock('../lib/fx/FxRateContext', () => ({ useFxRate: () => ({ rate: 20, status: 'ready' }), isFxRateAvailable: () => true }));
import DashboardPage from '../app/(app)/dashboard/page';
import { useLedgerStore } from '../lib/state/ledger';
const source = (file: string) => readFileSync(resolve(__dirname, '..', file), 'utf8');
const FIRST = Date.parse('2026-10-08T12:00:00Z');
const NEXT = Date.parse('2026-10-09T12:00:00Z');
const entries: PositionEntry[] = [
  { id: 'd', at: FIRST, type: 'DEPOSIT', amountUSD: 500, balanceBefore: 0, balanceAfter: 500 },
  { id: 'w', at: NEXT, type: 'WITHDRAW', amountUSD: 20, balanceBefore: 500, balanceAfter: 480 },
];
beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock'); vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub'); vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod');
  vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime('2026-10-15T12:00:00Z');
  vi.stubGlobal('matchMedia', () => ({ matches: true })); localStorage.clear(); sessionStorage.clear();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.useRealTimers(); });
test('V1 single-chart-component', () => {
  const adapter = source('app/(app)/dashboard/PositionLine.tsx');
  expect(adapter).toMatch(/import.*ExampleLineChart/); expect(adapter).not.toMatch(/<svg/);
  for (const file of ['DanielExampleHome', 'SarahExampleHome']) expect(source(`app/(app)/dashboard/${file}.tsx`)).not.toMatch(/<svg/);
});
test('V7 tap-focus-reveal-accessible and V6 rendered label-flip-on-collision', () => {
  render(<PositionLine entries={entries} lastVisit={FIRST + 1} visualise heroAmount={480} />);
  const chart = screen.getByTestId('example-line-chart');
  expect(chart.closest('[aria-hidden="true"]')).toBeNull();
  const dots = within(chart).getAllByTestId('chart-event-dot'); expect(dots).toHaveLength(2);
  for (const dot of dots) { expect(dot.tagName).toBe('BUTTON'); expect(dot.getAttribute('aria-controls')).toBe(screen.getByTestId('chart-event-list').id); expect(dot.closest('[aria-hidden="true"]')).toBeNull(); }
  fireEvent.focus(dots[1]);
  expect(screen.getByRole('button', { name: 'All changes' }).getAttribute('aria-expanded')).toBe('true');
  expect(screen.getByTestId('chart-event-list').className).not.toMatch(/sr-only/);
  expect(within(screen.getByTestId('chart-event-list')).getAllByRole('listitem').map(n => n.textContent)).toEqual(['First deposit +$500.00 · 8 Oct', 'Withdrawal −$20.00 · 9 Oct']);
  expect(source('app/(app)/dashboard/synthetic-home.module.css')).toMatch(/visualiserDot:focus-visible/);
});
test('V8 last-visit-own-sim-only and V9 no-axis-dates-when-event-spaced', () => {
  const view = render(<PositionLine entries={entries} lastVisit={FIRST + 1} visualise heroAmount={480} />);
  expect(screen.getByTestId('dashboard-position-line-visit').textContent).toBe('Your last visit');
  expect(screen.getByTestId('dashboard-position-line-visit').className).toMatch(/visualiserVisit/);
  expect(view.container.querySelectorAll('[data-axis], .axis')).toHaveLength(0);
  view.unmount(); render(<PositionLine entries={entries} lastVisit={null} visualise heroAmount={480} />);
  expect(screen.queryByTestId('dashboard-position-line-visit')).toBeNull();
  for (const file of ['DanielExampleHome', 'SarahExampleHome']) expect(source(`app/(app)/dashboard/${file}.tsx`)).not.toMatch(/readLastVisit|writeLastVisit|localStorage|sessionStorage/);
});
test('V5 merged dots retain every event and V6 chart collision flips below', () => {
  vi.stubGlobal('innerWidth', 1440);
  const three = [...entries, { ...entries[1], id: 'd2', type: 'DEPOSIT' as const, amountUSD: 10, balanceBefore: 480, balanceAfter: 490, at: NEXT + 1000 }];
  const view = render(<PositionLine entries={three} lastVisit={FIRST - 1} visualise heroAmount={490} />);
  expect(view.container.querySelectorAll('[data-chart-label]')).toHaveLength(1);
  expect(view.container.querySelector('[data-chart-label]')!.textContent).toBe('3 changes since your last visit');
  expect(view.container.querySelector('[data-chart-label][data-placement="below"]')).toBeNull();
  view.unmount();
  const many = Array.from({ length: 40 }, (_, i) => ({ ...entries[0], id: `e${i}`, at: FIRST + i * 1000, amountUSD: 1, balanceBefore: i, balanceAfter: i + 1 }));
  render(<PositionLine entries={many} lastVisit={null} visualise heroAmount={40} />);
  const dots = screen.getAllByTestId('chart-event-dot');
  expect(dots.length).toBeLessThan(many.length);
  expect(dots.some(dot => /\d+ changes on 8 Oct/.test(dot.getAttribute('aria-label') ?? ''))).toBe(true);
  expect(within(screen.getByTestId('chart-event-list')).getAllByRole('listitem')).toHaveLength(40);
});
test('V18 own-sim-empty-state-exact and sole first deposit hero deferral', () => {
  const view = render(<PositionLine entries={[]} lastVisit={null} visualise heroAmount={0} />);
  expect(screen.getByTestId('dashboard-position-line').textContent).toBe('No deposits yet. Your first one will start this chart.');
  view.unmount(); render(<PositionLine entries={[entries[0]]} lastVisit={null} visualise heroAmount={500} />);
  fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
  expect(screen.getByTestId('chart-event-list').textContent).toBe('First deposit · 8 Oct · shown above');
  expect(screen.getByRole('button', { name: 'First deposit, 8 Oct' }).textContent).toBe('');
});
test('V10 say-it-once-incl-what-changed, V11 caption-and-rate-27, V13 no-arrow-line-ticket-b-copy-locked', async () => {
  for (const visit of [null, FIRST + 1, FIRST - 1, NEXT + 1]) {
    cleanup(); localStorage.clear();
    if (visit !== null) localStorage.setItem('hedgr:last-home-visit', String(visit));
    localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: entries.map(entry => ({ txn_ref: entry.id, type: entry.type === 'DEPOSIT' ? 'deposit' : 'withdrawal', status: 'settled', amount_usd: entry.amountUSD, amount_zmw: entry.amountUSD * 27, fx_rate: 27, created_at: entry.at, updated_at: entry.at })) }));
    await act(async () => { await useLedgerStore.persist.rehydrate(); });
    const view = render(<DashboardPage />); await act(async () => { await Promise.resolve(); });
    expect(screen.getByTestId('usd-balance').textContent).toBe('$480.00');
    fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
    const main = view.container.querySelector('main')!.cloneNode(true) as HTMLElement;
    main.querySelectorAll('[aria-hidden="true"], .sr-only, details:not([open]), dialog:not([open])').forEach(n => n.remove());
    expect(main.textContent!.split('$20.00').length - 1).toBe(1); expect(main.textContent!.split('−$20.00').length - 1).toBe(1);
    expect(screen.getByTestId('dashboard-current-status').textContent).not.toMatch(/\$|→/);
    expect(screen.queryByTestId('dashboard-since-entries')).toBeNull(); expect(screen.queryByTestId('dashboard-change-chip')).toBeNull();
    expect(screen.getAllByText('Example figure, not a quote', { exact: true })).toHaveLength(1);
    expect(screen.getByTestId('local-balance-figure').textContent).toBe('≈ ZMW 12,960.00');
    expect(screen.getByText('Example rate: ZMW 27 per US dollar. Not a live rate.', { exact: true })).toBeDefined();
    expect(screen.getByText('This is what happened in your simulation. It doesn’t tell you what will happen next.', { exact: true })).toBeDefined();
    const expected = visit === null ? 'A simulated withdrawal on 9 Oct.' : visit < FIRST ? '2 changes since your last visit' : visit < NEXT ? '1 change since your last visit' : 'No changes since your last visit';
    if (visit !== null && visit < NEXT) {
      expect(screen.queryByTestId('engine-posture-context')).toBeNull();
      expect(screen.getByTestId('example-line-chart').querySelector('[data-chart-label]')!.textContent).toBe(expected);
    } else expect(screen.getByTestId('engine-posture-context').textContent).toBe(expected);
    const inclusion = visit === NEXT + 1 ? 'Includes your simulated activity.' : visit === FIRST - 1 ? 'These simulated entries are included in the balance above.' : 'This simulated withdrawal is included in the balance above.';
    expect(screen.getAllByText(inclusion, { exact: true })).toHaveLength(1);
  }
});
