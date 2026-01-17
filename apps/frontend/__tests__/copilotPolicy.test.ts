import { describe, it, expect } from "vitest";
import {
  enforcePolicy,
  POLICY_CONSTANTS,
} from "../lib/server/copilotPolicy";
import type {
  PolicyEnvironment,
  PolicyRecommendation,
} from "../lib/server/copilotPolicy";

// ============================================================================
// Test Fixtures
// ============================================================================

const safeContent = "Here is some general information about savings options.";
const safeContentWithPhrases =
  "Based on current conditions, I recommend waiting. You're always in control of your decisions.";

// ============================================================================
// Tests
// ============================================================================

describe("copilotPolicy", () => {
  describe("enforcePolicy", () => {
    // ──────────────────────────────────────────────────────────────────────────
    // WAIT Phrase Enforcement
    // ──────────────────────────────────────────────────────────────────────────

    describe("WAIT phrase enforcement", () => {
      it('adds "recommend waiting" when missing for WAIT recommendation', () => {
        const result = enforcePolicy({
          content: "You're always in control of your decisions.",
          recommendation: "wait",
          environment: "prod",
        });
        expect(result.toLowerCase()).toContain(
          POLICY_CONSTANTS.WAIT_PHRASE_RECOMMEND
        );
      });

      it('adds "you\'re always in control" when missing for WAIT recommendation', () => {
        const result = enforcePolicy({
          content: "I recommend waiting before proceeding.",
          recommendation: "wait",
          environment: "prod",
        });
        expect(result.toLowerCase()).toContain(
          POLICY_CONSTANTS.WAIT_PHRASE_CONTROL.toLowerCase()
        );
      });

      it("adds both phrases when both are missing for WAIT recommendation", () => {
        const result = enforcePolicy({
          content: "Here is some information about your balance.",
          recommendation: "wait",
          environment: "prod",
        });
        expect(result.toLowerCase()).toContain(
          POLICY_CONSTANTS.WAIT_PHRASE_RECOMMEND
        );
        expect(result.toLowerCase()).toContain(
          POLICY_CONSTANTS.WAIT_PHRASE_CONTROL.toLowerCase()
        );
      });

      it("preserves content when both phrases are already present", () => {
        const content =
          "I recommend waiting until conditions improve. You're always in control.";
        const result = enforcePolicy({
          content,
          recommendation: "wait",
          environment: "prod",
        });
        // Should not have duplicate enforcement paragraph
        expect(result).toBe(content);
      });

      it("handles curly apostrophe variants in control phrase", () => {
        const content =
          "I recommend waiting. You're always in control."; // curly apostrophe
        const result = enforcePolicy({
          content,
          recommendation: "wait",
          environment: "prod",
        });
        // Should recognize the phrase and not add enforcement paragraph
        expect(result).toBe(content);
      });

      it("does not enforce phrases for proceed recommendation", () => {
        const content = "Here is some general information.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(content);
      });

      it("does not enforce phrases for proceed_cautiously recommendation", () => {
        const content = "Here is some general information.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed_cautiously",
          environment: "prod",
        });
        expect(result).toBe(content);
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Urgency Removal
    // ──────────────────────────────────────────────────────────────────────────

    describe("urgency removal", () => {
      it('removes sentences containing "act now"', () => {
        const content = "This is safe. Act now before it's too late! This is also safe.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toContain("act now");
        expect(result).toContain("This is safe.");
        expect(result).toContain("This is also safe.");
      });

      it('removes sentences containing "guaranteed"', () => {
        const content = "Consider your options. This is guaranteed to work! Think carefully.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toContain("guaranteed");
        expect(result).toContain("Consider your options.");
        expect(result).toContain("Think carefully.");
      });

      it('removes sentences containing "risk-free"', () => {
        const content = "Here's info. This is a risk-free opportunity! More info here.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toContain("risk-free");
      });

      it('removes sentences containing "limited time"', () => {
        const content = "Good news. This is a limited time offer! Consider carefully.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toContain("limited time");
      });

      it('removes sentences containing "don\'t miss"', () => {
        const content = "Here's an update. Don't miss this chance! Take your time.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toContain("don't miss");
        expect(result.toLowerCase()).not.toContain("dont miss");
      });

      it('removes sentences containing "best investment"', () => {
        const content = "Consider this. It's the best investment ever! Think it over.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toContain("best investment");
      });

      it('removes sentences containing "APY" (case-insensitive)', () => {
        const content = "Savings info here. The APY is amazing! More details below.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toContain("apy");
      });

      it('removes sentences containing "buy"', () => {
        const content = "Here's your balance. Buy this token now! Check back later.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toMatch(/\bbuy\b/);
      });

      it('removes sentences containing "sell"', () => {
        const content = "Market update. Sell everything immediately! Stay informed.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.toLowerCase()).not.toMatch(/\bsell\b/);
      });

      it("removes entire sentence, not just the blacklisted term", () => {
        const content = "First sentence. Act now and get rich! Third sentence.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).not.toContain("get rich");
        expect(result).toContain("First sentence.");
        expect(result).toContain("Third sentence.");
      });

      it("returns safe fallback when all sentences contain urgency", () => {
        const content = "Act now! Buy this! Don't miss out!";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.SAFE_FALLBACK_RESPONSE);
      });

      it("handles multiple urgency terms in same sentence", () => {
        const content = "Safe sentence. Buy now and don't miss this guaranteed deal! Another safe one.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).not.toContain("guaranteed");
        expect(result).toContain("Safe sentence.");
        expect(result).toContain("Another safe one.");
      });

      it("does not flag words containing blacklist terms as substrings", () => {
        // "buyer" contains "buy" but should not be flagged
        const content = "The buyer made a decision. Consider your options.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toContain("buyer");
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Advice Refusal
    // ──────────────────────────────────────────────────────────────────────────

    describe("advice refusal", () => {
      it('triggers refusal for "you should invest"', () => {
        const content = "Based on your situation, you should invest in this fund.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "you should buy"', () => {
        const content = "I think you should buy more of this asset.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "you should sell"', () => {
        const content = "Given the market conditions, you should sell your holdings.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "I recommend you invest"', () => {
        const content = "I recommend you invest in a diversified portfolio.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "I suggest you buy"', () => {
        const content = "I suggest you buy this stock while it's low.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "put your money into"', () => {
        const content = "You should put your money into stable assets.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "allocate your funds to"', () => {
        const content = "I recommend you allocate your funds to this pool.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "the best option is to invest"', () => {
        const content = "The best option is to invest in bonds right now.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it('triggers refusal for "invest $1000"', () => {
        const content = "You could invest $1,000 in this opportunity.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it("does NOT trigger refusal for disclaimers", () => {
        const content = "I can't recommend that you invest or make specific financial decisions.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).not.toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it("does NOT trigger refusal for educational content", () => {
        const content = "When people invest, they typically consider risk tolerance and time horizon.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).not.toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it("does NOT trigger refusal for hypotheticals", () => {
        const content = "If you were to invest, you would need to consider the fees involved.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).not.toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it("does NOT trigger refusal for general information", () => {
        const content = "Investing involves risk. Past performance does not guarantee future results.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).not.toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it("advice refusal takes precedence over urgency removal", () => {
        const content = "Act now! You should invest immediately!";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        // Advice refusal should be returned, not urgency-sanitized content
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it("advice refusal takes precedence over WAIT enforcement", () => {
        const content = "You should invest in this. I recommend waiting.";
        const result = enforcePolicy({
          content,
          recommendation: "wait",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Non-Destructive Behavior
    // ──────────────────────────────────────────────────────────────────────────

    describe("non-destructive behavior", () => {
      it("returns safe content unchanged for proceed recommendation in prod", () => {
        const result = enforcePolicy({
          content: safeContent,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(safeContent);
      });

      it("returns safe content unchanged for proceed_cautiously in prod", () => {
        const result = enforcePolicy({
          content: safeContent,
          recommendation: "proceed_cautiously",
          environment: "prod",
        });
        expect(result).toBe(safeContent);
      });

      it("preserves content with required phrases for WAIT in prod", () => {
        const result = enforcePolicy({
          content: safeContentWithPhrases,
          recommendation: "wait",
          environment: "prod",
        });
        expect(result).toBe(safeContentWithPhrases);
      });

      it("does not mutate input params", () => {
        const params = {
          content: "Original content here.",
          recommendation: "proceed" as PolicyRecommendation,
          environment: "prod" as PolicyEnvironment,
        };
        const originalContent = params.content;
        enforcePolicy(params);
        expect(params.content).toBe(originalContent);
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Environment Disclosure
    // ──────────────────────────────────────────────────────────────────────────

    describe("environment disclosure", () => {
      it("appends disclosure note for dev environment", () => {
        const result = enforcePolicy({
          content: safeContent,
          recommendation: "proceed",
          environment: "dev",
        });
        expect(result).toContain(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE);
      });

      it("appends disclosure note for stg environment", () => {
        const result = enforcePolicy({
          content: safeContent,
          recommendation: "proceed",
          environment: "stg",
        });
        expect(result).toContain(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE);
      });

      it("does NOT append disclosure note for prod environment", () => {
        const result = enforcePolicy({
          content: safeContent,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).not.toContain(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE);
      });

      it("does NOT append duplicate disclosure if already mentions mock", () => {
        const content = "This uses mock data for testing purposes.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "dev",
        });
        expect(result).not.toContain(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE);
        expect(result).toBe(content);
      });

      it("does NOT append duplicate disclosure if already mentions simulated", () => {
        const content = "Results shown are based on simulated data.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "dev",
        });
        expect(result).not.toContain(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE);
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Determinism
    // ──────────────────────────────────────────────────────────────────────────

    describe("determinism", () => {
      it("produces identical output for same inputs", () => {
        const params = {
          content: "Some content with mixed elements.",
          recommendation: "wait" as PolicyRecommendation,
          environment: "dev" as PolicyEnvironment,
        };
        const result1 = enforcePolicy(params);
        const result2 = enforcePolicy(params);
        expect(result1).toBe(result2);
      });

      it("produces identical output for equivalent objects", () => {
        const params1 = {
          content: "Test content here.",
          recommendation: "proceed" as PolicyRecommendation,
          environment: "prod" as PolicyEnvironment,
        };
        const params2 = {
          content: "Test content here.",
          recommendation: "proceed" as PolicyRecommendation,
          environment: "prod" as PolicyEnvironment,
        };
        expect(enforcePolicy(params1)).toBe(enforcePolicy(params2));
      });

      it("is consistent across multiple calls", () => {
        const testCases = [
          {
            params: { content: safeContent, recommendation: "proceed" as PolicyRecommendation, environment: "prod" as PolicyEnvironment },
          },
          {
            params: { content: "You should invest now.", recommendation: "proceed" as PolicyRecommendation, environment: "prod" as PolicyEnvironment },
          },
          {
            params: { content: "Act now! Limited time!", recommendation: "proceed" as PolicyRecommendation, environment: "dev" as PolicyEnvironment },
          },
          {
            params: { content: "General info.", recommendation: "wait" as PolicyRecommendation, environment: "stg" as PolicyEnvironment },
          },
        ];

        for (const { params } of testCases) {
          const expected = enforcePolicy(params);
          for (let i = 0; i < 10; i++) {
            expect(enforcePolicy(params)).toBe(expected);
          }
        }
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Edge Cases
    // ──────────────────────────────────────────────────────────────────────────

    describe("edge cases", () => {
      it("returns safe fallback for empty string", () => {
        const result = enforcePolicy({
          content: "",
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.SAFE_FALLBACK_RESPONSE);
      });

      it("returns safe fallback for whitespace-only string", () => {
        const result = enforcePolicy({
          content: "   \n\t  ",
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toBe(POLICY_CONSTANTS.SAFE_FALLBACK_RESPONSE);
      });

      it("handles content without sentence-ending punctuation", () => {
        const content = "This is content without a period";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toContain("This is content");
      });

      it("handles mixed punctuation (., !, ?)", () => {
        const content = "Question here? Statement here. Exclamation here! More text.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toContain("Question here?");
        expect(result).toContain("Statement here.");
        expect(result).toContain("Exclamation here!");
      });

      it("handles unicode content", () => {
        const content = "Here's some info with émojis 🎉 and spëcial characters.";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result).toContain("émojis");
        expect(result).toContain("🎉");
      });

      it("handles very long content", () => {
        const longContent = "Safe sentence. ".repeat(1000);
        const result = enforcePolicy({
          content: longContent,
          recommendation: "proceed",
          environment: "prod",
        });
        expect(result.length).toBeGreaterThan(0);
        expect(result).toContain("Safe sentence.");
      });

      it("never throws regardless of input", () => {
        const edgeCases = [
          { content: "", recommendation: "proceed", environment: "prod" },
          { content: null as unknown as string, recommendation: "proceed", environment: "prod" },
          { content: undefined as unknown as string, recommendation: "proceed", environment: "prod" },
          { content: "normal", recommendation: "invalid" as PolicyRecommendation, environment: "prod" },
          { content: "normal", recommendation: "proceed", environment: "invalid" as PolicyEnvironment },
        ];

        for (const params of edgeCases) {
          expect(() => enforcePolicy(params as any)).not.toThrow();
        }
      });

      it("always returns non-empty string", () => {
        const testCases = [
          { content: "", recommendation: "proceed" as PolicyRecommendation, environment: "prod" as PolicyEnvironment },
          { content: "Buy now! Sell fast! Act now!", recommendation: "proceed" as PolicyRecommendation, environment: "prod" as PolicyEnvironment },
          { content: "   ", recommendation: "wait" as PolicyRecommendation, environment: "dev" as PolicyEnvironment },
        ];

        for (const params of testCases) {
          const result = enforcePolicy(params);
          expect(result.length).toBeGreaterThan(0);
          expect(result.trim().length).toBeGreaterThan(0);
        }
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Enforcement Order
    // ──────────────────────────────────────────────────────────────────────────

    describe("enforcement order", () => {
      it("applies advice refusal before urgency removal", () => {
        // Content has both advice and urgency
        const content = "You should invest now! Act now!";
        const result = enforcePolicy({
          content,
          recommendation: "proceed",
          environment: "prod",
        });
        // Should return advice refusal, not urgency-sanitized content
        expect(result).toBe(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE);
      });

      it("applies urgency removal before WAIT enforcement", () => {
        // Content has urgency but no WAIT phrases
        const content = "This is info. Buy now! More info here.";
        const result = enforcePolicy({
          content,
          recommendation: "wait",
          environment: "prod",
        });
        // Should remove urgency, then add WAIT phrases
        expect(result.toLowerCase()).not.toMatch(/\bbuy\b/);
        expect(result.toLowerCase()).toContain(POLICY_CONSTANTS.WAIT_PHRASE_RECOMMEND);
      });

      it("applies WAIT enforcement before environment disclosure", () => {
        const content = "Some information here.";
        const result = enforcePolicy({
          content,
          recommendation: "wait",
          environment: "dev",
        });
        // Should have WAIT phrases AND environment disclosure
        expect(result.toLowerCase()).toContain(POLICY_CONSTANTS.WAIT_PHRASE_RECOMMEND);
        expect(result).toContain(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE);
        // Disclosure should be at the end
        expect(result.endsWith(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE)).toBe(true);
      });
    });

    // ──────────────────────────────────────────────────────────────────────────
    // Return Type Validation
    // ──────────────────────────────────────────────────────────────────────────

    describe("return type validation", () => {
      it("always returns a string", () => {
        const testCases = [
          { content: safeContent, recommendation: "proceed" as PolicyRecommendation, environment: "prod" as PolicyEnvironment },
          { content: "", recommendation: "wait" as PolicyRecommendation, environment: "dev" as PolicyEnvironment },
          { content: "You should invest.", recommendation: "proceed_cautiously" as PolicyRecommendation, environment: "stg" as PolicyEnvironment },
        ];

        for (const params of testCases) {
          const result = enforcePolicy(params);
          expect(typeof result).toBe("string");
        }
      });
    });
  });

  // ──────────────────────────────────────────────────────────────────────────
  // Constants Validation
  // ──────────────────────────────────────────────────────────────────────────

  describe("POLICY_CONSTANTS", () => {
    it("exports required constants", () => {
      expect(POLICY_CONSTANTS.WAIT_PHRASE_RECOMMEND).toBeDefined();
      expect(POLICY_CONSTANTS.WAIT_PHRASE_CONTROL).toBeDefined();
      expect(POLICY_CONSTANTS.ENV_DISCLOSURE_NOTE).toBeDefined();
      expect(POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE).toBeDefined();
      expect(POLICY_CONSTANTS.SAFE_FALLBACK_RESPONSE).toBeDefined();
      expect(POLICY_CONSTANTS.URGENCY_BLACKLIST).toBeDefined();
    });

    it("advice refusal contains control phrase", () => {
      expect(
        POLICY_CONSTANTS.ADVICE_REFUSAL_RESPONSE.toLowerCase()
      ).toContain(POLICY_CONSTANTS.WAIT_PHRASE_CONTROL.toLowerCase());
    });

    it("safe fallback is non-empty", () => {
      expect(POLICY_CONSTANTS.SAFE_FALLBACK_RESPONSE.length).toBeGreaterThan(0);
    });

    it("urgency blacklist contains expected terms", () => {
      const expectedTerms = ["act now", "guaranteed", "risk-free", "buy", "sell"];
      for (const term of expectedTerms) {
        expect(POLICY_CONSTANTS.URGENCY_BLACKLIST).toContain(term);
      }
    });
  });
});
