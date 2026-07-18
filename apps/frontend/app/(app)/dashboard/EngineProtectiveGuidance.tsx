"use client";

import React from "react";
import {
  ENGINE_PROTECTIVE_GUIDANCE_FRAMING,
  ENGINE_PROTECTIVE_GUIDANCE_POINTS,
  ENGINE_PROTECTIVE_GUIDANCE_TITLE,
} from "../../../lib/engine/protective-guidance-copy";

export function EngineProtectiveGuidance() {
  const titleId = "engine-protective-guidance-title";

  return (
    <details
      className="max-w-2xl rounded-2xl border border-[#A6B0D8] bg-white p-5 text-sm text-[#1F2937]"
      data-testid="engine-protective-guidance"
      aria-labelledby={titleId}
    >
      <summary
        id={titleId}
        className="cursor-pointer list-none font-medium text-[#171D35] marker:content-none select-none [&::-webkit-details-marker]:hidden"
      >
        <span className="flex items-center justify-between gap-4">
          <span>{ENGINE_PROTECTIVE_GUIDANCE_TITLE}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-[#4658A0]">
            View
          </span>
        </span>
      </summary>
      <div className="mt-4 border-t border-[#CAD0E8] pt-4">
        <p className="max-w-xl leading-relaxed text-[#1F2937]">
          {ENGINE_PROTECTIVE_GUIDANCE_FRAMING}
        </p>
        <ul className="mt-4 max-w-xl list-disc space-y-2.5 pl-5 leading-relaxed text-[#36447C]">
          {ENGINE_PROTECTIVE_GUIDANCE_POINTS.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>
    </details>
  );
}
