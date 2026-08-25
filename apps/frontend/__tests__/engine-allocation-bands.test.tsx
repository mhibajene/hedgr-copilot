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
  test("renders purpose-led stability guidance, target roles, values, and detailed distinction", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    expect(screen.getByText("Stability guidance")).toBeDefined();
    expect(
      within(
        screen.getByTestId("engine-allocation-band-coreTargetPct")
      ).getByText("Core stability target")
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

    // The core stability target is dominant; the other two are supporting.
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

    const caption = screen.getByTestId("engine-allocation-bands-caption")
      .textContent;
    expect(caption).toBe(
      "See the position Hedgr is guiding toward and why."
    );

    const philosophy = screen.getByTestId(
      "engine-allocation-philosophy"
    ).textContent;
    expect(philosophy).toMatch(/preserve value/i);
    expect(philosophy).toMatch(/keep access and risk visible/i);
    expect(philosophy).toMatch(/before action/i);

    const boundary = screen.getByTestId("engine-allocation-boundary")
      .textContent;
    expect(boundary).toMatch(/context, not an instruction/i);
    expect(boundary).toMatch(/does not show current money/i);
    expect(boundary).toMatch(/divided or moved/i);
    expect(boundary).not.toMatch(/funded|account|holding|allocated/i);

    const targetsIntro = screen.getByTestId(
      "engine-allocation-targets-intro"
    ).textContent;
    expect(targetsIntro).toMatch(/simulated planning structure/i);
    expect(targetsIntro).toMatch(/guidance, not current money/i);

    const roles = screen.getByTestId("engine-allocation-target-roles")
      .textContent;
    expect(roles).toMatch(/three distinct target roles/i);
    expect(roles).toMatch(/primary stability role/i);
    expect(roles).toMatch(/supporting role/i);
    expect(roles).not.toMatch(/\d+%/);

    const legend = screen.getByTestId(
      "engine-allocation-trust-legend"
    ).textContent;
    expect(legend).toMatch(/planning targets/i);
    expect(legend).toMatch(/target role/i);
    expect(legend).toMatch(/conservative yield/i);
    expect(legend).toMatch(/return opportunity/i);
    expect(legend).toMatch(/percentages do not divide it/i);
    expect(legend).toMatch(/guidance does not tell you what to do/i);
    expect(legend).toMatch(/divide or move simulated money/i);
    expect(legend).not.toMatch(/funded|account|holding|allocated/i);
    expect(legend).not.toMatch(/fixture|informational posture|settlement/i);
  });

  test("orders purpose, priorities, target roles, values, and constitutional verification", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    const purpose = screen.getByTestId("engine-allocation-bands-caption");
    const philosophy = screen.getByTestId("engine-allocation-philosophy");
    const roles = screen.getByTestId("engine-allocation-target-roles");
    const targetsIntro = screen.getByTestId("engine-allocation-targets-intro");
    const structure = screen.getByTestId("engine-allocation-structure");
    const boundary = screen.getByTestId("engine-allocation-boundary");
    const distinction = screen.getByTestId("engine-allocation-trust-legend");

    const comesBefore = (first: HTMLElement, second: HTMLElement) =>
      Boolean(
        first.compareDocumentPosition(second) &
          Node.DOCUMENT_POSITION_FOLLOWING
      );

    expect(comesBefore(purpose, philosophy)).toBe(true);
    expect(comesBefore(philosophy, roles)).toBe(true);
    expect(comesBefore(roles, targetsIntro)).toBe(true);
    expect(comesBefore(targetsIntro, structure)).toBe(true);
    expect(comesBefore(structure, boundary)).toBe(true);
    expect(comesBefore(boundary, distinction)).toBe(true);
  });

  test("reveals priorities, roles, values, and verification through separate collapsed layers", () => {
    render(
      <EngineAllocationBands
        engineState={makeEngineState()}
        collapsed
      />
    );

    const panel = screen.getByTestId("engine-allocation-bands");
    expect(panel.getAttribute("data-presentation")).toBe("collapsed");
    expect(screen.getByText("Stability guidance")).toBeDefined();
    expect(
      screen.getByTestId("engine-allocation-bands-caption").textContent
    ).toBe("See the position Hedgr is guiding toward and why.");
    const prioritiesDetails = screen.getByTestId(
      "engine-allocation-priorities-details"
    );
    const rolesDetails = screen.getByTestId("engine-allocation-roles-details");
    const valuesDetails = screen.getByTestId("engine-allocation-values-details");

    for (const details of [prioritiesDetails, rolesDetails, valuesDetails]) {
      expect(details.tagName).toBe("DETAILS");
      expect(details.hasAttribute("open")).toBe(false);
    }

    const prioritiesSummary = prioritiesDetails.querySelector(
      ":scope > summary"
    );
    const rolesSummary = rolesDetails.querySelector(":scope > summary");
    const valuesSummary = valuesDetails.querySelector(":scope > summary");

    expect(prioritiesSummary?.textContent).toContain(
      "See why these planning targets exist"
    );
    expect(rolesSummary?.textContent).toContain(
      "See what each target is for"
    );
    expect(valuesSummary?.textContent).toContain(
      "View simulated planning targets"
    );
    expect(prioritiesSummary?.textContent?.trim()).toBe(
      "See why these planning targets exist"
    );
    expect(rolesSummary?.textContent?.trim()).toBe(
      "See what each target is for"
    );
    expect(valuesSummary?.textContent?.trim()).toBe(
      "View simulated planning targets"
    );
    for (const summary of [prioritiesSummary, rolesSummary, valuesSummary]) {
      expect(summary?.textContent).not.toMatch(/optional/i);
    }
    expect(prioritiesSummary?.textContent).not.toMatch(/\d+%/);
    expect(rolesSummary?.textContent).not.toMatch(/\d+%/);
    expect(
      screen.getByTestId("engine-allocation-target-roles").textContent
    ).not.toMatch(/\d+%/);
    expect(screen.getByTestId("engine-allocation-boundary").textContent).toMatch(
      /context, not an instruction/i
    );
  });

  test("keeps purpose, philosophy, boundary, and detail free of execution, accounting-as-truth, and hype drift", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    const combined = [
      screen.getByTestId("engine-allocation-bands-caption").textContent ?? "",
      screen.getByTestId("engine-allocation-philosophy").textContent ?? "",
      screen.getByTestId("engine-allocation-boundary").textContent ?? "",
      screen.getByTestId("engine-allocation-targets-intro").textContent ?? "",
      screen.getByTestId("engine-allocation-trust-legend").textContent ?? "",
    ]
      .join("\n")
      .toLowerCase();

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
    expect(stableBand.textContent).toMatch(/primary stability guidance/i);

    const yieldBand = screen.getByTestId("engine-allocation-band-yieldCapPct");
    expect(yieldBand.textContent).toMatch(/limited target/i);
    expect(yieldBand.textContent).toContain("14%");
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

  test("uses guidance rows rather than funded-container or progress grammar", () => {
    render(<EngineAllocationBands engineState={makeEngineState()} />);

    const primary = screen.getByTestId("engine-allocation-band-coreTargetPct");
    const yieldLane = screen.getByTestId("engine-allocation-band-yieldCapPct");
    const reserveLane = screen.getByTestId(
      "engine-allocation-band-liquidityTargetPct"
    );

    expect(primary.getAttribute("data-guidance-row")).toBe("true");
    expect(yieldLane.getAttribute("data-guidance-row")).toBe("true");
    expect(reserveLane.getAttribute("data-guidance-row")).toBe("true");
    expect(primary.textContent).toMatch(/primary stability guidance/i);
    expect(yieldLane.textContent).toMatch(/supporting guidance/i);
    expect(reserveLane.textContent).toMatch(/supporting guidance/i);
    expect(
      primary.compareDocumentPosition(yieldLane) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    const structure = screen.getByTestId("engine-allocation-structure");
    expect(structure.tagName).toBe("DL");
    expect(structure.querySelector('[role="progressbar"]')).toBeNull();
    expect(structure.textContent).not.toMatch(/[$£€]|funded|account|holding|allocated/i);
    for (const lane of [primary, yieldLane, reserveLane]) {
      expect(lane.className).not.toMatch(/rounded|bg-hedgr-(?:100|200|800)/);
    }
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
        /stability target\s*\d+%/i
      );
    }
  });
});
