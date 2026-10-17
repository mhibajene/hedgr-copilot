// @vitest-environment jsdom
import React from 'react';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import ScenarioStimulus from '../app/research/stability-scenarios/ScenarioStimulus';
import ReserveScenarioStimulus from '../app/research/reserve-scenario/ReserveScenarioStimulus';
import { ResearchBridge } from '../app/research/ResearchBridge';
import { SARAH_HOME_READ } from '../lib/state/sarah-home-fixture';
import { parseSyntheticJourneyExample, SYNTHETIC_JOURNEY_EXAMPLES } from '../lib/state/synthetic-journey';

(globalThis as typeof globalThis & { React: typeof React }).React = React;
HTMLElement.prototype.scrollIntoView = vi.fn();
afterEach(() => { cleanup(); localStorage.clear(); vi.doUnmock('../lib/state/synthetic-journey'); });

const source = (path: string) => readFileSync(resolve(__dirname, '..', path), 'utf8');
const runtimePaths = ['app/research/ResearchChrome.tsx', 'app/research/stability-scenarios/ScenarioStimulus.tsx', 'app/research/reserve-scenario/ReserveScenarioStimulus.tsx', 'app/research/stability-scenarios/page.tsx', 'app/research/reserve-scenario/page.tsx', 'lib/research/scenario-fixtures.ts'];
const boundary = 'This example uses the facts on this page and nothing else. No real money is involved. Nothing you do here is saved.';
const limits = 'This example does not predict exchange rates. It is not financial advice.';
const expected = {
  sarah: {
    1: 'Fictional example', 2: 'Sarah’s course fee',
    4: 'Sarah has a postgraduate course fee to pay.', 5: 'Situation on 9 October 2026',
    6: 'She deposited ZMW 4,000.00 on 14 April 2026 and ZMW 2,000.00 on 21 July 2026. She holds ZMW 6,000.00.',
    7: 'Her course fee is $1000.00 USD, due on 1 October 2027.',
    8: 'This read does not establish whether Sarah can pay the fee.', 9: 'Continue to the what-if',
    10: 'Example scenario', 11: 'What if the course provider took kwacha?',
    12: 'Imagine the provider offered to take payment in kwacha. How much kwacha it would ask for depends on terms the provider sets. This example does not set them.',
    13: 'Nothing else about Sarah changes in this scenario.', 14: 'Continue',
    16: 'What Hedgr helps Sarah see',
    17: 'Sarah holds kwacha. Her fee is in US dollars. The number of kwacha it takes to pay a US dollar fee changes when the exchange rate changes.',
    18: 'See Sarah’s example on Home',
    19: 'Hedgr wrote this example in advance, from the facts about Sarah on this page. It isn’t generated automatically. It doesn’t look at anyone’s real money.',
    20: limits, 21: 'Next: Daniel’s reserve', 22: 'Review the introduction',
  },
  daniel: {
    1: 'Fictional example', 2: 'Daniel’s reserve',
    4: 'Daniel keeps a reserve in US dollars.', 5: 'Situation on 9 October 2026',
    6: 'He deposited +$500.00 on 12 June 2026 and +$300.00 on 14 August 2026. He holds $800.00.',
    7: 'In kwacha, his reserve showed as:≈ ZMW 19,600.00 · 9 Sep · example rate 24.5≈ ZMW 23,600.00 · 25 Sep · example rate 29.5≈ ZMW 21,600.00 · 9 Oct · example rate 27Example figure, not a quote',
    8: 'He made two deposits and none since. Each kwacha figure uses the example rate for its date.', 9: 'Continue to the what-if',
    10: 'Example scenario', 11: 'What if Daniel needed kwacha?',
    12: 'Imagine Daniel needed kwacha from his reserve. What he would receive depends on how he takes it out, any costs and the rate on that day. This example does not set them.',
    13: 'Nothing else about Daniel changes in this scenario.', 14: 'Continue',
    16: 'What Hedgr helps Daniel see',
    17: 'Daniel’s reserve is counted in US dollars. Its kwacha figure changes when the exchange rate changes.',
    18: 'See Daniel’s example on Home',
    19: 'Hedgr wrote this example in advance, from the facts about Daniel on this page. It isn’t generated automatically. It doesn’t look at anyone’s real money.',
    20: limits, 21: 'Continue', 22: 'Review the introduction',
  },
};

function traverse(id: 'sarah' | 'daniel', variant: '1' | '2' = '1') {
  const view = render(id === 'sarah' ? <ScenarioStimulus /> : <ReserveScenarioStimulus variant={variant} />);
  const stages: string[][] = [];
  const slots: Record<string, string> = {};
  const record = () => {
    stages.push(Array.from(view.container.querySelectorAll('[data-slot]'), node => node.getAttribute('data-slot')!));
    for (const node of view.container.querySelectorAll('[data-slot]')) slots[node.getAttribute('data-slot')!] = node.textContent!;
  };
  record();
  fireEvent.click(view.getByTestId('study-continue')); record();
  fireEvent.click(view.getByTestId('study-to-hedgr')); record();
  return { ...view, slots, stages };
}

