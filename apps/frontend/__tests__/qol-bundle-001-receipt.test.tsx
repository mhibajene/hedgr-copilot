// @vitest-environment jsdom
import React from 'react';
import { act, cleanup, fireEvent, render as renderView, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { useLedgerStore } from '../lib/state/ledger';
import { formatRecordedTime } from '../app/(app)/ReceiptCard';
import DepositPage from '../app/(app)/deposit/page';
import WithdrawPage from '../app/(app)/withdraw/page';
import { FxRateProvider } from '../lib/fx/FxRateContext';
import { clearSimulationReceipt, readSimulationReceipt, rememberSimulationReceipt } from '../app/(app)/simulation-receipt';
import type { Tx } from '../lib/state/ledger';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const state = vi.hoisted(() => ({ search: 'journey=class-a-val-002', fx: 'success', reload: false }));
vi.mock('../app/(app)/simulation-receipt', async importOriginal => ({
  ...await importOriginal<typeof import('../app/(app)/simulation-receipt')>(),
  isDocumentReload: () => state.reload,
}));
const render = (view: React.ReactNode) => renderView(<FxRateProvider>{view}</FxRateProvider>);
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(state.search) }));
vi.mock('../lib/hooks/useLatestFx', () => ({ useLatestFx: () => ({ status: state.fx, data: state.fx === 'success' ? { rate: 27, pair: 'USDZMW', ts: 1 } : null, retry: vi.fn() }) }));
beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock'); vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  vi.useFakeTimers(); vi.setSystemTime('2026-10-21T12:00:00Z');
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ base: 'USD', quote: 'ZMW', rate: 27 }) })));
  localStorage.clear(); sessionStorage.clear(); useLedgerStore.getState().clear();
  state.search = 'journey=class-a-val-002'; state.fx = 'success'; state.reload = false;
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
async function ready() { await act(async () => { await vi.advanceTimersByTimeAsync(350); }); }
for (const fx of ['success', 'loading', 'error']) for (const funded of [false, true]) test(`T7 NH3 ${fx} funded=${funded}`, async () => {
  state.search += '&scenario=unavailable-data'; state.fx = fx;
  if (funded) useLedgerStore.getState().append({ txn_ref: 'seed', type: 'deposit', status: 'settled', amount_usd: 100, amount_zmw: 2700, fx_rate: 27, created_at: Date.now(), updated_at: Date.now() });
  render(<WithdrawPage />); await ready();
  expect(screen.getAllByText('This example has no rate set, so the local amount and Confirm aren\'t available.')).toHaveLength(1);
  expect(screen.getByText('Step 3 · check the position after a simulated withdrawal')).toBeDefined();
  expect(screen.getByRole('link', { name: 'Back to Home' }).getAttribute('href')).toBe('/dashboard-synthetic-journey');
  expect(screen.queryByRole('button')).toBeNull(); expect(screen.queryByTestId('withdraw-amount')).toBeNull();
  expect(screen.queryByTestId('withdraw-market-data-continuity')).toBeNull();
});
test('T9 same-day time stays; prior-day time includes recorded date', () => {
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1); yesterday.setHours(9, 5, 0, 0);
  expect(formatRecordedTime(yesterday.getTime())).toBe('20 Oct, 09:05');
  const today = new Date(); today.setHours(9, 5, 0, 0);
  expect(formatRecordedTime(today.getTime())).toBe('Today, 09:05');
});
for (const route of ['deposit', 'withdraw'] as const) test(`T8 ${route} remount restores pending then receipt alone, acknowledgement clears marker`, async () => {
  if (route === 'withdraw') useLedgerStore.getState().append({ txn_ref: 'seed', type: 'deposit', status: 'settled', amount_usd: 100, amount_zmw: 2700, fx_rate: 27, created_at: Date.now() - 10000, updated_at: Date.now() - 10000 });
  const Page = route === 'deposit' ? DepositPage : WithdrawPage;
  const view = render(<Page />); await ready();
  fireEvent.change(screen.getByTestId(`${route}-amount`), { target: { value: route === 'deposit' ? '270' : '10' } });
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Confirm', exact: true })); await Promise.resolve(); });
  const identity = useLedgerStore.getState().transactions.map(tx => ({ ...tx }));
  expect(sessionStorage.length).toBe(1);
  localStorage.setItem('hedgr.simulation.display-currency', 'NGN');
  view.unmount(); state.reload = true; render(<Page />); await ready();
  expect(screen.queryByTestId(`${route}-amount`)).toBeNull();
  await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
  expect(screen.getByTestId(route === 'deposit' ? 'deposit-confirmed' : 'withdraw-status-title').textContent).toMatch(/You (added|took) \$10.00/);
  expect(screen.getByText('1 USD = 27.00 ZMW')).toBeDefined();
  expect(useLedgerStore.getState().transactions).toHaveLength(identity.length);
  for (const original of identity) expect(useLedgerStore.getState().getByTxnRef(original.txn_ref)).toMatchObject({ ...original, status: 'settled', updated_at: expect.any(Number) });
  fireEvent.click(screen.getByRole('link', { name: 'Back to your position' }));
  expect(sessionStorage.length).toBe(0);
});

