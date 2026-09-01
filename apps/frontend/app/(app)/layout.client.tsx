'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { TrustDisclosureBanner } from '../../components';
import { isCopilotEnabled } from '../../config/env';
import {
  CLASS_A_VAL_002_DASHBOARD_PATH,
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
  getSyntheticJourneyHref,
  isSyntheticJourneyPrimaryCondition,
} from '@/lib/state/synthetic-journey';

type NavLink = {
  href: string;
  label: string;
  testId?: string;
};

type SyntheticJourneyPath =
  | '/dashboard'
  | '/deposit'
  | '/withdraw'
  | '/activity';
type SyntheticNavigationPath = SyntheticJourneyPath | '/settings';

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

function isSyntheticNavigationPath(
  href: string
): href is SyntheticNavigationPath {
  return [
    '/dashboard',
    '/deposit',
    '/withdraw',
    '/activity',
    '/settings',
  ].includes(href);
}

function isSyntheticJourneyPath(
  href: string | null
): href is SyntheticJourneyPath {
  return (
    href !== null &&
    ['/dashboard', '/deposit', '/withdraw', '/activity'].includes(href)
  );
}

function navHref(href: string, syntheticJourneyActive: boolean): string {
  return syntheticJourneyActive && isSyntheticNavigationPath(href)
    ? getSyntheticJourneyHref(href)
    : href;
}

export function AppLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const syntheticJourneyEligible = isSyntheticJourneyPrimaryCondition(
    searchParams?.toString(),
    pathname
  );
  const explicitSyntheticJourney =
    syntheticJourneyEligible &&
    (pathname === CLASS_A_VAL_002_DASHBOARD_PATH ||
      searchParams?.get(CLASS_A_VAL_002_JOURNEY_PARAM) ===
        CLASS_A_VAL_002_JOURNEY_VALUE);
  const syntheticJourneyActive = explicitSyntheticJourney;
  const activePathname =
    pathname === CLASS_A_VAL_002_DASHBOARD_PATH ? '/dashboard' : pathname;
  const settingsActive = activePathname?.startsWith('/settings') ?? false;
  const isNavLinkActive = (href: string) =>
    activePathname === href || (href === '/settings' && settingsActive);
  const collapsedSyntheticMobileNav =
    explicitSyntheticJourney && !settingsActive;
  const trustInformationHref = explicitSyntheticJourney
    ? `/settings/trust?${CLASS_A_VAL_002_JOURNEY_PARAM}=${CLASS_A_VAL_002_JOURNEY_VALUE}`
    : '/settings/trust';

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

  const syntheticNavLinks: NavLink[] = [
    { href: '/dashboard', label: 'Home' },
    { href: '/settings', label: 'Settings' },
  ];

  const productNavLinks: NavLink[] = [
    ...syntheticNavLinks,
    ...copilotNavLinks,
  ];
  const navLinks = explicitSyntheticJourney
    ? syntheticNavLinks
    : productNavLinks;

  return (
    <div
      className={`min-h-screen bg-white ${
        explicitSyntheticJourney ? 'pb-16 md:pb-0' : ''
      }`}
    >
      <TrustDisclosureBanner
        dismissible={false}
        consolidateTechnicalDetails
        learnMoreUrl={trustInformationHref}
      />
      <nav
        data-testid="app-nav"
        className={`relative z-30 bg-white ${
          collapsedSyntheticMobileNav
            ? 'border-b-0 md:border-b md:border-hedgr-100'
            : 'border-b border-hedgr-100'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between ${
              collapsedSyntheticMobileNav ? 'h-0 md:h-16' : 'h-16'
            }`}
          >
            {/* Mobile hamburger button */}
            <div
              className={`md:hidden ${
                collapsedSyntheticMobileNav
                  ? 'absolute left-4 top-2 flex items-center'
                  : 'flex items-center'
              }`}
            >
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
              <div
                data-testid="nav-links"
                className="flex space-x-8"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={navHref(link.href, explicitSyntheticJourney)}
                    data-testid={link.testId}
                    className={`relative inline-flex items-center justify-center px-3 text-sm font-medium transition-colors md:border-b-2 md:px-1 md:pt-1 ${
                      isNavLinkActive(link.href)
                        ? 'text-hedgr-primary before:absolute before:top-1.5 before:h-1 before:w-6 before:rounded-full before:bg-hedgr-primary md:border-hedgr-primary md:text-hedgr-dark md:before:hidden'
                        : 'text-hedgr-500 hover:text-hedgr-dark md:border-transparent md:hover:border-hedgr-200'
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
          className={`${isNavOpen ? 'block' : 'hidden'} ${
            explicitSyntheticJourney
              ? 'absolute inset-x-0 top-14 z-50 border-y border-hedgr-100 bg-white shadow-sm'
              : 'border-t border-hedgr-100'
          } md:hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={navHref(link.href, explicitSyntheticJourney)}
                data-testid={link.testId}
                onClick={() => setIsNavOpen(false)}
                className={`flex min-h-11 items-center rounded-md px-3 py-2 text-base font-medium ${
                  isNavLinkActive(link.href)
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
      {explicitSyntheticJourney ? (
        <nav
          aria-label="Primary"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-hedgr-100 bg-white shadow-sm md:hidden"
          data-testid="synthetic-bottom-nav"
        >
          <div className="grid h-16 grid-cols-2 px-4">
            {syntheticNavLinks.map((link) => (
              <Link
                key={link.href}
                href={navHref(link.href, true)}
                className={`relative inline-flex min-h-11 items-start justify-center px-3 pt-4 text-sm font-medium transition-colors ${
                  isNavLinkActive(link.href)
                    ? 'text-hedgr-primary before:absolute before:top-1.5 before:h-1 before:w-6 before:rounded-full before:bg-hedgr-primary'
                    : 'text-hedgr-500 hover:text-hedgr-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
      {syntheticJourneyActive && isSyntheticJourneyPath(activePathname) ? (
        <section
          aria-labelledby="synthetic-journey-heading"
          className="border-b border-hedgr-100 bg-white"
          data-testid="synthetic-journey-shell"
        >
          <div
            className={`mx-auto max-w-7xl py-2 sm:px-6 lg:px-8 ${
              explicitSyntheticJourney ? 'pl-20 pr-6' : 'px-6'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-hedgr-500">
                  {currentJourneyOrientation.context}
                </p>
                <p
                  id="synthetic-journey-heading"
                  className="mt-0.5 text-sm font-semibold tracking-tight text-hedgr-800"
                >
                  {currentJourneyOrientation.heading}
                </p>
                <p className="mt-1 hidden max-w-2xl text-sm leading-relaxed text-hedgr-dark lg:block">
                  {currentJourneyOrientation.description}
                </p>
              </div>
              <p
                className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full border border-hedgr-100 bg-hedgr-100/30 px-3 py-2 text-xs font-semibold text-hedgr-600"
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
