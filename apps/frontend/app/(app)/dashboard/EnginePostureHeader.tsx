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

const SIMULATION_ATTENTION_ANSWERS: Record<EnginePosture, string> = {
  normal: "No other change stands out in the information shown.",
  tightening: "A change in the guidance needs review.",
  tightened: "A change in the guidance needs review.",
  recovery: "A change in the guidance needs review.",
};

const SIMULATION_STATUS_CONTEXT: Record<EnginePosture, string> = {
  normal:
    "The completed simulated changes reconcile with the current position.",
  tightening:
    "Hedgr's qualitative reading shows stability guidance becoming more cautious.",
  tightened:
    "Hedgr's qualitative reading shows stability guidance in a more cautious state.",
  recovery:
    "Hedgr's qualitative reading shows stability guidance easing from a more cautious state.",
};

type ComparisonState = "empty" | "first-event" | "change";

const SIMULATION_COMPARISON_CONTEXT: Record<ComparisonState, string> = {
  empty:
    "Nothing to compare yet. A first completed simulated event will create a starting point.",
  "first-event":
    "A first simulated position is now visible. There is no earlier position to compare yet.",
  change: SIMULATION_STATUS_CONTEXT.normal,
};

const SIMULATION_COMPARISON_ATTENTION: Record<ComparisonState, string> = {
  empty: "There is not enough information to compare yet.",
  "first-event": "There is no earlier position to compare yet.",
  change: SIMULATION_ATTENTION_ANSWERS.normal,
};

type EnginePostureHeaderProps = {
  engineState: EngineState;
  syntheticJourneyActive?: boolean;
  comparisonState?: ComparisonState;
  latestChangeType?: "DEPOSIT" | "WITHDRAW";
  latestChangeAmountUSD?: number;
};

export function EnginePostureHeader({
  engineState,
  syntheticJourneyActive = false,
  comparisonState = "change",
  latestChangeType,
  latestChangeAmountUSD,
}: EnginePostureHeaderProps) {
  const { posture, notice } = engineState;
  const showNotice = posture !== "normal" && Boolean(notice);
  const changeObservation =
    latestChangeType && latestChangeAmountUSD !== undefined
      ? `The simulated ${
          latestChangeType === "WITHDRAW" ? "expense" : "deposit"
        } explains why the current position is $${latestChangeAmountUSD.toFixed(
          2
        )} ${latestChangeType === "WITHDRAW" ? "lower" : "higher"}.`
      : SIMULATION_COMPARISON_CONTEXT.change;

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
      <div className="space-y-2">
        <div className="space-y-1">
          <p
            id="dashboard-current-status-label"
            className="text-[11px] font-bold uppercase tracking-[0.14em] text-hedgr-600"
          >
            {syntheticJourneyActive ? "What Hedgr notices" : "Current status"}
          </p>
        </div>
        {!syntheticJourneyActive ? (
          <span
            data-testid="engine-posture-badge"
            data-posture={posture}
            className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${BADGE_TONES[posture]}`}
          >
            {BADGE_LABELS[posture]}
          </span>
        ) : null}
      </div>

      <p
        className="max-w-xl text-sm leading-relaxed text-hedgr-dark"
        data-testid="engine-posture-context"
      >
        {syntheticJourneyActive
          ? posture === "normal"
            ? comparisonState === "change"
              ? changeObservation
              : SIMULATION_COMPARISON_CONTEXT[comparisonState]
            : SIMULATION_STATUS_CONTEXT[posture]
          : ENGINE_POSTURE_CONTEXT[posture]}
      </p>

      {syntheticJourneyActive ? (
        <div className="space-y-2 border-t border-hedgr-100 pt-3">
          <h2 className="text-sm font-semibold tracking-tight text-hedgr-800">
            Does anything need attention?
          </h2>
          <p
            data-testid="engine-simulation-attention-answer"
            className="text-sm font-semibold leading-relaxed text-hedgr-800"
          >
            {posture === "normal"
              ? SIMULATION_COMPARISON_ATTENTION[comparisonState]
              : SIMULATION_ATTENTION_ANSWERS[posture]}
          </p>
          <p className="text-xs leading-relaxed text-hedgr-500">
            This is an observation from the simulation, not a guarantee.
          </p>
        </div>
      ) : null}

      {!syntheticJourneyActive ? (
        <p
          className="text-sm font-medium text-hedgr-600"
          data-testid="engine-posture-action-guidance"
        >
          There is nothing here you need to manage.
        </p>
      ) : null}

      {showNotice ? (
        <div
          data-testid="engine-posture-banner"
          role="status"
          className="rounded-2xl border border-hedgr-100 bg-white px-4 py-3.5 text-sm leading-snug text-hedgr-800 shadow-sm"
        >
          <p className="font-semibold text-hedgr-800">{notice?.title}</p>
          <p className="mt-2 text-hedgr-dark">{notice?.body}</p>
        </div>
      ) : null}
    </header>
  );
}
