// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

vi.mock('../lib/hooks/useBalance', () => ({
  useBalance: vi.fn(),
}));

vi.mock('../lib/hooks/useLatestFx', () => ({
  useLatestFx: vi.fn(),
}));

vi.mock('../lib/state/ledger', () => ({
  useLedgerStore: vi.fn(
    (selector: (state: { confirm: () => void; fail: () => void }) => unknown) =>
      selector({
        confirm: vi.fn(),
        fail: vi.fn(),
      }),
  ),
}));

vi.mock('../lib/state/wallet', () => ({
  useWalletStore: vi.fn(
    (selector: (state: { debitUSD: () => void }) => unknown) =>
      selector({
        debitUSD: vi.fn(),
      }),
  ),
}));

vi.mock('../lib/state/balance.mode', () => ({
  getBalanceMode: vi.fn(() => 'ledger'),
}));

vi.mock('../lib/payments/withdraw.mock', () => ({
  withdrawMock: {
    createWithdraw: vi.fn(async (amountUSD: number) => ({
      txn_ref: 'tx-withdraw-1',
      amountUSD,
      createdAt: Date.now(),
    })),
    status: vi.fn(async () => 'PENDING'),
  },
}));

vi.mock('../components', () => ({
  BalanceWithLocalEstimate: ({ usdAmount, inline, ...props }: { usdAmount: number; inline?: boolean }) => {
    void inline;
    return <div {...props}>{usdAmount}</div>;
  },
  FxRateBlock: ({ 'data-testid': dataTestId }: { 'data-testid'?: string }) => (
    <div data-testid={dataTestId}>FX</div>
  ),
}));

vi.mock('@hedgr/ui', () => ({
  EmptyState: ({ title, ...props }: { title: string }) => <div {...props}>{title}</div>,
  ErrorState: ({
    title,
    description,
    primaryAction,
    ...props
  }: {
    title: string;
    description: string;
    primaryAction?: { label: string; onClick?: () => void };
  }) => (
    <div {...props}>
      <p>{title}</p>
      <p>{description}</p>
      {primaryAction?.onClick ? (
        <button type="button" onClick={primaryAction.onClick}>
          {primaryAction.label}
        </button>
      ) : null}
    </div>
  ),
}));

import WithdrawPage from '../app/(app)/withdraw/page';
import { useBalance } from '../lib/hooks/useBalance';
import { useLatestFx } from '../lib/hooks/useLatestFx';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('WithdrawPage status surface', () => {
  test('shows a clear processing status region after submit', async () => {
    vi.useFakeTimers();

    vi.mocked(useBalance).mockReturnValue({
      total: 25,
      available: 25,
      pending: 0,
      currency: 'USD',
      asOf: 1,
      isLoading: false,
      error: null,
      refresh: vi.fn(),
    });

    vi.mocked(useLatestFx).mockReturnValue({
      status: 'success',
      data: undefined,
      retry: vi.fn(),
    });

    render(<WithdrawPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(350);
    });

    fireEvent.change(screen.getByLabelText('Amount (USD)'), {
      target: { value: '1' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: 'Confirm' }));
      await Promise.resolve();
    });

    const statusRegion = screen.getByTestId('withdraw-status-region');
    expect(statusRegion.getAttribute('data-status')).toBe('IN_PROGRESS');
    expect(screen.getByTestId('withdraw-status-label').textContent).toBe('Processing');
    expect(screen.getByTestId('withdraw-status-title').textContent).toBe(
      'Withdrawal request submitted',
    );
    expect(screen.getByTestId('withdraw-status-description').textContent).toBe(
      'Your withdrawal is processing. Timing can vary during normal processing.',
    );
    expect(screen.getByTestId('withdraw-status-disclosure').textContent).toBe(
      'A protective posture does not by itself stop a withdrawal from processing.',
    );
  });
});
