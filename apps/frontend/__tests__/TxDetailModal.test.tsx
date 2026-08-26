// @vitest-environment jsdom

import React, { useState } from 'react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { TxDetailModal } from '../components/TxDetailModal';
import { PublicTxStatus, type TxLifecycle } from '../lib/tx';

const settledWithdrawal: TxLifecycle = {
  id: 'withdrawal-1',
  type: 'WITHDRAW',
  amountUSD: 2,
  amountZMW: 0,
  status: PublicTxStatus.SUCCESS,
  createdAt: Date.UTC(2026, 7, 26, 9, 30),
  updatedAt: Date.UTC(2026, 7, 26, 9, 31),
  completedAt: Date.UTC(2026, 7, 26, 9, 31),
};

function ModalHarness() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open activity detail
      </button>
      <TxDetailModal
        transaction={settledWithdrawal}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        simulated
        resultingBalance={3}
      />
    </>
  );
}

beforeEach(() => {
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    callback(0);
    return 1;
  });
  vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('TxDetailModal', () => {
  test('presents synthetic activity as concise evidence and traps keyboard focus', async () => {
    render(<ModalHarness />);

    const trigger = screen.getByRole('button', {
      name: 'Open activity detail',
    });
    trigger.focus();
    fireEvent.click(trigger);

    const closeIcon = await screen.findByRole('button', {
      name: 'Close activity detail',
    });
    await waitFor(() => expect(document.activeElement).toBe(closeIcon));
    expect(document.body.style.overflow).toBe('hidden');
    expect(screen.getByTestId('tx-detail-amount').textContent).toContain(
      '−$2.00',
    );
    expect(screen.getByTestId('tx-detail-resulting-position').textContent).toBe(
      '$3.00',
    );
    expect(screen.getByText('Time')).toBeDefined();
    expect(screen.getByText('Context')).toBeDefined();
    expect(screen.getByTestId('tx-detail-simulation-note').textContent).toBe(
      'Illustrative evidence only. No real money moved.',
    );
    expect(screen.queryByTestId('tx-detail-id')).toBeNull();
    expect(screen.queryByTestId('tx-detail-timeline')).toBeNull();
    expect(screen.queryByTestId('tx-status-pill')).toBeNull();

    const footerClose = screen.getByRole('button', {
      name: 'Close',
      exact: true,
    });
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(footerClose);
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(closeIcon);

    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('');
  });

  test('preserves lifecycle status, identifier, and timeline outside simulation', () => {
    render(
      <TxDetailModal
        transaction={settledWithdrawal}
        isOpen
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByTestId('tx-detail-id').textContent).toBe('withdrawal-1');
    expect(screen.getByTestId('tx-detail-timeline')).toBeDefined();
    expect(screen.getByTestId('tx-status-pill').textContent).toBe('Completed');
    expect(screen.getByTestId('tx-detail-amount').textContent).toContain('$2.00');
  });
});
