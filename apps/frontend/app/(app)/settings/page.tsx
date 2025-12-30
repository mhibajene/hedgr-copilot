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

      {/* Account Section with Profile */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Account
        </h2>
        
        {profileLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600" />
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
          <div className="rounded-xl border border-gray-200 p-4 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Email</div>
                <div className="font-medium mt-1">{profile.email || '—'}</div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Display Name</div>
                <div className="font-medium mt-1 flex items-center gap-2">
                  {profile.name || (
                    <span className="text-gray-400 italic">Not set</span>
                  )}
                </div>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-500 uppercase tracking-wide">KYC Status</div>
                <div className="font-medium mt-1 flex items-center gap-2">
                  {profile.kycVerified ? (
                    <>
                      <span className="text-green-600">Verified</span>
                      <span className="text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded">complete</span>
                    </>
                  ) : (
                    <>
                      <span className="text-amber-600">Not verified</span>
                      <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">pending</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Incomplete profile notice */}
            {isProfileIncomplete && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <div className="flex items-start gap-2">
                  <svg className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Profile incomplete</p>
                    <p className="text-xs text-amber-700 mt-1">
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
        <h2 className="text-lg font-semibold text-gray-900 border-b pb-2">
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
