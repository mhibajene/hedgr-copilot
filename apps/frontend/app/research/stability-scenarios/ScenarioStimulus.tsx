'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSimulationDisplayCurrency } from '../../../lib/state/simulation-display-currency';

type CaseId = 'S0' | 'S1' | 'S2' | 'S3';

const variants = {
  S1: 'The payment changes',
  S2: 'The money becomes available later',
  S3: 'One amount is unknown',
} as const;

export default function ScenarioStimulus() {
  const [caseId, setCaseId] = useState<CaseId>('S0');
  const [revealed, setRevealed] = useState(false);
  const currency = useSimulationDisplayCurrency();
  const money = (amount: number) => currency === 'ZMW'
    ? `K${amount.toLocaleString('en-US')}`
    : `${currency} ${amount.toLocaleString('en-US')}`;
  const variant = caseId === 'S0' ? null : variants[caseId];

  const changed = caseId === 'S1'
    ? `Sarah learns that the course payment will be ${money(8000)} instead of ${money(5000)}. Everything else stays the same.`
    : caseId === 'S2'
      ? `The ${money(6000)} Sarah expected to have today will become available on Day 12, after the course payment is due. The payment is still ${money(5000)}. Everything else stays the same.`
      : caseId === 'S3'
        ? 'Sarah still has a course payment due on Day 10, but the amount she needs to pay is unknown. Everything else stays the same.'
        : null;

  const conclusion = caseId === 'S1'
    ? `The supplied money available before Day 10 is ${money(2000)} short of this payment: ${money(8000)} − ${money(6000)}. The ${money(12000)} available on Day 20 cannot cover this deadline in the example.`
    : caseId === 'S2'
      ? 'None of the supplied money is available by the Day 10 deadline. This one payment is not covered by the supplied resources at that time, although the stated total has not changed.'
      : caseId === 'S3'
        ? 'Whether this payment is covered cannot be determined. Its amount is needed to answer the Day 10 question.'
        : `Sarah has enough of the supplied money available today to cover this ${money(5000)} payment by Day 10. ${money(6000)} − ${money(5000)} leaves ${money(1000)} after only this payment.`;

  const limit = caseId === 'S1'
    ? 'Another timely source or an extension could change the answer, but neither is supplied. This does not establish Sarah’s overall financial position or tell her to move money.'
    : caseId === 'S2'
      ? 'Day 12 is a fictional access assumption, not a promise. No other timely source is supplied. This does not establish a loss or Sarah’s wider financial position.'
      : caseId === 'S3'
        ? 'Unknown does not mean zero or that her situation has worsened. No gap, remainder or overall position can be calculated.'
        : `The ${money(12000)} is not available until Day 20. Other needs and resources are unknown. The ${money(1000)} is not free money or a recommendation to pay.`;

  function resetToReference() {
    setCaseId('S0');
    setRevealed(false);
  }

  return (
    <main data-testid="stability-stimulus" className="mx-auto min-h-screen max-w-3xl px-5 py-8 text-hedgr-dark sm:px-8 sm:py-12">
      <header className="space-y-3 border-b border-hedgr-200 pb-6">
        <p className="text-sm font-medium text-hedgr-600">Research prototype · fictional example</p>
        <h1 className="break-words text-xl font-semibold text-hedgr-800 sm:text-3xl">Sarah’s course payment</h1>
        <p className="leading-relaxed">Sarah is preparing to pay for a postgraduate course. These made-up amounts use the selected {currency} currency for this example; they are not exchange-rate estimates. No real money moves, and nothing here is financial advice.</p>
      </header>

      <section aria-labelledby="reference-heading" className="mt-8 space-y-4 border border-hedgr-300 bg-hedgr-100 p-5">
        <h2 id="reference-heading" className="break-words text-base font-semibold sm:text-xl">Sarah’s situation</h2>
        <p>Sarah has {money(18000)} set aside for her course. {money(6000)} is available today. The other {money(12000)} becomes available on Day 20. A {money(5000)} course payment is due on Day 10.</p>
        <p className="text-sm">Only this payment and the money shown are considered. Other money, expenses and options are unknown. The payment can be made from money available by its deadline without a fee in this fictional example.</p>
      </section>

      <section aria-labelledby="case-heading" data-testid="scenario-case" className="mt-8 space-y-5">
        <div>
          <p className="text-sm font-medium text-hedgr-600">Fictional example</p>
          <h2 id="case-heading" className="mt-1 break-words text-lg font-semibold sm:text-2xl">{variant ?? 'Sarah’s situation'}</h2>
        </div>
        {changed ? (
          <div data-testid="scenario-change" className="border-l-4 border-hedgr-500 pl-4">
            <p className="font-medium">What changed</p>
            <p className="mt-1">{changed}</p>
          </div>
        ) : null}
        <p className="font-medium">{variant ? 'What, if anything, would you expect to change? Why?' : 'What, if anything, can you tell from Sarah’s situation?'}</p>
        {!revealed ? (
          <button type="button" data-testid="scenario-reveal" onClick={() => setRevealed(true)} className="min-h-11 w-full max-w-full bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">
            See the example interpretation
          </button>
        ) : (
          <div data-testid="scenario-interpretation" className="space-y-3 break-words border border-hedgr-300 p-5" aria-live="polite">
            <h3 className="text-lg font-semibold">Example interpretation</h3>
            <p className="font-medium">This payment, considered on its own:</p>
            <p>{conclusion}</p>
            <p className="text-sm text-hedgr-700">{limit}</p>
            <p className="text-sm">This is an authored fictional example using only the information shown. It is not a complete assessment of Sarah’s finances, a computed Stability Position, or a change to Hedgr’s mock Engine posture.</p>
          </div>
        )}
      </section>

      <nav aria-label="Compare situations" className="mt-10 border-t border-hedgr-200 pt-6">
        {caseId === 'S0' && revealed ? (
          <>
            <p className="mb-4 font-medium">What if one fact changes?</p>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(variants) as Array<keyof typeof variants>).map((id) => (
                <button key={id} type="button" onClick={() => { setCaseId(id); setRevealed(false); }} className="min-h-11 w-full max-w-full break-words border border-hedgr-500 px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">
                  {variants[id]}
                </button>
              ))}
            </div>
          </>
        ) : null}
        {caseId !== 'S0' ? (
          <button type="button" onClick={resetToReference} className="min-h-11 w-full max-w-full break-words border border-hedgr-500 px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2 sm:w-auto">Return to Sarah’s situation</button>
        ) : null}
      </nav>
      <footer className="mt-12 text-sm text-hedgr-600">
        <Link href="/orientation?study=stability-scenarios" className="underline focus:outline-none focus:ring-2 focus:ring-hedgr-500">Review the introduction</Link>
      </footer>
    </main>
  );
}
