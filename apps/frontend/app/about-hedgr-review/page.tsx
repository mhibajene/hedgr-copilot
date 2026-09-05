import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import sections from '../../lib/narrative/about-hedgr-external.json';
import styles from './page.module.css';

// D-125 authorizes direct-link publication of this accepted informational surface.
export function generateMetadata(): Metadata {
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
  return (
    <div className={styles.page}>
      <a className={styles.skip} href="#about-hedgr">Skip to content</a>
      <header className={styles.header}>
        <Image src="/brand/hedgr_logo.svg" alt="Hedgr" width={142} height={35.286} priority />
        <h1 className={styles.title}>About Hedgr</h1>
      </header>
      <main id="about-hedgr" tabIndex={-1} className={styles.main}>
        {sections.map((section) => (
          <section
            className={styles.section}
            key={section.number}
            data-section={section.number}
            aria-labelledby={`section-${section.number}`}
          >
            <h2 id={`section-${section.number}`} className={styles.sectionTitle}>
              <span className={styles.number}>{section.number}.</span>{' '}
              {section.title}
            </h2>
            <div className={styles.copy}>
              {section.number === '05' ? (
                <div className={styles.principles}>
                  {section.blocks.map((block, index) => block.kind === 'heading' ? (
                    <div className={styles.principle} key={block.text}>
                      <h3 className={styles.subheading}>{block.text}</h3>
                      <p><ApprovedText text={section.blocks[index + 1].text} /></p>
                    </div>
                  ) : null)}
                </div>
              ) : section.blocks.map((block, index) => {
                if (section.number === '03' && block.text.startsWith('**')) {
                  const questions = section.blocks.filter(item => item.text.startsWith('**'));
                  if (block !== questions[0]) return null;
                  return (
                    <ul key={index} className={styles.questions}>
                      {questions.map(question => (
                        <li key={question.text}><p><ApprovedText text={question.text} /></p></li>
                      ))}
                    </ul>
                  );
                }
                return block.kind === 'heading' ? (
                  <h3 key={index} className={section.number === '01' ? styles.headline : styles.subheading}>
                    {block.text}
                  </h3>
                ) : (
                  <p key={index} className={section.number === '01' && index === section.blocks.length - 1 ? styles.simulation : undefined}>
                    <ApprovedText text={block.text} />
                  </p>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
