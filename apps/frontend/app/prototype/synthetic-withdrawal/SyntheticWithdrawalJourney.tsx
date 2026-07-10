'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SyntheticTxExceptionNotice } from '../../../components';
import {
  SyntheticTxExceptionState,
  getSyntheticTxExceptionPresentation,
  type SyntheticTxExceptionState as SyntheticTxExceptionStateValue,
} from '../../../lib/tx';

const EXCEPTION_FIXTURE_STATES: SyntheticTxExceptionStateValue[] = [
  SyntheticTxExceptionState.PENDING,
  SyntheticTxExceptionState.MANUAL_REVIEW,
  SyntheticTxExceptionState.BLOCKED,
  SyntheticTxExceptionState.UNAVAILABLE,
  SyntheticTxExceptionState.FAILED,
  SyntheticTxExceptionState.CANCELLED,
];

const JOURNEY_STEPS = [
  {
    label: 'Research framing',
    detail: 'The journey is visibly synthetic and non-live.',
  },
  {
    label: 'Deny-by-default boundary',
    detail: 'Progression is unavailable because no rail or authority is connected.',
  },
  {
    label: 'Exception explanation',
    detail: 'A selected fixture explains why the journey cannot continue.',
  },
  {
    label: 'Safe exit',
    detail: 'The session ends without creating a transaction.',
  },
] as const;

