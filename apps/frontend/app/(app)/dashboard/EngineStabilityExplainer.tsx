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
      className="rounded-xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700"
      data-testid="engine-stability-explainer"
    >
      <summary className="cursor-pointer list-none font-medium text-slate-800 marker:content-none [&::-webkit-details-marker]:hidden">
        {ENGINE_STABILITY_EXPLAINER_SUMMARY}
      </summary>
      <div
        className="mt-3 space-y-3 border-t border-slate-200 pt-3"
        data-testid="engine-stability-explainer-body"
      >
        <p className="max-w-2xl text-slate-600">
          {ENGINE_STABILITY_EXPLAINER_INTRO}
        </p>
        <dl className="max-w-2xl space-y-2">
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
        <ul className="max-w-2xl list-disc space-y-2 pl-5 text-slate-600">
          {ENGINE_STABILITY_EXPLAINER_PRINCIPLES.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        <p className="max-w-2xl text-xs leading-snug text-slate-500">
          {ENGINE_STABILITY_EXPLAINER_FOOTER}
        </p>
      </div>
    </details>
  );
}
