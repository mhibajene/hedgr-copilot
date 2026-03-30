// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { EngineAllocationBands } from '../app/(app)/dashboard/EngineAllocationBands';
import {
  ENGINE_STABILITY_EXPLAINER_FOOTER,
  ENGINE_STABILITY_EXPLAINER_INTRO,
  ENGINE_STABILITY_EXPLAINER_SUMMARY,
} from '../lib/engine/stability-explainer-copy';
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
  test('renders the target posture labels, caption, and trust legend', () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    expect(screen.getByText('Target posture')).toBeDefined();
    expect(
      within(
        screen.getByTestId('engine-allocation-band-liquidityTargetPct'),
      ).getByText('Available'),
    ).toBeDefined();
    expect(
      within(screen.getByTestId('engine-allocation-band-coreTargetPct')).getByText(
        'Core',
      ),
    ).toBeDefined();
    expect(
      within(screen.getByTestId('engine-allocation-band-yieldCapPct')).getByText(
        'Growth capacity',
      ),
    ).toBeDefined();

    expect(screen.getByTestId('engine-allocation-trust-legend')).toBeDefined();

    const caption = screen.getByTestId('engine-allocation-bands-caption')
      .textContent;
    expect(caption).toMatch(/balances.*availability/i);
    expect(caption).toMatch(/stability/i);
    expect(caption).toMatch(/room for returns/i);
    expect(caption).toMatch(/posture/i);

    const legend = screen.getByTestId('engine-allocation-trust-legend')
      .textContent;
    expect(legend).toMatch(/informational.*system targets/is);
    expect(legend).toMatch(/growth capacity/i);
    expect(legend).toMatch(/yield opportunity/i);
    expect(legend).toMatch(/ledger/i);
    expect(legend).toMatch(/target share/i);
    expect(legend).toMatch(/spendable balance/i);
    expect(legend).toMatch(/targets do not mean funds have already moved/i);
  });

  test('renders band microcopy at phrase level', () => {
    render(
      <EngineAllocationBands
        engineState={makeEngineState({
          liquidityTargetPct: 42,
          coreTargetPct: 44,
          yieldCapPct: 14,
        })}
      />,
    );

    const liquidityBand = screen.getByTestId(
      'engine-allocation-band-liquidityTargetPct',
    );
    expect(liquidityBand.textContent).toMatch(/ready to use/i);

    const coreBand = screen.getByTestId('engine-allocation-band-coreTargetPct');
    expect(coreBand.textContent).toMatch(/kept stable/i);
    expect(coreBand.textContent).toMatch(/preserve value/i);

    const growthBand = screen.getByTestId('engine-allocation-band-yieldCapPct');
    expect(growthBand.textContent).toMatch(/up to 14%/i);
    expect(growthBand.textContent).toMatch(/conditions allow/i);
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

  test('renders the stability explainer with governed copy and disclosure toggle', () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    const explainer = screen.getByTestId('engine-stability-explainer');
    expect(explainer).toBeDefined();
    expect(screen.getByText(ENGINE_STABILITY_EXPLAINER_SUMMARY)).toBeDefined();

    const body = screen.getByTestId('engine-stability-explainer-body');
    expect(body.textContent).toContain(ENGINE_STABILITY_EXPLAINER_INTRO);
    expect(body.textContent).toContain(ENGINE_STABILITY_EXPLAINER_FOOTER);
    expect(body.textContent).toMatch(/Available/);
    expect(body.textContent).toMatch(/Core/);
    expect(body.textContent).toMatch(/Growth capacity/);
    expect(body.textContent).toMatch(/informational/i);
    expect(body.textContent).toMatch(/ledger/i);

    const forbidden = [
      'your money is currently in',
      'funds are placed into',
      'the system has moved',
      'rebalance',
    ];
    for (const phrase of forbidden) {
      expect(body.textContent?.toLowerCase()).not.toContain(phrase);
    }

    fireEvent.click(screen.getByText(ENGINE_STABILITY_EXPLAINER_SUMMARY));
    expect(body).toBeDefined();
  });
});
