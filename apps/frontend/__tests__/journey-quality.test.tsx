// @vitest-environment jsdom
import React, { createRef } from 'react';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createHash } from 'node:crypto';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
vi.mock('react', async importOriginal => ({ ...await importOriginal<typeof import('react')>(), useId: () => ':journey:' }));
vi.mock('next/navigation', () => ({ usePathname: vi.fn(), useSearchParams: vi.fn() }));
vi.mock('../lib/defi', () => ({ defiAdapter: { getNetApy: () => Promise.resolve(0.05) } }));
vi.mock('../lib/policy/usePolicy', () => ({ usePolicy: () => ({ isFeatureEnabled: () => false }) }));
vi.mock('../lib/fx/FxRateContext', () => ({ useFxRate: () => ({ rate: 20, status: 'ready' }), isFxRateAvailable: () => true }));
import DashboardPage from '../app/(app)/dashboard/page';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLedgerStore, type Tx } from '../lib/state/ledger';
import { formatExampleRateLine } from '../app/(app)/dashboard/RateLine';
import { ExampleLineChart } from '../app/(app)/dashboard/ExampleLineChart';
import { getSimulationDisplayRate } from '../lib/state/simulation-display-currency';

type Actions = { focusNewest(): void; openAll(): void };
const Chart = ExampleLineChart as React.ComponentType<React.ComponentProps<typeof ExampleLineChart> & { actionsRef?: React.Ref<Actions> }>;
const series = [{ at: '2026-10-01', value: 10, currency: 'USD' as const }, { at: '2026-10-02', value: 30, currency: 'USD' as const }];
const events = [{ id: 'old', at: Date.parse('2026-10-01'), kind: 'deposit' as const, amount: 10, currency: 'USD' as const }, { id: 'new', at: Date.parse('2026-10-02'), kind: 'deposit' as const, amount: 20, currency: 'USD' as const }];
const row = (amount: number, at: number): Tx => ({ txn_ref: String(at), type: 'deposit', status: 'settled', amount_usd: amount, amount_zmw: amount * 20, fx_rate: 20, created_at: at, updated_at: at });
async function home(example = 'own', count = 1) {
  const path = '/dashboard-synthetic-journey'; const search = new URLSearchParams({ example });
  window.history.replaceState(null, '', path + '?' + search); vi.mocked(usePathname).mockReturnValue(path); vi.mocked(useSearchParams).mockReturnValue(search as ReturnType<typeof useSearchParams>);
  const rows = [row(1000, 1000), ...Array.from({ length: count }, (_, i) => row(5, 3000 + i))];
  localStorage.setItem('hedgr:last-home-visit', '2000'); localStorage.setItem('hedgr:ledger', JSON.stringify({ version: 2, transactions: rows }));
  await act(async () => { await useLedgerStore.persist.rehydrate(); });
  const view = render(<DashboardPage />); await act(async () => { await Promise.resolve(); }); return view;
}
beforeEach(() => { localStorage.clear(); sessionStorage.clear(); vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock'); vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub'); vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'prod'); vi.useFakeTimers({ toFake: ['Date'] }); vi.setSystemTime(new Date('2026-10-15')); vi.stubGlobal('matchMedia', () => ({ matches: true })); Object.defineProperty(Element.prototype, 'scrollIntoView', { configurable: true, value: vi.fn() }); });
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.useRealTimers(); });

test.each([['ZMW', '27.00'], ['KES', '130.00'], ['NGN', '1,500.00'], ['GHS', '15.00'], ['PHP', '56.00']] as const)('JOURNEY-REVIEW-001 own rate uses existing grouped two-decimal %s example', (code, amount) => {
  expect(formatExampleRateLine(code, getSimulationDisplayRate(code))).toBe(`Example rate: 1 USD = ${amount} ${code}. Not a live rate.`);
});
test.each([0, 1, 3])('JOURNEY-REVIEW-001 own recent changes count %s and links', async count => {
  await home('own', count); const section = screen.getByTestId('dashboard-current-status');
  expect(within(section).getByRole('heading').textContent).toBe('Recent changes');
  expect(section.querySelector('ul')).toBeNull();
  if (count === 0) { expect(within(section).queryByRole('link', { name: /below/ })).toBeNull(); expect(section.textContent).toContain('No new simulated entries'); }
  else {
    expect(section.textContent).toContain(count === 1 ? "1 new simulated entry since your last visit. It's included in the balance above." : "3 new simulated entries since your last visit. They're included in the balance above.");
    const link = within(section).getByRole('link', { name: count === 1 ? 'See this change below' : 'See the newest change below' });
    fireEvent.click(link); const card = screen.getByTestId('activity-card').parentElement!; expect(document.activeElement).toBe(card); expect(card.tabIndex).toBe(-1); expect(card.getAttribute('aria-label')).toBe(screen.getByTestId('activity-announcement').textContent);
    expect(within(section).getByRole('link', { name: 'See all in Activity' }).getAttribute('href')).toContain('/activity');
  }
});
test('JOURNEY-REVIEW-001 opt-in newest selection closes an open list and focuses the existing card', () => {
  const actionsRef = createRef<Actions>(); render(<Chart mode="step" series={series} events={events} actionsRef={actionsRef} />);
  fireEvent.click(screen.getByRole('button', { name: 'Earlier change' })); expect(screen.getByTestId('activity-card').textContent).toContain('$10.00');
  fireEvent.click(screen.getByRole('button', { name: 'All changes', exact: true })); expect(screen.queryByTestId('activity-card')).toBeNull();
  expect(actionsRef.current).not.toBeNull(); act(() => actionsRef.current!.focusNewest());
  expect(screen.getByRole('button', { name: 'All changes', exact: true }).getAttribute('aria-expanded')).toBe('false');
  const card = screen.getByTestId('activity-card').parentElement!; expect(card.textContent).toContain('$20.00'); expect(document.activeElement).toBe(card); expect(card.className).toContain('focus-visible:outline-hedgr-500'); expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  act(() => actionsRef.current!.focusNewest()); expect(document.activeElement).toBe(card);
});
test('JOURNEY-REVIEW-001 absent opt-in keeps exact selected-card markup and geometry', () => {
  const view = render(<Chart mode="step" series={series} events={events} />);
  const canonical = view.container.innerHTML;
  // Captured before the opt-in implementation with a deterministic React ID fixture; no DOM normalization.
  expect(createHash('sha256').update(canonical).digest('hex')).toBe('7681316de53da3fdefe26783eb93ce7e1a6af40c77a5a9afd5550baef1c052d7');
  const card = screen.getByTestId('activity-card').parentElement!; expect(card.hasAttribute('tabindex')).toBe(false); expect(card.hasAttribute('aria-label')).toBe(false); expect(card.className).not.toContain('focus-visible');
});
test('JOURNEY-REVIEW-001 Daniel opens and focuses existing figures disclosure without adding a card figure', async () => {
  await home('daniel'); const toggle = screen.getByRole('button', { name: 'All changes · example dates' }); expect(toggle.getAttribute('aria-expanded')).toBe('false');
  const card = screen.getByTestId('daniel-since-card'); expect(card.textContent).toContain('He made two deposits and none since. The chart below shows each kwacha figure, using the example rate for its date.');
  expect(card.querySelector('[data-testid="daniel-observation"]')).toBeNull(); fireEvent.click(within(card).getByRole('link', { name: 'Show the figures' }));
  expect(toggle.getAttribute('aria-expanded')).toBe('true'); expect(document.activeElement).toBe(toggle);
});
