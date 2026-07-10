// @vitest-environment jsdom

import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { SyntheticWithdrawalJourney } from '../app/prototype/synthetic-withdrawal/SyntheticWithdrawalJourney';
import PrototypeIndexPage from '../app/prototype/page';

const FIXTURE_CASES = [
  ['Pending review', 'pending', 'pending-review-v1'],
  ['Manual review', 'manual-review', 'manual-review-v1'],
  ['Blocked', 'blocked', 'blocked-v1'],
  ['Unavailable', 'unavailable', 'unavailable-v1'],
  ['Failed', 'failed', 'failed-v1'],
  ['Cancelled', 'cancelled', 'cancelled-v1'],
] as const;

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
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
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
    expect(journey.getAttribute('data-financial-state')).toBe('none');
    expect(journey.getAttribute('data-research-fixture-id')).toBe('unavailable-v1');

    const transactionControls = journey.querySelectorAll('[data-transaction-control]');
    expect(transactionControls).toHaveLength(1);
    expect(transactionControls[0].tagName).toBe('DIV');
    expect(transactionControls[0].getAttribute('data-interactive')).toBe('false');
    expect(screen.getByText('Continue unavailable')).toBeTruthy();
    expect(
      screen.getByTestId('synthetic-tx-exception-primary-action').hasAttribute('disabled')
    ).toBe(true);
    expect(journey.querySelector('[data-financial-action="true"]')).toBeNull();
    expect(journey.querySelector('form')).toBeNull();
  });

  test('switches research copy and traceability only without external or persistent state', () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const storageSetSpy = vi.spyOn(Storage.prototype, 'setItem');

    render(<SyntheticWithdrawalJourney />);

    for (const [label, state, fixtureId] of FIXTURE_CASES) {
      fireEvent.click(screen.getByRole('tab', { name: label }));

      const journey = screen.getByTestId('synthetic-withdrawal-journey');
      const notice = screen.getByTestId('synthetic-tx-exception-notice');
      const trace = screen.getByTestId('synthetic-withdrawal-fixture-trace');
      const prompt = screen.getByTestId(
        'synthetic-withdrawal-comprehension-prompt'
      );

      expect(notice.getAttribute('data-state')).toBe(state);
      expect(journey.getAttribute('data-research-fixture-id')).toBe(fixtureId);
      expect(notice.getAttribute('data-research-fixture-id')).toBe(fixtureId);
      expect(trace.getAttribute('data-research-fixture-id')).toBe(fixtureId);
      expect(trace.getAttribute('data-session-capture')).toBe('research-fixture');
      expect(prompt.getAttribute('data-research-fixture-id')).toBe(fixtureId);
      expect(trace.textContent).toContain(`Fixture: ${fixtureId}`);
      expect(prompt.textContent).toContain(
        `What do you think “${label}” means here?`
      );
      expect(screen.getByText('No balance connected')).toBeTruthy();
      expect(screen.getByText('No endpoint selected')).toBeTruthy();
      expect(screen.getAllByText('Synthetic / non-live fixture').length).toBeGreaterThan(
        0
      );
      expect(
        screen.getByTestId('synthetic-withdrawal-primary-action').getAttribute(
          'data-interactive'
        )
      ).toBe('false');
    }

    expect(fetchMock).not.toHaveBeenCalled();
    expect(storageSetSpy).not.toHaveBeenCalled();
  });

  test('provides a visible non-financial exit to the research index', () => {
    render(<SyntheticWithdrawalJourney />);

    const exit = screen.getByRole('link', { name: 'End research journey' });
    expect(exit.getAttribute('href')).toBe(
      '/prototype?researchExit=synthetic-withdrawal'
    );
    expect(exit.getAttribute('data-research-control')).toBe('true');
    expect(exit.getAttribute('data-financial-action')).toBe('false');
    expect(
      screen.getByText(
        /It writes no transaction, wallet, ledger, provider, rail, or backend state\./
      )
    ).toBeTruthy();
  });

  test('confirms a safe exit without creating a receipt or financial record', async () => {
    const page = await PrototypeIndexPage({
      searchParams: Promise.resolve({
        researchExit: 'synthetic-withdrawal',
      }),
    });

    render(page);

    const confirmation = screen.getByTestId('research-exit-confirmation');
    expect(confirmation.getAttribute('data-financial-record')).toBe('false');
    expect(
      screen.getByText('No money moved and no transaction was created.')
    ).toBeTruthy();
    expect(confirmation.textContent).toContain(
      'not a receipt or financial record'
    );
    expect(confirmation.textContent).toContain(
      'No wallet, ledger, provider, rail, or backend state was written.'
    );
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
