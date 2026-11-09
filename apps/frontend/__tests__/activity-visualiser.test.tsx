// @vitest-environment jsdom
import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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
  for (const dot of dots) { expect(dot.tagName).toBe('SPAN'); expect(dot.getAttribute('aria-hidden')).toBe('true'); }
  fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
  expect(screen.getByRole('button', { name: 'All changes' }).getAttribute('aria-expanded')).toBe('true');
  expect(screen.getByTestId('chart-event-list').className).not.toMatch(/sr-only/);
  expect(within(screen.getByTestId('chart-event-list')).getAllByRole('listitem').map(n => n.textContent)).toEqual(['First deposit · 8 Oct · +$500.00', 'Withdrawal · 9 Oct · −$20.00']);
  expect(source('app/(app)/dashboard/synthetic-home.module.css')).toMatch(/visualiserDot:focus-visible/);
});
test('V8 last-visit-own-sim-only and V9 no-axis-dates-when-event-spaced', () => {
  const view = render(<PositionLine entries={entries} lastVisit={FIRST + 1} visualise heroAmount={480} />);
  expect(screen.queryByTestId('dashboard-position-line-visit')).toBeNull();
  expect(view.container.querySelector('[class*=visualiserVisitLine]')).toBeNull();
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
  expect(dots.every(dot => dot.getAttribute('aria-hidden') === 'true')).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
  expect(within(screen.getByTestId('chart-event-list')).getAllByRole('listitem')).toHaveLength(40);
});
test('V18 own-sim-empty-state-exact and sole first deposit hero deferral', () => {
  const view = render(<PositionLine entries={[]} lastVisit={null} visualise heroAmount={0} />);
  expect(screen.getByTestId('dashboard-position-line').textContent).toBe('No deposits yet. Your first one will start this chart.');
  view.unmount(); render(<PositionLine entries={[entries[0]]} lastVisit={null} visualise heroAmount={500} />);
  fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
  expect(screen.getByTestId('chart-event-list').textContent).toBe('First deposit · 8 Oct · +$500.00');
  expect(screen.getByTestId('chart-event-list').getAttribute('aria-label')).toBe('All changes');
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
    main.querySelectorAll('[data-testid="chart-event-list"] [aria-hidden="true"]').forEach(n => n.removeAttribute('aria-hidden'));
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


describe('VIS-SCALE-001 fixed own-simulation scale', () => {
  let measure: ReturnType<typeof vi.spyOn>;
  let width = 300;
  const ledger = (balances: number[], sameTime = false): PositionEntry[] => balances.map((balanceAfter, index) => {
    const balanceBefore = index === 0 ? 0 : balances[index - 1];
    return { id: `scale-${index}`, at: FIRST + (sameTime ? 0 : index * 1000), type: balanceAfter < balanceBefore ? 'WITHDRAW' : 'DEPOSIT', amountUSD: Math.abs(balanceAfter - balanceBefore), balanceBefore, balanceAfter };
  });
  const points = () => Array.from(screen.getByTestId('example-line-chart').querySelectorAll('svg [data-series-at]')).map(node => {
    const [x, y] = node.getAttribute('transform')!.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    return { x, y, value: Number(node.getAttribute('data-series-value')) };
  });
  const fallback = "The chart can't be drawn at its fixed scale for these changes. Every change is still listed in All changes.";
  beforeEach(() => {
    width = 300;
    document.documentElement.style.fontSize = '16px';
    measure = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function(this: HTMLElement) {
      return { x: 0, y: 0, width: this.className.includes('visualiserPlot') ? width : 0, height: 160, top: 0, left: 0, right: width, bottom: 160, toJSON() {} };
    });
  });
  afterEach(() => { measure.mockRestore(); document.documentElement.style.fontSize = ''; });

  for (const count of [1, 2, 4, 5, 6, 12]) test(`fixed pitch and dollar height across ${count} real events`, () => {
    const balances = count === 1 ? [10] : Array.from({ length: count }, (_, i) => 500 + i * 10);
    render(<PositionLine entries={ledger(balances)} lastVisit={null} visualise />);
    const visible = points();
    expect(visible).toHaveLength(Math.min(count, 4));
    visible.forEach((point, index) => {
      expect(point.x).toBeCloseTo(288 - (visible.length - 1 - index) * 69, 8);
      expect(point.y).toBeCloseTo(94 - point.value * 0.088, 8);
    });
    if (count > 1) expect((visible[0].y - visible[1].y) * 1.6).toBeCloseTo(1.408, 8);
    const path = screen.getByTestId('example-line-chart').querySelector('svg path[fill="none"]')!.getAttribute('d')!;
    const boundary = count <= 4 ? 0 : balances[count - 5];
    const start = path.match(/^M ([^ ]+) ([^ ]+) H /)!;
    expect(Number(start?.[1])).toBeCloseTo(12, 8);
    expect(Number(start?.[2])).toBeCloseTo(94 - boundary * 0.088, 8);
  });

  test('lastVisit never adds a slot and same-timestamp IDs stay aligned', () => {
    const entries = ledger([500, 510, 520, 530, 540, 550], true);
    for (const lastVisit of [null, FIRST - 1, FIRST, FIRST + 1]) {
      const view = render(<PositionLine entries={entries} lastVisit={lastVisit} visualise />);
      expect(points().map(point => point.x)).toEqual([81, 150, 219, 288]);
      expect(screen.getByTestId('example-line-chart').querySelector('[data-chart-selected]')?.getAttribute('data-event-id')).toBe('scale-5');
      fireEvent.click(screen.getByRole('button', { name: 'Earlier change' }));
      expect(screen.getByTestId('example-line-chart').querySelector('[data-chart-selected]')?.getAttribute('data-event-id')).toBe('scale-4');
      expect(screen.getByTestId('activity-announcement').textContent).toContain('10 US dollars');
      view.unmount();
    }
  });

  for (const [name, balances, outside] of [
    ['boundaries', [0, 1000], false], ['zero', [0, 0], false], ['equal', [500, 500], false],
    ['just above', [1000.01], true], ['negative', [-0.01], true], ['large', [1000000], true],
    ['real pre-window boundary', [1200, 900, 800, 700, 600], true], ['six large deposits', [500, 1000, 1500, 2000, 2500, 3000], true],
  ] as const) test(`whole-plot eligibility: ${name}`, () => {
    render(<PositionLine entries={ledger([...balances])} lastVisit={null} visualise />);
    const chart = screen.getByTestId('example-line-chart');
    expect(chart.querySelector('svg') === null).toBe(outside);
    expect(screen.queryByText(fallback) !== null).toBe(outside);
    if (outside) {
      expect(chart.querySelectorAll('[data-chart-label], [data-chart-selected], [data-testid="chart-event-dot"], [data-chart-wash]')).toHaveLength(0);
      expect(screen.getByText(fallback).closest('[aria-live], [role="status"], [role="alert"]')).toBeNull();
    } else expect(points().every(point => Number.isFinite(point.y))).toBe(true);
    expect(chart.querySelectorAll('[aria-live]')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
    expect(within(screen.getByTestId('chart-event-list')).getAllByRole('listitem')).toHaveLength(balances.length);
  });

  test('edge following, fallback transitions, list open/close and resize preserve selected ID', () => {
    render(<PositionLine entries={ledger([1200, 900, 800, 700, 600, 500, 400, 300])} lastVisit={null} visualise />);
    const chart = screen.getByTestId('example-line-chart');
    const earlier = screen.getByRole('button', { name: 'Earlier change' });
    for (let i = 0; i < 6; i++) fireEvent.click(earlier);
    expect(screen.getByText(fallback)).toBeDefined();
    expect(chart.getAttribute('data-vis-scale-start')).toBe('1');
    expect(screen.getByTestId('activity-card').textContent).toContain('300.00');
    fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
    fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
    expect(chart.getAttribute('data-vis-scale-start')).toBe('1');
    for (let i = 0; i < 4; i++) fireEvent.click(screen.getByRole('button', { name: 'Later change' }));
    expect(screen.queryByText(fallback)).toBeNull();
    width = 210; fireEvent(window, new Event('resize'));
    expect(points()).toHaveLength(2);
    expect(chart.querySelector('[data-chart-selected]')?.getAttribute('data-event-id')).toBe('scale-5');
  });

  test('actual and interpolated outside values trigger fallback without changing settle inputs', () => {
    const view = render(<PositionLine entries={ledger([1200, 900, 800, 700, 600, 500])} lastVisit={FIRST} settle={0} visualise />);
    expect(screen.getByText(fallback)).toBeDefined();
    view.rerender(<PositionLine entries={ledger([1200, 900, 800, 700, 600, 500])} lastVisit={FIRST} settle={1} visualise />);
    expect(screen.queryByText(fallback)).toBeNull();
  });
});
