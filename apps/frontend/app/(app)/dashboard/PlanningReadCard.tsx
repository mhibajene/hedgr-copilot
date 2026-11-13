'use client';

import { PLAN_INTENT_COPY as copy } from '../../../lib/copy/plan-intent-copy';
import { getPlanningReadOrder, setSimulationIntent, useSimulationIntent } from '../../../lib/state/simulation-intent';

export function PlanningReadCard() {
  const intent = useSimulationIntent();
  const selected = getPlanningReadOrder(intent)[0];
  return (
    <section className="min-w-0 space-y-4 rounded-2xl border border-hedgr-200 bg-white p-4 text-sm leading-relaxed text-hedgr-800" aria-label={copy.title} data-testid="planning-read-card">
      {intent === null ? <>
        <fieldset className="min-w-0 space-y-2">
          <legend id="planning-read-question" className="mb-2 font-semibold">{copy.question}</legend>
          {(['regular', 'reserve', 'dated'] as const).map(value => (
            <label key={value} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-hedgr-200 px-2 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-hedgr-500">
              <input type="radio" name="planning-purpose" value={value} checked={false} onChange={() => setSimulationIntent(value)} className="shrink-0 accent-hedgr-primary" />
              <span>{copy.labels[getPlanningReadOrder(value)[0]]}</span>
            </label>
          ))}
        </fieldset>
        <button type="button" onClick={() => setSimulationIntent('skip')} className="min-h-11 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-hedgr-500">{copy.answers.skip}</button>
        <p>{copy.limits}</p>
      </> : <>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="min-w-0 flex-1 basis-48" aria-live="polite" data-testid="planning-read-stance">{intent === 'skip' ? copy.skipped : copy.confirmation(copy.labels[selected])}</p>
          <button type="button" onClick={() => setSimulationIntent(null)} className="min-h-11 shrink-0 underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-hedgr-500">{copy.change}</button>
        </div>
        {intent !== 'skip' ? <p data-testid="planning-read-why">{copy.why[selected]}</p> : null}
        {intent === 'dated' ? <p data-testid="planning-read-dated">{copy.dated}</p> : null}
      </>}
    </section>
  );
}
