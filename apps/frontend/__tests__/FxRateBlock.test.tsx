// @vitest-environment jsdom

import React from 'react';
import { describe, test, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { FxRateBlock, formatFxUpdatedAt } from '../components/FxRateBlock';
import type { UseLatestFxResult } from '../lib/hooks/useLatestFx';

afterEach(() => {
  cleanup();
});

describe('formatFxUpdatedAt', () => {
  test('formats Unix seconds to time string', () => {
    // 1234567890 = Fri Feb 13 2009 23:31:30 UTC
    expect(formatFxUpdatedAt(1234567890)).toMatch(/\d{1,2}:\d{2}/);
  });
});

describe('FxRateBlock', () => {
  test('loading: shows Loading rate...', () => {
    const fx: UseLatestFxResult = {
      status: 'loading',
      retry: vi.fn(),
    };
    render(<FxRateBlock fx={fx} quoteLabel="ZMW" />);
    expect(screen.getByText('Loading rate...')).toBeTruthy();
  });

  test('success: shows rate and updated time', () => {
    const fx: UseLatestFxResult = {
      status: 'success',
      data: { pair: 'USDZMW', rate: 20, ts: 1234567890 },
      retry: vi.fn(),
    };
    render(<FxRateBlock fx={fx} quoteLabel="ZMW" data-testid="fx-rate-block" />);
    expect(screen.getByText(/1 USD = 20 ZMW/)).toBeTruthy();
    expect(screen.getByText(/Updated at/)).toBeTruthy();
    expect(screen.getByTestId('fx-rate-block')).toBeTruthy();
  });

  test('error: shows ErrorState with Retry, no raw error text', () => {
    const retry = vi.fn();
    const fx: UseLatestFxResult = {
      status: 'error',
      retry,
    };
    render(<FxRateBlock fx={fx} quoteLabel="ZMW" />);
    expect(screen.getByText('Unable to load exchange rate')).toBeTruthy();
    expect(screen.getByRole('button', { name: /retry/i })).toBeTruthy();
    // Must not expose raw error strings
    expect(screen.queryByText(/TypeError|Failed to fetch|500|FX service unavailable/)).toBeNull();
  });

  test('error: ErrorState container has data-testid fx-rate-error', () => {
    const fx: UseLatestFxResult = { status: 'error', retry: vi.fn() };
    const { container } = render(<FxRateBlock fx={fx} quoteLabel="ZMW" />);
    const alert = container.querySelector('[data-testid="fx-rate-error"]');
    expect(alert).toBeTruthy();
  });
});
