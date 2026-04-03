/**
 * MC-S2-020 — Market-data failure continuity baseline.
 * Four-part trust structure: unavailable → affects → still knowable → action limited.
 */

export type MarketDataContinuityRoute = 'deposit' | 'withdraw';

export interface MarketDataContinuityCopy {
  /** Short panel title — market / rate certainty missing */
  headline: string;
  /** Four calm lines in order: unavailable, affects, still knowable, limited action */
  lines: [string, string, string, string];
}

const DEPOSIT: MarketDataContinuityCopy = {
  headline: 'Exchange rate data is temporarily unavailable',
  lines: [
    'We could not load current market data for the exchange rate.',
    'That means we cannot show a reliable conversion between your local amount and USD.',
    'You are still on Deposit — your payment method and amount field stay here for context.',
    'Confirm stays off until a current rate is available; without it we will not show a dollar credit preview.',
  ],
};

const WITHDRAW: MarketDataContinuityCopy = {
  headline: 'Exchange rate data is temporarily unavailable',
  lines: [
    'We could not load current market data for the exchange rate.',
    'That means we cannot show a reliable local-currency estimate for your withdrawal while the rate is missing.',
    'You are still on Withdraw — your USD balance and payout methods stay visible.',
    'Confirm stays off until a current rate is available; without it we will not imply conversion certainty.',
  ],
};

export function getMarketDataContinuityCopy(
  route: MarketDataContinuityRoute,
): MarketDataContinuityCopy {
  return route === 'withdraw' ? WITHDRAW : DEPOSIT;
}

/** Join all user-visible continuity strings for anti-drift tests */
export function getMarketDataContinuityCopyJoined(route: MarketDataContinuityRoute): string {
  const { headline, lines } = getMarketDataContinuityCopy(route);
  return [headline, ...lines].join(' ');
}

/** Shown in the preview row whenever rate is missing (loading or error) — never assert $0 as FX-derived */
export const CONVERSION_PREVIEW_UNAVAILABLE_PLACEHOLDER =
  'Conversion preview unavailable until a current exchange rate is available.';
