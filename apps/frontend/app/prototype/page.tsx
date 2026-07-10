import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Research prototype index | Hedgr',
  description: 'Non-live, isolated Hedgr research prototypes.',
  robots: {
    index: false,
    follow: false,
  },
};

interface PrototypeIndexPageProps {
  searchParams: Promise<{
    researchExit?: string | string[];
  }>;
}

export default async function PrototypeIndexPage({
  searchParams,
}: PrototypeIndexPageProps) {
  const params = await searchParams;
  const researchExit = Array.isArray(params.researchExit)
    ? params.researchExit[0]
    : params.researchExit;
  const showExitConfirmation = researchExit === 'synthetic-withdrawal';

  return (
    <main className="min-h-screen bg-hedgr-100/30 px-4 py-8 text-hedgr-dark sm:px-6 lg:py-12">
      <div className="mx-auto max-w-4xl">
        <header className="rounded-2xl border border-hedgr-200 bg-hedgr-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-hedgr-primary px-3 py-1 text-xs font-semibold text-hedgr-white">
              Closed-user research
            </span>
            <span className="rounded-full border border-hedgr-300 bg-hedgr-100 px-3 py-1 text-xs font-semibold text-hedgr-800">
              Synthetic / non-live surface
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-hedgr-800 sm:text-4xl">
            Research prototype index
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 sm:text-base">
            These isolated routes support research and facilitator dry-runs only.
            They do not connect to balances, providers, rails, markets, or money
            movement.
          </p>
        </header>

        {showExitConfirmation ? (
          <section
            role="status"
            data-testid="research-exit-confirmation"
            data-financial-record="false"
            className="mt-6 rounded-2xl border border-hedgr-300 bg-hedgr-100 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hedgr-600">
              Research journey ended
            </p>
            <h2 className="mt-2 text-xl font-semibold text-hedgr-800">
              No money moved and no transaction was created.
            </h2>
            <p className="mt-2 text-sm leading-6 text-hedgr-dark">
              This is a research exit confirmation, not a receipt or financial
              record. No wallet, ledger, provider, rail, or backend state was written.
            </p>
          </section>
        ) : null}

        <section className="mt-6 rounded-2xl border border-hedgr-200 bg-hedgr-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hedgr-600">
            Available research journey
          </p>
          <h2 className="mt-2 text-xl font-semibold text-hedgr-800">
            Synthetic withdrawal journey
          </h2>
          <p className="mt-2 text-sm leading-6 text-hedgr-dark">
            Inspect six synthetic stop-state contracts with financial progression
            denied by default.
          </p>
          <Link
            href="/prototype/synthetic-withdrawal"
            className="mt-4 inline-flex rounded-lg border border-hedgr-primary bg-hedgr-white px-4 py-2.5 text-sm font-semibold text-hedgr-primary hover:bg-hedgr-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hedgr-500"
          >
            Open synthetic withdrawal research
          </Link>
        </section>

        <p className="mt-6 text-center text-xs text-hedgr-600">
          Prototype routes only · not linked from production navigation · no live
          network
        </p>
      </div>
    </main>
  );
}
