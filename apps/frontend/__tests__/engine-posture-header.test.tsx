// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { EnginePostureHeader } from '../app/(app)/dashboard/EnginePostureHeader';
import { ENGINE_POSTURE_CONTEXT } from '../lib/engine/posture-context';
import { getMockEngineState } from '../lib/engine/mock';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('EnginePostureHeader', () => {
  test.each([
    ['normal', 'NORMAL'],
    ['tightening', 'TIGHTENING'],
    ['tightened', 'TIGHTENED'],
    ['recovery', 'RECOVERY'],
  ] as const)('renders the %s posture badge', (posture, label) => {
    render(<EnginePostureHeader engineState={getMockEngineState(posture)} />);

    const badge = screen.getByTestId('engine-posture-badge');
    expect(badge.getAttribute('data-posture')).toBe(posture);
    expect(badge.textContent).toBe(label);
    expect(screen.getByTestId('engine-posture-context').textContent).toBe(
      ENGINE_POSTURE_CONTEXT[posture],
    );
  });

  test('does not render a notice banner for normal posture', () => {
    render(<EnginePostureHeader engineState={getMockEngineState('normal')} />);

    expect(screen.queryByTestId('engine-posture-banner')).toBeNull();
  });

  test('uses a human question and answer instead of formal posture chrome in the participant journey', () => {
    render(
      <EnginePostureHeader
        engineState={getMockEngineState('normal')}
        syntheticJourneyActive
      />,
    );

    expect(screen.getByText('Does anything need attention?')).toBeDefined();
    expect(
      screen.getByTestId('engine-simulation-attention-answer').textContent,
    ).toBe('No important change shown');
    expect(screen.getByTestId('engine-posture-context').textContent).toBe(
      'The simulated position is within its expected range.',
    );
    expect(screen.queryByTestId('engine-posture-badge')).toBeNull();
    expect(screen.queryByText('NORMAL')).toBeNull();
    expect(screen.queryByTestId('engine-posture-action-guidance')).toBeNull();
  });

  test('does not render a notice banner for normal posture even if notice is present', () => {
    const engineState = {
      ...getMockEngineState('normal'),
      notice: { title: 'Stray', body: 'Should not display for normal.' },
    };

    render(<EnginePostureHeader engineState={engineState} />);

    expect(screen.queryByTestId('engine-posture-banner')).toBeNull();
  });
  test.each(['tightening', 'tightened', 'recovery'] as const)(
    'renders the notice banner through the shipped engine state path for %s posture',
    (posture) => {
      const engineState = getMockEngineState(posture);

      render(<EnginePostureHeader engineState={engineState} />);

      const banner = screen.getByTestId('engine-posture-banner');
      expect(banner).toBeDefined();
      expect(banner.getAttribute('role')).toBe('status');
      expect(screen.getByText(engineState.notice!.title)).toBeDefined();
      expect(screen.getByText(engineState.notice!.body)).toBeDefined();
    },
  );

  test('warns and does not invent a banner when a non-normal posture lacks notice copy', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const engineState = { ...getMockEngineState('tightened'), notice: undefined };

    render(<EnginePostureHeader engineState={engineState} />);

    expect(screen.queryByTestId('engine-posture-banner')).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      '[EnginePostureHeader] Missing EngineState.notice for posture "tightened"',
    );
  });
});
