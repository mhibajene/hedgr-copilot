'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ResearchBridge } from './ResearchBridge';
import research from './research.module.css';

/** CLASS-A-VAL-002-RESEARCH-REFRESH-001 (§332): class names for the shared research look. */
export const researchStyles = research;

type ResearchChromeProps = {
  title: string;
  /** Test id for the page's main region (Sarah: `stability-stimulus`). */
  testId?: string;
  /** Optional footer link (Sarah: back to her introduction). */
  footer?: { href: string; label: string };
  children: ReactNode;
};

/**
 * Shared chrome for unreleased research examples: fictional-example label, title,
 * the common boundary line and an optional footer link, on the research canvas.
 * Strings are passed in or fixed here verbatim; this component adds no copy.
 */
export function ResearchChrome({ title, testId, footer, children }: ResearchChromeProps) {
  return (
    <div className={research.page}>
      <main data-testid={testId} className={research.main}>
        <header className={research.header}>
          <p data-slot="1" className={research.eyebrow}>Fictional example</p>
          <h1 data-slot="2" className={research.title}>{title}</h1>
          <p data-testid="study-common-boundary" className={research.boundary}>
            This example uses the facts on this page and nothing else. No real money is involved. Nothing you do here is saved.
          </p>
        </header>
        {children}
        {footer ? (
          <footer className={research.footer}>
            <Link data-slot="22" href={footer.href} className={research.footerLink}>{footer.label}</Link>
          </footer>
        ) : null}
      </main>
    </div>
  );
}


type ResearchScenarioProps = {
  title: string;
  testId: string;
  factsTestId: string;
  headline: string;
  situationDate: string;
  depositsAndHolding: string;
  differingFact: ReactNode;
  lockedLine: string;
  whatIfHeading: string;
  whatIfBody: string;
  whatIfClosing: string;
  hedgrHeading: string;
  hedgrBody: string;
  homeLink: { href: string; label: string };
  attribution: string;
  nextLink?: { href: string; label: string };
};

/** §398: both unreleased examples share the same slots and focus-preserving traversal. */
export function ResearchScenario(props: ResearchScenarioProps) {
  const [stage, setStage] = useState<'situation' | 'what-if' | 'hedgr' | 'bridge'>('situation');
  const stageHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (stage === 'situation') return;
    stageHeading.current?.focus({ preventScroll: true });
    stageHeading.current?.closest('main')?.scrollIntoView({ block: 'start' });
  }, [stage]);

  return (
    <ResearchChrome title={props.title} testId={props.testId}
      footer={{ href: '/orientation?study=stability-scenarios', label: 'Review the introduction' }}>
      {stage === 'situation' ? <>
        <section data-testid={props.factsTestId} aria-labelledby="research-situation-heading" className={`${research.panel} mt-8 space-y-4 break-words`}>
          <h2 id="research-situation-heading" data-slot="4" className="text-base font-semibold sm:text-xl">{props.headline}</h2>
          <p data-slot="5" className="text-sm text-hedgr-700">Situation on {props.situationDate}</p>
          <p data-slot="6">{props.depositsAndHolding}</p>
          <div data-slot="7">{props.differingFact}</div>
          <p data-slot="8">{props.lockedLine}</p>
        </section>
        <button data-slot="9" data-testid="study-continue" type="button" onClick={() => setStage('what-if')} className={`${research.primary} mt-8`}>Continue to the what-if</button>
      </> : stage === 'what-if' ? <>
        <section aria-labelledby="research-what-if-heading" className={`${research.panel} mt-8 space-y-4 break-words`}>
          <p data-slot="10" className="text-sm font-medium text-hedgr-600">Example scenario</p>
          <h2 id="research-what-if-heading" data-slot="11" ref={stageHeading} tabIndex={-1} className="text-base font-semibold sm:text-xl">{props.whatIfHeading}</h2>
          <p data-slot="12">{props.whatIfBody}</p>
          <p data-slot="13">{props.whatIfClosing}</p>
        </section>
        <button data-slot="14" data-testid="study-to-hedgr" type="button" onClick={() => setStage('hedgr')} className={`${research.primary} mt-8`}>Continue</button>
      </> : stage === 'hedgr' ? <>
        <section data-testid="study-hedgr-explanation" className="mt-8 space-y-5 break-words">
          <h2 data-slot="16" ref={stageHeading} tabIndex={-1} className="text-lg font-semibold sm:text-xl">{props.hedgrHeading}</h2>
          <p data-slot="17">{props.hedgrBody}</p>
          <Link data-slot="18" href={props.homeLink.href} className={research.footerLink}>{props.homeLink.label}</Link>
        </section>
        <p data-slot="19" data-testid="study-attribution" className="mt-5 text-sm font-medium leading-relaxed text-hedgr-700">{props.attribution}</p>
        <p data-slot="20" data-testid="study-limits" className="mt-5 text-sm leading-relaxed text-hedgr-700">This example does not predict exchange rates. It is not financial advice.</p>
        {props.nextLink
          ? <Link data-slot="21" data-testid="study-to-reserve" href={props.nextLink.href} className={`${research.primary} mt-5`}>{props.nextLink.label}</Link>
          : <button data-slot="21" data-testid="study-to-bridge" type="button" onClick={() => setStage('bridge')} className={`${research.primary} mt-5`}>Continue</button>}
      </> : <ResearchBridge headingRef={stageHeading} />}
    </ResearchChrome>
  );
}
