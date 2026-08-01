// @vitest-environment jsdom

import React from "react";
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { EngineAllocationBands } from "../app/(app)/dashboard/EngineAllocationBands";
import { getMockEngineState } from "../lib/engine/mock";
import type { EngineState } from "../lib/engine/types";
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from "./engine-trust-framing-denylist";

function makeEngineState(overrides: Partial<EngineState> = {}): EngineState {
  return {
    ...getMockEngineState("normal"),
    ...overrides,
  };
}

afterEach(() => {
  cleanup();
});

describe("EngineAllocationBands", () => {
  test("renders the stability structure labels, caption, and trust legend", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    expect(screen.getByText("Stability structure")).toBeDefined();
    expect(
      within(
        screen.getByTestId("engine-allocation-band-coreTargetPct")
      ).getByText("Stable balance")
    ).toBeDefined();
    expect(
      within(
        screen.getByTestId("engine-allocation-band-yieldCapPct")
      ).getByText("Conservative yield")
    ).toBeDefined();
    expect(
      within(
        screen.getByTestId("engine-allocation-band-liquidityTargetPct")
      ).getByText("Reserve")
    ).toBeDefined();

    // Stable balance is the dominant primary lane; the other two are supporting.
    expect(
      screen
        .getByTestId("engine-allocation-band-coreTargetPct")
        .getAttribute("data-allocation-lane")
    ).toBe("primary");
    expect(
      screen
        .getByTestId("engine-allocation-band-yieldCapPct")
        .getAttribute("data-allocation-lane")
    ).toBe("supporting");
    expect(
      screen
        .getByTestId("engine-allocation-band-liquidityTargetPct")
        .getAttribute("data-allocation-lane")
    ).toBe("supporting");

    expect(screen.getByTestId("engine-allocation-trust-legend")).toBeDefined();
    const targetDetails = screen.getByTestId(
      "engine-allocation-target-details"
    );
    expect(targetDetails.tagName).toBe("DETAILS");
    expect(targetDetails.hasAttribute("open")).toBe(false);

    const caption = screen.getByTestId(
      "engine-allocation-bands-caption"
    ).textContent;
    expect(caption).toMatch(/percentages/i);
    expect(caption).toMatch(/stability/i);
    expect(caption).toMatch(/guidance/i);
    expect(caption).toMatch(/do not divide/i);
    expect(caption).toMatch(/balance/i);

    const legend = screen.getByTestId(
      "engine-allocation-trust-legend"
    ).textContent;
    expect(legend).toMatch(/guidance only/i);
    expect(legend).toMatch(/stability targets/i);
    expect(legend).toMatch(/conservative yield/i);
    expect(legend).toMatch(/return opportunity/i);
    expect(legend).toMatch(/percentages do not divide it/i);
    expect(legend).toMatch(/target does not mean money has moved/i);
    expect(legend).not.toMatch(/fixture|informational posture|settlement/i);
  });

  test("keeps caption and trust legend free of execution, accounting-as-truth, and hype drift", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    const caption =
      screen.getByTestId("engine-allocation-bands-caption").textContent ?? "";
    const legend =
      screen.getByTestId("engine-allocation-trust-legend").textContent ?? "";
    const combined = `${caption}\n${legend}`.toLowerCase();

    for (const forbidden of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
      expect(combined).not.toContain(forbidden);
    }
    expect(combined).not.toMatch(/\bexecuted\b/);
    expect(combined).not.toMatch(/\ballocated to your\b/);
    expect(combined).toMatch(/guidance/i);
    expect(combined).toMatch(/target/i);
  });

  test("renders band microcopy at phrase level", () => {
    render(
      <EngineAllocationBands
        engineState={makeEngineState({
          liquidityTargetPct: 42,
          coreTargetPct: 44,
          yieldCapPct: 14,
        })}
      />
    );

    const reserveBand = screen.getByTestId(
      "engine-allocation-band-liquidityTargetPct"
    );
    expect(reserveBand.textContent).toMatch(/buffer target/i);
    expect(reserveBand.textContent).toMatch(/kept ready/i);

    const stableBand = screen.getByTestId(
      "engine-allocation-band-coreTargetPct"
    );
    expect(stableBand.textContent).toMatch(/largest target/i);
    expect(stableBand.textContent).toMatch(/preserving value/i);
    expect(stableBand.textContent).toMatch(/primary stability target/i);

    const yieldBand = screen.getByTestId("engine-allocation-band-yieldCapPct");
    expect(yieldBand.textContent).toMatch(/up to 14%/i);
    expect(yieldBand.textContent).toMatch(/conditions allow/i);
  });

  test("keeps per-band bandDescription() copy free of execution, accounting-as-truth, and hype drift", () => {
    render(
      <EngineAllocationBands
        engineState={makeEngineState({
          liquidityTargetPct: 42,
          coreTargetPct: 44,
          yieldCapPct: 14,
        })}
      />
    );

    const descIds = [
      "engine-allocation-band-liquidityTargetPct-desc",
      "engine-allocation-band-coreTargetPct-desc",
      "engine-allocation-band-yieldCapPct-desc",
    ] as const;

    const parts: string[] = [];
    for (const id of descIds) {
      const el = document.getElementById(id);
      expect(el, `missing description node #${id}`).not.toBeNull();
      const text = el!.textContent?.trim() ?? "";
      expect(text.length).toBeGreaterThan(0);
      parts.push(text);
    }

    const combined = parts.join("\n").toLowerCase();

    for (const forbidden of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
      expect(combined).not.toContain(forbidden);
    }
    expect(combined).not.toMatch(/\bexecuted\b/);
    expect(combined).not.toMatch(/\ballocated to your\b/);
  });

  test("renders percentages from the supplied engine state", () => {
    render(
      <EngineAllocationBands
        engineState={makeEngineState({
          liquidityTargetPct: 42,
          coreTargetPct: 44,
          yieldCapPct: 14,
        })}
      />
    );

    expect(
      screen.getByTestId("engine-allocation-band-liquidityTargetPct")
        .textContent
    ).toContain("42%");
    expect(
      screen.getByTestId("engine-allocation-band-coreTargetPct").textContent
    ).toContain("44%");
    expect(
      screen.getByTestId("engine-allocation-band-yieldCapPct").textContent
    ).toContain("14%");
  });

  test("renders representative posture values without implying balances", () => {
    render(
      <EngineAllocationBands engineState={getMockEngineState("tightened")} />
    );

    expect(
      screen.getByTestId("engine-allocation-band-liquidityTargetPct")
        .textContent
    ).toContain("55%");
    expect(
      screen.getByTestId("engine-allocation-band-coreTargetPct").textContent
    ).toContain("35%");
    expect(
      screen.getByTestId("engine-allocation-band-yieldCapPct").textContent
    ).toContain("10%");
    expect(screen.queryByText(/available balance/i)).toBeNull();
    expect(screen.queryByText(/total \(incl\. pending\)/i)).toBeNull();
  });

  test("keeps Stable balance dominant and both other lanes supporting", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    const primary = screen.getByTestId("engine-allocation-band-coreTargetPct");
    const yieldLane = screen.getByTestId("engine-allocation-band-yieldCapPct");
    const reserveLane = screen.getByTestId(
      "engine-allocation-band-liquidityTargetPct"
    );

    expect(primary.className).toContain("border-l-4");
    expect(primary.className).toContain("bg-hedgr-800");
    expect(primary.getAttribute("data-primary-stability-edge")).toBe("true");
    expect(yieldLane.className).toContain("bg-hedgr-100");
    expect(reserveLane.className).toContain("bg-hedgr-200");
    expect(reserveLane.className).not.toContain("bg-hedgr-100");
    expect(yieldLane.getAttribute("data-supporting-lane-surface")).toBe(
      "static"
    );
    expect(reserveLane.getAttribute("data-supporting-lane-surface")).toBe(
      "static"
    );
    expect(yieldLane.className).not.toContain("border-l-4");
    expect(reserveLane.className).not.toContain("border-l-4");
    expect(yieldLane.className).not.toContain("bg-hedgr-800");
    expect(reserveLane.className).not.toContain("bg-hedgr-800");
  });

  test("keeps supporting-lane surfaces static across postures", () => {
    const { rerender } = render(
      <EngineAllocationBands engineState={getMockEngineState("normal")} />
    );

    const yieldClassesNormal = screen.getByTestId(
      "engine-allocation-band-yieldCapPct"
    ).className;
    const reserveClassesNormal = screen.getByTestId(
      "engine-allocation-band-liquidityTargetPct"
    ).className;

    rerender(
      <EngineAllocationBands engineState={getMockEngineState("tightened")} />
    );

    expect(
      screen.getByTestId("engine-allocation-band-yieldCapPct").className
    ).toBe(yieldClassesNormal);
    expect(
      screen.getByTestId("engine-allocation-band-liquidityTargetPct").className
    ).toBe(reserveClassesNormal);
  });

  test("labels every percentage as a stability target", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    for (const testId of [
      "engine-allocation-band-coreTargetPct",
      "engine-allocation-band-yieldCapPct",
      "engine-allocation-band-liquidityTargetPct",
    ]) {
      expect(screen.getByTestId(testId).textContent).toMatch(
        /stability target\s*·\s*\d+%/i
      );
    }
  });
});
