'use client';

import { useState, useEffect } from 'react';
import { TrustDisclosureBanner } from '../../../components';
import { getAuthMode } from '../../../lib/auth/mode';
import { getDefiMode } from '../../../lib/defi/mode';
import { getFxMode } from '../../../lib/fx';
import { EmptyState, ErrorState } from '@hedgr/ui';

interface UserProfile {
  email?: string;
  name?: string;
  kycVerified?: boolean;
}

export default function SettingsPage() {
  const authMode = getAuthMode();
  const defiMode = getDefiMode();
  const fxMode = getFxMode();
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'dev';
  
  // Profile state
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      setProfileLoading(true);
      setProfileError(null);
      try {
        // Simulate fetching profile - in a real app this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 300));
        // Simulate a partially configured profile for demo
        setProfile({
          email: 'user@example.com',
          // name and kycVerified intentionally undefined to show incomplete state
        });
      } catch {
        setProfileError('Unable to load profile');
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const retryLoadProfile = () => {
    setProfileLoading(true);
    setProfileError(null);
    setTimeout(() => {
      setProfile({
        email: 'user@example.com',
      });
      setProfileLoading(false);
    }, 300);
  };

  // Check if profile is incomplete
  const isProfileIncomplete = profile && (!profile.name || !profile.kycVerified);

  return (
    <main className="mx-auto max-w-2xl space-y-8 px-6 pb-28 pt-6 sm:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-hedgr-800 sm:text-4xl">Settings</h1>

      {/* Trust & Risk Section */}
      <section className="space-y-4">
        <h2 className="border-b border-hedgr-100 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
          Trust & Risk
        </h2>
        
        <TrustDisclosureBanner 
          variant="compact" 
          data-testid="settings-trust-disclosure"
        />

        <div className="border-y border-hedgr-100 bg-white">
          <h3 className="py-4 font-semibold tracking-tight text-hedgr-800">Environment Configuration</h3>
          
          <div className="grid border-t border-hedgr-100 sm:grid-cols-2 sm:[&>*:nth-child(odd)]:border-r">
            <div className="border-b border-hedgr-100 py-3 sm:px-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">App Environment</div>
              <div className="mt-1 font-medium text-hedgr-800">{appEnv}</div>
            </div>
            
            <div className="border-b border-hedgr-100 py-3 sm:px-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">Authentication</div>
              <div className="mt-1 flex items-center gap-2 font-medium text-hedgr-800">
                {authMode}
                {authMode === 'mock' && (
                  <span className="rounded-full border border-hedgr-100 bg-white px-2 py-0.5 text-xs text-hedgr-600">simulated</span>
                )}
              </div>
            </div>
            
            <div className="border-b border-hedgr-100 py-3 sm:px-3 sm:border-b-0">
              <div className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">Yield source (simulated)</div>
              <div className="mt-1 flex items-center gap-2 font-medium text-hedgr-800">
                {defiMode}
                {defiMode === 'mock' && (
                  <span className="rounded-full border border-hedgr-100 bg-white px-2 py-0.5 text-xs text-hedgr-600">simulated</span>
                )}
              </div>
            </div>
            
            <div className="py-3 sm:px-3">
              <div className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">FX Rates</div>
              <div className="mt-1 flex items-center gap-2 font-medium text-hedgr-800">
                {fxMode}
                {fxMode === 'fixed' && (
                  <span className="rounded-full border border-hedgr-100 bg-white px-2 py-0.5 text-xs text-hedgr-600">simulated</span>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-hedgr-100 py-4 text-sm leading-relaxed text-hedgr-dark">
            <p>
              <strong>What does &quot;simulated&quot; mean?</strong>
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-hedgr-500">
              <li><strong>Mock Auth:</strong> Login bypasses real identity verification</li>
              <li><strong>Mock yield source:</strong> Returns are calculated locally, not from live protocols</li>
              <li><strong>Fixed FX:</strong> Exchange rates use a fixed value, not live market data</li>
            </ul>
          </div>
        </div>

        <div className="space-y-2 text-sm text-hedgr-500">
          <p>
            <a
              href="/settings/trust"
              className="font-semibold text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
            >
              View full disclosure →
            </a>
          </p>
          <a
            href="/docs/trust"
            className="font-semibold text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
          >
            Read our full Trust &amp; Environment documentation →
          </a>
        </div>
      </section>

      {/* Account Section with Profile */}
      <section className="space-y-4">
        <h2 className="border-b border-hedgr-100 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
          Account
        </h2>
        
        {profileLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-hedgr-600" />
          </div>
        ) : profileError ? (
          <ErrorState
            title="Unable to load profile"
            description="We couldn't fetch your account information. Please try again."
            primaryAction={{ label: 'Retry', onClick: retryLoadProfile }}
            className="py-6"
            data-testid="settings-profile-error"
          />
        ) : profile ? (
          <div className="border-y border-hedgr-100 bg-white">
            <div className="grid sm:grid-cols-2 sm:[&>*:nth-child(odd)]:border-r">
              <div className="border-b border-hedgr-100 py-3 sm:px-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">Email</div>
                <div className="mt-1 font-medium text-hedgr-800">{profile.email || '—'}</div>
              </div>
              
              <div className="border-b border-hedgr-100 py-3 sm:px-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">Display Name</div>
                <div className="mt-1 flex items-center gap-2 font-medium text-hedgr-800">
                  {profile.name || (
                    <span className="italic text-hedgr-400">Not set</span>
                  )}
                </div>
              </div>
              
              <div className="border-b border-hedgr-100 py-3 sm:border-b-0 sm:px-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">KYC Status</div>
                <div className="mt-1 flex items-center gap-2 font-medium text-hedgr-800">
                  {profile.kycVerified ? (
                    <>
                      <span className="text-hedgr-600">Verified</span>
                      <span className="rounded-full border border-hedgr-100 bg-white px-2 py-0.5 text-xs text-hedgr-600">complete</span>
                    </>
                  ) : (
                    <>
                      <span className="text-hedgr-600">Not verified</span>
                      <span className="rounded-full border border-hedgr-100 bg-white px-2 py-0.5 text-xs text-hedgr-600">pending</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Incomplete profile notice */}
            {isProfileIncomplete && (
              <div className="border-t border-hedgr-100 bg-hedgr-100/20 p-4 sm:col-span-2">
                <div className="flex items-start gap-2">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-hedgr-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-hedgr-800">Profile incomplete</p>
                    <p className="mt-1 text-xs leading-relaxed text-hedgr-500">
                      Complete your profile to unlock all features. Add your display name and verify your identity.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <EmptyState
            title="No profile data"
            description="Your profile information hasn't been set up yet."
            primaryAction={{ label: 'Set up profile', onClick: () => {} }}
            className="py-6"
            data-testid="settings-profile-empty"
          />
        )}
      </section>

      {/* Preferences Section */}
      <section className="space-y-4">
        <h2 className="border-b border-hedgr-100 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
          Preferences
        </h2>
        <EmptyState
          title="No preferences configured"
          description="Preference settings will be available soon. Check back later to customize your experience."
          icon={
            <svg
              className="h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          className="py-6"
          data-testid="settings-preferences-empty"
        />
      </section>
    </main>
  );
}
