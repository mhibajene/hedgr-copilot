'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { TrustDisclosureBanner } from '../../components';
import { isCopilotEnabled } from '../../config/env';
import { usePolicy } from '@/lib/policy/usePolicy';
import {
  CLASS_A_VAL_002_DASHBOARD_PATH,
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
  getSyntheticJourneyHref,
  isSyntheticJourneyPrimaryCondition,
} from '@/lib/state/synthetic-journey';

// ---------------------------------------------------------------------------
// Nav-link type: `feature` ties the link to a policy flag; `shipped` guards
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

type SyntheticJourneyPath = Parameters<typeof getSyntheticJourneyHref>[0];

const SYNTHETIC_JOURNEY_ORIENTATION: Record<
  SyntheticJourneyPath,
  { context: string; heading: string; description: string }
> = {
  '/dashboard': {
    context: 'your position',
    heading: 'See where you stand',
    description:
      'Start with the current position and its evidence before choosing a next step.',
  },
  '/deposit': {
    context: 'first event',
    heading: 'Create the first comparison point',
    description:
      'Record the first simulated event so there is a position to compare.',
  },
  '/withdraw': {
    context: 'a visible change',
    heading: 'See what changes and what remains',
    description:
      'Record the simulated withdrawal, then compare it with the position that came before.',
  },
  '/activity': {
    context: 'the evidence',
    heading: 'Review the record of each change',
    description:
      'Activity shows what happened and the resulting position after each completed simulated event.',
  },
};

function isSyntheticJourneyPath(href: string): href is SyntheticJourneyPath {
  return ['/dashboard', '/deposit', '/withdraw', '/activity'].includes(href);
}

function navHref(href: string, syntheticJourneyActive: boolean): string {
  return syntheticJourneyActive && isSyntheticJourneyPath(href)
    ? getSyntheticJourneyHref(href)
    : href;
}

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { status, isFeatureEnabled } = usePolicy();
  const syntheticJourneyActive = isSyntheticJourneyPrimaryCondition(
    searchParams?.toString(),
    pathname
  );
  const explicitSyntheticJourney =
    syntheticJourneyActive &&
    (pathname === CLASS_A_VAL_002_DASHBOARD_PATH ||
      searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===
        CLASS_A_VAL_002_JOURNEY_VALUE);
  const activePathname =
    pathname === CLASS_A_VAL_002_DASHBOARD_PATH ? '/dashboard' : pathname;

  const journeySteps = [
    { href: '/dashboard' as const, label: 'Position' },
    { href: '/deposit' as const, label: 'First event' },
    { href: '/withdraw' as const, label: 'Change' },
    { href: '/activity' as const, label: 'Evidence' },
  ];
  const currentJourneyStepIndex = journeySteps.findIndex(
    (step) => activePathname === step.href
  );
  const currentJourneyStep =
    journeySteps[currentJourneyStepIndex] ?? journeySteps[0];
  const currentJourneyStepNumber =
    currentJourneyStepIndex >= 0 ? currentJourneyStepIndex + 1 : 1;
  const currentJourneyOrientation =
    SYNTHETIC_JOURNEY_ORIENTATION[currentJourneyStep.href];

  const copilotNavLinks: NavLink[] = isCopilotEnabled()
    ? [{ href: '/chat', label: 'Copilot', testId: 'nav-copilot-link' }]
    : [];

  const allNavLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/deposit', label: 'Deposit' },
    { href: '/withdraw', label: 'Withdraw' },
    { href: '/activity', label: 'Activity' },
    { href: '/settings', label: 'Settings' },
    // Policy-gated: flip shipped→true once each route is built
    {
      href: '/earn',
      label: 'Allocate',
      feature: 'earn',
      testId: 'nav-earn-link',
      shipped: false,
    },
    {
      href: '/paylinks',
      label: 'PayLinks',
      feature: 'payLinks',
      testId: 'nav-paylinks-link',
      shipped: false,
    },
    {
      href: '/send',
      label: 'Send',
      feature: 'stablecoinSend',
      testId: 'nav-send-link',
      shipped: false,
    },
    // Env-gated
    ...copilotNavLinks,
  ];

  const syntheticNavLinks: NavLink[] = [
    { href: '/dashboard', label: 'Home' },
    { href: '/activity', label: 'Activity' },
  ];

  // Hide unshipped links, and only show gated links once policy is ready.
  const navLinks = (
    explicitSyntheticJourney ? syntheticNavLinks : allNavLinks
  ).filter((link) => {
    if (link.shipped === false) return false;
    if (link.feature)
      return status === 'ready' && isFeatureEnabled(link.feature);
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TrustDisclosureBanner
        dismissible={!syntheticJourneyActive}
        consolidateTechnicalDetails={syntheticJourneyActive}
      />
      <nav
        data-testid="app-nav"
        className="border-b border-hedgr-100 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Mobile hamburger button */}
            <div className="flex items-center md:hidden">
              <button
                data-testid="nav-toggle"
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-md text-hedgr-500 hover:bg-hedgr-100 hover:text-hedgr-dark focus:outline-none focus:ring-2 focus:ring-inset focus:ring-hedgr-500"
                aria-expanded={isNavOpen}
                aria-controls="app-navigation-menu"
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
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
                    href={navHref(link.href, explicitSyntheticJourney)}
                    data-testid={link.testId}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      activePathname === link.href
                        ? 'border-hedgr-primary text-hedgr-dark'
                        : 'border-transparent text-hedgr-500 hover:border-hedgr-200 hover:text-hedgr-dark'
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
          id="app-navigation-menu"
          data-testid="nav-links-mobile"
          className={`${
            isNavOpen ? 'block' : 'hidden'
          } border-t border-hedgr-100 md:hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={navHref(link.href, explicitSyntheticJourney)}
                data-testid={link.testId}
                onClick={() => setIsNavOpen(false)}
                className={`flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium ${
                  activePathname === link.href
                    ? 'bg-hedgr-100 text-hedgr-primary'
                    : 'text-hedgr-500 hover:bg-gray-50 hover:text-hedgr-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {syntheticJourneyActive ? (
        <section
          aria-labelledby="synthetic-journey-heading"
          className="border-b border-hedgr-200 bg-white"
          data-testid="synthetic-journey-shell"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-hedgr-500">
                  {currentJourneyOrientation.context}
                </p>
                <p
                  id="synthetic-journey-heading"
                  className="mt-1 text-sm font-semibold text-hedgr-800"
                >
                  {currentJourneyOrientation.heading}
                </p>
                <p className="mt-1 hidden max-w-2xl text-sm leading-relaxed text-hedgr-dark lg:block">
                  {currentJourneyOrientation.description}
                </p>
              </div>
              <p
                className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-lg border border-hedgr-primary bg-hedgr-primary px-3 py-2 text-sm font-medium text-white"
                aria-label="Current journey step"
                data-testid="synthetic-journey-current-step"
              >
                <span aria-hidden="true">{currentJourneyStepNumber}</span>
                {currentJourneyStep.label}
              </p>
            </div>
          </div>
        </section>
      ) : null}
      {children}
    </div>
  );
}