for (const id of ['sarah', 'daniel'] as const) {
  test(`${id === 'sarah' ? 'R1 sarah' : 'R2 daniel'}-slot-strings-exact`, () => {
    const view = traverse(id);
    expect(view.slots).toEqual(expected[id]);
    expect(view.slots[3]).toBeUndefined(); expect(view.slots[15]).toBeUndefined();
    const text = Object.values(view.slots).join('\n');
    expect(text).not.toMatch(/This page looks at|part of Daniel|1 October 2026|Example rate: ZMW|per US dollar|Not a live rate/);
    expect(view.getByTestId('study-common-boundary').textContent).toBe(boundary);
  });
}

test('R3 same-slot-order-both-pages', () => {
  const sarah = traverse('sarah'); const stages = sarah.stages; sarah.unmount();
  const daniel = traverse('daniel');
  expect(daniel.stages).toEqual(stages);
  expect(stages).toEqual([
    ['1','2','4','5','6','7','8','9','22'],
    ['1','2','10','11','12','13','14','22'],
    ['1','2','16','17','18','19','20','21','22'],
  ]);
  for (const path of runtimePaths.filter(path => path.endsWith('Stimulus.tsx'))) expect(source(path)).toContain('ResearchScenario');
});

test('R4 baselines-from-registry', async () => {
  const allSource = runtimePaths.map(source).join('\n');
  expect(allSource).toContain('SYNTHETIC_JOURNEY_EXAMPLES');
  expect(allSource).toContain('DANIEL_HOME_TIMELINE'); expect(allSource).toContain('SARAH_HOME_READ');
  expect(allSource).not.toMatch(/\b(?:4000|2000|6000|500|300|800|19600|23600|21600|1000)\b/);
  expect(Object.isFrozen(SYNTHETIC_JOURNEY_EXAMPLES)).toBe(true);
  const original = await import('../lib/state/synthetic-journey');
  vi.resetModules();
  vi.doMock('../lib/state/synthetic-journey', () => ({ ...original,
    SYNTHETIC_JOURNEY_EXAMPLES: Object.freeze(SYNTHETIC_JOURNEY_EXAMPLES.map(example => example.id === 'sarah'
      ? Object.freeze({ ...example, holding: Object.freeze({ ...example.holding, amount: 6101 }), deposits: Object.freeze(example.deposits.map((deposit, index) => Object.freeze({ ...deposit, amount: index ? 2102 : 4103 }))) })
      : Object.freeze({ ...example, deposits: Object.freeze(example.deposits.map((deposit, index) => Object.freeze({ ...deposit, amount: index ? 303 : 505 }))) }))),
  }));
  const Sarah = (await import('../app/research/stability-scenarios/ScenarioStimulus')).default;
  const SarahView = render(<Sarah />);
  expect(SarahView.container.textContent).toContain('ZMW 6,101.00');
  expect(SarahView.container.textContent).toContain('ZMW 4,103.00');
  expect(SarahView.container.textContent).toContain('ZMW 2,102.00'); SarahView.unmount();
  const Daniel = (await import('../app/research/reserve-scenario/ReserveScenarioStimulus')).default;
  const DanielView = render(<Daniel variant="1" />);
  expect(DanielView.container.textContent).toContain('+$505.00');
  expect(DanielView.container.textContent).toContain('+$303.00');
});

test('R5 home-links', () => {
  for (const id of ['sarah', 'daniel'] as const) {
    const view = traverse(id); const link = view.getByRole('link', { name: expected[id][18] });
    expect(link.getAttribute('href')).toBe(`/dashboard-synthetic-journey?example=${id}`);
    expect(parseSyntheticJourneyExample(link.getAttribute('href')!.split('?')[1])).toBe(id); view.unmount();
  }
});

test('R6 formats-usd-and-zmw', async () => {
  const fixtures = await import('../lib/research/scenario-fixtures');
  expect(fixtures.formatScenarioUsd(1000)).toBe('$1000.00');
  expect(fixtures.formatScenarioUsd(500, true)).toMatch(/^\+?\$\d+\.\d{2}( USD)?$/);
  expect(fixtures.formatScenarioAmount(6000)).toBe('ZMW 6,000.00');
  expect(source('lib/research/scenario-fixtures.ts')).toContain('formatLocalCurrency');
  expect(runtimePaths.map(source).join('\n')).not.toMatch(/K\d|USD 1,000|\bformatUsd\b/);
});

test('R7 say-each-figure-once', () => {
  for (const id of ['sarah', 'daniel'] as const) {
    const view = traverse(id); const text = Object.values(view.slots).join('\n');
    const tokens = id === 'sarah' ? ['ZMW 4,000.00', 'ZMW 2,000.00', 'ZMW 6,000.00', '$1000.00 USD']
      : ['+$500.00', '+$300.00', '$800.00', 'ZMW 19,600.00', 'ZMW 23,600.00', 'ZMW 21,600.00'];
    for (const token of tokens) expect(text.split(token).length - 1, token).toBe(1);
    view.unmount();
  }
});

