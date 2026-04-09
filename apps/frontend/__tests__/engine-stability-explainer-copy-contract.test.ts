import { describe, expect, test } from 'vitest';
import {
  ENGINE_STABILITY_EXPLAINER_FOOTER,
  ENGINE_STABILITY_EXPLAINER_INTRO,
  ENGINE_STABILITY_EXPLAINER_PRINCIPLES,
  ENGINE_STABILITY_EXPLAINER_SUMMARY,
  ENGINE_STABILITY_EXPLAINER_TERMS,
} from '../lib/engine/stability-explainer-copy';
import { ENGINE_TRUST_INFORMATIONAL_DENYLIST } from './engine-trust-framing-denylist';

function allStabilityExplainerCopySegments(): string[] {
  const fromTerms = ENGINE_STABILITY_EXPLAINER_TERMS.flatMap(({ term, definition }) => [
    term,
    definition,
  ]);
  return [
    ENGINE_STABILITY_EXPLAINER_SUMMARY,
    ENGINE_STABILITY_EXPLAINER_INTRO,
    ...fromTerms,
    ...ENGINE_STABILITY_EXPLAINER_PRINCIPLES,
    ENGINE_STABILITY_EXPLAINER_FOOTER,
  ];
}

const STABILITY_EXPLAINER_COPY_SEGMENTS = allStabilityExplainerCopySegments();

describe('ENGINE_STABILITY_EXPLAINER copy contract', () => {
  test.each(
    STABILITY_EXPLAINER_COPY_SEGMENTS.map((text, idx) => [`segment-${idx}`, text] as const),
  )('%s has non-empty shipped copy', (_, text) => {
    expect(text.trim().length).toBeGreaterThan(0);
  });

  test.each(
    STABILITY_EXPLAINER_COPY_SEGMENTS.map((text, idx) => [`segment-${idx}`, text] as const),
  )('%s avoids execution, accounting, and hype framing drift', (_, text) => {
    const lower = text.toLowerCase();
    for (const forbidden of ENGINE_TRUST_INFORMATIONAL_DENYLIST) {
      expect(lower).not.toContain(forbidden);
    }
    expect(lower).not.toMatch(/\bexecuted\b/);
    expect(lower).not.toMatch(/\bguaranteed\b/);
  });
});
