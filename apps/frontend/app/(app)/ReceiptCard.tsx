import type { ReactNode } from 'react';
import finish from './product-finish.module.css';

export type ReceiptRow = { label: string; value: ReactNode };

type ReceiptCardProps = {
  headline: string;
  time: string;
  rows: ReceiptRow[];
  'data-testid'?: string;
  headlineTestId?: string;
};

/** HOME-EXPERIENCE-001 T2: a confirmed simulated entry, with its arithmetic laid out line by line. */
export function ReceiptCard({ headline, time, rows, 'data-testid': testId, headlineTestId }: ReceiptCardProps) {
  return (
    <section className={finish.receipt} aria-labelledby="receipt-headline" data-testid={testId}>
      <span className={finish.receiptDone} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" focusable="false">
          <path d="M6.5 12.5l3.5 3.5 7.5-8" />
        </svg>
      </span>
      <div>
        <h2 id="receipt-headline" className={finish.receiptHeadline} data-testid={headlineTestId}>
          {headline}
        </h2>
        <p className={finish.receiptStatus}>
          <span className={finish.receiptBadge}>Recorded</span>
          {time}
        </p>
      </div>
      <dl className={finish.receiptDetails}>
        {rows.map((row) => (
          <div key={row.label}>
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function formatRecordedTime(timestamp: number): string {
  const time = new Date(timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `Today, ${time}`;
}
