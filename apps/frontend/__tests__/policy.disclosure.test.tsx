// @vitest-environment jsdom

import React from 'react';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import {
  PolicyDisclosure,
  DISCLOSURE_COPY,
  SYNTHETIC_RESEARCH_DISCLOSURE_COPY,
} from '../components/PolicyDisclosure';
import type { UsePolicyResult } from '../lib/policy/usePolicy';

// ---------------------------------------------------------------------------
// Mock usePolicy — module-level mock so we can vary the return per test
// ---------------------------------------------------------------------------

const mockUsePolicy = vi.fn<() => UsePolicyResult>();

vi.mock('../lib/policy/usePolicy', () => ({
  usePolicy: () => mockUsePolicy(),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function readyPolicy(requiredKeys: string[]): UsePolicyResult {
  return {
    status: 'ready',
    market: 'KE',
    version: 'v1',
    resolvedAt: '2026-01-01T00:00:00.000Z',
    policy: {
      features: { earn: true, earnMode: 'pilot', payLinks: false, stablecoinSend: false },
      limits: { maxDepositUSD: 5_000, maxWithdrawUSD: 2_500, maxSingleTransferUSD: 1_000 },
      settlement: { localCurrencyFirst: true, localCurrency: 'KES' },
      fx: { requireProvenance: false, requiredFields: [] },
      disclosures: { requiredKeys },
      bannedClaims: [],
    },
    isFeatureEnabled: () => false,
  };
}

const LOADING_RESULT: UsePolicyResult = {
  status: 'loading',
  market: '',
  version: '',
  resolvedAt: '',
  policy: null,
  isFeatureEnabled: () => false,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('PolicyDisclosure', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  // -----------------------------------------------------------------------
  // AC1: Renders disclosure copy for requiredKeys
  // -----------------------------------------------------------------------
  test('renders disclosure items matching requiredKeys from policy', () => {
    mockUsePolicy.mockReturnValue(readyPolicy(['risk-warning', 'not-a-bank']));

    render(<PolicyDisclosure />);

    const section = screen.getByTestId('policy-disclosures');
    expect(section).toBeDefined();

    const items = section.querySelectorAll('li');
    expect(items).toHaveLength(2);

    expect(items[0].textContent).toBe(DISCLOSURE_COPY['risk-warning']);
    expect(items[1].textContent).toBe(DISCLOSURE_COPY['not-a-bank']);
  });

  // -----------------------------------------------------------------------
  // AC2: Renders nothing when requiredKeys is empty
  // -----------------------------------------------------------------------
  test('renders nothing when requiredKeys is empty', () => {
    mockUsePolicy.mockReturnValue(readyPolicy([]));

    const { container } = render(<PolicyDisclosure />);

    expect(container.innerHTML).toBe('');
    expect(screen.queryByTestId('policy-disclosures')).toBeNull();
  });

  // -----------------------------------------------------------------------
  // AC3: Renders nothing while policy is loading (deny-by-default)
  // -----------------------------------------------------------------------
  test('renders nothing while policy is loading', () => {
    mockUsePolicy.mockReturnValue(LOADING_RESULT);

    const { container } = render(<PolicyDisclosure />);

    expect(container.innerHTML).toBe('');
  });

  // -----------------------------------------------------------------------
  // AC4: Skips unknown keys and warns in non-production
  // -----------------------------------------------------------------------
  test('skips unknown disclosure keys and logs a warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mockUsePolicy.mockReturnValue(readyPolicy(['risk-warning', 'made-up-key']));

    render(<PolicyDisclosure />);

    const section = screen.getByTestId('policy-disclosures');
    const items = section.querySelectorAll('li');
    expect(items).toHaveLength(1);
    expect(items[0].textContent).toBe(DISCLOSURE_COPY['risk-warning']);

    expect(warnSpy).toHaveBeenCalledWith(
      '[PolicyDisclosure] Unknown disclosure key skipped: "made-up-key"',
    );

    warnSpy.mockRestore();
  });

  // -----------------------------------------------------------------------
  // AC5: Renders nothing when all keys are unknown
  // -----------------------------------------------------------------------
  test('renders nothing when every key is unknown', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    mockUsePolicy.mockReturnValue(readyPolicy(['bogus-a', 'bogus-b']));

    const { container } = render(<PolicyDisclosure />);

    expect(container.innerHTML).toBe('');
    expect(warnSpy).toHaveBeenCalledTimes(2);

    warnSpy.mockRestore();
  });

  // -----------------------------------------------------------------------
  // AC6: keys prop bypasses usePolicy
  // -----------------------------------------------------------------------
  test('uses keys prop directly and does not call usePolicy', () => {
    render(<PolicyDisclosure keys={['not-a-bank']} />);

    expect(mockUsePolicy).not.toHaveBeenCalled();

    const section = screen.getByTestId('policy-disclosures');
    const items = section.querySelectorAll('li');
    expect(items).toHaveLength(1);
    expect(items[0].textContent).toBe(DISCLOSURE_COPY['not-a-bank']);
  });

  // -----------------------------------------------------------------------
  // AC7: Priority ordering — unsupported-region appears before risk-warning
  // -----------------------------------------------------------------------
  test('orders disclosures by priority', () => {
    mockUsePolicy.mockReturnValue(
      readyPolicy(['not-a-bank', 'risk-warning', 'unsupported-region']),
    );

    render(<PolicyDisclosure />);

    const items = screen.getByTestId('policy-disclosures').querySelectorAll('li');
    expect(items[0].getAttribute('data-disclosure-key')).toBe('unsupported-region');
    expect(items[1].getAttribute('data-disclosure-key')).toBe('risk-warning');
    expect(items[2].getAttribute('data-disclosure-key')).toBe('not-a-bank');
  });

  // -----------------------------------------------------------------------
  // AC8: Accessible heading is present
  // -----------------------------------------------------------------------
  test('includes an accessible heading', () => {
    mockUsePolicy.mockReturnValue(readyPolicy(['risk-warning']));

    render(<PolicyDisclosure />);

    const heading = screen.getByRole('heading', { name: /important disclosures/i });
    expect(heading).toBeDefined();
    expect(heading.className).toContain('sr-only');
  });

  test('uses synthetic-research copy without changing required keys or order', () => {
    const requiredKeys = [
      'pilot-program-terms',
      'not-a-bank',
      'risk-warning',
      'unsupported-region',
    ];
    mockUsePolicy.mockReturnValue(readyPolicy(requiredKeys));

    render(<PolicyDisclosure context="synthetic-research" />);

    const items = Array.from(
      screen.getByTestId('policy-disclosures').querySelectorAll('li'),
    );
    expect(items.map((item) => item.getAttribute('data-disclosure-key'))).toEqual([
      'unsupported-region',
      'risk-warning',
      'not-a-bank',
      'pilot-program-terms',
    ]);
    expect(items.map((item) => item.textContent)).toEqual([
      SYNTHETIC_RESEARCH_DISCLOSURE_COPY['unsupported-region'],
      SYNTHETIC_RESEARCH_DISCLOSURE_COPY['risk-warning'],
      SYNTHETIC_RESEARCH_DISCLOSURE_COPY['not-a-bank'],
      SYNTHETIC_RESEARCH_DISCLOSURE_COPY['pilot-program-terms'],
    ]);

    const combined = items.map((item) => item.textContent).join(' ');
    expect(combined).toContain('not a live service');
    expect(combined).toContain('No real money is held or moved');
    expect(combined).not.toMatch(
      /digital assets|afford to lose|insured by|government agency/i,
    );
  });
});
