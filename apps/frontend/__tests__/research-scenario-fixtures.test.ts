import { describe, expect, test } from 'vitest';
import {
  DANIEL_FIGURES,
  RESEARCH_CURRENCIES,
  SARAH_FIGURES,
  formatScenarioAmount,
  localFull,
  localPlural,
  localSingular,
  savingsCurrencyNames,
  scenarioTokens,
  type ScenarioCurrency,
} from '../lib/research/scenario-fixtures';
import { ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS } from '../lib/narrative/orientation-surface';

/** §7a locked copy that uses tokens; used to assert (h) slot placement. */
const DANIEL_HELD_NOW = '{held} in {localFull}.';
const DANIEL_AFTER_HEADING_V1 = 'After {localFull} weakened against the US dollar';
const DANIEL_USING_LOCALLY = 'If he used the dollar-linked portion in {localPlural}, what he’d actually receive would depend on how he accessed it, any costs, and the rate at the time. This example doesn’t set any of those.';
const DANIEL_WATCH_BEFORE = 'The dollar-linked portion is counted in US dollars, so its figure in {localPlural} can change when the exchange rate moves. Neither figure tells Daniel exactly what he would receive.';
const DANIEL_WATCH_AFTER_V1 = 'In this example, the dollar-linked portion is still USD 800. Because {localSingular} weakened, it now shows as a larger amount in {localPlural}. Why he keeps the reserve, and how he may add to it, haven’t changed. Neither figure tells Daniel exactly what he would receive if he used it.';

const REFERENCE_SPOT: Record<ScenarioCurrency, number> = {
  ZMW: 19.5,
  NGN: 1326,
  KES: 129.4,
  GHS: 11.61,
  PHP: 62.39,
};

/** Locked implied rates from §7a (never rendered). fee; D0, W, S */
const IMPLIED_RATES: Record<ScenarioCurrency, { fee: number; d0: number; w: number; s: number }> = {
  ZMW: { fee: 29.5, d0: 27, w: 29.5, s: 24.5 },
  NGN: { fee: 1770, d0: 1640, w: 1781, s: 1499 },
  KES: { fee: 156.4, d0: 152.9, w: 161.4, s: 144.4 },
  GHS: { fee: 14.75, d0: 14.69, w: 16.06, s: 13.31 },
  PHP: { fee: 53.1, d0: 50.5, w: 55.1, s: 45.9 },
};

const ROUND_UNIT: Record<ScenarioCurrency, number> = {
  ZMW: 1000,
  NGN: 10000,
  KES: 1000,
  GHS: 1000,
  PHP: 1000,
};

function parseFigure(value: string): number {
  return Number(value.replace(/,/g, ''));
}

function renderSlots(template: string, currency: ScenarioCurrency, extras: Record<string, string> = {}): string {
  const tokens = scenarioTokens(currency);
  return template
    .replaceAll('{localFull}', tokens.localFull)
    .replaceAll('{localPlural}', tokens.localPlural)
    .replaceAll('{localSingular}', tokens.localSingular)
    .replaceAll('{held}', extras.held ?? '')
    .replaceAll('{display}', extras.display ?? '');
}

