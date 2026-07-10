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

const REQUIRED_SEMANTIC_FRAGMENTS: Record<
  keyof typeof SYNTHETIC_TX_EXCEPTION_PRESENTATIONS,
  readonly string[]
> = {
  pending: ['review exists', 'has not concluded', 'temporary review state'],
  'manual-review': ['human review', 'unless a person reviews it', 'not a pending review'],
  blocked: ['known synthetic rule', 'rule-based stop', 'not a review in progress'],
  unavailable: ['not enabled', 'authority is unknown', 'not a failed attempt'],
  failed: ['attempt did not complete', 'ended without completion', 'not a known-rule block'],
  cancelled: ['intentionally stopped', 'deliberately ended', 'not a failure'],
};

const EXPECTED_FIXTURE_IDS = {
  pending: 'pending-review-v1',
  'manual-review': 'manual-review-v1',
  blocked: 'blocked-v1',
  unavailable: 'unavailable-v1',
  failed: 'failed-v1',
  cancelled: 'cancelled-v1',
} as const;

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
      expect(presentation.fixtureId).toBe(
        EXPECTED_FIXTURE_IDS[presentation.state]
      );
      expect(presentation.comprehensionPrompt).toBe(
        `What do you think “${presentation.label}” means here?`
      );
      expect(presentation.primaryActionLabel).toBe(
        'Read the synthetic status explanation'
      );
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

    expect(
      new Set(
        Object.values(SYNTHETIC_TX_EXCEPTION_PRESENTATIONS).map(
          (presentation) => presentation.fixtureId
        )
      ).size
    ).toBe(Object.keys(SYNTHETIC_TX_EXCEPTION_PRESENTATIONS).length);
  });

  test('preserves explicit non-overlapping fixture semantics', () => {
    for (const [state, fragments] of Object.entries(REQUIRED_SEMANTIC_FRAGMENTS)) {
      const presentation =
        SYNTHETIC_TX_EXCEPTION_PRESENTATIONS[
          state as keyof typeof SYNTHETIC_TX_EXCEPTION_PRESENTATIONS
        ];
      const renderedContract = [
        presentation.headline,
        presentation.body,
        presentation.supportNote,
      ]
        .join(' ')
        .toLowerCase();

      for (const fragment of fragments) {
        expect(
          renderedContract.includes(fragment),
          `missing semantic fragment "${fragment}" for ${state}`
        ).toBe(true);
      }
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
      screen
        .getByTestId('synthetic-tx-exception-notice')
        .getAttribute('data-research-fixture-id')
    ).toBe('blocked-v1');
    expect(
      screen.getByTestId('synthetic-tx-exception-primary-action').hasAttribute('disabled')
    ).toBe(true);
    expect(
      screen.getByTestId('synthetic-tx-exception-primary-action').textContent
    ).toBe('Read the synthetic status explanation');
  });
});
