"use client";

import React from "react";
import {
  ENGINE_STABILITY_EXPLAINER_FOOTER,
  ENGINE_STABILITY_EXPLAINER_INTRO,
  ENGINE_STABILITY_EXPLAINER_PRINCIPLES,
  ENGINE_STABILITY_EXPLAINER_SUMMARY,
  ENGINE_STABILITY_EXPLAINER_TERMS,
} from "../../../lib/engine/stability-explainer-copy";

export function EngineStabilityExplainer() {
  return (
    <details
      className="rounded-2xl border border-[#A6B0D8] bg-white p-5 text-sm text-[#1F2937]"
      data-testid="engine-stability-explainer"
    >
      <summary className="cursor-pointer list-none font-medium text-[#171D35] marker:content-none select-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-4">
          <span>{ENGINE_STABILITY_EXPLAINER_SUMMARY}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-[#4658A0]">
            View
          </span>
        </span>
      </summary>
      <div
        className="mt-4 space-y-4 border-t border-[#CAD0E8] pt-4"
        data-testid="engine-stability-explainer-body"
      >
        <p className="max-w-xl leading-relaxed text-[#1F2937]">
          {ENGINE_STABILITY_EXPLAINER_INTRO}
        </p>
        <dl className="max-w-xl space-y-2.5">
          {ENGINE_STABILITY_EXPLAINER_TERMS.map(({ term, definition }) => (
            <div key={term}>
              <dt className="inline font-medium text-[#171D35]">{term}</dt>
              <dd className="inline text-[#1F2937]"> — {definition}</dd>
            </div>
          ))}
        </dl>
        <ul className="max-w-xl list-disc space-y-2.5 pl-5 leading-relaxed text-[#36447C]">
          {ENGINE_STABILITY_EXPLAINER_PRINCIPLES.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        <p className="max-w-xl text-xs leading-relaxed text-[#4658A0]">
          {ENGINE_STABILITY_EXPLAINER_FOOTER}
        </p>
      </div>
    </details>
  );
}
