import React from 'react';
import Link from 'next/link';
import {
  CLASS_A_VAL_002_JOURNEY_PARAM,
  CLASS_A_VAL_002_JOURNEY_VALUE,
} from '../../../../lib/state/synthetic-journey';

type TrustPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TrustPage({ searchParams }: TrustPageProps) {
  const resolvedSearchParams = await searchParams;
  const journey = resolvedSearchParams[CLASS_A_VAL_002_JOURNEY_PARAM];
  const syntheticResearchJourney = Array.isArray(journey)
    ? journey.includes(CLASS_A_VAL_002_JOURNEY_VALUE)
    : journey === CLASS_A_VAL_002_JOURNEY_VALUE;
  const settingsHref = syntheticResearchJourney
    ? `/settings?${CLASS_A_VAL_002_JOURNEY_PARAM}=${CLASS_A_VAL_002_JOURNEY_VALUE}`
    : '/settings';

  return (
    <main
      data-testid="trust-information"
      className="mx-auto max-w-2xl space-y-7 px-6 pb-28 pt-6 sm:p-8"
    >
      <Link
        href={settingsHref}
        className="inline-flex min-h-11 items-center text-sm font-semibold text-hedgr-600 underline decoration-hedgr-200 underline-offset-4 hover:text-hedgr-primary"
      >
        Back to Settings
      </Link>

      <div className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600">
          Trust &amp; information
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-hedgr-800 sm:text-4xl">
          About this simulation
        </h1>
      </div>

      <section className="rounded-2xl border border-hedgr-100 bg-hedgr-100/20 p-5 text-hedgr-800 shadow-sm">
        <h2 className="text-base font-semibold">What is simulated</h2>
        <p className="mt-2 text-sm leading-relaxed text-hedgr-dark">
          Hedgr is currently using simulated information. Balances,
          transactions and returns shown here are not real. No real customer
          money is held or moved.
        </p>
      </section>

      <section className="border-y border-hedgr-100 py-5">
        <h2 className="text-base font-semibold text-hedgr-800">
          How this walkthrough works
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-hedgr-dark">
          Rates are fixed for this walkthrough, and no live financial service
          is connected. The selected country changes simulated currency display
          only.
        </p>
      </section>

      <section className="border-b border-hedgr-100 pb-5">
        <h2 className="text-base font-semibold text-hedgr-800">
          Your safety boundary
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-hedgr-dark">
          No financial account is opened, and nothing here is financial advice.
          Do not enter real personal or financial information.
        </p>
      </section>
    </main>
  );
}
