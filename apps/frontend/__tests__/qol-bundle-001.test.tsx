// @vitest-environment jsdom
import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { ExampleLineChart, ChartSourceAmountsContext } from '../app/(app)/dashboard/ExampleLineChart';
import { PositionLine } from '../app/(app)/dashboard/PositionLine';
import type { ChartEvent } from '../app/(app)/dashboard/lineLabels';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const FIRST = Date.parse('2026-10-05T12:00:00Z');
const LAST = Date.parse('2026-10-09T12:00:00Z');
const events: ChartEvent[] = [
  { id: 'first', kind: 'deposit', amount: 200, currency: 'USD', at: FIRST },
  { id: 'last', kind: 'withdrawal', amount: 20, currency: 'USD', at: LAST },
];
function chart(rows = events, lastVisit: number | null = null, example = false) {
  return <ExampleLineChart mode="step" events={rows} series={rows.map((row, i) => ({ at: new Date(row.at).toISOString(), value: 200 - i * 20, currency: row.currency! }))} lastVisit={lastVisit} example={example} />;
}
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime('2026-10-21T12:00:00Z');
  vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('pointer: coarse'), addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.useRealTimers(); });
test('T1/T4 newest shared card, bounded visible controls and keyboard selection', () => {
  render(chart());
  expect(screen.getByTestId('activity-card').textContent).toBe('Withdrawal · 9 Oct · −$20.00');
  expect((screen.getByRole('button', { name: 'Later change' }) as HTMLButtonElement).disabled).toBe(true);
  fireEvent.click(screen.getByRole('button', { name: 'Earlier change' }));
  expect(screen.getByTestId('activity-card').textContent).toBe('First deposit · 5 Oct · +$200.00');
  expect((screen.getByRole('button', { name: 'Earlier change' }) as HTMLButtonElement).disabled).toBe(true);
  fireEvent.keyDown(screen.getByTestId('activity-stack'), { key: 'ArrowRight' });
  expect(screen.getByTestId('activity-card').textContent).toBe('Withdrawal · 9 Oct · −$20.00');
});
for (const currency of ['USD', 'ZMW'] as const) for (const amount of [1, 20, 20.5, 4000, 4000.25]) {
  test(`T2/T5 ${currency} ${amount} full names and recorded currency invariant`, () => {
    const row = { ...events[1], amount, currency };
    const view = render(<ChartSourceAmountsContext.Provider value={new Map([['last', 'NGN 999.00']])}>{chart([events[0], row], FIRST + 1)}</ChartSourceAmountsContext.Provider>);
    const name = currency === 'ZMW' ? 'Zambian kwacha' : amount === 1 ? 'US dollar' : 'US dollars';
    const spoken = amount.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(amount) ? 0 : 2, maximumFractionDigits: 2 });
    // The positive S2 summary suppresses the since prefix at desktop widths.
    expect(screen.getByTestId('activity-announcement').textContent).toBe(`Withdrawal, minus ${spoken} ${name}, 9 October.`);
    const before = screen.getByTestId('activity-card').textContent;
    view.rerender(<ChartSourceAmountsContext.Provider value={new Map([['last', 'PHP 777.00']])}>{chart([events[0], row], FIRST + 1)}</ChartSourceAmountsContext.Provider>);
    expect(screen.getByTestId('activity-card').textContent).toBe(before);
    expect(screen.getByTestId('activity-announcement').textContent).toBe(`Withdrawal, minus ${spoken} ${name}, 9 October.`);
    expect(before).not.toMatch(/NGN|PHP/);
  });
}
test('T2/T5 date year, UTC example boundaries, first deposit and narrow S2 prefix', () => {
  vi.stubGlobal('innerWidth', 320);
  const older = { ...events[0], at: Date.parse('2025-12-31T23:30:00Z'), currency: 'ZMW' as const, amount: 4000.25 };
  render(chart([older, events[1]], FIRST + 1, true));
  expect(screen.getByTestId('activity-announcement').textContent).toBe('Since your last visit. Withdrawal, minus 20 US dollars, 9 October.');
  fireEvent.click(screen.getByRole('button', { name: 'Earlier change' }));
  expect(screen.getByTestId('activity-card').textContent).toBe('First deposit · 31 Dec 2025 · +ZMW 4,000.25');
  expect(screen.getByTestId('activity-announcement').textContent).toBe('First deposit, plus 4,000.25 Zambian kwacha, 31 December 2025.');
});
test('T4 touch hint disappears on any key and after the first successful swipe', () => {
  const view = render(chart());
  expect(screen.getByText('Swipe to see earlier changes')).toBeDefined();
  fireEvent.keyDown(screen.getByTestId('activity-stack'), { key: 'Tab' });
  expect(screen.queryByText('Swipe to see earlier changes')).toBeNull();
  view.unmount(); render(chart());
  const stack = screen.getByTestId('activity-stack');
  fireEvent.touchStart(stack, { touches: [{ clientX: 200, clientY: 50 }] });
  fireEvent.touchEnd(stack, { changedTouches: [{ clientX: 80, clientY: 50 }] });
  expect(screen.getByTestId('activity-card').textContent).toMatch(/^First deposit/);
  expect(screen.queryByText('Swipe to see earlier changes')).toBeNull();
});
test('T4 reduced motion and desktop have no swipe hint', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
  render(chart()); expect(screen.queryByText('Swipe to see earlier changes')).toBeNull();
});
test('T6 collapsed native alternative, no simultaneous spoken detail, selected highlight', () => {
  const view = render(chart());
  const list = screen.getByTestId('chart-event-list');
  expect(list.hidden).toBe(true);
  expect(screen.getByRole('button', { name: 'All changes' }).getAttribute('aria-expanded')).toBe('false');
  expect(view.container.querySelectorAll('[data-chart-selected]')).toHaveLength(1);
  const selected = view.container.querySelector('[data-chart-selected]')!.getAttribute('style');
  fireEvent.click(screen.getByRole('button', { name: 'Earlier change' }));
  expect(view.container.querySelector('[data-chart-selected]')!.getAttribute('style')).not.toBe(selected);
  fireEvent.click(screen.getByRole('button', { name: 'All changes' }));
  expect(list.hidden).toBe(false);
  expect(within(list).getAllByRole('listitem').map(n => n.textContent)).toEqual(['Withdrawal · 9 Oct · −$20.00', 'First deposit · 5 Oct · +$200.00']);
  expect(screen.queryByTestId('activity-announcement')).toBeNull();
  expect(screen.queryByTestId('activity-card')).toBeNull();
});
test('T6/T10 returning no-change has no highlight/rule/eyebrow/zero count', () => {
  const view = render(chart(events, LAST + 1));
  expect(view.container.querySelectorAll('[data-chart-selected], [data-chart-latest], [data-chart-label]')).toHaveLength(0);
  expect(screen.queryByTestId('dashboard-position-line-visit')).toBeNull();
  expect(view.container.textContent).not.toMatch(/Since your last visit|0 changes/);
});
test('T6 coincident events retain distinct cards; T10 empty state stays exact', () => {
  const view = render(chart([events[0], { ...events[1], at: FIRST }]));
  fireEvent.click(screen.getByRole('button', { name: 'Earlier change' }));
  expect(screen.getByTestId('activity-card').textContent).toMatch(/^First deposit/);
  view.unmount(); render(<PositionLine entries={[]} lastVisit={null} visualise />);
  expect(screen.getByTestId('dashboard-position-line').textContent).toBe('No deposits yet. Your first one will start this chart.');
});
