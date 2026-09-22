'use client';

import Link from 'next/link';
import { useState } from 'react';

type CaseId = 'S0' | 'S1' | 'S2' | 'S3';

const variants = {
  S1: {
    name: 'Payment amount',
    changed: 'The named payment is 400 U, still due Day 10.',
    conclusion: 'The supplied timely outside stock is 40 U below this one payment: 400 U − 360 U. The unchanged envelope cannot meet the Day 10 timing in this fiction.',
    limit: 'Another timely source or extension could change the answer, but neither is supplied. This does not establish insolvency, an overall change or a reason to move money.',
  },
  S2: {
    name: 'Access time',
    changed: 'The outside 360 U first becomes usable Day 12. The payment returns to 280 U due Day 10.',
    conclusion: 'No supplied stock is usable by the Day 10 deadline. This one payment is not covered by the supplied resources at that time, despite unchanged stated ownership.',
    limit: 'Day 12 is a fictional access assumption, not a guarantee. No bridge is supplied. This does not establish a nominal loss or wider resilience.',
  },
  S3: {
    name: 'Missing amount',
    changed: 'The payment exists and is due Day 10, but its amount is withheld. Outside access returns to Day 0.',
    conclusion: 'Coverage of this one payment cannot be determined from the supplied facts. Its amount is needed to answer the Day 10 question.',
    limit: 'Missing is neither zero nor deterioration. No gap, remainder or overall position can be calculated.',
  },
} as const;

export default function ScenarioStimulus() {
  const [caseId, setCaseId] = useState<CaseId>('S0');
  const [revealed, setRevealed] = useState(false);
  const variant = caseId === 'S0' ? null : variants[caseId];

  function resetToReference() {
    setCaseId('S0');
    setRevealed(false);
  }

  return (
    <main data-testid="stability-stimulus" className="mx-auto min-h-screen max-w-3xl px-5 py-8 text-hedgr-dark sm:px-8 sm:py-12">
      <header className="space-y-3 border-b border-hedgr-200 pb-6">
        <p className="text-sm font-medium text-hedgr-600">Research prototype · fictional example</p>
        <h1 className="text-3xl font-semibold text-hedgr-800">A stated payment, considered on its own</h1>
        <p className="leading-relaxed">These invented U amounts describe only the facts supplied for this question. Other resources, obligations and later needs are unknown. No real money moves, and nothing here is financial advice.</p>
      </header>

      <section aria-labelledby="reference-heading" className="mt-8 space-y-4 border border-hedgr-300 bg-hedgr-100 p-5">
        <h2 id="reference-heading" className="text-xl font-semibold">S0 · Reference facts</h2>
        <p>On Day 0, a fictional person has a 720 U envelope that cannot be used before Day 20, and a separate 360 U stock usable on Day 0. These stocks do not overlap. The named payment is 280 U due Day 10, at an endpoint usable by the outside stock without a fictional fee.</p>
        <p className="text-sm">Only this stated payment is considered. No other source, extension or transfer route is supplied. This is a partial inventory, not the person’s full finances.</p>
      </section>

      <section aria-labelledby="case-heading" data-testid="scenario-case" className="mt-8 space-y-5">
        <div>
          <p className="text-sm font-medium text-hedgr-600">{caseId} of four · fictional example</p>
          <h2 id="case-heading" className="mt-1 text-2xl font-semibold">{variant ? `${caseId} · ${variant.name}` : 'S0 · Stated payment'}</h2>
        </div>
        {variant ? (
          <div data-testid="scenario-change" className="border-l-4 border-hedgr-500 pl-4">
            <p className="font-medium">One changed fact relative to S0</p>
            <p className="mt-1">{variant.changed}</p>
          </div>
        ) : null}
        <p className="font-medium">{variant ? 'What, if anything, would you expect to change? Why?' : 'What, if anything, can you tell from this information?'}</p>
        {!revealed ? (
          <button type="button" data-testid="scenario-reveal" onClick={() => setRevealed(true)} className="min-h-11 bg-hedgr-primary px-5 py-3 font-medium text-white focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2">
            {variant ? 'Reveal authored comparison' : 'Reveal authored explanation'}
          </button>
        ) : (
          <div data-testid="scenario-interpretation" className="space-y-3 border border-hedgr-300 p-5" aria-live="polite">
            <h3 className="text-lg font-semibold">Authored interpretation · fictional example</h3>
            <p className="font-medium">The stated payment considered on its own:</p>
            <p>{variant ? variant.conclusion : 'The supplied outside 360 U covers the named 280 U payment by Day 10. The 80 U difference is arithmetic after only that payment.'}</p>
            <p className="text-sm text-hedgr-700">{variant ? variant.limit : 'The 720 U envelope remains unavailable until Day 20. Other claims are unknown. The 80 U is not free capital, reserve sufficiency or an instruction to pay.'}</p>
            <p className="text-sm">This is an authored research example, not a computed overall Stability Position or a change to the existing mock Engine posture.</p>
          </div>
        )}
      </section>

      <nav aria-label="Case comparison" className="mt-10 border-t border-hedgr-200 pt-6">
        {caseId === 'S0' && revealed ? (
          <>
            <p className="mb-4 font-medium">Compare one changed fact with S0</p>
            <div className="flex flex-wrap gap-3">
              {(Object.keys(variants) as Array<keyof typeof variants>).map((id) => (
                <button key={id} type="button" onClick={() => { setCaseId(id); setRevealed(false); }} className="min-h-11 border border-hedgr-500 px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2">
                  {id} · {variants[id].name}
                </button>
              ))}
            </div>
          </>
        ) : null}
        {caseId !== 'S0' ? (
          <button type="button" onClick={resetToReference} className="min-h-11 border border-hedgr-500 px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2">Return to S0 before another comparison</button>
        ) : null}
      </nav>
      <footer className="mt-12 text-sm text-hedgr-600">
        <Link href="/orientation?study=stability-scenarios" className="underline focus:outline-none focus:ring-2 focus:ring-hedgr-500">Review the common orientation</Link>
      </footer>
    </main>
  );
}
