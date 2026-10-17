// @vitest-environment jsdom
import React from 'react';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { DanielExampleHome } from '../app/(app)/dashboard/DanielExampleHome';
import { SarahExampleHome } from '../app/(app)/dashboard/SarahExampleHome';
import { DANIEL_HOME_READ, DANIEL_HOME_TIMELINE } from '../lib/state/daniel-home-fixture';
import { SARAH_HOME_READ } from '../lib/state/sarah-home-fixture';
import { SYNTHETIC_JOURNEY_EXAMPLES } from '../lib/state/synthetic-journey';
import { SARAH_EXAMPLE_INPUTS } from '../lib/engine/sarah-read';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const DANIEL_ROWS = ['First deposit +$500.00 · 12 Jun', 'Deposit +$300.00 · 14 Aug', '≈ ZMW 19,600.00 · 9 Sep · example rate 24.5', '≈ ZMW 23,600.00 · 25 Sep · example rate 29.5', '9 Oct · shown above'];
const SARAH_ROWS = ['First deposit +ZMW 4,000.00 · 14 Apr', 'Deposit +ZMW 2,000.00 · 21 Jul'];
const NOTE = 'He made two deposits and none since. Each kwacha figure uses the example rate for its date.';
const LIMITS = 'Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.';
function example(id: 'daniel' | 'sarah') {
  cleanup();
  const view = render(id === 'daniel' ? <DanielExampleHome currentRead={DANIEL_HOME_READ} timeline={DANIEL_HOME_TIMELINE} returnHref="/dashboard-synthetic-journey" onReturn={() => {}} limitation={<p>This is what happened in the example. It doesn’t tell you what will happen next.</p>} /> : <SarahExampleHome read={SARAH_HOME_READ} />);
  return view;
}
beforeEach(() => { vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime('2026-10-15T12:00:00Z'); });
afterEach(() => { cleanup(); vi.useRealTimers(); });
test('V14 registry-single-source-first-deposit and V20 deposit-dates-precede-readings', () => {
  const registry = SYNTHETIC_JOURNEY_EXAMPLES as readonly { id: string; deposits?: readonly { at: string; amount: number; currency: string }[]; holding?: { amount: number; currency: string } }[];
  expect(registry[0].deposits).toEqual([{ at: '2026-06-12T00:00:00.000Z', amount: 500, currency: 'USD' }, { at: '2026-08-14T00:00:00.000Z', amount: 300, currency: 'USD' }]);
  expect(registry[1].deposits).toEqual([{ at: '2026-04-14T00:00:00.000Z', amount: 4000, currency: 'ZMW' }, { at: '2026-07-21T00:00:00.000Z', amount: 2000, currency: 'ZMW' }]);
  expect(registry[1].holding).toEqual({ amount: 6000, currency: 'ZMW' });
  for (const item of registry) for (const deposit of item.deposits!) {
    const earliest = item.id === 'daniel' ? DANIEL_HOME_TIMELINE[0].asOf : SARAH_HOME_READ.asOf;
    expect(Date.parse(deposit.at)).toBeLessThan(Date.parse(earliest));
    if (item.id === 'sarah') expect(Date.parse(deposit.at)).toBeLessThan(Math.min(...SARAH_EXAMPLE_INPUTS.map(input => Date.parse(input.input.asOf))));
    for (const file of ['app/(app)/dashboard/DanielExampleHome.tsx', 'app/(app)/dashboard/SarahExampleHome.tsx', 'lib/state/daniel-home-fixture.ts', 'lib/state/sarah-home-fixture.ts', 'lib/engine/daniel-read.ts', 'lib/engine/sarah-read.ts']) {
      const source = readFileSync(resolve(__dirname, '..', file), 'utf8');
      expect(source, file).not.toContain(deposit.at.slice(0, 10));
      expect(source, file).not.toMatch(new RegExp(`(?:amount|deposit(?:Usd|Zmw)?)\\s*:\\s*${deposit.amount}\\b`));
    }
  }
});
test('V15 one-shared-chart-all-examples, V16 first-row-and-marker-exact, V17 example-list-title-exact', () => {
  for (const year of [2026, 2027]) for (const id of ['daniel', 'sarah'] as const) {
    vi.setSystemTime(`${year}-10-15T12:00:00Z`); example(id);
    expect(screen.getAllByTestId('example-line-chart')).toHaveLength(1);
    const marker = screen.getByRole('button', { name: `First deposit, ${id === 'daniel' ? '12 Jun' : '14 Apr'}` });
    expect(marker.textContent).toBe(''); expect(marker.closest('[aria-hidden="true"]')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'All changes · example dates' }));
    const rows = within(screen.getByTestId('chart-event-list')).getAllByRole('listitem').map(row => row.textContent);
    const expected = id === 'daniel' ? DANIEL_ROWS : SARAH_ROWS;
    expect(rows).toEqual(year === 2026 ? expected : expected.map(row => row.replace(/(\d{1,2} (?:Jun|Aug|Sep|Oct|Apr|Jul))/, '$1 2026')));
    expect(screen.queryByText('First entry')).toBeNull(); expect(screen.queryByText('Latest entry')).toBeNull();
    expect(screen.getByTestId(`${id}-read-as-of`).textContent).toBe('Example date: 9 Oct 2026');
  }
});
test('V19 deposit-amounts-once-no-total, V22 daniel-list-exact, V24 sarah-two-zmw-rows-or-fallback', () => {
  for (const id of ['daniel', 'sarah'] as const) {
    const view = example(id); fireEvent.click(screen.getByRole('button', { name: 'All changes · example dates' }));
    expect(within(screen.getByTestId('chart-event-list')).getAllByRole('listitem').map(row => row.textContent)).toEqual(id === 'daniel' ? DANIEL_ROWS : SARAH_ROWS);
    for (const amount of id === 'daniel' ? ['$500.00', '$300.00', '$800.00'] : ['ZMW 4,000.00', 'ZMW 2,000.00', '$1000.00']) expect(view.container.textContent!.split(amount).length - 1).toBe(1);
    expect(screen.getByTestId('chart-event-list').textContent).not.toMatch(/\$800|\$1000|total|towards|progress|→|%/i);
  }
});
test('V21 daniel-chart-usd-balance and V27 sarah-zmw-balance-line', () => {
  for (const id of ['daniel', 'sarah'] as const) {
    example(id);
    const points = Array.from(screen.getByTestId('example-line-chart').querySelectorAll('[data-series-value]'));
    expect(points.map(point => [point.getAttribute('data-series-at'), Number(point.getAttribute('data-series-value')), point.getAttribute('data-series-currency')])).toEqual(id === 'daniel' ? [
      ['2026-06-12T00:00:00.000Z', 500, 'USD'], ['2026-08-14T00:00:00.000Z', 800, 'USD'], [DANIEL_HOME_READ.asOf, 800, 'USD'],
    ] : [['2026-04-14T00:00:00.000Z', 4000, 'ZMW'], ['2026-07-21T00:00:00.000Z', 6000, 'ZMW'], [SARAH_HOME_READ.asOf, 6000, 'ZMW']]);
    expect(screen.getByTestId('example-line-chart').querySelector('path')!.getAttribute('d')).not.toMatch(/NaN|Infinity/);
  }
});
test('V23 daniel-note-and-retired-framing and V25 kwacha-format-journey', () => {
  const view = example('daniel');
  expect(screen.getByTestId('daniel-invariant').textContent).toBe(NOTE);
  expect(view.container.textContent).not.toMatch(/part of Daniel|not all of it|still holds|holds USD 800|USD 800 shows|unchanged across these example dates|Since his last deposit|K\d/);
  for (const value of ['≈ ZMW 19,600.00', '≈ ZMW 23,600.00', '≈ ZMW 21,600.00']) expect(view.container.textContent).toContain(value);
});
test('V26 no-growing-label, V28 sarah-no-total-row, V29 sarah-fee-hero-and-limits-unchanged', () => {
  for (const id of ['daniel', 'sarah'] as const) {
    const view = example(id); fireEvent.click(screen.getByRole('button', { name: 'All changes · example dates' }));
    const chart = screen.getByTestId('example-line-chart');
    expect(chart.textContent + Array.from(chart.querySelectorAll('[aria-label], [title]')).map(n => n.getAttribute('aria-label') ?? n.getAttribute('title')).join(' ')).not.toMatch(/grow|rising|increase|progress|towards|funded|enough|cover|remaining|left to|% of/i);
    if (id === 'sarah') {
      expect(screen.getByTestId('sarah-read-figure').textContent).toBe('$1000.00 USD');
      expect(screen.getAllByText(LIMITS, { exact: true })).toHaveLength(1);
      expect(view.container.textContent).not.toMatch(/6,000|6000|\$600|\$400|3 Mar|5 Jun|progress|towards|funded|enough|cover|remaining|left to|% of/i);
    }
  }
});

test('HOME-SOFTHALO-RATESLIDER-BUNDLE-001 AC1 AC2', () => {
  for (const id of ['daniel','sarah'] as const) {
    example(id); const chart=screen.getByTestId('example-line-chart');
    expect(chart.parentElement?.querySelector('[data-component="HomeHero"]')?.nextElementSibling).toBe(chart);
    expect(chart.querySelectorAll('[data-chart-wash]')).toHaveLength(1);
    expect(chart.querySelectorAll('[data-chart-latest]')).toHaveLength(1);
    expect(chart.querySelector('[data-chart-latest]')?.getAttribute('aria-hidden')).toBe('true');
    expect(screen.queryByTestId('dashboard-position-line-visit')).toBeNull();
  }
});
