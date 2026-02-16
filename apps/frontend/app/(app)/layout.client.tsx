'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrustDisclosureBanner } from '../../components';
import { isCopilotEnabled } from '../../config/env';
import { usePolicy } from '@/lib/policy/usePolicy';

// ---------------------------------------------------------------------------
// Nav-link type — `feature` ties the link to a policy flag; `shipped` guards
// links whose routes have not been built yet (deny-by-default).
// ---------------------------------------------------------------------------

type NavLink = {
  href: string;
  label: string;
  feature?: 'earn' | 'payLinks' | 'stablecoinSend';
  testId?: string;
  /** Set to `false` for gated links whose route does not exist yet. */
  shipped?: boolean;
};

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { status, isFeatureEnabled } = usePolicy();

  const allNavLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/deposit', label: 'Deposit' },
    { href: '/withdraw', label: 'Withdraw' },
    { href: '/activity', label: 'Activity' },
    { href: '/settings', label: 'Settings' },
    // Policy-gated — flip shipped→true once each route is built
    { href: '/earn', label: 'Earn', feature: 'earn', testId: 'nav-earn-link', shipped: false },
    { href: '/paylinks', label: 'PayLinks', feature: 'payLinks', testId: 'nav-paylinks-link', shipped: false },
    { href: '/send', label: 'Send', feature: 'stablecoinSend', testId: 'nav-send-link', shipped: false },
    // Env-gated
    ...(isCopilotEnabled() ? [{ href: '/chat', label: 'Copilot', testId: 'nav-copilot-link' }] : []),
  ];

  // Hide unshipped links, and only show gated links once policy is ready.
  const navLinks = allNavLinks.filter((link) => {
    if (link.shipped === false) return false;
    if (link.feature) return status === 'ready' && isFeatureEnabled(link.feature);
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TrustDisclosureBanner dismissible />
      <nav data-testid="app-nav" className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Mobile hamburger button */}
            <div className="flex items-center md:hidden">
              <button
                data-testid="nav-toggle"
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded={isNavOpen}
                aria-label="Toggle navigation menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {isNavOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex">
              <div data-testid="nav-links" className="flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={link.testId}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      pathname === link.href
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav menu */}
        <div
          data-testid="nav-links-mobile"
          className={`${isNavOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={link.testId}
                onClick={() => setIsNavOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
