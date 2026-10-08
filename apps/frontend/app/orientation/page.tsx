import type { Metadata } from 'next';
import Link from 'next/link';
import './plus-jakarta-sans.css';
import { SimulationDisplayCurrencySelector } from '../../components/SimulationDisplayCurrencySelector';
import { isSyntheticJourneyEnvironment } from '../../lib/state/synthetic-journey';
import {
  ORIENTATION_LOGO_SRC,
  ORIENTATION_SURFACE,
} from '../../lib/narrative/orientation-surface';
import { researchStyles as rs } from '../research/ResearchChrome';

export const metadata: Metadata = {
  title: ORIENTATION_SURFACE.documentTitle,
  description: ORIENTATION_SURFACE.disclosure.heading,
};

export default async function OrientationPage({
  searchParams,
}: {
  searchParams: Promise<{ study?: string }>;
}) {
  const surface = ORIENTATION_SURFACE;
  const studyEntry =
    isSyntheticJourneyEnvironment() &&
    (await searchParams).study === 'stability-scenarios';

  return (
    <div className={`hedgr-orientation-font ${rs.page}`}>
      <main
        data-testid="orientation-surface"
        className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-8 px-6 py-10 sm:py-16"
      >
        <header className="space-y-6">
          {/* Governed SVG mark: do not optimize or rewrite the approved asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- preserve the governed SVG without next/image transformation */}
          <img
            src={ORIENTATION_LOGO_SRC}
            alt={surface.logoAlt}
            height={40}
            className="h-10 w-auto"
          />
          <p className="text-sm font-medium tracking-wide text-hedgr-600">
            {surface.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-hedgr-800">
            {surface.title}
          </h1>
          {isSyntheticJourneyEnvironment() ? (
            <p className="text-sm font-medium text-hedgr-600">Simulation · no real money</p>
          ) : null}
        </header>

        <section
          data-testid="orientation-disclosure"
          aria-labelledby="orientation-disclosure-heading"
          className={`${rs.panel} text-hedgr-800`}
        >
          <h2 id="orientation-disclosure-heading" className="font-medium">
            {surface.disclosure.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            {surface.disclosure.body}
          </p>
          <p
            data-testid="orientation-data-boundary"
            className="mt-3 text-sm font-medium leading-relaxed"
          >
            {surface.dataBoundary}
          </p>
        </section>

        {isSyntheticJourneyEnvironment() ? (
          <SimulationDisplayCurrencySelector
            placement="entry"
            entryHelper={studyEntry
              ? 'Choose the currency used for Sarah’s fictional savings amounts. These are made-up amounts, not converted estimates. This choice does not mean Hedgr offers an account in that currency.'
              : undefined}
          />
        ) : null}

        {studyEntry ? (
          <p data-testid="stability-study-currency-note" className="text-sm leading-relaxed text-hedgr-700">
            The next page presents Sarah&apos;s fictional course-savings situation. Do not enter real financial information.
          </p>
        ) : null}

        <footer className={`${rs.rule} pt-8`}>
          <Link
            href={studyEntry ? '/research/stability-scenarios' : surface.continue.href}
            data-testid="orientation-continue"
            className={rs.primary}
          >
            {studyEntry ? 'Continue to Sarah’s example' : surface.continue.label}
          </Link>
        </footer>
      </main>
    </div>
  );
}
