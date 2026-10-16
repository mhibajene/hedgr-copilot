// @vitest-environment jsdom
import React from 'react';
import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import * as fixtures from '../lib/research/scenario-fixtures';
import { SYNTHETIC_JOURNEY_EXAMPLES } from '../lib/state/synthetic-journey';
import { DANIEL_HOME_READ, DANIEL_HOME_TIMELINE } from '../lib/state/daniel-home-fixture';
import { SARAH_HOME_READ } from '../lib/state/sarah-home-fixture';
import { formatLocalCurrency } from '../lib/utils/money';
import { ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS } from '../lib/narrative/orientation-surface';
import ScenarioStimulus from '../app/research/stability-scenarios/ScenarioStimulus';
import ReserveScenarioStimulus from '../app/research/reserve-scenario/ReserveScenarioStimulus';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
HTMLElement.prototype.scrollIntoView = () => {};
afterEach(() => { cleanup(); localStorage.clear(); });

describe('RESEARCH-PAGES-REGISTRY-ALIGN-001 fixed ZMW guard', () => {
  test('keeps the registry identities without a second currency name map', () => {
    expect(fixtures.SARAH_SCENARIO).toBe(SYNTHETIC_JOURNEY_EXAMPLES.find(example => example.id === 'sarah'));
    expect(fixtures.DANIEL_SCENARIO).toBe(SYNTHETIC_JOURNEY_EXAMPLES.find(example => example.id === 'daniel'));
  });

  test('locks the registry and Home read formatting contract', () => {
    expect(fixtures.SARAH_OBSERVATION).toBe(SARAH_HOME_READ);
    expect(fixtures.DANIEL_OBSERVATION).toBe(DANIEL_HOME_READ);
    expect(fixtures.formatScenarioDate(SARAH_HOME_READ.asOf)).toBe('9 October 2026');
    expect(fixtures.formatScenarioDate(SARAH_HOME_READ.declaredFee.dueDate)).toBe('1 October 2027');
    expect(fixtures.DANIEL_READINGS).toEqual(DANIEL_HOME_TIMELINE.map((read, index) => [
      '≈ ZMW 19,600.00 · 9 Sep · example rate 24.5',
      '≈ ZMW 23,600.00 · 25 Sep · example rate 29.5',
      '≈ ZMW 21,600.00 · 9 Oct · example rate 27',
    ][index]));
  });

  test.each(['ZMW', 'NGN', 'KES', 'GHS', 'PHP'])('paired fixed-fact guard for %s', currency => {
    localStorage.setItem('hedgr.simulation.display-currency', currency);
    // The new fixed-fact contract replaces retired converted fees and planned contributions.
    expect(fixtures.formatScenarioAmount(6000)).toBe(formatLocalCurrency(6000, 'ZMW'));
    expect(fixtures.formatScenarioUsd(SARAH_HOME_READ.declaredFee.amount)).toBe('$1000.00');
    expect(fixtures.formatScenarioUsd(DANIEL_HOME_READ.declaredHolding.amount)).toBe('$800.00');
    expect(fixtures.DANIEL_READINGS).toHaveLength(DANIEL_HOME_TIMELINE.length);
    for (const [index, read] of DANIEL_HOME_TIMELINE.entries()) {
      expect(fixtures.DANIEL_READINGS[index]).toContain(formatLocalCurrency(read.localAmountZmwMinor / 100, 'ZMW'));
    }
    expect(localStorage.getItem('hedgr.simulation.display-currency')).toBe(currency);
    expect(fixtures).not.toHaveProperty('SARAH_FIGURES'); expect(fixtures).not.toHaveProperty('DANIEL_FIGURES');
  });

  test('new and changed locked strings stay off the orientation ban list and its negations', () => {
    for (const Component of [ScenarioStimulus, () => React.createElement(ReserveScenarioStimulus, { variant: '1' })]) {
      const view = render(React.createElement(Component));
      const corpus = [view.container.textContent!];
      fireEvent.click(view.getByTestId('study-continue')); corpus.push(view.container.textContent!);
      fireEvent.click(view.getByTestId('study-to-hedgr')); corpus.push(view.container.textContent!);
      for (const text of corpus) {
        for (const term of ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS) {
          expect(text.toLowerCase(), term).not.toContain(term.toLowerCase());
          const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          expect(text).not.toMatch(new RegExp(`\\b(?:not|no|without|never)\\s+${escaped}\\b`, 'i'));
        }
      }
      view.unmount();
    }
  });
});
