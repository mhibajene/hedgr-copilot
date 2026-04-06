'use client';

import React from 'react';
import {
  ENGINE_STABILITY_EXPLAINER_FOOTER,
  ENGINE_STABILITY_EXPLAINER_INTRO,
  ENGINE_STABILITY_EXPLAINER_PRINCIPLES,
  ENGINE_STABILITY_EXPLAINER_SUMMARY,
  ENGINE_STABILITY_EXPLAINER_TERMS,
} from '../../../lib/engine/stability-explainer-copy';

export function EngineStabilityExplainer() {
  return (
    <details
      className="rounded-2xl border border-slate-200/90 bg-white/70 p-5 text-sm text-slate-700 shadow-sm shadow-slate-900/5"
      data-testid="engine-stability-explainer"
    >
      <summary className="cursor-pointer list-none font-medium text-slate-900 marker:content-none select-none [&::-webkit-details-marker]:hidden">
        {ENGINE_STABILITY_EXPLAINER_SUMMARY}
      </summary>
      <div
        className="mt-4 space-y-4 border-t border-slate-200/90 pt-4"
        data-testid="engine-stability-explainer-body"
      >
        <p className="max-w-2xl leading-relaxed text-slate-600">
          {ENGINE_STABILITY_EXPLAINER_INTRO}
        </p>
        <dl className="max-w-2xl space-y-2.5">
          {ENGINE_STABILITY_EXPLAINER_TERMS.map(({ term, definition }) => (
            <div key={term}>
              <dt className="inline font-medium text-slate-800">{term}</dt>
              <dd className="inline text-slate-600">
                {' '}
                — {definition}
              </dd>
            </div>
          ))}
        </dl>
        <ul className="max-w-2xl list-disc space-y-2.5 pl-5 leading-relaxed text-slate-600">
          {ENGINE_STABILITY_EXPLAINER_PRINCIPLES.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        <p className="max-w-2xl text-xs leading-relaxed text-slate-500">
          {ENGINE_STABILITY_EXPLAINER_FOOTER}
        </p>
      </div>
    </details>
  );
}
