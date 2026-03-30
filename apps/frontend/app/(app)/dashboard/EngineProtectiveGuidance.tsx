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
      className="max-w-2xl rounded-xl border border-slate-200 bg-white/60 p-4 text-sm text-slate-700"
      data-testid="engine-protective-guidance"
      aria-labelledby={titleId}
    >
      <h3
        id={titleId}
        className="text-base font-semibold text-slate-900"
      >
        {ENGINE_PROTECTIVE_GUIDANCE_TITLE}
      </h3>
      <p className="mt-2 leading-snug text-slate-600">
        {ENGINE_PROTECTIVE_GUIDANCE_FRAMING}
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
        {ENGINE_PROTECTIVE_GUIDANCE_POINTS.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>
    </div>
  );
}