const tx: Tx = { txn_ref: 'current', type: 'deposit', status: 'pending', amount_usd: 10, amount_zmw: 270, fx_rate: 27, source_local_amount: 270, source_local_currency: 'ZMW', created_at: 1000, updated_at: 1000 };
const view = { recordedAt: 1000, balanceBefore: 0, amountInput: '270', quote: 'ZMW', rate: 27 };
for (const invalid of ['failed', 'deleted', 'replaced', 'stale', 'reset', 'malformed'] as const) test(`T9 ${invalid} marker ignored without any ledger write`, () => {
  rememberSimulationReceipt(tx, view);
  let rows: Tx[] = [tx];
  if (invalid === 'failed') rows = [{ ...tx, status: 'failed' }];
  if (invalid === 'deleted' || invalid === 'reset') rows = [];
  if (invalid === 'replaced') rows = [{ ...tx, amount_usd: 11 }];
  if (invalid === 'stale') rows = [tx, { ...tx, txn_ref: 'later', created_at: 2000 }];
  if (invalid === 'malformed') sessionStorage.setItem(sessionStorage.key(0)!, '{broken');
  const before = JSON.stringify(rows);
  expect(readSimulationReceipt('deposit', rows)).toBeNull();
  expect(JSON.stringify(rows)).toBe(before);
  expect(sessionStorage.length).toBe(0);
});
test('T9 a second action replaces the sole marker and preserves its original receipt inputs', () => {
  rememberSimulationReceipt(tx, view);
  const next = { ...tx, txn_ref: 'second', type: 'withdrawal' as const, amount_usd: 1, created_at: 2000 };
  rememberSimulationReceipt(next, { ...view, amountInput: '1' });
  expect(sessionStorage.length).toBe(1);
  expect(readSimulationReceipt('deposit', [tx, next])).toBeNull();
  expect(readSimulationReceipt('withdrawal', [tx, next])).toMatchObject({ txnRef: 'second', view: { amountInput: '1', quote: 'ZMW', rate: 27 } });
  clearSimulationReceipt(); expect(sessionStorage.length).toBe(0);
});
test('T9 blocked session storage does not promise reload restoration or throw', () => {
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Blocked', 'SecurityError'); });
  expect(() => rememberSimulationReceipt(tx, view)).not.toThrow();
  expect(readSimulationReceipt('deposit', [tx])).toBeNull();
});
test('T8 reload eligibility excludes ordinary navigation, other routes and newer actions', async () => {
  const actual = await vi.importActual<typeof import('../app/(app)/simulation-receipt')>('../app/(app)/simulation-receipt');
  const navigation = { type: 'reload', name: window.location.href };
  vi.stubGlobal('performance', { getEntriesByType: () => [navigation], timeOrigin: 1000, now: () => 0 });
  expect(actual.isDocumentReload(900)).toBe(true);
  expect(actual.isDocumentReload(1100)).toBe(false);
  navigation.type = 'navigate'; expect(actual.isDocumentReload(900)).toBe(false);
  navigation.type = 'reload'; navigation.name = new URL('/another-route', window.location.href).href;
  expect(actual.isDocumentReload(900)).toBe(false);
});
for (const route of ['deposit', 'withdraw'] as const) test(`T9 ${route} failure after restoration clears the marker and keeps the existing retry usable`, async () => {
  if (route === 'withdraw') useLedgerStore.getState().append({ ...tx, txn_ref: 'seed', status: 'settled', amount_usd: 100 });
  const Page = route === 'deposit' ? DepositPage : WithdrawPage;
  const page = render(<Page />); await ready();
  fireEvent.change(screen.getByTestId(`${route}-amount`), { target: { value: route === 'deposit' ? '270' : '10' } });
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Confirm', exact: true })); await Promise.resolve(); });
  const current = useLedgerStore.getState().transactions.at(-1)!;
  page.unmount(); state.reload = true; render(<Page />); await ready();
  await act(async () => { useLedgerStore.getState().fail(current.txn_ref); });
  expect(sessionStorage.length).toBe(0);
  expect(screen.getByTestId(`${route}-amount`)).toBeDefined();
  fireEvent.click(screen.getByRole('button', { name: 'Try again', exact: true }));
  expect(screen.queryByTestId(`${route}-failed-state`)).toBeNull();
  expect(useLedgerStore.getState().getByTxnRef(current.txn_ref)?.status).toBe('failed');
});
