// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

vi.mock('../lib/hooks/useBalance', () => ({
  useBalance: vi.fn(() => ({
    refresh: vi.fn(),
  })),
}));

vi.mock('../lib/hooks/useLatestFx', () => ({
  useLatestFx: vi.fn(),
}));

vi.mock('../lib/state/ledger', () => ({
  useLedgerStore: vi.fn(
    (selector: (state: { append: () => void; confirm: () => void }) => unknown) =>
      selector({
        append: vi.fn(),
        confirm: vi.fn(),
      }),
  ),
}));

vi.mock('../lib/state/wallet', () => ({
  useWalletStore: vi.fn(
    (selector: (state: { creditUSD: () => void }) => unknown) =>
      selector({
        creditUSD: vi.fn(),
      }),
  ),
}));

vi.mock('../lib/state/balance.mode', () => ({
  getBalanceMode: vi.fn(() => 'ledger'),
}));

vi.mock('../lib/deposits/client', () => ({
  postDeposit: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

vi.mock('../components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../components')>();
  return {
    ...actual,
    FxRateBlock: ({ 'data-testid': dataTestId }: { 'data-testid'?: string }) => (
      <div data-testid={dataTestId}>FX</div>
    ),
  };
});

vi.mock('@hedgr/ui', () => ({
  EmptyState: ({ title, ...props }: { title: string }) => <div {...props}>{title}</div>,
  ErrorState: ({ title, ...props }: { title: string }) => <div {...props}>{title}</div>,
}));

import DepositPage from '../app/(app)/deposit/page';
import { useLatestFx } from '../lib/hooks/useLatestFx';
import { CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER } from '../lib/fx/market-data-continuity-copy';
import { useSearchParams } from 'next/navigation';
import { TX_REVIEW_BYPASS_FX_PARAM } from '../lib/tx';

const ORIGINAL_CI = process.env.CI;
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.useRealTimers();
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as ReturnType<typeof useSearchParams>);
  vi.unstubAllEnvs();
  if (ORIGINAL_CI === undefined) {
    delete process.env.CI;
  } else {
    process.env.CI = ORIGINAL_CI;
  }
  process.env.NODE_ENV = ORIGINAL_NODE_ENV;
  process.env.NEXT_PUBLIC_APP_ENV = ORIGINAL_APP_ENV;
});

describe('DepositPage market-data degraded state (MC-S2-020)', () => {
  test('FX failure: continuity panel before route body, context visible, confirm disabled, no false $0 preview', async () => {
    vi.useFakeTimers();
    const retry = vi.fn();
    vi.mocked(useLatestFx).mockReturnValue({
      status: 'error',
      retry,
    });

    render(<DepositPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(350);
    });

    const continuity = screen.getByTestId('deposit-market-data-continuity');
    const preview = screen.getByTestId('deposit-conversion-preview');
    const heading = screen.getByRole('heading', { level: 1, name: 'Deposit' });
    expect(heading.nextElementSibling).toBe(continuity);
    expect(screen.getByTestId('deposit-amount')).toBeTruthy();

    expect(screen.getByText(/Exchange rate data is temporarily unavailable/i)).toBeTruthy();
    expect(screen.queryByTestId('deposit-fx-block')).toBeNull();
    expect(screen.queryByRole('button', { name: 'Go to Dashboard' })).toBeNull();

    expect(preview.textContent).toContain(CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER);
    expect(preview.textContent).not.toMatch(/\$0\.00/);

    const confirm = screen.getByRole('button', { name: 'Confirm' }) as HTMLButtonElement;
    expect(confirm.disabled).toBe(true);
  });

  test('FX success: shows rate block and numeric preview when rate present', async () => {
    vi.useFakeTimers();
    vi.mocked(useLatestFx).mockReturnValue({
      status: 'success',
      data: { pair: 'USDZMW', rate: 20, ts: 1 },
      retry: vi.fn(),
    });

    render(<DepositPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(350);
    });

    expect(screen.getByTestId('deposit-fx-block')).toBeTruthy();
    expect(screen.queryByTestId('deposit-market-data-continuity')).toBeNull();
    expect(screen.getByTestId('deposit-conversion-preview').textContent).toMatch(/\$5\.00/);
  });
});

describe('DepositPage tx review seam (MC-S2-021)', () => {
  function stubApprovedLocalDev() {
    vi.unstubAllEnvs();
    delete process.env.CI;
    process.env.NODE_ENV = 'development';
    process.env.NEXT_PUBLIC_APP_ENV = 'dev';
  }

  test('FX error without review params: confirm disabled, no banner', async () => {
    stubApprovedLocalDev();
    vi.useFakeTimers();
    vi.mocked(useLatestFx).mockReturnValue({
      status: 'error',
      retry: vi.fn(),
    });
    vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams() as ReturnType<typeof useSearchParams>);

    render(<DepositPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(350);
    });

    expect(screen.queryByTestId('deposit-tx-review-simulator-banner')).toBeNull();
    const confirm = screen.getByRole('button', { name: 'Confirm' }) as HTMLButtonElement;
    expect(confirm.disabled).toBe(true);
  });

  test('FX error + txReviewBypassFx=1: confirm enabled, banner visible, preview stays unavailable (no fake $)', async () => {
    stubApprovedLocalDev();
    vi.useFakeTimers();
    vi.mocked(useLatestFx).mockReturnValue({
      status: 'error',
      retry: vi.fn(),
    });
    vi.mocked(useSearchParams).mockReturnValue(
      new URLSearchParams(`${TX_REVIEW_BYPASS_FX_PARAM}=1`) as ReturnType<typeof useSearchParams>,
    );

    render(<DepositPage />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(350);
    });

    expect(screen.getByTestId('deposit-tx-review-simulator-banner')).toBeTruthy();
    const preview = screen.getByTestId('deposit-conversion-preview');
    expect(preview.textContent).toContain(CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER);
    expect(preview.textContent).not.toMatch(/FX Preview:\s*\$/);

    const confirm = screen.getByRole('button', { name: 'Confirm' }) as HTMLButtonElement;
    expect(confirm.disabled).toBe(false);
  });
});
