import Link from 'next/link';
import type { Ref } from 'react';
import { researchStyles as rs } from './ResearchChrome';

type ResearchBridgeProps = {
  headingRef?: Ref<HTMLHeadingElement>;
};

/** Shared completion for research examples. Copy is the existing bridge verbatim. */
export function ResearchBridge({ headingRef }: ResearchBridgeProps) {
  return (
    <section data-testid="study-bridge" className="mt-8 space-y-5">
      <h2 ref={headingRef} tabIndex={-1} className="text-lg font-semibold sm:text-xl">You’ve reached the end of this research example.</h2>
      <p>Next, try Hedgr with pretend money. Add a simulated deposit, then see what changes and what remains. No real money moves, no account is opened, and nothing here is financial advice.</p>
      <Link href="/dashboard-synthetic-journey?reset=1" data-testid="study-simulation-link" className={rs.primary}>Continue to the Hedgr simulation</Link>
    </section>
  );
}
