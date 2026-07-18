'use client';

import { useState } from 'react';
import { getAuthMode } from '../lib/auth/mode';
import { getDefiMode } from '../lib/defi/mode';
import { getFxMode } from '../lib/fx';
import { 
  isMarketSwitcherEnabled, 
  useSelectedMarket,
  setMarket, 
  MARKET_CONFIG,
  type MarketCode 
} from '../config/market';

export type TrustDisclosureBannerProps = {
  /** Compact variant for inline/settings use */
  variant?: 'banner' | 'compact';
  /** Optional "Learn more" link URL */
  learnMoreUrl?: string;
  /** Allow dismissal (only for banner variant in non-production) */
  dismissible?: boolean;
  /** Test ID for e2e testing */
  'data-testid'?: string;
};

/**
 * Environment-aware trust disclosure banner.
 * 
 * In mock/dev/CI environments, displays a visible warning that:
 * - The app is running in simulation mode
 * - Funds, DeFi yields, and activity are simulated
 * - No real money is involved
 * 
 * The banner respects environment configuration and can be customized
 * for production use via config/env.
 */
export function TrustDisclosureBanner({
  variant = 'banner',
  learnMoreUrl = '/docs/trust',
  dismissible = false,
  'data-testid': testId = 'trust-disclosure-banner',
}: TrustDisclosureBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  // Get current environment modes
  const authMode = getAuthMode();
  const defiMode = getDefiMode();
  const fxMode = getFxMode();

  // Determine if we're in a simulated/mock environment
  const isSimulatedEnv = authMode === 'mock' || defiMode === 'mock' || fxMode === 'fixed';
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
  const isProduction = appEnv === 'prod';

  // In production with live integrations, show a different message or hide
  if (isProduction && !isSimulatedEnv) {
    return null;
  }

  if (dismissed && dismissible) {
    return null;
  }

  // Build environment status badges
  const envBadges = [
    { label: 'Auth', value: authMode, isLive: authMode !== 'mock' },
    { label: 'DeFi', value: defiMode, isLive: defiMode !== 'mock' },
    { label: 'FX', value: fxMode, isLive: fxMode !== 'fixed' },
  ];

  // Market switcher state (only if enabled)
  const marketSwitcherEnabled = isMarketSwitcherEnabled();
  const selectedMarket = useSelectedMarket();
  const currentMarket = marketSwitcherEnabled ? selectedMarket : null;

  const handleMarketChange = (newMarket: MarketCode) => {
    if (!marketSwitcherEnabled) return;
    setMarket(newMarket);
  };

  if (variant === 'compact') {
    return (
      <div
        data-testid={testId}
        className="rounded-xl border border-[#8391C9] bg-[#CAD0E8] p-4 text-[#171D35]"
      >
        <div className="flex items-start gap-3">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1F2747] text-xs font-semibold text-white"
            aria-hidden="true"
          >
            i
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#171D35]">Simulation environment</h3>
            <p className="mt-1 text-xs text-[#1F2937]">
              This app is running with simulated data. Balances, yields, and transactions are not real.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {envBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center rounded border border-[#A6B0D8] bg-white px-2 py-0.5 text-xs font-medium text-[#1F2747]"
                >
                  {badge.label}: {badge.value}
                </span>
              ))}
            </div>
            {learnMoreUrl && (
              <a
                href={learnMoreUrl}
                className="mt-3 inline-block text-xs font-medium text-[#1F2747] underline underline-offset-2 hover:text-[#36447C]"
              >
                Learn more about environments →
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div
      data-testid={testId}
      role="alert"
      className="border-b border-[#8391C9] bg-[#CAD0E8] text-[#171D35]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1F2747] text-xs font-semibold text-white"
              aria-hidden="true"
            >
              i
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-sm">
                Simulation Mode — No Real Money
              </p>
              <p className="mt-0.5 text-xs text-[#1F2937]">
                Balances and activity are local fixtures. A completed step does not mean a deposit, payout, or settlement occurred.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5">
              {envBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center rounded border border-[#A6B0D8] bg-white px-2 py-0.5 text-xs font-medium text-[#1F2747]"
                  title={`${badge.label} mode: ${badge.value}`}
                >
                  {badge.label}: {badge.value}
                </span>
              ))}
              {marketSwitcherEnabled && currentMarket && (
                <select
                  value={currentMarket}
                  onChange={(e) => handleMarketChange(e.target.value as MarketCode)}
                  className="rounded border border-[#A6B0D8] bg-white px-2 py-0.5 text-xs font-medium text-[#1F2747] transition-colors hover:border-[#8391C9]"
                  title="Demo market selection (affects currency display)"
                  data-testid="market-switcher"
                >
                  {Object.values(MARKET_CONFIG).map((market) => (
                    <option key={market.code} value={market.code} className="text-gray-900">
                      Market: {market.name} ({market.localCurrency})
                    </option>
                  ))}
                </select>
              )}
            </div>
            {learnMoreUrl && (
              <a
                href={learnMoreUrl}
                className="whitespace-nowrap text-xs font-medium text-[#1F2747] underline underline-offset-2 hover:text-[#36447C]"
              >
                Learn more
              </a>
            )}
            {dismissible && (
              <button
                onClick={() => setDismissed(true)}
                className="rounded p-1 text-[#36447C] hover:bg-white hover:text-[#171D35] focus:outline-none focus:ring-2 focus:ring-[#4658A0] focus:ring-offset-2 focus:ring-offset-[#CAD0E8]"
                aria-label="Dismiss trust disclosure"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrustDisclosureBanner;
