// @vitest-environment jsdom

import React from "react";
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { EngineAllocationBands } from "../app/(app)/dashboard/EngineAllocationBands";
import { getMockEngineState } from "../lib/engine/mock";
import type { EngineState } from "../lib/engine/types";
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from "./engine-trust-framing-denylist";

function makeContractEngineState(): EngineState {
  return {
    ...getMockEngineState("normal"),
    liquidityTargetPct: 42,
    coreTargetPct: 44,
    yieldCapPct: 14,
  };
}

function expectInformationalTrustFraming(text: string) {
  const lower = text.toLowerCase();

  for (const forbidden of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
    expect(lower).not.toContain(forbidden);
  }
  expect(lower).not.toMatch(/\bexecuted\b/);
  expect(lower).not.toMatch(/\ballocated to your\b/);
}

afterEach(() => {
  cleanup();
});

describe("EngineAllocationBands panel copy contract", () => {
  test("locks non-empty shipped panel copy segments", () => {
    render(<EngineAllocationBands engineState={makeContractEngineState()} />);

    expect(screen.getByText("Stability structure")).toBeDefined();

    const caption =
      screen.getByTestId("engine-allocation-bands-caption").textContent ?? "";
    const trustLegend =
      screen.getByTestId("engine-allocation-trust-legend").textContent ?? "";
    const descriptorIds = [
      "engine-allocation-band-liquidityTargetPct-desc",
      "engine-allocation-band-coreTargetPct-desc",
      "engine-allocation-band-yieldCapPct-desc",
    ] as const;
    const descriptors = descriptorIds.map((id) => {
      const node = document.getElementById(id);
      expect(node, `missing allocation band descriptor #${id}`).not.toBeNull();
      return node!.textContent ?? "";
    });

    for (const segment of [caption, trustLegend, ...descriptors]) {
      expect(segment.trim().length).toBeGreaterThan(0);
    }
  });

  test("keeps shipped panel copy informational and non-accounting", () => {
    render(<EngineAllocationBands engineState={makeContractEngineState()} />);

    const segments = [
      screen.getByTestId("engine-allocation-bands-caption").textContent ?? "",
      screen.getByTestId("engine-allocation-trust-legend").textContent ?? "",
      document.getElementById("engine-allocation-band-liquidityTargetPct-desc")
        ?.textContent ?? "",
      document.getElementById("engine-allocation-band-coreTargetPct-desc")
        ?.textContent ?? "",
      document.getElementById("engine-allocation-band-yieldCapPct-desc")
        ?.textContent ?? "",
    ];

    expectInformationalTrustFraming(segments.join("\n"));
  });
});
