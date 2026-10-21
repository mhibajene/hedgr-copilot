// @vitest-environment jsdom
import React from 'react';
import { act, cleanup, fireEvent, render as renderView, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { useLedgerStore } from '../lib/state/ledger';
import { formatRecordedTime } from '../app/(app)/ReceiptCard';
import DepositPage from '../app/(app)/deposit/page';
import WithdrawPage from '../app/(app)/withdraw/page';
import { FxRateProvider } from '../lib/fx/FxRateContext';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const state = vi.hoisted(() => ({ search: 'journey=class-a-val-002', fx: 'success' }));
const render = (view: React.ReactNode) => renderView(<FxRateProvider>{view}</FxRateProvider>);
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams(state.search) }));
vi.mock('../lib/hooks/useLatestFx', () => ({ useLatestFx: () => ({ status: state.fx, data: state.fx === 'success' ? { rate: 27, pair: 'USDZMW', ts: 1 } : null, retry: vi.fn() }) }));
beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock'); vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  vi.useFakeTimers(); vi.setSystemTime('2026-10-21T12:00:00Z');
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ base: 'USD', quote: 'ZMW', rate: 27 }) })));
  localStorage.clear(); sessionStorage.clear(); useLedgerStore.getState().clear();
  state.search = 'journey=class-a-val-002'; state.fx = 'success';
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
async function ready() { await act(async () => { await vi.advanceTimersByTimeAsync(350); }); }
for (const fx of ['success', 'loading', 'error']) for (const funded of [false, true]) test(`T7 NH3 ${fx} funded=${funded}`, async () => {
  state.search += '&scenario=unavailable-data'; state.fx = fx;
  if (funded) useLedgerStore.getState().append({ txn_ref: 'seed', type: 'deposit', status: 'settled', amount_usd: 100, amount_zmw: 2700, fx_rate: 27, created_at: Date.now(), updated_at: Date.now() });
  render(<WithdrawPage />); await ready();
  expect(screen.getAllByText('This example has no rate set, so the local amount and Confirm aren\'t available.')).toHaveLength(1);
  expect(screen.getByText('Step 3 · check the position after a simulated withdrawal')).toBeDefined();
  expect(screen.getByRole('link', { name: 'Back to Home' }).getAttribute('href')).toBe('/dashboard?journey=class-a-val-002');
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
  view.unmount(); render(<Page />); await ready();
  expect(screen.queryByTestId(`${route}-amount`)).toBeNull();
  await act(async () => { await vi.advanceTimersByTimeAsync(2000); });
  expect(screen.getByTestId(route === 'deposit' ? 'deposit-confirmed' : 'withdraw-status-title').textContent).toMatch(/You (added|took) \$10.00/);
  expect(useLedgerStore.getState().transactions).toHaveLength(identity.length);
  for (const original of identity) expect(useLedgerStore.getState().getByTxnRef(original.txn_ref)).toMatchObject({ ...original, status: 'settled', updated_at: expect.any(Number) });
  fireEvent.click(screen.getByRole('link', { name: 'Back to your position' }));
  expect(sessionStorage.length).toBe(0);
});
