/** §382: denomination-only read, authorised only for this module/version. */
export const SARAH_CURRENCY_MATCH_ENGINE_VERSION = 'sarah-currency-match-v1' as const;

export type SarahCurrencyMatchInput = {
  savingsCurrency: 'ZMW';
  feeFixedCurrency: 'USD' | 'ZMW';
  priorFeeFixedCurrency?: 'USD' | 'ZMW';
  asOf?: string;
};

export type SarahCurrencyMatch = {
  engineVersion: typeof SARAH_CURRENCY_MATCH_ENGINE_VERSION;
  asOf?: string;
  savingsCurrency: 'ZMW';
  feeFixedCurrency: 'USD' | 'ZMW';
  relationship: 'different-currency' | 'same-currency';
  rateAffectsFeeLocalCost: boolean;
  framing: 'present-state' | 'changed-from-prior';
  explanation: string;
};

const P_USD = 'Sarah’s savings are in Zambian kwacha, while her course fee is fixed in US dollars. The fee’s kwacha cost depends on the example exchange rate.';
const P_ZMW = 'Sarah’s savings are in Zambian kwacha, and her course fee is fixed in the same currency. The fee’s kwacha cost does not depend on the example exchange rate.';
const C_ZMW = 'Sarah’s savings are in Zambian kwacha, and her course fee is now fixed in the same currency. The fee’s kwacha cost no longer depends on the example exchange rate.';

// sarah-read-v1's private observation semantics, kept local under the three-path scope.
function validCalendarDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return month >= 1 && month <= 12 && day >= 1 && day <= days[month - 1];
}

function validObservation(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}):(\d{2})(?::(\d{2})(?:\.\d+)?)?(Z|[+-](\d{2}):(\d{2}))$/.exec(value);
  return !!match && validCalendarDate(match[1]) && Number(match[2]) < 24 && Number(match[3]) < 60 &&
    Number(match[4] ?? 0) < 60 && Number(match[6] ?? 0) < 24 && Number(match[7] ?? 0) < 60 &&
    Number.isFinite(Date.parse(value));
}

export function computeSarahCurrencyMatch(input: SarahCurrencyMatchInput): SarahCurrencyMatch {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new RangeError();
  const prototype = Object.getPrototypeOf(input);
  if (prototype !== Object.prototype && prototype !== null) throw new RangeError();
  const allowedKeys = ['savingsCurrency', 'feeFixedCurrency', 'priorFeeFixedCurrency', 'asOf'];
  if (Reflect.ownKeys(input).some((key) => typeof key !== 'string' || !allowedKeys.includes(key))) {
    throw new RangeError();
  }
  const hasPrior = Object.prototype.hasOwnProperty.call(input, 'priorFeeFixedCurrency');
  const hasAsOf = Object.prototype.hasOwnProperty.call(input, 'asOf');
  const { savingsCurrency, feeFixedCurrency, priorFeeFixedCurrency, asOf } = input;
  if (savingsCurrency !== 'ZMW') throw new RangeError();
  if (feeFixedCurrency !== 'USD' && feeFixedCurrency !== 'ZMW') throw new RangeError();
  if (hasPrior && (priorFeeFixedCurrency !== 'USD' || feeFixedCurrency !== 'ZMW')) {
    throw new RangeError();
  }
  if (hasAsOf && !validObservation(asOf)) throw new RangeError();

  const differentCurrency = feeFixedCurrency === 'USD';
  return {
    engineVersion: SARAH_CURRENCY_MATCH_ENGINE_VERSION,
    ...(hasAsOf ? { asOf } : {}),
    savingsCurrency,
    feeFixedCurrency,
    relationship: differentCurrency ? 'different-currency' : 'same-currency',
    rateAffectsFeeLocalCost: differentCurrency,
    framing: hasPrior ? 'changed-from-prior' : 'present-state',
    explanation: hasPrior ? C_ZMW : differentCurrency ? P_USD : P_ZMW,
  };
}
