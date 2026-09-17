// @vitest-environment jsdom

import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams('journey=class-a-val-002')),
}));
vi.mock('../lib/hooks/useLatestFx', () => ({
  useLatestFx: () => ({ status: 'success', data: { pair: 'USDZMW', rate: 20, ts: 1 }, retry: () => {} }),
}));
vi.mock('../components/BalanceWithLocalEstimate', () => ({
  BalanceWithLocalEstimate: ({ usdAmount }: { usdAmount: number }) =>
    React.createElement('span', null, usdAmount.toFixed(2)),
}));

import DepositPage from '../app/(app)/deposit/page';
import WithdrawPage from '../app/(app)/withdraw/page';
import { useSearchParams } from 'next/navigation';
import { useLedgerStore, type Tx } from '../lib/state/ledger';
import { useWalletStore } from '../lib/state/wallet';
import { useBalance } from '../lib/hooks/useBalance';
import { computeBalanceFromLedger } from '../lib/state/balance';
import { scheduleSyntheticDeposit } from '../lib/deposits/synthetic-deposit-lifecycle';

let nextRef = 0;
function deposit(overrides: Partial<Tx> = {}): Tx {
  return {
    txn_ref: `lifecycle-${++nextRef}`, type: 'deposit', status: 'pending',
    amount_zmw: 100, amount_usd: 5, fx_rate: 20, created_at: 1, updated_at: 1,
    ...overrides,
  };
}
function BalanceProbe() {
  const { available } = useBalance();
  return React.createElement('output', { 'data-testid': 'reactive-balance' }, available.toFixed(2));
}
async function advance(ms: number) {
  await act(async () => { await vi.advanceTimersByTimeAsync(ms); });
}
async function ready(Page: typeof DepositPage | typeof WithdrawPage) {
  const view = render(React.createElement(React.Fragment, null,
    React.createElement(Page), React.createElement(BalanceProbe)));
  await advance(350);
  return view;
}
async function confirm() {
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    await Promise.resolve();
  });
}

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  vi.stubEnv('NEXT_PUBLIC_BALANCE_FROM_LEDGER', 'true');
  vi.useFakeTimers();
  localStorage.clear();
  useLedgerStore.getState().clear();
  useWalletStore.getState().reset();
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams('journey=class-a-val-002') as ReturnType<typeof useSearchParams>);
});
afterEach(async () => {
  cleanup();
  useLedgerStore.getState().clear();
  useWalletStore.getState().reset();
  await vi.runOnlyPendingTimersAsync();
  vi.useRealTimers();
  vi.unstubAllEnvs();
});

