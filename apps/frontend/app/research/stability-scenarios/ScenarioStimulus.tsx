'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  getSimulationDisplayCurrency,
  type SimulationDisplayCurrency,
} from '../../../lib/state/simulation-display-currency';

type Stage = 'a1' | 'a2' | 'hedgr' | 'bridge';

const savingsCurrencyNames = {
  ZMW: 'kwacha',
  KES: 'Kenyan shillings',
  NGN: 'Nigerian naira',
  GHS: 'Ghanaian cedis',
  PHP: 'Philippine pesos',
} as const;

export default function ScenarioStimulus() {
  const [stage, setStage] = useState<Stage>('a1');
  const stageHeading = useRef<HTMLHeadingElement>(null);
  const [currency, setCurrency] = useState<SimulationDisplayCurrency | null>(null);

  useEffect(() => {
    // Keep one fictional denomination for the entire traversal, even if another tab changes the preference.
    setCurrency(getSimulationDisplayCurrency());
  }, []);

  useEffect(() => {
    if (stage !== 'a1') stageHeading.current?.focus();
  }, [stage]);

  if (currency === null) {
    return <main data-testid="stability-stimulus" className="mx-auto min-h-screen max-w-3xl px-5 py-8 text-hedgr-dark sm:px-8 sm:py-12"><p role="status">Preparing the fictional example…</p></main>;
  }

  const savingsCurrencyName = savingsCurrencyNames[currency];
  const amount = (value: string) => currency === 'ZMW' ? `K${value}` : `${currency} ${value}`;

  return (
    <main data-testid="stability-stimulus" className="mx-auto min-h-screen max-w-3xl px-5 py-8 text-hedgr-dark sm:px-8 sm:py-12">
      <header className="space-y-3 border-b border-hedgr-200 pb-6">
        <p className="text-sm font-medium text-hedgr-600">Fictional research example · no real money</p>
        <h1 className="break-words text-xl font-semibold text-hedgr-800 sm:text-3xl">Sarah’s course savings</h1>
        <p data-testid="study-common-boundary" className="text-sm leading-relaxed text-hedgr-700">Only the information shown here is being considered. No response is entered or saved on this page.</p>
      </header>

      {stage === 'a1' || stage === 'a2' ? (
        <section aria-labelledby="sarah-facts-heading" data-testid="sarah-facts" className="mt-8 space-y-4 border border-hedgr-300 bg-hedgr-100 p-5">
          <h2 id="sarah-facts-heading" ref={stageHeading} tabIndex={-1} className="break-words text-base font-semibold sm:text-xl">
            {stage === 'a1' ? 'Sarah is saving for a postgraduate course.' : 'Sarah’s changed course fee'}
          </h2>
          <p className="text-sm text-hedgr-700">Situation on 1 October 2026</p>
          <p>Sarah already has {amount('6,000')} set aside. She plans to add {amount('2,000')} on the 15th of each month for the next 12 months, starting on 15 October 2026. Those contributions have not happened yet.</p>
          <p data-testid="course-fee">{stage === 'a1'
            ? 'The course costs USD 1,000. Payment is due in US dollars on 1 October 2027.'
            : `The provider now fixes the course fee at ${amount('29,500')} payable in ${currency === 'ZMW' ? 'Zambian kwacha' : savingsCurrencyName} on 1 October 2027, instead of USD 1,000 payable in US dollars.`}</p>
          {stage === 'a2' ? (
            <div data-testid="sarah-lived-caution" className="space-y-3 border-t border-hedgr-300 pt-4">
              <p>All other facts remain the same.</p>
              <p>Before this change, Sarah was saving in {savingsCurrencyName} for a fee due in US dollars — so growing local savings alone did not say how much of the USD fee they would cover.</p>
              <p>With the fee now fixed in {savingsCurrencyName}, that currency mismatch no longer applies. Whether her planned contributions happen, and whether what she has set aside will cover the fee by the due date, remain open.</p>
            </div>
          ) : null}
        </section>
      ) : null}

      {stage === 'a1' ? (
        <button type="button" data-testid="study-continue" onClick={() => setStage('a2')} className="mt-8 min-h-11 w-full bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue to the changed course fee</button>
      ) : null}

      {stage === 'a2' ? (
        <button type="button" data-testid="study-to-hedgr" onClick={() => setStage('hedgr')} className="mt-8 min-h-11 w-full bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue to how Hedgr would put this</button>
      ) : null}

      {stage === 'hedgr' ? (
        <section data-testid="study-hedgr-explanation" className="mt-8 space-y-5">
          <p className="text-sm text-hedgr-700">Still Sarah’s course-savings example.</p>
          <div className="space-y-4 break-words border border-hedgr-300 p-5">
            <h2 ref={stageHeading} tabIndex={-1} className="text-lg font-semibold sm:text-xl">How Hedgr would put this</h2>
            <p data-testid="study-attribution" className="text-sm font-medium leading-relaxed text-hedgr-700">This is an authored research example for Sarah’s fictional situation. It is not Hedgr reading your money, not Stability Engine output, and not a live financial assessment.</p>
            <div className="space-y-3">
              <p>Sarah is saving in {savingsCurrencyName} for a course priced in US dollars.</p>
              <p>Her savings can grow without that alone telling her how much of the USD course fee they will cover when payment is due.</p>
              <p>The relationship between the two currencies at that time also matters.</p>
              <p>When the fee is later stated in {savingsCurrencyName} instead, that particular currency mismatch no longer applies — but timing and whether planned contributions happen are still open.</p>
            </div>
            <p data-testid="study-limits" className="border-t border-hedgr-200 pt-4 text-sm leading-relaxed text-hedgr-700">This example cannot predict the future exchange rate, assume Sarah’s planned contributions will happen, or establish that the course will be fully funded. It is not financial advice.</p>
          </div>
          <button type="button" data-testid="study-to-bridge" onClick={() => setStage('bridge')} className="min-h-11 w-full bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue</button>
        </section>
      ) : null}

      {stage === 'bridge' ? (
        <section data-testid="study-bridge" className="mt-8 space-y-5">
          <h2 ref={stageHeading} tabIndex={-1} className="text-lg font-semibold sm:text-xl">You’ve reached the end of this research example.</h2>
          <p>Next is a simulated Hedgr experience using made-up money. No real money moves, no account is opened, and nothing here is financial advice.</p>
          <Link href="/dashboard-synthetic-journey" data-testid="study-simulation-link" className="inline-flex min-h-11 w-full items-center justify-center bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Continue to the Hedgr simulation</Link>
        </section>
      ) : null}

      <footer className="mt-12 text-sm text-hedgr-600">
        <Link href="/orientation?study=stability-scenarios" className="underline focus:outline-none focus:ring-2 focus:ring-hedgr-500">Review the introduction</Link>
      </footer>
    </main>
  );
}
