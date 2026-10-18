/**
 * MC-S2-020 — Market-data failure continuity baseline.
 * Four-part trust structure: unavailable → affects → still knowable → action limited.
 */

export type MarketDataContinuityRoute = 'deposit' | 'withdraw';

export interface MarketDataContinuityCopy {
  /** Short panel title — market / rate certainty missing */
  headline: string;
  /** Four calm lines in order: unavailable, affects, still knowable, limited action */
  lines: string[];
}

const DEPOSIT: MarketDataContinuityCopy = {
  headline: 'Exchange rate data is temporarily unavailable',
  lines: [
    "The example rate didn't load. This simulation uses a fixed example rate, not market data.",
    'That means we cannot show a reliable conversion between your local amount and USD.',
    'Confirm turns on once the example rate loads.',
  ],
};

const WITHDRAW: MarketDataContinuityCopy = {
  headline: 'Exchange rate data is temporarily unavailable',
  lines: [
    "The example rate didn't load. This simulation uses a fixed example rate, not market data.",
    'That means we cannot show a reliable local-currency estimate for your withdrawal while the rate is missing.',
    'You are still on Withdraw. Your simulated balance stays visible.',
    'Confirm turns on once the example rate loads.',
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
  'Confirm turns on once the example rate loads.';
