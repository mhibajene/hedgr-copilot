import Link from 'next/link';
import type { ReactNode } from 'react';
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
          <p className={research.eyebrow}>Fictional research example · no real money</p>
          <h1 className={research.title}>{title}</h1>
          <p data-testid="study-common-boundary" className={research.boundary}>
            This example uses only the facts on this page. Nothing you do here is saved.
          </p>
        </header>
        {children}
        {footer ? (
          <footer className={research.footer}>
            <Link href={footer.href} className={research.footerLink}>{footer.label}</Link>
          </footer>
        ) : null}
      </main>
    </div>
  );
}