test('R8 no-before-after-panels', () => {
  for (const path of runtimePaths) expect(source(path)).not.toMatch(/study-panel-before|study-panel-after|\bNew\b|PanelState|comparisonPanel|watchAfter|→/);
});

test('R9 chrome-eyebrow-and-boundary', () => {
  for (const id of ['sarah', 'daniel'] as const) {
    const view = traverse(id); expect(view.slots[1]).toBe('Fictional example');
    expect(view.getByTestId('study-common-boundary').textContent).toBe(boundary); view.unmount();
  }
  expect(source('app/research/ResearchChrome.tsx')).not.toMatch(/name\??:/);
  const orientation = source('app/orientation/page.tsx');
  const currentSelector = `{isSyntheticJourneyEnvironment() && !studyEntry ? (
          <SimulationDisplayCurrencySelector
            placement="entry"
          />
        ) : null}`;
  const retiredSelector = `{isSyntheticJourneyEnvironment() ? (
          <SimulationDisplayCurrencySelector
            placement="entry"
            entryHelper={studyEntry
              ? 'Choose the currency used for Sarah’s fictional savings amounts. These are made-up amounts, not converted estimates. This choice does not mean Hedgr offers an account in that currency.'
              : undefined}
          />
        ) : null}`;
  const currentNote = 'The next page shows Sarah&apos;s fictional course fee. Do not enter real financial information.';
  const retiredNote = 'The next page presents Sarah&apos;s fictional course-savings situation. Do not enter real financial information.';
  for (const snippet of [currentSelector, currentNote]) expect(orientation.split(snippet)).toHaveLength(2);
  for (const snippet of [retiredSelector, retiredNote]) expect(orientation).not.toContain(snippet);
  const reconstructed = orientation.replace(currentSelector, retiredSelector).replace(currentNote, retiredNote);
  expect(createHash('sha256').update(reconstructed).digest('hex')).toBe('240743dd1d450d070a5fda79192823d1e3c95dde5effcc121026869d17f0ed67');
  expect(createHash('sha256').update(source('app/research/ResearchBridge.tsx')).digest('hex')).toBe('ac5bb098c28657b0ccf6c43eefe3127666036800a2fe86db43f41972b0fb5bff');
  const bridge = render(<ResearchBridge />);
  expect(bridge.getByTestId('study-bridge').textContent).toBe('You’ve reached the end of this research example.Next, try Hedgr with pretend money. Add a simulated deposit, then see what changes and what remains. No real money moves, no account is opened, and nothing here is financial advice.Continue to the Hedgr simulation');
});

test('R10 v1-v2-same-page', () => {
  const one = traverse('daniel', '1'); const html = one.container.innerHTML; const stages = one.stages; one.unmount();
  const two = traverse('daniel', '2'); expect(two.container.innerHTML).toBe(html); expect(two.stages).toEqual(stages);
});

test.each(['ZMW','NGN','KES','GHS','PHP'])('R11 zmw-only under %s', currency => {
  localStorage.setItem('hedgr.simulation.display-currency', currency);
  for (const id of ['sarah', 'daniel'] as const) {
    const view = traverse(id); expect(view.slots).toEqual(expected[id]);
    expect(localStorage.getItem('hedgr.simulation.display-currency')).toBe(currency); view.unmount();
  }
});

test('R12 banned-phrases-absent', () => {
  for (const id of ['sarah', 'daniel'] as const) {
    const view = traverse(id);
    expect(Object.values(view.slots).join('\n')).not.toMatch(/\bonly\b|with Hedgr|dollar-linked portion|Hedgr plays no part|no longer changes|fully funded|planned|saving for|progress|sufficien|stability|protect|color|prioritiz|analyz/i);
    view.unmount();
  }
});

test('R13 fixture-fields-removed', () => {
  expect(source('lib/research/scenario-fixtures.ts')).not.toMatch(/\b(?:monthly|planned|fee|held)\s*:|`K\$|\bSARAH_FIGURES\b|\bDANIEL_FIGURES\b/);
});

test('R14 sarah-locked-line-byte-identical', () => {
  const view = traverse('sarah'); expect(view.slots[8]).toBe(expected.sarah[8]);
  expect(SARAH_HOME_READ.explanation.limits.endsWith(view.slots[8])).toBe(true);
  expect(view.slots[8]).not.toContain('Fictional course fee.'); expect(view.slots[8]).not.toContain('not a payment quote');
});

test('R15 daniel-note-matches-home', () => {
  const view = traverse('daniel'); expect(view.slots[8]).toBe(expected.daniel[8]);
  expect(source('app/(app)/dashboard/DanielExampleHome.tsx')).toContain(`>${view.slots[8]}</p>`);
});
