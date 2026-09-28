// @vitest-environment jsdom

import React from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const activityStateMocks = vi.hoisted(() => ({
  transactions: [] as Array<{
    txn_ref: string;
    type: 'deposit' | 'withdrawal';
    status: 'pending' | 'settled' | 'failed';
    amount_zmw: number;
    amount_usd: number;
    fx_rate: number;
    created_at: number;
    updated_at: number;
    failure_reason?: string;
  }>,
}));

vi.mock('../lib/state/ledger', () => ({
  useLedgerStore: vi.fn(
    (selector: (state: { transactions: unknown[] }) => unknown) =>
      selector({ transactions: activityStateMocks.transactions })
  ),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams('journey=class-a-val-002')),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={typeof href === 'string' ? href : ''} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('../components', () => ({
  TxStatusPill: ({ status }: { status: string }) => (
    <span data-testid="tx-status-pill" data-status={status}>
      {status}
    </span>
  ),
  TxDetailModal: () => null,
}));

vi.mock('@hedgr/ui', () => ({
  EmptyState: ({ title, ...props }: { title: string }) => (
    <div {...props}>{title}</div>
  ),
}));

import ActivityPage from '../app/(app)/activity/page';
import { useSearchParams } from 'next/navigation';

function makeMixedTransactions(): typeof activityStateMocks.transactions {
  return [
    {
      txn_ref: 'withdraw-success',
      type: 'withdrawal',
      status: 'settled',
      amount_zmw: 0,
      amount_usd: 2,
      fx_rate: 0,
      created_at: 40,
      updated_at: 41,
    },
    {
      txn_ref: 'deposit-pending',
      type: 'deposit',
      status: 'pending',
      amount_zmw: 2000,
      amount_usd: 100,
      fx_rate: 20,
      created_at: 20,
      updated_at: 20,
    },
    {
      txn_ref: 'withdraw-failed',
      type: 'withdrawal',
      status: 'failed',
      amount_zmw: 0,
      amount_usd: 50,
      fx_rate: 0,
      created_at: 30,
      updated_at: 31,
      failure_reason: 'Simulated failure',
    },
    {
      txn_ref: 'deposit-success',
      type: 'deposit',
      status: 'settled',
      amount_zmw: 100,
      amount_usd: 5,
      fx_rate: 20,
      created_at: 10,
      updated_at: 11,
    },
  ];
}

beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'fixed');
});

afterEach(() => {
  cleanup();
  activityStateMocks.transactions = [];
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams('journey=class-a-val-002') as ReturnType<
      typeof useSearchParams
    >
  );
  vi.unstubAllEnvs();
});

