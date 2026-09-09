// @vitest-environment jsdom

import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { usePathname, useSearchParams } from "next/navigation";
import { EnginePostureHeader } from "../app/(app)/dashboard/EnginePostureHeader";
import { ENGINE_POSTURE_CONTEXT } from "../lib/engine/posture-context";
import { getMockEngineState } from "../lib/engine/mock";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/dashboard-synthetic-journey"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_AUTH_MODE", "mock");
  vi.stubEnv("NEXT_PUBLIC_FX_MODE", "stub");
  vi.mocked(usePathname).mockReturnValue("/dashboard-synthetic-journey");
  vi.mocked(useSearchParams).mockReturnValue(
    new URLSearchParams() as ReturnType<typeof useSearchParams>
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("EnginePostureHeader", () => {
  test.each([
    ["normal", "NORMAL"],
    ["tightening", "TIGHTENING"],
    ["tightened", "TIGHTENED"],
    ["recovery", "RECOVERY"],
  ] as const)("renders the %s posture badge", (posture, label) => {
    render(<EnginePostureHeader engineState={getMockEngineState(posture)} />);

    const badge = screen.getByTestId("engine-posture-badge");
    expect(badge.getAttribute("data-posture")).toBe(posture);
    expect(badge.textContent).toBe(label);
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      ENGINE_POSTURE_CONTEXT[posture]
    );
  });

  test("does not render a notice banner for normal posture", () => {
    render(<EnginePostureHeader engineState={getMockEngineState("normal")} />);

    expect(screen.queryByTestId("engine-posture-banner")).toBeNull();
  });

  test("puts a bounded observation before the attention question in the participant journey", () => {
    render(
      <EnginePostureHeader
        engineState={getMockEngineState("normal")}
        syntheticJourneyActive
      />
    );

    expect(screen.getByText("Does anything need attention?")).toBeDefined();
    expect(screen.getByText("What Hedgr notices")).toBeDefined();
    expect(
      screen.getByTestId("engine-simulation-attention-answer").textContent
    ).toBe("No other change stands out in the information shown.");
    expect(
      screen.getByTestId("engine-simulation-attention-answer").className
    ).not.toContain("rounded-full");
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "The completed simulated changes reconcile with the current position."
    );
    expect(
      screen.getByTestId("dashboard-current-status").textContent
    ).toContain("not a guarantee");
    expect(
      screen.getByTestId("dashboard-current-status").textContent
    ).not.toMatch(/score|gauge|safe|all clear/i);
    expect(screen.queryByTestId("engine-posture-badge")).toBeNull();
    expect(screen.queryByText("NORMAL")).toBeNull();
    expect(screen.queryByTestId("engine-posture-action-guidance")).toBeNull();
  });

  test.each([
    [
      "empty",
      "Nothing to compare yet. Your first completed simulated event will establish a starting point.",
    ],
    [
      "first-event",
      "Your first simulated position is now visible. This is your starting point.",
    ],
  ] as const)(
    "does not invent reassurance for the %s comparison state",
    (comparisonState, observation) => {
      render(
        <EnginePostureHeader
          engineState={getMockEngineState("normal")}
          syntheticJourneyActive
          comparisonState={comparisonState}
        />
      );

      expect(screen.getByTestId("engine-posture-context").textContent).toBe(
        observation
      );
      expect(
        screen.queryByTestId("engine-simulation-attention-answer")
      ).toBeNull();
      expect(screen.queryByText("Does anything need attention?")).toBeNull();
      expect(screen.getByText(
        "This is an observation from the simulation, not a guarantee."
      )).toBeDefined();
      expect(
        screen.getByTestId("dashboard-current-status").textContent
      ).not.toMatch(/all clear|safe|stable|protected|guaranteed/i);
    }
  );

  describe.each(["empty", "first-event"] as const)(
    "%s retains genuine caution",
    (comparisonState) => {
      test.each(["tightening", "tightened", "recovery"] as const)(
        "keeps the attention answer and notice for %s posture",
        (posture) => {
          const engineState = getMockEngineState(posture);
          render(
            <EnginePostureHeader
              engineState={engineState}
              syntheticJourneyActive
              comparisonState={comparisonState}
            />
          );

          expect(screen.getByText("Does anything need attention?")).toBeDefined();
          expect(screen.getByTestId("engine-simulation-attention-answer").textContent)
            .toBe("A change in the guidance needs review.");
          expect(screen.getByTestId("engine-posture-banner").getAttribute("role"))
            .toBe("status");
          expect(screen.getByText(engineState.notice!.title)).toBeDefined();
          expect(screen.getByText(engineState.notice!.body)).toBeDefined();
          expect(screen.getByText(
            "This is an observation from the simulation, not a guarantee."
          )).toBeDefined();
        }
      );
    }
  );

  test.each([
    ["empty", "Nothing to compare yet. A first completed simulated event will create a starting point.", "There is not enough information to compare yet."],
    ["first-event", "A first simulated position is now visible. There is no earlier position to compare yet.", "There is no earlier position to compare yet."],
  ] as const)("preserves default Home's %s presentation", (comparisonState, observation, attention) => {
    vi.mocked(usePathname).mockReturnValue("/dashboard");
    render(<EnginePostureHeader engineState={getMockEngineState("normal")} syntheticJourneyActive comparisonState={comparisonState} />);
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(observation);
    expect(screen.getByText("Does anything need attention?")).toBeDefined();
    expect(screen.getByTestId("engine-simulation-attention-answer").textContent).toBe(attention);
  });

  test("explains the supported direction of a completed change", () => {
    render(
      <EnginePostureHeader
        engineState={getMockEngineState("normal")}
        syntheticJourneyActive
        comparisonState="change"
        latestChangeType="WITHDRAW"
        latestChangeAmountUSD={2}
      />
    );

    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "The simulated expense explains why the current position is $2.00 lower."
    );
  });

  test("does not render a notice banner for normal posture even if notice is present", () => {
    const engineState = {
      ...getMockEngineState("normal"),
      notice: { title: "Stray", body: "Should not display for normal." },
    };

    render(<EnginePostureHeader engineState={engineState} />);

    expect(screen.queryByTestId("engine-posture-banner")).toBeNull();
  });
  test.each(["tightening", "tightened", "recovery"] as const)(
    "renders the notice banner through the shipped engine state path for %s posture",
    (posture) => {
      const engineState = getMockEngineState(posture);

      render(<EnginePostureHeader engineState={engineState} />);

      const banner = screen.getByTestId("engine-posture-banner");
      expect(banner).toBeDefined();
      expect(banner.getAttribute("role")).toBe("status");
      expect(screen.getByText(engineState.notice!.title)).toBeDefined();
      expect(screen.getByText(engineState.notice!.body)).toBeDefined();
    }
  );

  test("warns and does not invent a banner when a non-normal posture lacks notice copy", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const engineState = {
      ...getMockEngineState("tightened"),
      notice: undefined,
    };

    render(<EnginePostureHeader engineState={engineState} />);

    expect(screen.queryByTestId("engine-posture-banner")).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      '[EnginePostureHeader] Missing EngineState.notice for posture "tightened"'
    );
  });
});
