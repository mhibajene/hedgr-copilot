import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import sections from '../../lib/narrative/about-hedgr-external.json';
import styles from './page.module.css';

// D-124 authorizes local rendered review only. Publication requires a new disposition.
function requireLocalReview() {
  if (process.env.NODE_ENV !== 'development' || process.env.VERCEL) notFound();
}

export function generateMetadata(): Metadata {
  requireLocalReview();
  const description = sections[0].blocks.at(-1)!.text;
  return {
    title: 'About Hedgr',
    description,
    robots: { index: false, follow: false },
    openGraph: { title: 'About Hedgr', description, type: 'website' },
    twitter: { card: 'summary', title: 'About Hedgr', description },
  };
}

function ApprovedText({ text }: { text: string }) {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) =>
    part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part,
  );
}

export default function AboutHedgrReviewPage() {
  requireLocalReview();
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#about-hedgr">Skip to content</a>
      <header className={styles.header}>
        <Image src="/brand/hedgr_logo.svg" alt="Hedgr" width={142} height={35.286} priority />
      </header>
      <main id="about-hedgr" tabIndex={-1} className={styles.main}>
        <h1 className={styles.title}>About Hedgr</h1>
        {sections.map((section) => (
          <section
            className={styles.section}
            key={section.number}
            aria-labelledby={`section-${section.number}`}
          >
            <h2 id={`section-${section.number}`} className={styles.sectionTitle}>
              <span className={styles.number}>{section.number}.</span>{' '}
              {section.title}
            </h2>
            <div className={styles.copy}>
              {section.blocks.map((block, index) => block.kind === 'heading' ? (
                <h3 key={index} className={section.number === '01' ? styles.headline : styles.subheading}>
                  {block.text}
                </h3>
              ) : (
                <p key={index} className={section.number === '01' && index === section.blocks.length - 1 ? styles.simulation : undefined}>
                  <ApprovedText text={block.text} />
                </p>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
