// @vitest-environment jsdom

import React from 'react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { EnginePostureHeader } from '../app/(app)/dashboard/EnginePostureHeader';
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
  });

  test('does not render a notice banner for normal posture', () => {
    render(<EnginePostureHeader engineState={getMockEngineState('normal')} />);

    expect(screen.queryByTestId('engine-posture-banner')).toBeNull();
  });

  test('renders the notice banner for a non-normal posture with notice copy', () => {
    render(<EnginePostureHeader engineState={getMockEngineState('tightening')} />);

    const banner = screen.getByTestId('engine-posture-banner');
    expect(banner).toBeDefined();
    expect(screen.getByText('Protection posture tightening')).toBeDefined();
    expect(
      screen.getByText(
        'Provisional notice: the engine is increasing liquidity targets while conditions remain under review.',
      ),
    ).toBeDefined();
  });

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
