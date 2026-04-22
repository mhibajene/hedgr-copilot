'use client';

import React from 'react';
import { ENGINE_POSTURE_CONTEXT } from '../../../lib/engine/posture-context';
import type { EnginePosture, EngineState } from '../../../lib/engine/types';

const BADGE_LABELS: Record<EnginePosture, string> = {
  normal: 'NORMAL',
  tightening: 'TIGHTENING',
  tightened: 'TIGHTENED',
  recovery: 'RECOVERY',
};

const BADGE_TONES: Record<EnginePosture, string> = {
  normal: 'bg-slate-100 text-slate-700 border-slate-200',
  tightening: 'bg-amber-50 text-amber-800 border-amber-200',
  tightened: 'bg-orange-50 text-orange-800 border-orange-200',
  recovery: 'bg-sky-50 text-sky-800 border-sky-200',
};

type EnginePostureHeaderProps = {
  engineState: EngineState;
};

export function EnginePostureHeader({ engineState }: EnginePostureHeaderProps) {
  const { posture, notice } = engineState;
  const showNotice = posture !== 'normal' && Boolean(notice);

  if (posture !== 'normal' && !notice && process.env.NODE_ENV !== 'production') {
    console.warn(
      `[EnginePostureHeader] Missing EngineState.notice for posture "${posture}"`,
    );
  }

  return (
    <header className="space-y-3">
      <h1 className="sr-only">Dashboard</h1>
      <div className="flex items-start justify-between gap-3">
        <p
          className="text-xs font-medium uppercase tracking-wide text-slate-500"
          aria-hidden="true"
        >
          Overview
        </p>
        <span
          data-testid="engine-posture-badge"
          data-posture={posture}
          className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${BADGE_TONES[posture]}`}
        >
          {BADGE_LABELS[posture]}
        </span>
      </div>

      <p
        className="max-w-2xl text-sm leading-relaxed text-slate-600"
        data-testid="engine-posture-context"
      >
        {ENGINE_POSTURE_CONTEXT[posture]}
      </p>

      {showNotice ? (
        <div
          data-testid="engine-posture-banner"
          role="status"
          className="rounded-2xl border border-amber-200/90 bg-amber-50/95 px-5 py-3.5 text-sm leading-snug text-amber-950 shadow-sm shadow-amber-900/5"
        >
          <p className="font-semibold text-amber-950">{notice?.title}</p>
          <p className="mt-2 text-amber-900/90">{notice?.body}</p>
        </div>
      ) : null}
    </header>
  );
}
