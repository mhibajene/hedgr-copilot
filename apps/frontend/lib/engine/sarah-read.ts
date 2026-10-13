import { DANIEL_FIXTURE_RATE_ZMW_PER_USD } from './daniel-read';

/** §372: one fictional declared fee at one explicit observation. */
export const SARAH_READ_ENGINE_VERSION = 'sarah-read-v1' as const;
export const SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD = DANIEL_FIXTURE_RATE_ZMW_PER_USD;

export type SarahReadInput = {
  declaredFee: { amount: number; currency: 'USD' | 'ZMW'; dueDate: string };
  fixtureRateZmwPerUsd: number;
  asOf: string;
};

export type SarahRead = {
  engineVersion: typeof SARAH_READ_ENGINE_VERSION;
  asOf: string;
  declaredFee: SarahReadInput['declaredFee'] & { source: 'user-declared'; access: 'read-only' };
  localAmountZmwMinor: number;
  localDisplay: string;
} & (
  | { rateBasis: { kind: 'example-rate'; zmwPerUsd: number }; explanation: { fee: string; rateAssumption: string; limits: string } }
  | { rateBasis: { kind: 'declared-zmw' }; explanation: { fee: string; limits: string; rateAssumption?: never } }
);

/** Independent example inputs; labels identify observations without combining their reads. */
export const SARAH_EXAMPLE_INPUTS: readonly { name: string; input: SarahReadInput }[] = [
  { name: 'U1', input: { declaredFee: { amount: 1000, currency: 'USD', dueDate: '2027-10-01' }, fixtureRateZmwPerUsd: 24.5, asOf: '2026-09-09T00:00:00.000Z' } },
  { name: 'U2', input: { declaredFee: { amount: 1000, currency: 'USD', dueDate: '2027-10-01' }, fixtureRateZmwPerUsd: 29.5, asOf: '2026-09-25T00:00:00.000Z' } },
  { name: 'U3', input: { declaredFee: { amount: 1000, currency: 'USD', dueDate: '2027-10-01' }, fixtureRateZmwPerUsd: SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD, asOf: '2026-10-09T00:00:00.000Z' } },
  { name: 'Z1', input: { declaredFee: { amount: 29500, currency: 'ZMW', dueDate: '2027-10-01' }, fixtureRateZmwPerUsd: 24.5, asOf: '2026-09-09T00:00:00.000Z' } },
  { name: 'Z2', input: { declaredFee: { amount: 29500, currency: 'ZMW', dueDate: '2027-10-01' }, fixtureRateZmwPerUsd: 29.5, asOf: '2026-09-25T00:00:00.000Z' } },
  { name: 'Z3', input: { declaredFee: { amount: 29500, currency: 'ZMW', dueDate: '2027-10-01' }, fixtureRateZmwPerUsd: SARAH_CURRENT_FIXTURE_RATE_ZMW_PER_USD, asOf: '2026-10-09T00:00:00.000Z' } },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const LIMITS = 'Fictional course fee. This figure is not a payment quote. This read does not establish whether Sarah can pay the fee.';

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

// Daniel's decimal-to-BigInt pattern, kept local to this separate fee contract.
function decimalFraction(value: number): [bigint, bigint] {
  const [mantissa, exponent = '0'] = value.toString().split('e');
  const [whole, fraction = ''] = mantissa.split('.');
  const scale = fraction.length - Number(exponent);
  const coefficient = BigInt(whole + fraction);
  return scale >= 0
    ? [coefficient, 10n ** BigInt(scale)]
    : [coefficient * 10n ** BigInt(-scale), 1n];
}

function formatNumber(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 20 });
}

export function computeSarahRead(input: SarahReadInput): SarahRead {
  if (!input || typeof input !== 'object' || !input.declaredFee || typeof input.declaredFee !== 'object') {
    throw new RangeError('An explicit declared fee is required.');
  }
  const { declaredFee: fee, fixtureRateZmwPerUsd, asOf } = input;
  if (!Number.isFinite(fee.amount) || fee.amount < 0 || (fee.currency !== 'USD' && fee.currency !== 'ZMW')) {
    throw new RangeError('Declared fee must be a finite non-negative USD or ZMW amount.');
  }
  if (!Number.isFinite(fixtureRateZmwPerUsd) || fixtureRateZmwPerUsd <= 0) {
    throw new RangeError('Fixture rate must be a finite positive number.');
  }
  if (!validCalendarDate(fee.dueDate)) {
    throw new RangeError('dueDate must be an explicit valid YYYY-MM-DD calendar date.');
  }
  if (!validObservation(asOf)) {
    throw new RangeError('asOf must be an explicit valid ISO timestamp with a timezone.');
  }
  const [a, aScale] = decimalFraction(fee.amount);
  const [r, rScale] = fee.currency === 'USD' ? decimalFraction(fixtureRateZmwPerUsd) : [1n, 1n];
  const denominator = aScale * rScale;
  const cents = (a * r * 100n * 2n + denominator) / (denominator * 2n);
  if (cents > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new RangeError('Local amount exceeds the safe-integer ngwee limit.');
  }
  const fraction = (cents % 100n).toString().padStart(2, '0');
  const localDisplay = `K${(cents / 100n).toLocaleString('en-US')}${fraction === '00' ? '' : `.${fraction}`}`;
  const [year, month, day] = fee.dueDate.split('-');
  const dueDate = `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
  const common = {
    engineVersion: SARAH_READ_ENGINE_VERSION,
    asOf,
    declaredFee: { amount: fee.amount, currency: fee.currency, dueDate: fee.dueDate, source: 'user-declared' as const, access: 'read-only' as const },
    localAmountZmwMinor: Number(cents),
    localDisplay,
  };
  return fee.currency === 'USD' ? {
    ...common,
    rateBasis: { kind: 'example-rate', zmwPerUsd: fixtureRateZmwPerUsd },
    explanation: {
      fee: `Course fee USD ${formatNumber(fee.amount)}, due ${dueDate}, shows as ${localDisplay} at this example rate.`,
      rateAssumption: `Example rate: ZMW ${formatNumber(fixtureRateZmwPerUsd)} per US dollar. Not a live rate.`,
      limits: LIMITS,
    },
  } : {
    ...common,
    rateBasis: { kind: 'declared-zmw' },
    explanation: {
      fee: `Course fee K${formatNumber(fee.amount)}, due ${dueDate}, is set in kwacha. The exchange rate does not change this declared amount.`,
      limits: LIMITS,
    },
  };
}
