'use client';

import React from 'react';
import Link from 'next/link';
import { getEnvironmentMode } from '../../../../lib/env/mode';

const BADGE_STYLE =
  'inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200';

export default function TrustPage() {
  const mode = getEnvironmentMode();
  const modeLabel = mode === 'mock' ? 'Mock' : mode === 'stub' ? 'Stub' : 'Live';

  return (
    <main className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          href="/settings"
          className="text-sm text-slate-600 hover:text-slate-900"
        >
          ← Settings
        </Link>
      </div>

      <h1 className="text-2xl font-semibold text-gray-900">
        Trust &amp; Risk
      </h1>

      {/* Section 1 — Who holds my funds? */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Who holds my funds?
        </h2>
        {mode === 'mock' || mode === 'stub' ? (
          <p className="text-gray-700">
            In this environment, no real funds are moved. Hedgr is operating in{' '}
            {mode} mode for development and testing.
          </p>
        ) : (
          <p className="text-gray-700">
            In live mode, Hedgr does not directly custody user funds. Custody
            disclosures will reflect the active integration.
          </p>
        )}
      </section>

      {/* Section 2 — Environment */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          Environment
        </h2>
        <div className="flex items-center gap-2">
          <span className={BADGE_STYLE} data-testid="environment-badge">
            {modeLabel}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          {mode === 'mock' && (
            <>
              Mock means authentication and flows are simulated. No real
              identity or financial integrations are used.
            </>
          )}
          {mode === 'stub' && (
            <>
              Stub means rates and data are fixed or simulated. No live market
              or custody connections.
            </>
          )}
          {mode === 'live' && (
            <>
              Live means real integrations for rates and, when configured,
              custody. Use only in intended production environments.
            </>
          )}
        </p>
      </section>

      {/* Section 3 — What Hedgr Controls */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          What Hedgr Controls
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Allocation logic and rebalancing rules</li>
          <li>Stability Engine behaviour (parameters and thresholds)</li>
          <li>Risk modeling and exposure limits</li>
        </ul>
      </section>

      {/* Section 4 — What Hedgr Does Not Control */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
          What Hedgr Does Not Control
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>External custodians and their policies</li>
          <li>Network conditions and third-party availability</li>
          <li>Third-party infrastructure (e.g. DeFi protocols, oracles)</li>
        </ul>
      </section>
    </main>
  );
}
