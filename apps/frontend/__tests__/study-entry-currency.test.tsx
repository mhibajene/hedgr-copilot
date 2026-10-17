// @vitest-environment jsdom
import React from 'react';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import OrientationPage from '../app/orientation/page';
import ScenarioStimulus from '../app/research/stability-scenarios/ScenarioStimulus';
import ReserveScenarioStimulus from '../app/research/reserve-scenario/ReserveScenarioStimulus';
import { SIMULATION_DISPLAY_CURRENCY_COPY } from '../lib/narrative/orientation-surface';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
HTMLElement.prototype.scrollIntoView = vi.fn();
const key = 'hedgr.simulation.display-currency';
const s3 = "The next page shows Sarah's fictional course fee. Do not enter real financial information.";
const d1 = 'All study amounts are shown in Zambian kwacha (ZMW) and US dollars. Participants do not choose a currency at study entry, so there is no currency to record.';
const source = (path: string) => readFileSync(resolve(__dirname, '..', path), 'utf8');
async function entry(study = true) {
  return render(await OrientationPage({ searchParams: Promise.resolve(study ? { study: 'stability-scenarios' } : {}) }));
}
beforeEach(() => {
  vi.stubEnv('NEXT_PUBLIC_AUTH_MODE', 'mock');
  vi.stubEnv('NEXT_PUBLIC_FX_MODE', 'stub');
  localStorage.clear();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });

test('E1 study-entry-no-selector', async () => {
  const view = await entry();
  expect(view.queryByTestId('simulation-display-currency-entry')).toBeNull();
  expect(view.queryByRole('combobox')).toBeNull();
});

test('E2 study-entry-no-choice-copy', async () => {
  const view = await entry();
  expect(view.container.textContent).not.toMatch(/Choose the currency|fictional savings amounts|not converted estimates|KES|NGN|GHS|PHP/);
});

test('E3 ordinary-orientation-unchanged', async () => {
  const view = await entry(false);
  expect(view.getByRole('combobox')).toBeTruthy();
  expect(view.container.querySelector('#simulation-display-currency-helper')?.textContent).toBe(SIMULATION_DISPLAY_CURRENCY_COPY.helper);
  expect(view.getByTestId('orientation-continue').getAttribute('href')).toBe('/dashboard-synthetic-journey?reset=1');
  expect(view.queryByTestId('stability-study-currency-note')).toBeNull();
});

test('E4 stored-value-preserved without entry preference reads or study writes', async () => {
  localStorage.setItem(key, 'KES');
  const reads = vi.spyOn(Storage.prototype, 'getItem');
  const writes = vi.spyOn(Storage.prototype, 'setItem');
  const view = await entry();
  expect(reads.mock.calls.filter(([name]) => name === key)).toEqual([]);
  view.unmount();
  for (const node of [<ScenarioStimulus key="sarah" />, <ReserveScenarioStimulus key="daniel" variant="1" />]) {
    const research = render(node);
    fireEvent.click(research.getByTestId('study-continue'));
    fireEvent.click(research.getByTestId('study-to-hedgr'));
    research.unmount();
  }
  expect(writes.mock.calls.filter(([name]) => name === key)).toEqual([]);
  expect(localStorage.getItem(key)).toBe('KES');
});

test.each(['NGN', 'KES', 'GHS', 'PHP'])('E6 research-zmw-only-from-entry under %s', async currency => {
  localStorage.setItem(key, currency);
  const view = await entry(); view.unmount();
  const sarah = render(<ScenarioStimulus />);
  expect(sarah.getByTestId('sarah-facts').textContent).toContain('ZMW 6,000.00');
  expect(sarah.container.textContent).not.toMatch(/NGN|KES|GHS|PHP/); sarah.unmount();
  const daniel = render(<ReserveScenarioStimulus variant="1" />);
  expect(daniel.container.textContent).toContain('ZMW 21,600.00');
  expect(daniel.container.textContent).not.toMatch(/NGN|KES|GHS|PHP/);
  expect(localStorage.getItem(key)).toBe(currency);
});

test('E7 s3-string-exact', async () => {
  const view = await entry();
  expect(view.getByTestId('stability-study-currency-note').textContent).toBe(s3);
  expect(view.container.textContent).not.toMatch(/presents|course-savings situation/);
});

test('E8 study-entry-no-currency-note', async () => {
  const view = await entry();
  expect(view.getByTestId('orientation-surface').textContent).not.toMatch(/ZMW|kwacha|USD|US dollar|KES|NGN|GHS|PHP|currency/i);
  const disclosure = view.getByTestId('orientation-disclosure');
  expect(disclosure.nextElementSibling?.getAttribute('data-testid')).toBe('stability-study-currency-note');
  expect(disclosure.nextElementSibling?.nextElementSibling?.tagName).toBe('FOOTER');
});

test('E9 protocol-line-10-exact and all other protocol bytes preserved', () => {
  const protocol = source('../../docs/ops/governance/mvp/HEDGR_STABILITY_STIMULUS_PROTOCOL.md');
  const lines = protocol.split('\n');
  expect(lines[9]).toBe(d1);
  expect(protocol).not.toMatch(/supplies only the denomination|Record the selected currency/);
  lines[9] = "The version 2 facts below are newly authored under §300. Sarah is a fictional person preparing to pay for a postgraduate course; no occupation, country or further biography is assumed. The selected simulation display currency supplies only the denomination of the fictional amounts. ZMW renders as K; KES, NGN, GHS and PHP render with ISO code. Each currency uses the same nominal 18,000/6,000/12,000/5,000/8,000 numbers and one-fact causal relations. This does **not** convert at the wallet's illustrative FX rates or claim equal purchasing power, market support, actual available deposits, currency exposure, or any link to wallet/ledger state. The selector's existing storage, fixed rates and ordinary journey meaning remain unchanged. Record the selected currency only to identify the exact displayed stimulus or diagnose orientation behaviour, not as a participant attribute by default.";
  expect(createHash('sha256').update(lines.join('\n')).digest('hex')).toBe('7a6ac50f8832dfdfc8fdb57928d4a2fbca507d6b8db2937dd2d1bab9852f2079');
});
// E5 Home/Deposit/Withdraw and E10 real keyboard/layout/axe are browser contracts
// in stability-scenarios.spec.ts; they exercise the rendered server route.
