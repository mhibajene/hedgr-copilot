'use client';

import React, { useState } from 'react';
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
  /** Keep technical environment labels behind an accessible disclosure control */
  consolidateTechnicalDetails?: boolean;
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
  learnMoreUrl = '/settings/trust',
  dismissible = false,
  consolidateTechnicalDetails = false,
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
        className="rounded-2xl border border-hedgr-100 bg-hedgr-100/20 p-4 text-hedgr-800 shadow-sm"
      >
        <div className="flex items-start gap-3">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-hedgr-primary text-xs font-semibold text-white"
            aria-hidden="true"
          >
            i
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-hedgr-800">Simulation environment</h3>
            <p className="mt-1 text-xs leading-relaxed text-hedgr-dark">
              Hedgr is currently using simulated information. Balances,
              transactions and returns shown here are not real. No real customer
              money is held or moved.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {envBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center rounded-full border border-hedgr-100 bg-white px-2 py-0.5 text-xs font-medium text-hedgr-600"
                >
                  {badge.label}: {badge.value}
                </span>
              ))}
            </div>
            {learnMoreUrl && (
              <a
                href={learnMoreUrl}
                className="mt-3 inline-block text-xs font-semibold text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
              >
                Learn more about this simulation →
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
      role={consolidateTechnicalDetails ? 'region' : 'alert'}
      aria-label={
        consolidateTechnicalDetails ? 'Simulation disclosure' : undefined
      }
      className="border-b border-hedgr-100 bg-hedgr-100/20 text-hedgr-800"
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          consolidateTechnicalDetails ? 'py-1' : 'py-3'
        }`}
      >
        <div className={`flex items-center justify-between gap-2 sm:gap-4 ${consolidateTechnicalDetails ? 'flex-nowrap' : 'flex-wrap'}`}>
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <span
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-hedgr-200 bg-white text-[10px] font-bold text-hedgr-primary sm:h-6 sm:w-6 sm:text-xs"
              aria-hidden="true"
            >
              i
            </span>
            <div className="min-w-0">
              <p className="whitespace-nowrap text-[11px] font-semibold sm:text-sm">
                {consolidateTechnicalDetails
                  ? 'Simulation · no real money'
                  : 'Simulation Mode. No Real Money'}
              </p>
              {!consolidateTechnicalDetails ? (
                <p className="mt-0.5 text-xs text-hedgr-dark">
                  Every balance, rate, deposit, withdrawal, and Activity entry is
                  simulated. A completed step does not move money or contact a
                  bank or payment provider.
                </p>
              ) : null}
            </div>
          </div>
          <div className={consolidateTechnicalDetails ? 'w-auto flex-shrink-0' : 'flex items-center gap-3 flex-shrink-0'}>
            {consolidateTechnicalDetails ? (
              <details data-testid="simulation-technical-details" className="group">
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center whitespace-nowrap text-xs font-semibold text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 marker:content-none sm:text-sm [&::-webkit-details-marker]:hidden">
                  How this simulation works
                </summary>
                <div className="mt-3 space-y-3 rounded-2xl border border-hedgr-100 bg-white p-4 shadow-sm">
                  <p className="max-w-xl text-sm leading-relaxed text-hedgr-dark">
                    Rates are fixed for this walkthrough, and no live financial
                    service is connected. The selected country changes simulated
                    currency display only.
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    {marketSwitcherEnabled && currentMarket && (
                      <select
                        value={currentMarket}
                        onChange={(e) => handleMarketChange(e.target.value as MarketCode)}
                        className="min-h-11 rounded border border-hedgr-200 bg-white px-2 py-1 text-sm font-medium text-hedgr-primary transition-colors hover:border-hedgr-300"
                        title="Simulation currency display"
                        aria-label="Simulation currency display"
                        data-testid="market-switcher"
                      >
                        {Object.values(MARKET_CONFIG).map((market) => (
                          <option key={market.code} value={market.code} className="text-gray-900">
                            Currency display: {market.name} ({market.localCurrency})
                          </option>
                        ))}
                      </select>
                    )}
                    {learnMoreUrl && (
                      <a
                        href={learnMoreUrl}
                        className="inline-flex min-h-11 items-center whitespace-nowrap text-sm font-medium text-hedgr-primary underline underline-offset-2 hover:text-hedgr-600"
                      >
                        Learn more
                      </a>
                    )}
                  </div>
                </div>
              </details>
            ) : (
              <>
                <div className="hidden sm:flex items-center gap-1.5">
                  {envBadges.map((badge) => (
                    <span
                      key={badge.label}
                      className="inline-flex items-center rounded border border-hedgr-200 bg-white px-2 py-0.5 text-xs font-medium text-hedgr-primary"
                      title={`${badge.label} mode: ${badge.value}`}
                    >
                      {badge.label}: {badge.value}
                    </span>
                  ))}
                  {marketSwitcherEnabled && currentMarket && (
                    <select
                      value={currentMarket}
                      onChange={(e) => handleMarketChange(e.target.value as MarketCode)}
                      className="rounded border border-hedgr-200 bg-white px-2 py-0.5 text-xs font-medium text-hedgr-primary transition-colors hover:border-hedgr-300"
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
                    className="whitespace-nowrap text-xs font-medium text-hedgr-primary underline underline-offset-2 hover:text-hedgr-600"
                  >
                    Learn more
                  </a>
                )}
              </>
            )}
            {dismissible && (
              <button
                onClick={() => setDismissed(true)}
                className="rounded p-1 text-hedgr-600 hover:bg-white hover:text-hedgr-800 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 focus:ring-offset-hedgr-100"
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
