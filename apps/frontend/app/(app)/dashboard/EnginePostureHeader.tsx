"use client";

import React from "react";
import { ENGINE_POSTURE_CONTEXT } from "../../../lib/engine/posture-context";
import type { EnginePosture, EngineState } from "../../../lib/engine/types";

const BADGE_LABELS: Record<EnginePosture, string> = {
  normal: "NORMAL",
  tightening: "TIGHTENING",
  tightened: "TIGHTENED",
  recovery: "RECOVERY",
};

const BADGE_TONES: Record<EnginePosture, string> = {
  normal: "bg-[#CAD0E8] text-[#171D35] border-[#A6B0D8]",
  tightening: "bg-white text-[#1F2937] border-[#8391C9]",
  tightened: "bg-white text-[#171D35] border-[#1F2747]",
  recovery: "bg-white text-[#36447C] border-[#A6B0D8]",
};

type EnginePostureHeaderProps = {
  engineState: EngineState;
};

export function EnginePostureHeader({ engineState }: EnginePostureHeaderProps) {
  const { posture, notice } = engineState;
  const showNotice = posture !== "normal" && Boolean(notice);

  if (
    posture !== "normal" &&
    !notice &&
    process.env.NODE_ENV !== "production"
  ) {
    console.warn(
      `[EnginePostureHeader] Missing EngineState.notice for posture "${posture}"`
    );
  }

  return (
    <header
      className="space-y-3 border-b border-[#A6B0D8] pb-6"
      aria-labelledby="dashboard-current-status-label"
      data-testid="dashboard-current-status"
    >
      <h1 className="sr-only">Dashboard</h1>
      <div className="flex items-start justify-between gap-3">
        <p
          id="dashboard-current-status-label"
          className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4658A0]"
        >
          Current status
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
        className="max-w-xl text-base leading-relaxed text-[#1F2937]"
        data-testid="engine-posture-context"
      >
        {ENGINE_POSTURE_CONTEXT[posture]}
      </p>

      <p
        className="text-sm font-medium text-[#36447C]"
        data-testid="engine-posture-action-guidance"
      >
        There is nothing here you need to manage.
      </p>

      {showNotice ? (
        <div
          data-testid="engine-posture-banner"
          role="status"
          className="rounded-2xl border border-[#8391C9] bg-white px-5 py-3.5 text-sm leading-snug text-[#171D35]"
        >
          <p className="font-semibold text-[#171D35]">{notice?.title}</p>
          <p className="mt-2 text-[#1F2937]">{notice?.body}</p>
        </div>
      ) : null}
    </header>
  );
}
