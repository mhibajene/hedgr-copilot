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

    expect(screen.getByRole("heading", { name: "Planning targets", exact: true })).toBeDefined();

    const caption =
      screen.getByTestId("engine-allocation-bands-caption").textContent ?? "";
    const philosophy =
      screen.getByTestId("engine-allocation-philosophy").textContent ?? "";
    const boundary =
      screen.getByTestId("engine-allocation-boundary").textContent ?? "";
    expect(screen.queryByTestId("engine-allocation-target-roles")).toBeNull();
    const targetRoles = screen.getByTestId("engine-allocation-structure").textContent ?? "";
    const targetsIntro =
      screen.getByTestId("engine-allocation-targets-intro").textContent ?? "";
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

    for (const segment of [
      caption,
      philosophy,
      boundary,
      targetRoles,
      targetsIntro,
      trustLegend,
      ...descriptors,
    ]) {
      expect(segment.trim().length).toBeGreaterThan(0);
    }

    expect(caption).toMatch(/these targets are guidance, not current money/i);
    expect(philosophy).toBe("Hedgr shows its targets here: what it sets first, how access works and what the risks are.");
    expect(boundary).toMatch(/not an instruction/i);
    expect(targetRoles).toMatch(/Main target.*Conservative yield.*Reserve/s);
    expect(targetRoles).toMatch(/50%|44%/);
    expect(targetsIntro).toMatch(/Hedgr's planning targets/i);
    expect(targetsIntro).toMatch(/They are not money/i);
  });

  test("keeps shipped panel copy informational and non-accounting", () => {
    render(<EngineAllocationBands engineState={makeContractEngineState()} />);

    const segments = [
      screen.getByTestId("engine-allocation-bands-caption").textContent ?? "",
      screen.getByTestId("engine-allocation-philosophy").textContent ?? "",
      screen.getByTestId("engine-allocation-boundary").textContent ?? "",
      screen.getByTestId("engine-allocation-structure").textContent ?? "",
      screen.getByTestId("engine-allocation-targets-intro").textContent ?? "",
      screen.getByTestId("engine-allocation-trust-legend").textContent ?? "",
      document.getElementById("engine-allocation-band-liquidityTargetPct-desc")
        ?.textContent ?? "",
      document.getElementById("engine-allocation-band-coreTargetPct-desc")
        ?.textContent ?? "",
      document.getElementById("engine-allocation-band-yieldCapPct-desc")
        ?.textContent ?? "",
    ];

    expectInformationalTrustFraming(segments.join("\n"));

    const structure = screen.getByTestId("engine-allocation-structure");
    expect(structure.tagName).toBe("DL");
    expect(structure.querySelector('[role="progressbar"]')).toBeNull();
    expect(structure.textContent).not.toMatch(
      /[$£€]|funded|account|holding|allocated/i
    );
  });
});