export function SyntheticWithdrawalJourney() {
  const [selectedState, setSelectedState] =
    useState<SyntheticTxExceptionStateValue>(
      SyntheticTxExceptionState.UNAVAILABLE
    );
  const selectedPresentation =
    getSyntheticTxExceptionPresentation(selectedState);

  return (
    <div
      role="main"
      data-testid="synthetic-withdrawal-journey"
      data-synthetic="true"
      data-research-fixture-id={selectedPresentation.fixtureId}
      data-financial-state="none"
      className="min-h-screen bg-hedgr-100/30 text-hedgr-dark"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
        <header className="rounded-2xl border border-hedgr-200 bg-hedgr-white p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-hedgr-primary px-3 py-1 text-xs font-semibold text-hedgr-white">
              Closed-user research prototype
            </span>
            <span className="rounded-full border border-hedgr-300 bg-hedgr-100 px-3 py-1 text-xs font-semibold text-hedgr-800">
              Synthetic / non-live fixture
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hedgr-600">
              FE-TRUST-002 · UX trust testing
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-hedgr-800 sm:text-4xl">
              Synthetic withdrawal journey
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-hedgr-dark sm:text-base">
              This route tests how a withdrawal stop state is explained. It is not
              connected to a balance, provider, endpoint, rail, market, or money
              movement system.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-hedgr-300 bg-hedgr-100 p-4 text-sm leading-6 text-hedgr-800">
            <strong className="font-semibold">Research boundary:</strong> No
            funds can move from this prototype. Nothing shown here is a receipt,
            quote, payout estimate, provider commitment, or product-availability
            claim.
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="rounded-2xl border border-hedgr-200 bg-hedgr-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hedgr-600">
              Status before action
            </p>
            <h2 className="mt-2 text-xl font-semibold text-hedgr-800">
              Journey context
            </h2>

            <dl className="mt-5 divide-y divide-hedgr-200 border-y border-hedgr-200">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 py-3 text-sm">
                <dt className="font-medium text-hedgr-700">Amount</dt>
                <dd className="text-right text-hedgr-dark">No balance connected</dd>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 py-3 text-sm">
                <dt className="font-medium text-hedgr-700">Destination</dt>
                <dd className="text-right text-hedgr-dark">No endpoint selected</dd>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 py-3 text-sm">
                <dt className="font-medium text-hedgr-700">Fees and FX</dt>
                <dd className="text-right text-hedgr-dark">Not available in this fixture</dd>
              </div>
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-4 py-3 text-sm">
                <dt className="font-medium text-hedgr-700">Delivery timing</dt>
                <dd className="text-right text-hedgr-dark">No estimate available</dd>
              </div>
            </dl>

            <ol className="mt-6 space-y-4" aria-label="Synthetic journey steps">
              {JOURNEY_STEPS.map((step, index) => (
                <li key={step.label} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hedgr-300 bg-hedgr-100 text-xs font-semibold text-hedgr-700"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-hedgr-800">
                      {step.label}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-hedgr-dark">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-2xl border border-hedgr-200 bg-hedgr-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hedgr-600">
              Exception-state lab
            </p>
            <h2 className="mt-2 text-xl font-semibold text-hedgr-800">
              Choose a synthetic fixture
            </h2>
            <p className="mt-2 text-sm leading-6 text-hedgr-dark">
              These controls change research copy only. They do not create or
              modify a transaction.
            </p>

            <div
              className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3"
              role="tablist"
              aria-label="Synthetic exception fixture"
            >
              {EXCEPTION_FIXTURE_STATES.map((state) => {
                const fixture = getSyntheticTxExceptionPresentation(state);
                const isSelected = selectedState === state;
                return (
                  <button
                    key={state}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    data-research-control="true"
                    onClick={() => setSelectedState(state)}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hedgr-500 ${
                      isSelected
                        ? 'border-hedgr-primary bg-hedgr-primary text-hedgr-white'
                        : 'border-hedgr-200 bg-hedgr-white text-hedgr-700 hover:border-hedgr-400'
                    }`}
                  >
                    {fixture.label}
                  </button>
                );
              })}
            </div>

            <div
              data-testid="synthetic-withdrawal-fixture-trace"
              data-research-fixture-id={selectedPresentation.fixtureId}
              data-session-capture="research-fixture"
              className="mt-5 rounded-lg border border-hedgr-200 bg-hedgr-100 p-3 text-sm text-hedgr-800"
            >
              <p>
                <span className="font-semibold">Fixture:</span>{' '}
                <code className="text-xs font-semibold tracking-wide">
                  {selectedPresentation.fixtureId}
                </code>
              </p>
              <p className="mt-1 text-xs leading-5 text-hedgr-700">
                Stable research identifier for facilitator notes and session capture.
                It is not a transaction ID or financial record.
              </p>
            </div>

            <SyntheticTxExceptionNotice state={selectedState} className="mt-5" />

            <div className="mt-5 border-t border-hedgr-200 pt-5">
              <div
                role="status"
                aria-label="Transaction progression unavailable"
                data-transaction-control="unavailable"
                data-interactive="false"
                data-testid="synthetic-withdrawal-primary-action"
                className="w-full rounded-lg border border-hedgr-200 bg-hedgr-100 px-4 py-3 text-center"
              >
                <p className="text-sm font-semibold text-hedgr-800">
                  Continue unavailable
                </p>
                <p className="mt-1 text-xs leading-5 text-hedgr-700">
                  No transaction is available in this prototype.
                </p>
              </div>
              <p className="mt-3 text-center text-xs leading-5 text-hedgr-600">
                The fixture remains useful even if no Class B rail is approved.
              </p>
            </div>
          </section>
        </div>

        <aside className="mt-6 rounded-2xl border border-hedgr-300 bg-hedgr-100 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hedgr-600">
            Facilitator notes
          </p>
          <h2 className="mt-2 text-lg font-semibold text-hedgr-800">
            Closed-user session prompts
          </h2>
          <div
            data-testid="synthetic-withdrawal-comprehension-prompt"
            data-research-fixture-id={selectedPresentation.fixtureId}
            className="mt-4 rounded-lg border border-hedgr-300 bg-hedgr-white p-4"
          >
            <p className="text-sm font-semibold text-hedgr-800">
              {selectedPresentation.comprehensionPrompt}
            </p>
            <p className="mt-2 text-xs leading-5 text-hedgr-700">
              Listen for whether the participant distinguishes temporary review,
              permanent rejection, unsupported market, missing provider evidence,
              and an unavailable rail. Do not treat their answer as a market or
              provider decision.
            </p>
          </div>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-hedgr-dark md:grid-cols-3">
            <li>What made it clear that this was a research fixture?</li>
            <li>Was the reason for stopping understandable before any action?</li>
            <li>Which missing facts would you need before trusting a future path?</li>
          </ul>
          <p className="mt-5 border-t border-hedgr-300 pt-4 text-xs leading-5 text-hedgr-700">
            Session feedback is exploration evidence only. It does not authorize
            market selection, provider work, Class B progression, or customer-money
            activity.
          </p>
        </aside>

        <section className="mt-6 rounded-2xl border border-hedgr-200 bg-hedgr-white p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hedgr-600">
            Safe research exit
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-hedgr-dark">
            Ending this journey returns to the research prototype index. It writes
            no transaction, wallet, ledger, provider, rail, or backend state.
          </p>
          <Link
            href="/prototype?researchExit=synthetic-withdrawal"
            data-testid="end-research-journey"
            data-research-control="true"
            data-financial-action="false"
            className="mt-4 inline-flex rounded-lg border border-hedgr-primary bg-hedgr-white px-4 py-2.5 text-sm font-semibold text-hedgr-primary hover:bg-hedgr-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hedgr-500"
          >
            End research journey
          </Link>
        </section>

        <p className="mt-6 text-center text-xs text-hedgr-600">
          Prototype route only · not linked from production navigation · no live network
        </p>
      </div>
    </div>
  );
}

export default SyntheticWithdrawalJourney;
