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
  test('does not show trust sub-strips when withdraw status card is absent', async () => {
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
    expect(screen.queryByTestId('withdraw-status-unresolved-path-clarification')).toBeNull();
    expect(screen.queryByTestId('withdraw-status-next-step-guidance')).toBeNull();
  });

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

    const exceptionBlock = screen.getByTestId('withdraw-status-exception-clarification');
    expect(exceptionBlock).toBeTruthy();
    const exceptionText = exceptionBlock.textContent ?? '';
    expect(exceptionText).toMatch(/not final yet/i);
    expect(exceptionText).toMatch(/completion time|promised/i);
    const lower = exceptionText.toLowerCase();
    for (const bad of ['guaranteed', 'will complete', 'lockup', 'reallocated', 'immediately'] as const) {
      expect(lower.includes(bad), `unexpected "${bad}"`).toBe(false);
    }

    const reconciliationBlock = screen.getByTestId('withdraw-status-reconciliation-clarification');
    const reconciliationText = reconciliationBlock.textContent ?? '';
    expect(reconciliationText).toMatch(/not final/i);
    expect(reconciliationText).toMatch(/confirm/i);
    expect(reconciliationText).toMatch(/does not automatically mean something is wrong/i);
    expect(reconciliationText).toMatch(/does not promise when/i);
    const recLower = reconciliationText.toLowerCase();
    for (const bad of ['guaranteed', 'settled', 'completed now', 'moved', 'reallocated', 'immediately'] as const) {
      expect(recLower.includes(bad), `unexpected "${bad}" in reconciliation copy`).toBe(false);
    }

    const unresolvedBlock = screen.getByTestId('withdraw-status-unresolved-path-clarification');
    const unresolvedText = unresolvedBlock.textContent ?? '';
    expect(unresolvedText).toMatch(/unresolved/i);
    expect(unresolvedText).toMatch(/not been forgotten|has not been forgotten/i);
    expect(unresolvedText).toMatch(/does not automatically mean something is wrong/i);
    const unLower = unresolvedText.toLowerCase();
    for (const bad of ['guaranteed', 'escalated', 'resolved soon', 'moved', 'reallocated', 'immediately'] as const) {
      expect(unLower.includes(bad), `unexpected "${bad}" in unresolved-path copy`).toBe(false);
    }

    const nextStepBlock = screen.getByTestId('withdraw-status-next-step-guidance');
    const nextStepText = nextStepBlock.textContent ?? '';
    expect(nextStepText).toMatch(/in progress|still in progress/i);
    expect(nextStepText).toMatch(/gone quiet/i);
    expect(nextStepText).toMatch(/does not mean failure/i);
    expect(nextStepText).toMatch(/not shown yet|completion/i);
    const nsLower = nextStepText.toLowerCase();
    expect(nsLower.includes('loss'), 'should not imply loss').toBe(false);
    expect(nsLower.includes('lockup'), 'should not imply lockup').toBe(false);
    for (const bad of [
      'guaranteed',
      'escalate',
      'support will',
      'resolved soon',
      'manually handled',
      'immediately',
      'completed now',
    ] as const) {
      expect(nsLower.includes(bad), `unexpected "${bad}" in next-step guidance copy`).toBe(false);
    }
  });
});
