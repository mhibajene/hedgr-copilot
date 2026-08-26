// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
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

afterEach(() => {
  cleanup();
  activityStateMocks.transactions = [];
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams('journey=class-a-val-002') as ReturnType<
      typeof useSearchParams
    >
  );
});

describe('ActivityPage synthetic evidence grammar', () => {
  test('derives per-event results from completed chronological records before filtering', () => {
    activityStateMocks.transactions = makeMixedTransactions();

    render(<ActivityPage />);

    const condition = screen.getByTestId('activity-synthetic-condition');
    expect(condition.textContent).toContain('What happened');
    expect(condition.textContent).toContain(
      'Activity records each simulated event and the resulting amount.'
    );
    expect(condition.textContent).not.toMatch(/interpret|what it means|why/i);

    expect(screen.getByTestId('activity-result-deposit').textContent).toBe(
      '→ $5.00 resulting'
    );
    expect(screen.getByTestId('activity-result-withdraw').textContent).toBe(
      '→ $3.00 resulting'
    );
    expect(
      screen.getByTestId('activity-reconciliation-deposits').textContent
    ).toBe('+$5.00 deposits');
    expect(
      screen.getByTestId('activity-reconciliation-withdrawals').textContent
    ).toBe('$2.00 withdrawals');
    expect(
      screen.getByTestId('activity-reconciliation-remaining').textContent
    ).toBe('$3.00 remaining');
    expect(
      screen
        .getByRole('link', { name: 'Return to current position' })
        .getAttribute('href')
    ).toBe('/dashboard-synthetic-journey');

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
    expect(within(pendingDeposit!).queryByText(/resulting/i)).toBeNull();
    expect(within(failedWithdrawal!).queryByText(/resulting/i)).toBeNull();

    fireEvent.click(screen.getByTestId('filter-withdrawals'));

    expect(screen.getByTestId('activity-result-withdraw').textContent).toBe(
      '→ $3.00 resulting'
    );
    expect(screen.queryByTestId('activity-result-deposit')).toBeNull();
  });

  test('does not add resulting-balance treatment outside the governed synthetic journey', () => {
    activityStateMocks.transactions = makeMixedTransactions();
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams() as ReturnType<typeof useSearchParams>
    );

    render(<ActivityPage />);

    expect(screen.queryByTestId('activity-balance-reconciliation')).toBeNull();
    expect(screen.queryByTestId('activity-result-deposit')).toBeNull();
    expect(screen.queryByTestId('activity-result-withdraw')).toBeNull();
  });
});
