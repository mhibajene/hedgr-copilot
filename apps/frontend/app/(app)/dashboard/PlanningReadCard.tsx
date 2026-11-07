'use client';

import { PLAN_INTENT_COPY as copy } from '../../../lib/copy/plan-intent-copy';
import { getPlanningReadOrder, setSimulationIntent, useSimulationIntent } from '../../../lib/state/simulation-intent';

export function PlanningReadCard() {
  const intent = useSimulationIntent();
  const order = getPlanningReadOrder(intent);
  const answered = intent !== null && intent !== 'skip';
  return (
    <section className="min-w-0 space-y-4 rounded-2xl border border-hedgr-200 bg-white p-4 text-sm leading-relaxed text-hedgr-800" aria-labelledby="planning-read-question" data-testid="planning-read-card">
      <fieldset className="min-w-0 space-y-2">
        <legend id="planning-read-question" className="mb-2 font-semibold">{copy.question}</legend>
        {(['regular', 'dated', 'reserve', 'skip'] as const).map(value => (
          <label key={value} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-hedgr-200 px-3 py-2 focus-within:outline focus-within:outline-2 focus-within:outline-hedgr-500">
            <input type="radio" name="planning-purpose" value={value} checked={intent === value} onChange={() => setSimulationIntent(value)} className="shrink-0 accent-hedgr-primary" />
            <span>{copy.answers[value]}</span>
          </label>
        ))}
      </fieldset>
      {intent === 'dated' ? <p data-testid="planning-read-dated">{copy.dated}</p> : null}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">{copy.title}</h2>
        <p aria-live="polite" data-testid="planning-read-stance">{answered ? copy.confirmation(copy.answers[intent]) : copy.skipped}</p>
        {answered ? <p data-testid="planning-read-why">{copy.why[order[0]]}</p> : null}
        {intent !== 'skip' ? <ul className="space-y-3" data-testid="planning-read-labels">
          {order.map(label => (
            <li key={label}>
              <h3 className="font-semibold">{copy.labels[label]}</h3>
              <p>{copy.sentences[label]}</p>
            </li>
          ))}
        </ul> : null}
      </div>
    </section>
  );
}
