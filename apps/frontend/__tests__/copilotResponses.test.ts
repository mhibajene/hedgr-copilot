import { describe, it, expect } from "vitest";
import {
  buildResponseTemplate,
  RESPONSE_TEMPLATES,
  RESPONSE_CONSTANTS,
} from "../lib/server/copilotResponses";
import type { CopilotResponseType } from "../lib/server/copilotResponses";

// ============================================================================
// Test Fixtures
// ============================================================================

const allResponseTypes: CopilotResponseType[] = [
  "proceed",
  "proceed_cautiously",
  "wait",
  "refusal",
];

// ============================================================================
// Snapshot Tests
// ============================================================================

describe("copilotResponses", () => {
  describe("buildResponseTemplate snapshots", () => {
    it("proceed template matches snapshot", () => {
      const result = buildResponseTemplate("proceed");
      expect(result).toMatchInlineSnapshot(`
        "I understand what you're asking about.
        Based on the information available, it may be reasonable to proceed.
        Conditions appear stable, and there are no clear signals suggesting elevated risk right now.
        You're always in control, and it's okay to pause or reassess at any time."
      `);
    });

    it("proceed_cautiously template matches snapshot", () => {
      const result = buildResponseTemplate("proceed_cautiously");
      expect(result).toMatchInlineSnapshot(`
        "I see what you're considering.
        You may choose to proceed cautiously.
        Some signals suggest increased uncertainty, so moving slowly or waiting for more clarity could be sensible.
        You're always in control, and choosing to wait is a valid option."
      `);
    });

    it("wait template matches snapshot", () => {
      const result = buildResponseTemplate("wait");
      expect(result).toMatchInlineSnapshot(`
        "Thanks for raising this.
        I recommend waiting for now.
        Current conditions are unclear, and taking time can help reduce unnecessary risk.
        You're always in control, and waiting is an active decision, not a missed opportunity."
      `);
    });

    it("refusal template matches snapshot", () => {
      const result = buildResponseTemplate("refusal");
      expect(result).toMatchInlineSnapshot(`
        "I understand what you're asking.
        I can't provide financial advice or tell you what to invest in.
        My role is to explain how Hedgr works and share general information about saving safely.
        You're always in control, and the final decision is yours."
      `);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Structural Tests (4-Part Structure)
  // ──────────────────────────────────────────────────────────────────────────

  describe("structural requirements", () => {
    it.each(allResponseTypes)(
      "%s template has exactly 4 sections (lines)",
      (type) => {
        const result = buildResponseTemplate(type);
        const lines = result.split("\n").filter((line) => line.trim().length > 0);
        expect(lines).toHaveLength(4);
      }
    );

    it.each(allResponseTypes)(
      "%s template contains control phrase",
      (type) => {
        const result = buildResponseTemplate(type);
        expect(result).toContain(RESPONSE_CONSTANTS.CONTROL_PHRASE);
      }
    );

    it.each(allResponseTypes)(
      "%s template ends with control phrase section (last line)",
      (type) => {
        const result = buildResponseTemplate(type);
        const lines = result.split("\n").filter((line) => line.trim().length > 0);
        const lastLine = lines[lines.length - 1];
        expect(lastLine).toContain(RESPONSE_CONSTANTS.CONTROL_PHRASE);
      }
    );

    it.each(allResponseTypes)(
      "%s template has ~4 sentences (concise)",
      (type) => {
        const result = buildResponseTemplate(type);
        // Count sentence-ending punctuation
        const sentenceCount = (result.match(/[.!?]/g) || []).length;
        expect(sentenceCount).toBeGreaterThanOrEqual(4);
        expect(sentenceCount).toBeLessThanOrEqual(6);
      }
    );
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Forbidden Language Tests
  // ──────────────────────────────────────────────────────────────────────────

  describe("forbidden language", () => {
    it.each(allResponseTypes)(
      "%s template contains no digits",
      (type) => {
        const result = buildResponseTemplate(type);
        expect(result).not.toMatch(/\d/);
      }
    );

    it.each(allResponseTypes)(
      "%s template contains no percentages",
      (type) => {
        const result = buildResponseTemplate(type);
        expect(result).not.toMatch(/\d+(\.\d+)?%/);
        expect(result).not.toContain("%");
      }
    );

    it.each(allResponseTypes)(
      "%s template contains no APY/yield mentions",
      (type) => {
        const result = buildResponseTemplate(type);
        expect(result.toLowerCase()).not.toContain("apy");
        expect(result.toLowerCase()).not.toContain("yield");
      }
    );

    it.each(allResponseTypes)(
      "%s template contains no urgency language",
      (type) => {
        const result = buildResponseTemplate(type);
        const lower = result.toLowerCase();
        expect(lower).not.toContain("act now");
        expect(lower).not.toContain("don't miss");
        expect(lower).not.toContain("limited time");
        expect(lower).not.toContain("guaranteed");
        expect(lower).not.toContain("risk-free");
      }
    );

    it.each(allResponseTypes)(
      "%s template contains no guarantees or certainty claims",
      (type) => {
        const result = buildResponseTemplate(type);
        const lower = result.toLowerCase();
        expect(lower).not.toContain("guarantee");
        // Use word boundary to avoid matching "uncertainty"
        expect(lower).not.toMatch(/\bcertain\b/);
        expect(lower).not.toContain("definitely");
        expect(lower).not.toContain("absolutely");
        expect(lower).not.toContain("100%");
      }
    );
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Param Substitution Tests
  // ──────────────────────────────────────────────────────────────────────────

  describe("param substitution", () => {
    it("uses custom acknowledge when provided", () => {
      const customAck = "I hear your concern about this topic.";
      const result = buildResponseTemplate("proceed", { acknowledge: customAck });
      expect(result).toContain(customAck);
      expect(result).not.toContain(RESPONSE_TEMPLATES.proceed.acknowledge);
    });

    it("uses custom explanation when provided", () => {
      const customExp = "The current market conditions suggest stability.";
      const result = buildResponseTemplate("wait", { explanation: customExp });
      expect(result).toContain(customExp);
      expect(result).not.toContain(RESPONSE_TEMPLATES.wait.explain);
    });

    it("preserves structure when both params provided", () => {
      const result = buildResponseTemplate("proceed_cautiously", {
        acknowledge: "Custom acknowledgment here.",
        explanation: "Custom explanation here.",
      });
      const lines = result.split("\n").filter((line) => line.trim().length > 0);
      expect(lines).toHaveLength(4);
      expect(lines[0]).toBe("Custom acknowledgment here.");
      expect(lines[2]).toBe("Custom explanation here.");
      // Recommend and control are unchanged
      expect(lines[1]).toBe(RESPONSE_TEMPLATES.proceed_cautiously.recommend);
      expect(lines[3]).toContain(RESPONSE_CONSTANTS.CONTROL_PHRASE);
    });

    it("falls back to defaults for empty string params", () => {
      const result = buildResponseTemplate("proceed", {
        acknowledge: "",
        explanation: "   ",
      });
      expect(result).toContain(RESPONSE_TEMPLATES.proceed.acknowledge);
      expect(result).toContain(RESPONSE_TEMPLATES.proceed.explain);
    });

    it("falls back to defaults for undefined params", () => {
      const result = buildResponseTemplate("refusal", {
        acknowledge: undefined,
        explanation: undefined,
      });
      expect(result).toContain(RESPONSE_TEMPLATES.refusal.acknowledge);
      expect(result).toContain(RESPONSE_TEMPLATES.refusal.explain);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Sanitization Tests
  // ──────────────────────────────────────────────────────────────────────────

  describe("param sanitization", () => {
    it("strips percentages from acknowledge param", () => {
      const result = buildResponseTemplate("proceed", {
        acknowledge: "I see you're asking about the 5.2% rate.",
      });
      expect(result).not.toMatch(/\d+(\.\d+)?%/);
      expect(result).not.toContain("5.2");
    });

    it("strips dollar amounts from explanation param", () => {
      const result = buildResponseTemplate("wait", {
        explanation: "The $1,000 deposit shows pending status.",
      });
      expect(result).not.toContain("$1,000");
      expect(result).not.toContain("1,000");
    });

    it("strips APY mentions from params", () => {
      const result = buildResponseTemplate("proceed", {
        acknowledge: "Regarding the APY you mentioned.",
      });
      expect(result.toLowerCase()).not.toContain("apy");
    });

    it("strips yield mentions from params", () => {
      const result = buildResponseTemplate("proceed_cautiously", {
        explanation: "The yield on this product varies.",
      });
      expect(result.toLowerCase()).not.toContain("yield");
    });

    it("strips multi-digit numbers from params", () => {
      const result = buildResponseTemplate("wait", {
        acknowledge: "I see you have 500 tokens.",
      });
      expect(result).not.toContain("500");
    });

    it("cleans up multiple spaces after stripping", () => {
      const result = buildResponseTemplate("proceed", {
        acknowledge: "I see   your   question about 50% rates.",
      });
      expect(result).not.toMatch(/\s{2,}/);
    });

    it("falls back to default when param becomes empty after sanitization", () => {
      const result = buildResponseTemplate("proceed", {
        acknowledge: "5% 10% 15%", // All content is forbidden
      });
      expect(result).toContain(RESPONSE_TEMPLATES.proceed.acknowledge);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Max Length Tests
  // ──────────────────────────────────────────────────────────────────────────

  describe("max length enforcement", () => {
    it("caps acknowledge param at max length", () => {
      const longAck = "A".repeat(300);
      const result = buildResponseTemplate("proceed", { acknowledge: longAck });
      const lines = result.split("\n");
      expect(lines[0].length).toBeLessThanOrEqual(
        RESPONSE_CONSTANTS.MAX_PARAM_LENGTH
      );
    });

    it("caps explanation param at max length", () => {
      const longExp = "B".repeat(300);
      const result = buildResponseTemplate("wait", { explanation: longExp });
      const lines = result.split("\n");
      // Explanation is line 3 (index 2)
      expect(lines[2].length).toBeLessThanOrEqual(
        RESPONSE_CONSTANTS.MAX_PARAM_LENGTH
      );
    });

    it("truncates at word boundary when possible", () => {
      // Use varying word lengths to test boundary detection
      const longText = "alpha bravo charlie delta echo foxtrot golf ".repeat(8); // ~350 chars
      const result = buildResponseTemplate("proceed", { acknowledge: longText });
      const lines = result.split("\n");
      // Should not end mid-word (no partial word at end)
      // A properly truncated line ends with a complete word
      expect(lines[0]).toMatch(/[a-z]$/);
      expect(lines[0].length).toBeLessThanOrEqual(RESPONSE_CONSTANTS.MAX_PARAM_LENGTH);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Determinism Tests
  // ──────────────────────────────────────────────────────────────────────────

  describe("determinism", () => {
    it.each(allResponseTypes)(
      "%s produces identical output for same inputs",
      (type) => {
        const result1 = buildResponseTemplate(type);
        const result2 = buildResponseTemplate(type);
        expect(result1).toBe(result2);
      }
    );

    it("produces identical output with same params", () => {
      const params = {
        acknowledge: "Custom ack.",
        explanation: "Custom exp.",
      };
      const result1 = buildResponseTemplate("proceed", params);
      const result2 = buildResponseTemplate("proceed", params);
      expect(result1).toBe(result2);
    });

    it("is consistent across multiple calls", () => {
      for (const type of allResponseTypes) {
        const expected = buildResponseTemplate(type);
        for (let i = 0; i < 10; i++) {
          expect(buildResponseTemplate(type)).toBe(expected);
        }
      }
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Edge Cases
  // ──────────────────────────────────────────────────────────────────────────

  describe("edge cases", () => {
    it("handles undefined params object", () => {
      const result = buildResponseTemplate("proceed", undefined);
      expect(result).toContain(RESPONSE_TEMPLATES.proceed.acknowledge);
    });

    it("handles empty params object", () => {
      const result = buildResponseTemplate("wait", {});
      expect(result).toContain(RESPONSE_TEMPLATES.wait.acknowledge);
    });

    it("always returns non-empty string", () => {
      for (const type of allResponseTypes) {
        const result = buildResponseTemplate(type);
        expect(result.length).toBeGreaterThan(0);
        expect(result.trim().length).toBeGreaterThan(0);
      }
    });

    it("handles params with only whitespace", () => {
      const result = buildResponseTemplate("refusal", {
        acknowledge: "   \n\t   ",
        explanation: "   ",
      });
      expect(result).toContain(RESPONSE_TEMPLATES.refusal.acknowledge);
      expect(result).toContain(RESPONSE_TEMPLATES.refusal.explain);
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Constants Validation
  // ──────────────────────────────────────────────────────────────────────────

  describe("RESPONSE_CONSTANTS", () => {
    it("exports required constants", () => {
      expect(RESPONSE_CONSTANTS.CONTROL_PHRASE).toBeDefined();
      expect(RESPONSE_CONSTANTS.MAX_PARAM_LENGTH).toBeDefined();
      expect(RESPONSE_CONSTANTS.FORBIDDEN_PATTERNS).toBeDefined();
    });

    it("CONTROL_PHRASE is non-empty", () => {
      expect(RESPONSE_CONSTANTS.CONTROL_PHRASE.length).toBeGreaterThan(0);
    });

    it("MAX_PARAM_LENGTH is reasonable", () => {
      expect(RESPONSE_CONSTANTS.MAX_PARAM_LENGTH).toBeGreaterThan(50);
      expect(RESPONSE_CONSTANTS.MAX_PARAM_LENGTH).toBeLessThanOrEqual(500);
    });
  });

  describe("RESPONSE_TEMPLATES", () => {
    it("exports all four response types", () => {
      expect(RESPONSE_TEMPLATES.proceed).toBeDefined();
      expect(RESPONSE_TEMPLATES.proceed_cautiously).toBeDefined();
      expect(RESPONSE_TEMPLATES.wait).toBeDefined();
      expect(RESPONSE_TEMPLATES.refusal).toBeDefined();
    });

    it("each template has all four sections", () => {
      for (const type of allResponseTypes) {
        const template = RESPONSE_TEMPLATES[type];
        expect(template.acknowledge).toBeDefined();
        expect(template.recommend).toBeDefined();
        expect(template.explain).toBeDefined();
        expect(template.control).toBeDefined();
      }
    });

    it("each template control section includes CONTROL_PHRASE", () => {
      for (const type of allResponseTypes) {
        const template = RESPONSE_TEMPLATES[type];
        expect(template.control).toContain(RESPONSE_CONSTANTS.CONTROL_PHRASE);
      }
    });
  });
});
