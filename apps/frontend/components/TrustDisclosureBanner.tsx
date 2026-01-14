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
        className="rounded-xl bg-amber-50 border border-amber-200 p-4"
      >
        <div className="flex items-start gap-3">
          <span className="text-amber-600 text-lg" aria-hidden="true">⚠️</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-amber-900 text-sm">Simulation Environment</h3>
            <p className="text-amber-800 text-xs mt-1">
              This app is running with simulated data. Balances, yields, and transactions are not real.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {envBadges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    badge.isLive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {badge.label}: {badge.value}
                </span>
              ))}
            </div>
            {learnMoreUrl && (
              <a
                href={learnMoreUrl}
                className="inline-block mt-3 text-xs text-amber-700 underline hover:text-amber-900"
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
      className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xl flex-shrink-0" aria-hidden="true">🧪</span>
            <div className="min-w-0">
              <p className="font-semibold text-sm">
                Simulation Mode — No Real Money
              </p>
              <p className="text-xs opacity-90 mt-0.5">
                All balances, DeFi yields, and transactions are simulated. This environment uses mock data for testing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden sm:flex items-center gap-1.5">
              {envBadges.map((badge) => (
                <span
                  key={badge.label}
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    badge.isLive
                      ? 'bg-white/20 text-white'
                      : 'bg-white/30 text-white'
                  }`}
                  title={`${badge.label} mode: ${badge.value}`}
                >
                  {badge.label}: {badge.value}
                </span>
              ))}
              {marketSwitcherEnabled && currentMarket && (
                <select
                  value={currentMarket}
                  onChange={(e) => handleMarketChange(e.target.value as MarketCode)}
                  className="text-xs px-2 py-0.5 rounded bg-white/30 text-white font-medium border border-white/40 hover:bg-white/40 transition-colors"
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
                className="text-xs underline hover:no-underline whitespace-nowrap"
              >
                Learn more
              </a>
            )}
            {dismissible && (
              <button
                onClick={() => setDismissed(true)}
                className="text-white/80 hover:text-white p-1"
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