describe('new synthetic deposit lifecycle with actual ledger and wallet stores', () => {
  test.each(['ledger', 'wallet'])('deduplicates scheduling and credits once in %s mode', async (mode) => {
    vi.stubEnv('NEXT_PUBLIC_BALANCE_FROM_LEDGER', mode === 'ledger' ? 'true' : 'false');
    const tx = deposit();
    useLedgerStore.getState().append(tx);
    scheduleSyntheticDeposit(tx.txn_ref, 1500);
    scheduleSyntheticDeposit(tx.txn_ref, 1500);
    await advance(1499);
    expect(useLedgerStore.getState().getByTxnRef(tx.txn_ref)?.status).toBe('pending');
    expect(useWalletStore.getState().usdBalance).toBe(0);
    await advance(1);
    expect(useLedgerStore.getState().getByTxnRef(tx.txn_ref)?.status).toBe('settled');
    expect(computeBalanceFromLedger(useLedgerStore.getState().transactions).available).toBe(5);
    expect(useWalletStore.getState().usdBalance).toBe(mode === 'wallet' ? 5 : 0);
    scheduleSyntheticDeposit(tx.txn_ref, 1500);
    await advance(2000);
    expect(useLedgerStore.getState().transactions).toHaveLength(1);
    expect(useWalletStore.getState().usdBalance).toBe(mode === 'wallet' ? 5 : 0);
  });

  test.each(['reset', 'failed', 'settled', 'replaced'] as const)('%s record cannot be resurrected or credited', async (condition) => {
    vi.stubEnv('NEXT_PUBLIC_BALANCE_FROM_LEDGER', 'false');
    const tx = deposit();
    useLedgerStore.getState().append(tx);
    scheduleSyntheticDeposit(tx.txn_ref, 1500);
    if (condition === 'reset' || condition === 'replaced') useLedgerStore.getState().clear();
    if (condition === 'failed') useLedgerStore.getState().fail(tx.txn_ref);
    if (condition === 'settled') useLedgerStore.getState().confirm(tx.txn_ref);
    if (condition === 'replaced') useLedgerStore.getState().append({ ...tx, amount_usd: 8, created_at: 2 });
    const before = useLedgerStore.getState().transactions.map((record) => ({ ...record }));
    await advance(2000);
    expect(useLedgerStore.getState().transactions).toEqual(before);
    expect(useWalletStore.getState().usdBalance).toBe(0);
  });

  test('uses the balance mode captured when scheduled', async () => {
    vi.stubEnv('NEXT_PUBLIC_BALANCE_FROM_LEDGER', 'false');
    const tx = deposit();
    useLedgerStore.getState().append(tx);
    scheduleSyntheticDeposit(tx.txn_ref, 1500);
    vi.stubEnv('NEXT_PUBLIC_BALANCE_FROM_LEDGER', 'true');
    await advance(1500);
    expect(useWalletStore.getState().usdBalance).toBe(5);
  });
});

