'use client';

import React from 'react';
import {
  ENGINE_PROTECTIVE_GUIDANCE_FRAMING,
  ENGINE_PROTECTIVE_GUIDANCE_POINTS,
  ENGINE_PROTECTIVE_GUIDANCE_TITLE,
} from '../../../lib/engine/protective-guidance-copy';

export function EngineProtectiveGuidance() {
  const titleId = 'engine-protective-guidance-title';

  return (
    <div
      className="max-w-2xl rounded-2xl border border-slate-200/90 bg-white/70 p-5 text-sm text-slate-700 shadow-sm shadow-slate-900/5"
      data-testid="engine-protective-guidance"
      aria-labelledby={titleId}
    >
      <h3
        id={titleId}
        className="text-base font-semibold tracking-tight text-slate-900"
      >
        {ENGINE_PROTECTIVE_GUIDANCE_TITLE}
      </h3>
      <p className="mt-3 leading-relaxed text-slate-600">
        {ENGINE_PROTECTIVE_GUIDANCE_FRAMING}
      </p>
      <ul className="mt-4 list-disc space-y-2.5 pl-5 leading-relaxed text-slate-600">
        {ENGINE_PROTECTIVE_GUIDANCE_POINTS.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
