'use client';

import { TrustDisclosureBanner } from '../../../components';
import { getAuthMode } from '../../../lib/auth/mode';
import { getDefiMode } from '../../../lib/defi/mode';
import { getFxMode } from '../../../lib/fx';

export default function SettingsPage() {
  const authMode = getAuthMode();
  const defiMode = getDefiMode();
  const fxMode = getFxMode();
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';

  return (
    <main className="p-6 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {/* Trust & Risk Section */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Trust & Risk
        </h2>
        
        <TrustDisclosureBanner 
          variant="compact" 
          data-testid="settings-trust-disclosure"
        />

        <div className="rounded-xl border border-gray-200 p-4 space-y-4">
          <h3 className="font-medium text-gray-900">Environment Configuration</h3>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wide">App Environment</div>
              <div className="font-medium mt-1">{appEnv}</div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Authentication</div>
              <div className="font-medium mt-1 flex items-center gap-2">
                {authMode}
                {authMode === 'mock' && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">simulated</span>
                )}
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wide">DeFi Provider</div>
              <div className="font-medium mt-1 flex items-center gap-2">
                {defiMode}
                {defiMode === 'mock' && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">simulated</span>
                )}
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 uppercase tracking-wide">FX Rates</div>
              <div className="font-medium mt-1 flex items-center gap-2">
                {fxMode}
                {fxMode === 'fixed' && (
                  <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">simulated</span>
                )}
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 mt-4">
            <p>
              <strong>What does &quot;simulated&quot; mean?</strong>
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-500">
              <li><strong>Mock Auth:</strong> Login bypasses real identity verification</li>
              <li><strong>Mock DeFi:</strong> Yields are calculated locally, not from real protocols</li>
              <li><strong>Fixed FX:</strong> Exchange rates use a fixed value, not live market data</li>
            </ul>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          <a 
            href="/docs/trust" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Read our full Trust & Environment documentation →
          </a>
        </div>
      </section>

      {/* Placeholder for other settings sections */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Account
        </h2>
        <p className="text-gray-500 text-sm">Account settings coming soon.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Preferences
        </h2>
        <p className="text-gray-500 text-sm">Preference settings coming soon.</p>
      </section>
    </main>
  );
}

