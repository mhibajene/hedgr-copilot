import { SYNTHETIC_JOURNEY_EXAMPLES } from '../state/synthetic-journey';
import { DANIEL_HOME_READ, DANIEL_HOME_TIMELINE, DANIEL_HOME_TIMELINE_INPUTS } from '../state/daniel-home-fixture';
import { SARAH_HOME_READ } from '../state/sarah-home-fixture';
import { formatLocalCurrency } from '../utils/money';

/** §398: read-only registry identities and facts; research never reads display preferences. */
export const SARAH_SCENARIO = SYNTHETIC_JOURNEY_EXAMPLES.find(example => example.id === 'sarah')!;
export const DANIEL_SCENARIO = SYNTHETIC_JOURNEY_EXAMPLES.find(example => example.id === 'daniel')!;
export const SARAH_OBSERVATION = SARAH_HOME_READ;
export const DANIEL_OBSERVATION = DANIEL_HOME_READ;

export function formatScenarioAmount(amount: number): string {
  return formatLocalCurrency(amount, 'ZMW');
}

export function formatScenarioUsd(amount: number, deposit = false): string {
  return `${deposit ? '+' : ''}$${amount.toFixed(2)}`;
}

export function formatScenarioDate(iso: string, short = false): string {
  const date = new Date(iso);
  if (short) {
    return `${date.getUTCDate()} ${new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' }).format(date)}`;
  }
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

export const DANIEL_READINGS = DANIEL_HOME_TIMELINE.map((read, index) =>
  `≈ ${formatScenarioAmount(read.localAmountZmwMinor / 100)} · ${formatScenarioDate(read.asOf, true)} · example rate ${DANIEL_HOME_TIMELINE_INPUTS[index].fixtureRateZmwPerUsd}`,
);
