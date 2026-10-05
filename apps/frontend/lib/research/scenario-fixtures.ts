import type { SimulationDisplayCurrency } from '../state/simulation-display-currency';

/** Sarah’s existing name map, moved byte-identical from ScenarioStimulus. */
export const savingsCurrencyNames = {
  ZMW: 'kwacha',
  KES: 'Kenyan shillings',
  NGN: 'Nigerian naira',
  GHS: 'Ghanaian cedis',
  PHP: 'Philippine pesos',
} as const;

/** `{localFull}` uses the same five renders already listed for Sarah’s `{localName}`. */
export const localFull = savingsCurrencyNames;

export const localSingular = {
  ZMW: 'the kwacha',
  NGN: 'the naira',
  KES: 'the shilling',
  GHS: 'the cedi',
  PHP: 'the peso',
} as const;

export const localPlural = {
  ZMW: 'kwacha',
  NGN: 'naira',
  KES: 'shillings',
  GHS: 'cedis',
  PHP: 'pesos',
} as const;

export const localFullSingular = {
  ZMW: 'the kwacha',
  NGN: 'the Nigerian naira',
  KES: 'the Kenyan shilling',
  GHS: 'the Ghanaian cedi',
  PHP: 'the Philippine peso',
} as const;

export const RESEARCH_CURRENCIES = ['ZMW', 'NGN', 'KES', 'GHS', 'PHP'] as const satisfies readonly SimulationDisplayCurrency[];

export type ScenarioCurrency = (typeof RESEARCH_CURRENCIES)[number];

export type SarahFigures = {
  setAside: string;
  monthly: string;
  planned: string;
  fee: string;
};

export type DanielFigures = {
  held: string;
  displayBefore: string;
  displayWeakened: string;
  displayStrengthened: string;
};

/** Locked §7a figure table. Numeric tokens only; prefixes are applied by `formatScenarioAmount`. */
export const SARAH_FIGURES: Record<ScenarioCurrency, SarahFigures> = {
  ZMW: { setAside: '6,000', monthly: '2,000', planned: '24,000', fee: '29,500' },
  NGN: { setAside: '360,000', monthly: '120,000', planned: '1,440,000', fee: '1,770,000' },
  KES: { setAside: '31,800', monthly: '10,600', planned: '127,200', fee: '156,350' },
  GHS: { setAside: '3,000', monthly: '1,000', planned: '12,000', fee: '14,750' },
  PHP: { setAside: '10,800', monthly: '3,600', planned: '43,200', fee: '53,100' },
};

export const DANIEL_FIGURES: Record<ScenarioCurrency, DanielFigures> = {
  ZMW: { held: '17,500', displayBefore: '21,600', displayWeakened: '23,600', displayStrengthened: '19,600' },
  NGN: { held: '1,063,000', displayBefore: '1,312,000', displayWeakened: '1,425,000', displayStrengthened: '1,199,000' },
  KES: { held: '99,300', displayBefore: '122,300', displayWeakened: '129,100', displayStrengthened: '115,500' },
  GHS: { held: '9,450', displayBefore: '11,750', displayWeakened: '12,850', displayStrengthened: '10,650' },
  PHP: { held: '32,800', displayBefore: '40,400', displayWeakened: '44,100', displayStrengthened: '36,700' },
};

export function formatScenarioAmount(currency: ScenarioCurrency, value: string): string {
  return currency === 'ZMW' ? `K${value}` : `${currency} ${value}`;
}

export function scenarioTokens(currency: ScenarioCurrency) {
  return {
    localSingular: localSingular[currency],
    localPlural: localPlural[currency],
    localFull: localFull[currency],
    localFullSingular: localFullSingular[currency],
    localName: savingsCurrencyNames[currency],
  };
}
