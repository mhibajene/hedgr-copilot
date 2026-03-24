// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { EngineAllocationBands } from '../app/(app)/dashboard/EngineAllocationBands';
import { getMockEngineState } from '../lib/engine/mock';
import type { EngineState } from '../lib/engine/types';

function makeEngineState(overrides: Partial<EngineState> = {}): EngineState {
  return {
    ...getMockEngineState('normal'),
    ...overrides,
  };
}

afterEach(() => {
  cleanup();
});

describe('EngineAllocationBands', () => {
  test('renders the target posture labels and required supporting copy', () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    expect(screen.getByText('Target posture')).toBeDefined();
    expect(screen.getByText('Liquidity')).toBeDefined();
    expect(screen.getByText('Core allocation')).toBeDefined();
    expect(screen.getByText('Yield provision')).toBeDefined();
    const caption = screen.getByTestId('engine-allocation-bands-caption')
      .textContent;
    expect(caption).toMatch(/informational only/i);
    expect(caption).toMatch(/not your balances/i);
    expect(caption).toMatch(/ledger truth/i);
    expect(caption).toMatch(/yield cap/i);
    expect(caption).toMatch(/yield opportunity/i);
  });

  test('renders percentages from the supplied engine state', () => {
    render(
      <EngineAllocationBands
        engineState={makeEngineState({
          liquidityTargetPct: 42,
          coreTargetPct: 44,
          yieldCapPct: 14,
        })}
      />,
    );

    expect(
      screen.getByTestId('engine-allocation-band-liquidityTargetPct')
        .textContent,
    ).toContain('42%');
    expect(
      screen.getByTestId('engine-allocation-band-coreTargetPct').textContent,
    ).toContain('44%');
    expect(
      screen.getByTestId('engine-allocation-band-yieldCapPct').textContent,
    ).toContain('14%');
  });

  test('renders representative posture values without implying balances', () => {
    render(
      <EngineAllocationBands engineState={getMockEngineState('tightened')} />,
    );

    expect(
      screen.getByTestId('engine-allocation-band-liquidityTargetPct')
        .textContent,
    ).toContain('55%');
    expect(
      screen.getByTestId('engine-allocation-band-coreTargetPct').textContent,
    ).toContain('35%');
    expect(
      screen.getByTestId('engine-allocation-band-yieldCapPct').textContent,
    ).toContain('10%');
    expect(screen.queryByText(/available balance/i)).toBeNull();
    expect(screen.queryByText(/total \(incl\. pending\)/i)).toBeNull();
  });
});
