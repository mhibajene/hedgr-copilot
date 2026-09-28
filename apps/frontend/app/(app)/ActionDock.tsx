import Link from 'next/link';
import finish from './product-finish.module.css';

type DockLink = { label: string; href: string; 'data-testid'?: string };

type ActionDockProps = {
  title: string;
  why: string;
  primary: DockLink;
  secondary?: DockLink;
  'data-testid'?: string;
};

/** HOME-EXPERIENCE-001 T2: one named next step and the way back. */
export function ActionDock({ title, why, primary, secondary, 'data-testid': testId }: ActionDockProps) {
  return (
    <section className={finish.dock} aria-labelledby="action-dock-title" data-testid={testId}>
      <p className={finish.dockEyebrow}>Next step</p>
      <h2 id="action-dock-title" className={finish.dockTitle}>{title}</h2>
      <p className={finish.dockWhy}>{why}</p>
      <Link href={primary.href} className={finish.pill} data-testid={primary['data-testid']}>
        {primary.label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M5 12h14" />
          <path d="M13 6l6 6-6 6" />
        </svg>
      </Link>
      {secondary ? (
        <Link href={secondary.href} className={`${finish.pill} ${finish.pillQuiet}`} data-testid={secondary['data-testid']}>
          {secondary.label}
        </Link>
      ) : null}
    </section>
  );
}