describe('transaction pages with reactive balance and real simulation lifecycles', () => {
  test.each(['ledger', 'wallet'])('Deposit survives unmount/remount and updates balance once in %s mode', async (mode) => {
    vi.stubEnv('NEXT_PUBLIC_BALANCE_FROM_LEDGER', mode === 'ledger' ? 'true' : 'false');
    const first = await ready(DepositPage);
    await confirm();
    const tx = useLedgerStore.getState().transactions[0];
    expect(tx.status).toBe('pending');
    expect(screen.getByTestId('reactive-balance').textContent).toBe('0.00');
    first.unmount();
    await ready(DepositPage);
    await advance(1200);
    expect(useLedgerStore.getState().getByTxnRef(tx.txn_ref)?.status).toBe('settled');
    expect(screen.getByTestId('reactive-balance').textContent).toBe('5.00');
    await advance(3000);
    expect(useLedgerStore.getState().transactions).toHaveLength(1);
    expect(screen.getByTestId('reactive-balance').textContent).toBe('5.00');
  });

  test('reset after navigating from pending Deposit leaves ledger and wallet empty', async () => {
    vi.stubEnv('NEXT_PUBLIC_BALANCE_FROM_LEDGER', 'false');
    const view = await ready(DepositPage);
    await confirm();
    view.unmount();
    useLedgerStore.getState().clear();
    useWalletStore.getState().reset();
    await advance(2000);
    expect(useLedgerStore.getState().transactions).toEqual([]);
    expect(useWalletStore.getState().usdBalance).toBe(0);
  });

  test.each(['journey=class-a-val-002', ''])('full withdrawal keeps pending and completed feedback at zero (%s)', async (query) => {
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(query) as ReturnType<typeof useSearchParams>);
    useLedgerStore.getState().append(deposit({ status: 'settled' }));
    await ready(WithdrawPage);
    fireEvent.change(screen.getByTestId('withdraw-amount'), { target: { value: '5' } });
    await confirm();
    expect(screen.getByTestId('reactive-balance').textContent).toBe('0.00');
    expect(screen.getByTestId('withdraw-status-title').textContent).toBe('Simulated withdrawal in progress');
    expect(screen.queryByTestId('withdraw-no-funds')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
    await advance(2000);
    expect(screen.getByTestId('withdraw-status-title').textContent).toBe('Simulated withdrawal recorded');
    expect(screen.getByTestId('withdraw-balance-preview').textContent).toContain('$5.00 − $5.00 = $0.00');
    expect(screen.getByRole('link', { name: 'Review simulated activity' }).getAttribute('href')).toBe(
      query ? '/activity?journey=class-a-val-002' : '/activity',
    );
    expect(screen.queryByTestId('withdraw-no-funds')).toBeNull();
    expect(useLedgerStore.getState().transactions.filter((tx) => tx.type === 'withdrawal')).toHaveLength(1);
  });

  test('ordinary empty balance retains no-funds state', async () => {
    await ready(WithdrawPage);
    expect(screen.getByTestId('withdraw-no-funds')).toBeTruthy();
    expect(screen.queryByTestId('withdraw-status-region')).toBeNull();
  });

  test('editing a completed withdrawal starts a fresh preview from current balance', async () => {
    useLedgerStore.getState().append(deposit({ status: 'settled' }));
    await ready(WithdrawPage);
    fireEvent.change(screen.getByTestId('withdraw-amount'), { target: { value: '1' } });
    await confirm();
    await advance(2000);
    const first = { ...useLedgerStore.getState().transactions[1] };
    expect((screen.getByRole('button', { name: 'Confirm' }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
    expect(useLedgerStore.getState().transactions).toHaveLength(2);
    fireEvent.change(screen.getByTestId('withdraw-amount'), { target: { value: '2' } });
    expect(screen.queryByTestId('withdraw-status-region')).toBeNull();
    expect(screen.getByTestId('withdraw-balance-preview').textContent).toContain('$4.00 − $2.00 = $2.00');
    await confirm();
    await advance(2000);
    expect(screen.getByTestId('reactive-balance').textContent).toBe('2.00');
    expect(useLedgerStore.getState().transactions[1]).toEqual(first);
    expect(useLedgerStore.getState().transactions).toHaveLength(3);
  });

  test.each(['0.001', '0.009', '1.001', '0.290', '1e-2'])('rejects %s without a record/hold/timer and permits correction', async (invalid) => {
    useLedgerStore.getState().append(deposit({ status: 'settled' }));
    await ready(WithdrawPage);
    const input = screen.getByTestId('withdraw-amount');
    const timerCount = vi.getTimerCount();
    fireEvent.change(input, { target: { value: invalid } });
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('withdraw-amount-error');
    expect(screen.getByRole('alert').textContent).toContain('at least $0.01');
    expect(screen.queryByTestId('withdraw-balance-preview')).toBeNull();
    expect((screen.getByRole('button', { name: 'Confirm' }) as HTMLButtonElement).disabled).toBe(true);
    await confirm();
    expect(vi.getTimerCount()).toBe(timerCount);
    expect(useLedgerStore.getState().transactions).toHaveLength(1);
    expect(screen.getByTestId('reactive-balance').textContent).toBe('5.00');
    fireEvent.change(input, { target: { value: '0.01' } });
    expect(input.getAttribute('aria-invalid')).toBe('false');
    await confirm();
    await advance(2000);
    expect(useLedgerStore.getState().transactions[1]).toMatchObject({ amount_usd: 0.01, status: 'settled' });
    expect(screen.getByTestId('reactive-balance').textContent).toBe('4.99');
  });

  test('accepts USD 0.29 without binary floating-point precision rejection', async () => {
    useLedgerStore.getState().append(deposit({ status: 'settled' }));
    await ready(WithdrawPage);
    fireEvent.change(screen.getByTestId('withdraw-amount'), { target: { value: '0.29' } });
    expect((screen.getByRole('button', { name: 'Confirm' }) as HTMLButtonElement).disabled).toBe(false);
    await confirm();
    await advance(2000);
    expect(useLedgerStore.getState().transactions[1]).toMatchObject({ amount_usd: 0.29, status: 'settled' });
    expect(screen.getByTestId('reactive-balance').textContent).toBe('4.71');
  });
});
