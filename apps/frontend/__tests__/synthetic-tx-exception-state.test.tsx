// @vitest-environment jsdom

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test } from 'vitest';
import { SyntheticTxExceptionNotice } from '../components/SyntheticTxExceptionNotice';
import {
  SYNTHETIC_TX_EXCEPTION_PRESENTATIONS,
  SyntheticTxExceptionState,
  resolveSyntheticTxExceptionPresentation,
} from '../lib/tx';

const HIGH_RISK_SUBSTRINGS = [
  'guaranteed',
  'instant',
  'provider approved',
  'rail approved',
  'funds moved',
  'settled',
  'live payout',
  'customer money',
] as const;

afterEach(() => {
  cleanup();
});

function assertLowRiskCopy(text: string) {
  const lower = text.toLowerCase();
  for (const phrase of HIGH_RISK_SUBSTRINGS) {
    expect(lower.includes(phrase), `unexpected phrase "${phrase}" in: ${text}`).toBe(
      false
    );
  }
}

describe('synthetic transaction exception presentation contract', () => {
  test('covers the active ticket states with visible non-live labelling', () => {
    expect(Object.keys(SYNTHETIC_TX_EXCEPTION_PRESENTATIONS).sort()).toEqual([
      'blocked',
      'cancelled',
      'failed',
      'manual-review',
      'pending',
      'unavailable',
    ]);

    for (const presentation of Object.values(SYNTHETIC_TX_EXCEPTION_PRESENTATIONS)) {
      expect(presentation.isSynthetic).toBe(true);
      expect(presentation.nonLiveLabel).toBe('Synthetic / non-live fixture');
      assertLowRiskCopy(
        [
          presentation.label,
          presentation.headline,
          presentation.body,
          presentation.supportNote,
          presentation.primaryActionLabel,
        ].join(' ')
      );
    }
  });

  test('unknown state resolves to unavailable rather than success', () => {
    expect(resolveSyntheticTxExceptionPresentation('provider-confirmed').state).toBe(
      SyntheticTxExceptionState.UNAVAILABLE
    );
  });

  test('component renders a disabled non-executing primary action', () => {
    render(<SyntheticTxExceptionNotice state={SyntheticTxExceptionState.BLOCKED} />);

    expect(
      screen
        .getByTestId('synthetic-tx-exception-notice')
        .getAttribute('data-synthetic')
    ).toBe('true');
    expect(screen.getByText('Blocked')).toBeTruthy();
    expect(screen.getByText('Synthetic / non-live fixture')).toBeTruthy();
    expect(
      screen.getByTestId('synthetic-tx-exception-primary-action').hasAttribute('disabled')
    ).toBe(true);
  });
});
