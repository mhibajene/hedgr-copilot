// @vitest-environment jsdom
import React from 'react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
const refresh = vi.hoisted(() => vi.fn());
vi.mock('next/navigation', () => ({ useSearchParams: () => new URLSearchParams('journey=class-a-val-002') }));
vi.mock('../lib/hooks/useBalance', () => ({ useBalance: () => ({ total: 2000, available: 2000, pending: 0, currency: 'USD', isLoading: false, error: null, refresh }) }));
vi.mock('../lib/hooks/useLatestFx', () => ({ useLatestFx: () => ({ status: 'error', retry: vi.fn() }) }));
vi.mock('../lib/deposits/client', () => ({ postDeposit: vi.fn() }));
vi.mock('../lib/payments/withdraw.mock', () => ({ withdrawMock: {
  createWithdraw: vi.fn(async () => ({ txn_ref: 'format-withdrawal', amountUSD: 50, createdAt: 1 })),
  status: vi.fn(async () => 'CONFIRMED'),
} }));
vi.mock('../lib/fx/FxRateContext', () => ({ useFxRate: () => ({ rate: 27, status: 'ready' }), isFxRateAvailable: () => true }));

import DepositPage from '../app/(app)/deposit/page';
import WithdrawPage from '../app/(app)/withdraw/page';
import { SarahExampleHome } from '../app/(app)/dashboard/SarahExampleHome';
import { SARAH_HOME_READ } from '../lib/state/sarah-home-fixture';
import { useLedgerStore } from '../lib/state/ledger';
import { postDeposit } from '../lib/deposits/client';
import { withdrawMock } from '../lib/payments/withdraw.mock';
import { formatUsd } from '../lib/state/last-visit';
import { formatLocalCurrency } from '../lib/utils/money';

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  vi.stubEnv('NEXT_PUBLIC_APP_ENV', 'dev');
  vi.useFakeTimers();
  localStorage.clear(); sessionStorage.clear();
  useLedgerStore.getState().clear();
  vi.clearAllMocks();
});
afterEach(() => { cleanup(); useLedgerStore.getState().clear(); vi.useRealTimers(); vi.unstubAllEnvs(); });

test('JOURNEY-REVIEW-001 deposit preview groups ZMW and retains the rounded USD credit', async () => {
  render(<DepositPage />);
  await act(async () => { await vi.advanceTimersByTimeAsync(350); });
  fireEvent.change(screen.getByTestId('deposit-amount'), { target: { value: '5000' } });
  expect(screen.getByTestId('deposit-balance-change').textContent).toContain('The simulation shows ZMW 5,000.00 as +$185.19.');
  expect(useLedgerStore.getState().transactions).toEqual([]);
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Confirm', exact: true })); });
  await act(async () => { await vi.advanceTimersByTimeAsync(1600); });
  expect(screen.getByTestId('deposit-confirmation-region').textContent).toContain('ZMW 5,000.00');
  expect(useLedgerStore.getState().transactions).toEqual([expect.objectContaining({ amount_usd: 185.19, amount_zmw: 5000.13, source_local_amount: 5000, source_local_currency: 'ZMW', fx_rate: 27, status: 'settled' })]);
  expect(postDeposit).not.toHaveBeenCalled();
});

test('JOURNEY-REVIEW-001 withdrawal receipt groups ZMW and retains the requested USD debit', async () => {
  render(<WithdrawPage />);
  await act(async () => { await vi.advanceTimersByTimeAsync(350); });
  fireEvent.change(screen.getByLabelText('Amount to simulate (USD)'), { target: { value: '50' } });
  await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Confirm', exact: true })); });
  await act(async () => { await vi.advanceTimersByTimeAsync(600); });
  expect(screen.getByTestId('withdraw-status-region').textContent).toContain('ZMW 1,350.00');
  expect(withdrawMock.createWithdraw).toHaveBeenCalledWith(50, { skipAutoConfirm: false });
  expect(screen.getByTestId('withdraw-balance-reconciliation').textContent).toBe('$1,950.00');
});

test('JOURNEY-REVIEW-001 Sarah fee uses grouped USD without changing the independent holding', () => {
  render(<SarahExampleHome read={SARAH_HOME_READ} />);
  expect(screen.getByTestId('sarah-fee-figure').textContent).toBe('$1,000.00 USD');
  expect(screen.getByTestId('sarah-read-figure').textContent).toBe('$222.22 USD');
  expect(screen.getByTestId('local-balance-figure').textContent).toBe('≈ ZMW 5,999.94');
  expect(useLedgerStore.getState().transactions).toEqual([]);
});

test.each([0, 0.01, 1000, 1234567.89])('JOURNEY-REVIEW-001 existing USD and local formatters group the same magnitude: %s', amount => {
  expect(formatLocalCurrency(amount, 'ZMW')).toBe(`ZMW ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  expect(formatUsd(amount)).toBe(`$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
});
