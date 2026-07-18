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
  normal: "border-hedgr-200 bg-hedgr-100 text-hedgr-800",
  tightening: "border-hedgr-300 bg-white text-hedgr-dark",
  tightened: "border-hedgr-primary bg-white text-hedgr-800",
  recovery: "border-hedgr-200 bg-white text-hedgr-600",
};

type EnginePostureHeaderProps = {
  engineState: EngineState;
  syntheticJourneyActive?: boolean;
};

export function EnginePostureHeader({
  engineState,
  syntheticJourneyActive = false,
}: EnginePostureHeaderProps) {
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
      className="space-y-3"
      aria-labelledby="dashboard-current-status-label"
      data-testid="dashboard-current-status"
    >
      <h1 className="sr-only">Dashboard</h1>
      <div className="flex items-start justify-between gap-3">
        <p
          id="dashboard-current-status-label"
          className="text-xs font-semibold uppercase tracking-[0.12em] text-hedgr-500"
        >
          {syntheticJourneyActive ? "Current simulation status" : "Current status"}
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
        className="max-w-xl text-base leading-relaxed text-hedgr-dark"
        data-testid="engine-posture-context"
      >
        {ENGINE_POSTURE_CONTEXT[posture]}
      </p>

      <p
        className="text-sm font-medium text-hedgr-600"
        data-testid="engine-posture-action-guidance"
      >
        There is nothing here you need to manage.
      </p>

      {showNotice ? (
        <div
          data-testid="engine-posture-banner"
          role="status"
          className="rounded-2xl border border-hedgr-300 bg-white px-5 py-3.5 text-sm leading-snug text-hedgr-800"
        >
          <p className="font-semibold text-hedgr-800">{notice?.title}</p>
          <p className="mt-2 text-hedgr-dark">{notice?.body}</p>
        </div>
      ) : null}
    </header>
  );
}
