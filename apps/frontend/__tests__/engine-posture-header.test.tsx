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
    ).toContain("This is what happened in your simulation.");
    expect(
      screen.getByTestId("dashboard-current-status").textContent
    ).not.toMatch(/score|gauge|safe|all clear/i);
    expect(screen.queryByTestId("engine-posture-badge")).toBeNull();
    expect(screen.queryByText("NORMAL")).toBeNull();
    expect(screen.queryByTestId("engine-posture-action-guidance")).toBeNull();
  });

  test("shows a first step instead of a Hedgr notice before any completed event", () => {
    render(
      <EnginePostureHeader
        engineState={getMockEngineState("normal")}
        syntheticJourneyActive
        redesigned
        comparisonState="empty"
      />
    );

    expect(screen.getByText("Start with a simulated deposit")).toBeDefined();
    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "Nothing to compare yet. Add a simulated deposit when you’re ready — this is practice money only."
    );
    expect(screen.queryByText("What Hedgr notices")).toBeNull();
    expect(screen.queryByText("This is what happened in your simulation. It doesn’t tell you what will happen next.")).toBeNull();
    expect(screen.queryByTestId("engine-simulation-attention-answer")).toBeNull();
  });

  test("shows a bounded observation after the first completed event", () => {
    render(
      <EnginePostureHeader
        engineState={getMockEngineState("normal")}
        syntheticJourneyActive
        redesigned
        comparisonState="first-event"
      />
    );

    expect(screen.getByTestId("engine-posture-context").textContent).toBe(
      "Your first simulated position is now visible. This is your starting point."
    );
    expect(screen.getByText("What Hedgr notices")).toBeDefined();
    expect(
      screen.queryByTestId("engine-simulation-attention-answer")
    ).toBeNull();
    expect(screen.queryByText("Does anything need attention?")).toBeNull();
    expect(screen.getByText(
      "This is what happened in your simulation. It doesn’t tell you what will happen next."
    )).toBeDefined();
    expect(
      screen.getByTestId("dashboard-current-status").textContent
    ).not.toMatch(/all clear|safe|stable|protected|guaranteed/i);
  });

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
            "This is what happened in your simulation. It doesn’t tell you what will happen next."
          )).toBeDefined();
        }
      );
    }
  );

  test.each(["tightening", "tightened", "recovery"] as const)(
    "preserves %s caution without an early Hedgr-notices label",
    (posture) => {
      const engineState = getMockEngineState(posture);
      render(
        <EnginePostureHeader
          engineState={engineState}
          syntheticJourneyActive
          redesigned
          comparisonState="empty"
        />
      );
      expect(screen.getByText("Current status")).toBeDefined();
      expect(screen.queryByText("What Hedgr notices")).toBeNull();
      expect(screen.getByText(engineState.notice!.title)).toBeDefined();
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


test.each([
  ["/dashboard-synthetic-journey", "", true, "simulated activity"],
  ["/dashboard", "journey=class-a-val-002", true, "simulated activity"],
  ["/dashboard", "", true, "information shown"],
  ["/dashboard-synthetic-journey", "scenario=unavailable-data", true, "information shown"],
  ["/dashboard-synthetic-journey", "", false, "information shown"],
])("currency opt-in respects route eligibility: %s?%s / %s", (path, query, optIn, words) => {
  vi.mocked(usePathname).mockReturnValue(path);
  vi.mocked(useSearchParams).mockReturnValue(new URLSearchParams(query) as ReturnType<typeof useSearchParams>);
  render(<EnginePostureHeader engineState={getMockEngineState("normal")} syntheticJourneyActive currencyContextVisible={optIn} />);
  expect(screen.getByTestId("engine-simulation-attention-answer").textContent).toBe(`No other change stands out in the ${words}.`);
});

test.each(["tightening", "tightened", "recovery"] as const)("currency opt-in preserves %s attention and notices", posture => {
  render(<EnginePostureHeader engineState={getMockEngineState(posture)} syntheticJourneyActive currencyContextVisible />);
  expect(screen.getByTestId("engine-simulation-attention-answer").textContent).toBe("A change in the guidance needs review.");
  expect(screen.getByTestId("engine-posture-banner").textContent).toContain(getMockEngineState(posture).notice!.title);
});


test.each(["tightening", "tightened", "recovery"] as const)("redesigned research Home preserves %s attention and notices", posture => {
  const engineState = getMockEngineState(posture);
  render(<EnginePostureHeader engineState={engineState} syntheticJourneyActive redesigned comparisonState="change" latestChangeType="WITHDRAW" latestChangeAmountUSD={200} />);
  expect(screen.getByTestId("engine-simulation-attention-answer").textContent).toBe("A change in the guidance needs review.");
  expect(screen.getByTestId("engine-posture-banner").getAttribute("role")).toBe("status");
  expect(screen.getByText(engineState.notice!.title)).toBeDefined();
  expect(screen.getByText(engineState.notice!.body)).toBeDefined();
  expect(screen.getByText("This is what happened in your simulation. It doesn’t tell you what will happen next.")).toBeDefined();
  expect(screen.queryByText("What changed")).toBeNull();
});


test.each([
  ["DEPOSIT", "deposit"],
  ["WITHDRAW", "withdrawal"],
] as const)("polished %s observation retains readable amount and simulation boundary", (type, direction) => {
  render(<EnginePostureHeader engineState={getMockEngineState("normal")} syntheticJourneyActive redesigned comparisonState="change" latestChangeType={type} latestChangeAmountUSD={2} />);
  expect(screen.getByTestId("engine-posture-context").textContent).toBe(`A simulated ${direction} of $2.00.`);
  expect(screen.getByText("This is what happened in your simulation. It doesn’t tell you what will happen next.")).toBeDefined();
  expect(screen.queryByTestId("engine-posture-banner")).toBeNull();
});

const B_LIMIT = 'This is what happened in your simulation. It doesn’t tell you what will happen next.';
const B_QUALIFIER = 'Illustrative example values, not live targets or advice';

test('Journey What changed states type amount and actual event date once', () => {
  const today = new Date(2026, 9, 13, 12).getTime();
  for (const type of ['DEPOSIT', 'WITHDRAW'] as const) {
    for (const [createdAt, suffix] of [
      [today - 3600000, ' today'],
      [new Date(2026, 9, 12, 12).getTime(), ' on 12 Oct'],
      [new Date(2026, 8, 9, 12).getTime(), ' on 9 Sep'],
      [undefined, ''],
    ] as const) {
      cleanup();
      const metadata = { latestChangeCreatedAt: createdAt, homeDate: today };
      render(<EnginePostureHeader engineState={getMockEngineState('normal')} syntheticJourneyActive redesigned comparisonState="change" latestChangeType={type} latestChangeAmountUSD={20} {...metadata} />);
      const context = screen.getByTestId('engine-posture-context');
      expect(context.textContent).toBe(`A simulated ${type === 'DEPOSIT' ? 'deposit' : 'withdrawal'} of $20.00${suffix}.`);
      expect(context.textContent?.match(/\$20\.00/g)).toHaveLength(1);
      expect(context.textContent).not.toMatch(/balance by|position from|→/);
    }
  }
});

test('Own-simulation card is understandable without the graphic', () => {
  render(<EnginePostureHeader engineState={getMockEngineState('normal')} syntheticJourneyActive redesigned comparisonState="change" latestChangeType="WITHDRAW" latestChangeAmountUSD={20} />);
  const heading = screen.getByRole('heading', { name: 'What changed', level: 2 });
  const card = screen.getByTestId('dashboard-current-status');
  expect(card.getAttribute('aria-labelledby')).toBe(heading.id);
  const context = screen.getByTestId('engine-posture-context');
  const inclusion = screen.getByText('This simulated withdrawal is included in the balance above.');
  const limit = screen.getByText(B_LIMIT);
  expect(context.compareDocumentPosition(inclusion) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(inclusion.nextElementSibling).toBe(limit);
  expect(card.querySelector('[aria-live], [tabindex], svg, img')).toBeNull();
  expect(card.getAttribute('role')).not.toBe('status');
});

test('Posture and percentage regions identify illustrative values before the reading', () => {
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  for (const syntheticJourneyActive of [false, true]) {
    for (const posture of ['normal', 'tightening', 'tightened', 'recovery'] as const) {
      for (const missingNotice of [false, true]) {
        cleanup();
        const state = { ...getMockEngineState(posture), ...(missingNotice ? { notice: undefined } : {}) };
        render(<EnginePostureHeader engineState={state} syntheticJourneyActive={syntheticJourneyActive} redesigned={syntheticJourneyActive} latestChangeType="WITHDRAW" latestChangeAmountUSD={20} />);
        const labels = screen.queryAllByText(B_QUALIFIER, { exact: true });
        expect(labels).toHaveLength(!syntheticJourneyActive || posture !== 'normal' ? 1 : 0);
        if (labels.length) {
          expect(labels[0].closest('[aria-hidden="true"]')).toBeNull();
          expect(labels[0].compareDocumentPosition(screen.getByTestId('engine-posture-context')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
          if (!syntheticJourneyActive) expect(labels[0].compareDocumentPosition(screen.getByTestId('engine-posture-badge')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
        }
        if (missingNotice) expect(screen.queryByTestId('engine-posture-banner')).toBeNull();
      }
    }
  }
});