function forbiddenHits(text: string): string[] {
  const lower = text.toLowerCase();
  const direct = ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS.filter((term) =>
    lower.includes(term.toLowerCase()),
  );
  const negated = ORIENTATION_FORBIDDEN_PARTICIPANT_TERMS.filter((term) =>
    new RegExp(`\\b(?:not|no|without|never)\\s+${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text),
  );
  return [...new Set([...direct, ...negated])];
}

describe('CLASS-A-VAL-002-RESEARCH-RESERVE-001 paired currency guard', () => {
  test('keeps Sarah’s name map byte-identical and aliases {localFull} to it', () => {
    expect(savingsCurrencyNames).toEqual({
      ZMW: 'kwacha',
      KES: 'Kenyan shillings',
      NGN: 'Nigerian naira',
      GHS: 'Ghanaian cedis',
      PHP: 'Philippine pesos',
    });
    expect(localFull).toBe(savingsCurrencyNames);
  });

  test('locks the §7a token table', () => {
    expect(localSingular).toEqual({
      ZMW: 'the kwacha',
      NGN: 'the naira',
      KES: 'the shilling',
      GHS: 'the cedi',
      PHP: 'the peso',
    });
    expect(localPlural).toEqual({
      ZMW: 'kwacha',
      NGN: 'naira',
      KES: 'shillings',
      GHS: 'cedis',
      PHP: 'pesos',
    });
  });

  test.each(RESEARCH_CURRENCIES)('paired guard (a)–(h) for %s', (currency) => {
    const sarah = SARAH_FIGURES[currency];
    const daniel = DANIEL_FIGURES[currency];
    const tokens = scenarioTokens(currency);

    // (a) same currency and tokens in one traversal
    expect(tokens.localFull).toBe(savingsCurrencyNames[currency]);
    expect(tokens.localName).toBe(savingsCurrencyNames[currency]);
    expect(formatScenarioAmount(currency, sarah.fee).startsWith(currency === 'ZMW' ? 'K' : `${currency} `)).toBe(true);
    expect(formatScenarioAmount(currency, daniel.held).startsWith(currency === 'ZMW' ? 'K' : `${currency} `)).toBe(true);

    // (b) implied rates inside one band (max/min ≤ 1.25) and ≥10% from reference spot
    const rates = Object.values(IMPLIED_RATES[currency]);
    const max = Math.max(...rates);
    const min = Math.min(...rates);
    expect(max / min).toBeLessThanOrEqual(1.25);
    const spot = REFERENCE_SPOT[currency];
    for (const rate of rates) {
      expect(Math.abs(rate - spot) / spot).toBeGreaterThanOrEqual(0.1);
    }

    // (c) no displayed figure shared across the cases
    const sarahAmounts = Object.values(sarah).map(parseFigure);
    const danielAmounts = [
      parseFigure(daniel.held),
      parseFigure(daniel.displayBefore),
      parseFigure(daniel.displayWeakened),
      parseFigure(daniel.displayStrengthened),
    ];
    for (const amount of sarahAmounts) {
      expect(danielAmounts).not.toContain(amount);
    }

    // (d) equal ± moves, not a round percentage
    const weakenedMove = parseFigure(daniel.displayWeakened) - parseFigure(daniel.displayBefore);
    const strengthenedMove = parseFigure(daniel.displayBefore) - parseFigure(daniel.displayStrengthened);
    expect(weakenedMove).toBe(strengthenedMove);
    expect(weakenedMove).toBeGreaterThan(0);
    const pct = (weakenedMove / parseFigure(daniel.displayBefore)) * 100;
    expect(Number.isInteger(pct)).toBe(false);

    // (e) no two displayed Daniel local figures sum to a round unit
    const unit = ROUND_UNIT[currency];
    for (let i = 0; i < danielAmounts.length; i += 1) {
      for (let j = i + 1; j < danielAmounts.length; j += 1) {
        expect((danielAmounts[i] + danielAmounts[j]) % unit).not.toBe(0);
      }
    }

    // (f) Sarah’s proportions A:M:P:F = 6:2:24:29.5
    const a = parseFigure(sarah.setAside);
    const m = parseFigure(sarah.monthly);
    const p = parseFigure(sarah.planned);
    const f = parseFigure(sarah.fee);
    expect(a / m).toBeCloseTo(3, 10);
    expect(p / m).toBeCloseTo(12, 10);
    expect(f / m).toBeCloseTo(14.75, 10);
    expect((a + p) / f).toBeCloseTo(1.017, 3);

    // (h) {localFull} in Held now and After heading; bare {localPlural} elsewhere
    expect(DANIEL_HELD_NOW).toContain('{localFull}');
    expect(DANIEL_HELD_NOW).not.toContain('{localPlural}');
    expect(DANIEL_AFTER_HEADING_V1).toContain('{localFull}');
    expect(DANIEL_AFTER_HEADING_V1).not.toContain('{localPlural}');
    expect(DANIEL_USING_LOCALLY).toContain('{localPlural}');
    expect(DANIEL_USING_LOCALLY).not.toContain('{localFull}');
    expect(DANIEL_WATCH_BEFORE).toContain('{localPlural}');
    expect(DANIEL_WATCH_BEFORE).not.toContain('{localFull}');
    expect(DANIEL_WATCH_AFTER_V1).toContain('{localSingular}');
    expect(DANIEL_WATCH_AFTER_V1).toContain('{localPlural}');
    expect(DANIEL_WATCH_AFTER_V1).not.toContain('{localFull}');

    const held = formatScenarioAmount(currency, daniel.held);
    const display = formatScenarioAmount(currency, daniel.displayBefore);
    const rendered = [
      renderSlots(DANIEL_HELD_NOW, currency, { held }),
      renderSlots('Shown as {display} in {localFull}, for illustration only. This is not a quote.', currency, { display }),
      renderSlots(DANIEL_AFTER_HEADING_V1, currency),
      renderSlots(DANIEL_USING_LOCALLY, currency),
      renderSlots(DANIEL_WATCH_BEFORE, currency),
      renderSlots(DANIEL_WATCH_AFTER_V1, currency),
    ].join('\n');
    expect(rendered).toContain(tokens.localFull);
    expect(rendered).toContain(tokens.localPlural);
    expect(rendered).toContain(tokens.localSingular);
  });

  test('new and changed locked strings stay off the orientation ban list and its negations', () => {
    const strings = [
      'Research example about a fictional person',
      'Here’s a second fictional example: Daniel, a salaried professional, and part of his savings. No real money is involved.',
      'This is the part of Daniel’s savings he keeps as a reserve. His other money isn’t shown.',
      'In this example, the dollar-linked portion is USD 800 before and after. Only the exchange rate changes.',
      'He may add more from future salary when he can. No fixed amount or schedule. Nothing he adds later is included here.',
      'Something to fall back on if his circumstances change, or to use if an opportunity comes up. When and how he’ll use it isn’t known yet.',
      'This example was written in advance by Hedgr, using only the facts about Daniel on this page. It isn’t generated automatically, and it doesn’t look at anyone’s real money.',
      'This example can’t predict the exchange rate, assume Daniel will add more, or say what he would receive if he used his reserve. The dollar-linked portion is part of Daniel’s fictional situation, and Hedgr plays no part in it in this example. This isn’t financial advice.',
      'This example was written in advance by Hedgr, using only the facts about Sarah on this page. It isn’t generated automatically, and it doesn’t look at anyone’s real money.',
      'Next: Daniel’s reserve',
      'Where things stand',
      'What happens',
      'What changed',
      'How you can tell',
      'This shows the same amount at two made-up exchange rates. No money is earned or exchanged, and it isn’t what you’d receive.',
      'A made-up example, shown today and 30 days later.',
      'The percentages show how the plan is divided in this example. No real money is split or moved.',
      'This is what happened in the example. It doesn’t tell you what will happen next.',
    ];
    for (const currency of RESEARCH_CURRENCIES) {
      strings.push(renderSlots(DANIEL_AFTER_HEADING_V1, currency));
      strings.push(renderSlots(DANIEL_USING_LOCALLY, currency));
      strings.push(renderSlots(DANIEL_WATCH_BEFORE, currency));
      strings.push(renderSlots(DANIEL_WATCH_AFTER_V1, currency));
    }
    for (const text of strings) {
      expect(forbiddenHits(text), text).toEqual([]);
    }
  });
});
