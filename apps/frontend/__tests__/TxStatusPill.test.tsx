// @vitest-environment jsdom

import React from 'react';
import { describe, test, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TxStatusPill } from '../components/TxStatusPill';
import { PublicTxStatus } from '../lib/tx';

afterEach(() => {
  cleanup();
});

describe('TxStatusPill', () => {
  test('renders expected label from STATUS_MAP for SUCCESS', () => {
    render(<TxStatusPill status={PublicTxStatus.SUCCESS} />);
    expect(screen.getByText('Completed')).toBeTruthy();
  });

  test('applies tone (variant) class for SUCCESS', () => {
    render(<TxStatusPill status={PublicTxStatus.SUCCESS} />);
    const pill = screen.getByTestId('tx-status-pill');
    expect(pill.className).toContain('bg-emerald-50');
  });

  test('renders label and data-status for FAILED', () => {
    render(<TxStatusPill status={PublicTxStatus.FAILED} />);
    expect(screen.getByText('Failed')).toBeTruthy();
    const pill = screen.getByTestId('tx-status-pill');
    expect(pill.getAttribute('data-status')).toBe(PublicTxStatus.FAILED);
  });

  test('applies tone class for FAILED', () => {
    render(<TxStatusPill status={PublicTxStatus.FAILED} />);
    const pill = screen.getByTestId('tx-status-pill');
    expect(pill.className).toContain('bg-red-50');
  });

  test('renders Pending label for PENDING_INIT', () => {
    render(<TxStatusPill status={PublicTxStatus.PENDING_INIT} />);
    expect(screen.getByText('Pending')).toBeTruthy();
    expect(screen.getByTestId('tx-status-pill').className).toContain('bg-amber-50');
  });
});
