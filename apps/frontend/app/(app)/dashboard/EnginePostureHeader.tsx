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
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <span
          data-testid="engine-posture-badge"
          data-posture={posture}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${BADGE_TONES[posture]}`}
        >
          {BADGE_LABELS[posture]}
        </span>
      </div>

      <p
        className="max-w-2xl text-sm text-slate-600"
        data-testid="engine-posture-context"
      >
        {ENGINE_POSTURE_CONTEXT[posture]}
      </p>

      {showNotice ? (
        <div
          data-testid="engine-posture-banner"
          role="status"
          className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
        >
          <p className="font-semibold">{notice?.title}</p>
          <p className="mt-1 text-amber-800">{notice?.body}</p>
        </div>
      ) : null}
    </header>
  );
}
