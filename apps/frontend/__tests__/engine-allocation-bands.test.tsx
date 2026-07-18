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

    const caption = screen.getByTestId(
      "engine-allocation-bands-caption"
    ).textContent;
    expect(caption).toMatch(/held steady/i);
    expect(caption).toMatch(/stability/i);
    expect(caption).toMatch(/reserve/i);
    expect(caption).toMatch(/posture/i);
    expect(caption).toMatch(/balance/i);

    const legend = screen.getByTestId(
      "engine-allocation-trust-legend"
    ).textContent;
    expect(legend).toMatch(/informational.*system targets/is);
    expect(legend).toMatch(/conservative yield/i);
    expect(legend).toMatch(/yield opportunity/i);
    expect(legend).toMatch(/ledger/i);
    expect(legend).toMatch(/target share/i);
    expect(legend).toMatch(/spendable balance/i);
    expect(legend).toMatch(/targets do not mean funds have already moved/i);
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
    expect(combined).toMatch(/informational/i);
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
    expect(reserveBand.textContent).toMatch(/quiet buffer/i);
    expect(reserveBand.textContent).toMatch(/kept ready/i);

    const stableBand = screen.getByTestId(
      "engine-allocation-band-coreTargetPct"
    );
    expect(stableBand.textContent).toMatch(/held steady/i);
    expect(stableBand.textContent).toMatch(/preserve value/i);
    expect(stableBand.textContent).toMatch(/primary holding lane/i);

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
    expect(primary.className).toContain("bg-[#171D35]");
    expect(yieldLane.className).toContain("bg-white");
    expect(reserveLane.className).toContain("bg-white");
    expect(yieldLane.className).not.toContain("border-l-4");
    expect(reserveLane.className).not.toContain("border-l-4");
  });
});
