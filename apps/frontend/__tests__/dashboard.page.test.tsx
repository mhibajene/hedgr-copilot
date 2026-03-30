// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import type { EngineState } from '../lib/engine/types';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

vi.mock('../lib/hooks/useBalance', () => ({
  useBalance: vi.fn(),
}));

vi.mock('../lib/defi', () => ({
  defiAdapter: {
    getNetApy: vi.fn(() => Promise.resolve(0.05)),
  },
}));

vi.mock('../lib/state/ledger', () => ({
  useLedgerStore: vi.fn((selector: (state: { transactions: unknown[] }) => unknown) =>
    selector({ transactions: [] }),
  ),
}));

vi.mock('../lib/engine/useEngineState', () => ({
  useEngineState: vi.fn(),
}));

vi.mock('../lib/policy/usePolicy', () => ({
  usePolicy: vi.fn(() => ({
    isFeatureEnabled: vi.fn(() => false),
  })),
}));

vi.mock('../components', () => ({
  BalanceWithLocalEstimate: ({ usdAmount, ...props }: { usdAmount: number }) => (
    <div {...props}>{usdAmount}</div>
  ),
  PolicyDisclosure: () => <div data-testid="policy-disclosure" />,
}));

vi.mock('@hedgr/ui', () => ({
  EmptyState: ({ title, ...props }: { title: string }) => (
    <div {...props}>{title}</div>
  ),
  ErrorState: ({
    title,
    description,
    primaryAction,
    ...props
  }: {
    title: string;
    description: string;
    primaryAction?: unknown;
  }) => {
    void primaryAction;

    return (
      <div {...props}>
        <p>{title}</p>
        <p>{description}</p>
      </div>
    );
  },
}));

import DashboardPage from '../app/(app)/dashboard/page';
import { getMockEngineState } from '../lib/engine/mock';
import { useBalance } from '../lib/hooks/useBalance';
import { useEngineState } from '../lib/engine/useEngineState';

function makeBalanceState(overrides: Partial<ReturnType<typeof useBalance>> = {}) {
  return {
    total: 100,
    available: 100,
    pending: 0,
    isLoading: false,
    error: null,
    currency: 'USD',
    refresh: vi.fn(),
    ...overrides,
  };
}

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('DashboardPage engine trust surface', () => {
  test('mounts the engine posture header in the primary dashboard path', () => {
    vi.mocked(useBalance).mockReturnValue(makeBalanceState());
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState('tightening') as EngineState,
    );

    render(<DashboardPage />);

    expect(screen.getByTestId('engine-posture-badge')).toBeDefined();
    expect(screen.getByTestId('engine-posture-badge').textContent).toBe(
      'TIGHTENING',
    );
    expect(screen.getByTestId('engine-posture-banner')).toBeDefined();
    expect(screen.getByTestId('engine-allocation-bands')).toBeDefined();
    expect(screen.getByTestId('engine-stability-explainer')).toBeDefined();
    expect(screen.getByText('Protection posture tightening')).toBeDefined();
  });

  test('mounts the engine posture header in the balance error path', () => {
    vi.mocked(useBalance).mockReturnValue(
      makeBalanceState({ error: 'Unable to load balance' }),
    );
    vi.mocked(useEngineState).mockReturnValue(
      getMockEngineState('tightened') as EngineState,
    );

    render(<DashboardPage />);

    expect(screen.getByTestId('engine-posture-badge').textContent).toBe(
      'TIGHTENED',
    );
    expect(screen.getByTestId('engine-posture-banner')).toBeDefined();
    expect(screen.getByTestId('engine-allocation-bands')).toBeDefined();
    expect(screen.getByTestId('engine-stability-explainer')).toBeDefined();
    expect(screen.getByTestId('dashboard-error-state')).toBeDefined();
  });
});