describe('ActivityPage synthetic evidence grammar', () => {
  test('derives per-event results from completed chronological records before filtering', () => {
    activityStateMocks.transactions = makeMixedTransactions();

    render(<ActivityPage />);

    expect(screen.queryByTestId('activity-synthetic-condition')).toBeNull();

    // HOME-EXPERIENCE-001 T4: the entry thread supersedes the balance-after strip.
    expect(screen.queryByTestId('activity-result-deposit')).toBeNull();
    expect(screen.queryByText(/Balance after/i)).toBeNull();
    expect(screen.getAllByTestId('activity-day-header')).toHaveLength(1);
    expect(screen.getByTestId('activity-day-header').textContent).toMatch(
      /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) \d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/
    );
    expect(screen.getByTestId('activity-day-balance').textContent).toBe('Balance $3.00');
    expect(screen.getByTestId('activity-thread-start').textContent).toMatch(
      /^Started at \$0\.00 · \d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/
    );
    expect(
      screen.getByTestId('activity-reconciliation-remaining').textContent
    ).toBe('$3.00');
    expect(screen.getByTestId('activity-balance-reconciliation').textContent).toContain(
      'From completed simulated entries only.'
    );
    expect(
      screen
        .getAllByTestId('activity-row-deposit')
        .every((row) => within(row).queryByText(/ZMW/) === null)
    ).toBe(true);
    const nextStep = screen.getByTestId('activity-next-step');
    expect(within(nextStep).getByText('Next step')).toBeDefined();
    expect(within(nextStep).getByText('See it on your position')).toBeDefined();
    expect(
      within(nextStep).getByText('Hedgr explains what changed between these two entries.')
    ).toBeDefined();
    expect(
      screen.getByRole('link', { name: 'Back to your position' }).getAttribute('href')
    ).toBe('/dashboard-synthetic-journey');
    expect(screen.queryByRole('link', { name: 'Return to current position' })).toBeNull();

    const pendingDeposit = screen
      .getAllByTestId('activity-row-deposit')
      .find(
        (row) => row.getAttribute('data-activity-status') === 'PENDING_INIT'
      );
    const failedWithdrawal = screen
      .getAllByTestId('activity-row-withdraw')
      .find((row) => row.getAttribute('data-activity-status') === 'FAILED');

    expect(pendingDeposit).toBeDefined();
    expect(failedWithdrawal).toBeDefined();
    expect(within(pendingDeposit!).queryByText(/Completed/)).toBeNull();
    expect(within(failedWithdrawal!).queryByText(/Completed/)).toBeNull();
    expect(within(pendingDeposit!).getByTestId('tx-status-pill')).toBeDefined();
    expect(within(failedWithdrawal!).getByTestId('tx-status-pill')).toBeDefined();
    for (const row of screen.getAllByTestId(/^activity-row-/).filter((r) => r.getAttribute('data-activity-status') === 'SUCCESS')) {
      expect(within(row).getByTestId(/^activity-status-line-/).textContent).toMatch(/^Completed · \d{2}:\d{2}$/);
    }
    expect(
      screen
        .queryAllByTestId('tx-status-pill')
        .map((pill) => pill.getAttribute('data-status'))
    ).not.toContain('SUCCESS');

    const completedWithdrawal = screen.getAllByTestId('activity-row-withdraw').find(row => row.getAttribute('data-activity-status') === 'SUCCESS')!;
    fireEvent.click(completedWithdrawal);
    const detail = completedWithdrawal.closest('details')!;
    expect(detail.open).toBe(true);
    expect(within(detail).getByText('Before')).toBeDefined();
    expect(within(detail).getByText('$5.00')).toBeDefined();
    expect(within(detail).getByText('After')).toBeDefined();
    expect(within(pendingDeposit!.closest('details')!).queryByText('After')).toBeNull();
    expect(within(failedWithdrawal!.closest('details')!).queryByText('After')).toBeNull();
    fireEvent.click(screen.getByTestId('filter-withdrawals'));

    // Day balances still come from the full completed record.
    expect(screen.getByTestId('activity-day-balance').textContent).toBe('Balance $3.00');
    expect(screen.queryAllByTestId('activity-row-deposit')).toHaveLength(0);
    expect(screen.queryByTestId('activity-thread-start')).toBeNull();
  });

  test('offers only the way back when the entries are not exactly two', () => {
    activityStateMocks.transactions = makeMixedTransactions().filter(
      (tx) => !(tx.type === 'withdrawal' && tx.status === 'settled')
    );

    render(<ActivityPage />);

    expect(screen.queryByTestId('activity-next-step')).toBeNull();
    expect(screen.queryByText('Hedgr explains what changed between these two entries.')).toBeNull();
    expect(
      screen.getByRole('link', { name: 'Back to your position' }).getAttribute('href')
    ).toBe('/dashboard-synthetic-journey');
    expect(screen.getByTestId('activity-day-balance').textContent).toBe('Balance $5.00');
  });

  test('shares simulated evidence treatment on the default route without research query state', () => {
    activityStateMocks.transactions = makeMixedTransactions();
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams() as ReturnType<typeof useSearchParams>
    );

    render(<ActivityPage />);

    expect(screen.getByTestId('activity-balance-reconciliation')).toBeTruthy();
    expect(screen.queryByTestId('activity-result-deposit')).toBeNull();
    expect(screen.getByTestId('activity-day-balance').textContent).toBe('Balance $3.00');
    expect(screen.getByTestId('activity-thread-start')).toBeTruthy();
    expect(screen.getByTestId('activity-simulation-context').textContent).toMatch(
      /No entry represents real money moving/i
    );
    expect(
      screen
        .getAllByTestId('activity-row-deposit')
        .every((row) => within(row).queryByText(/ZMW/) === null)
    ).toBe(true);
    expect(
      screen.getByRole('link', { name: 'Back to your position' }).getAttribute('href')
    ).toBe('/dashboard');
    expect(screen.getByTestId('activity-next-step')).toBeTruthy();
  });
});
