// @vitest-environment jsdom

import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { SyntheticWithdrawalJourney } from '../app/prototype/synthetic-withdrawal/SyntheticWithdrawalJourney';

const HIGH_RISK_PHRASES = [
  'available now',
  'confirm withdrawal',
  'funds moved',
  'guaranteed',
  'instant payout',
  'live payout',
  'provider approved',
  'rail approved',
  'settled',
  'withdraw now',
] as const;

afterEach(() => {
  cleanup();
});

describe('FE-TRUST-002 synthetic withdrawal journey', () => {
  test('renders explicit synthetic boundaries and denies transaction action', () => {
    render(<SyntheticWithdrawalJourney />);

    const journey = screen.getByTestId('synthetic-withdrawal-journey');
    expect(journey.getAttribute('data-synthetic')).toBe('true');
    expect(screen.getByText('Closed-user research prototype')).toBeTruthy();
    expect(screen.getAllByText('Synthetic / non-live fixture').length).toBeGreaterThan(0);
    expect(screen.getByText('No balance connected')).toBeTruthy();
    expect(screen.getByText('No endpoint selected')).toBeTruthy();

    const transactionControls = journey.querySelectorAll(
      '[data-transaction-control="true"]'
    );
    expect(transactionControls).toHaveLength(1);
    expect((transactionControls[0] as HTMLButtonElement).disabled).toBe(true);
    expect(journey.querySelector('form')).toBeNull();
  });

  test('switches presentation fixtures without enabling transaction controls', () => {
    render(<SyntheticWithdrawalJourney />);

    expect(
      screen.getByTestId('synthetic-tx-exception-notice').getAttribute('data-state')
    ).toBe('unavailable');

    fireEvent.click(screen.getByRole('tab', { name: 'Manual review' }));

    expect(
      screen.getByTestId('synthetic-tx-exception-notice').getAttribute('data-state')
    ).toBe('manual-review');
    expect(
      (screen.getByTestId('synthetic-withdrawal-primary-action') as HTMLButtonElement)
        .disabled
    ).toBe(true);
  });

  test('preserves trust-framing denylist continuity', () => {
    render(<SyntheticWithdrawalJourney />);

    const renderedCopy =
      screen.getByTestId('synthetic-withdrawal-journey').textContent?.toLowerCase() ?? '';

    for (const phrase of HIGH_RISK_PHRASES) {
      expect(
        renderedCopy.includes(phrase),
        `unexpected phrase "${phrase}" in rendered synthetic journey`
      ).toBe(false);
    }
  });
});
