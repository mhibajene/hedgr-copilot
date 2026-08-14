import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Link from 'next/link';
import {
  ORIENTATION_LOGO_SRC,
  ORIENTATION_SURFACE,
} from '../../lib/narrative/orientation-surface';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: ORIENTATION_SURFACE.documentTitle,
  description: ORIENTATION_SURFACE.lede,
};

export default function OrientationPage() {
  const surface = ORIENTATION_SURFACE;

  return (
    <div className={`${plusJakartaSans.className} min-h-screen bg-hedgr-white text-hedgr-dark`}>
      <main
        data-testid="orientation-surface"
        className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 px-6 py-10"
      >
        <header className="space-y-6">
          {/* Governed SVG mark: do not optimize or rewrite the approved asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- preserve the governed SVG without next/image transformation */}
          <img
            src={ORIENTATION_LOGO_SRC}
            alt={surface.logoAlt}
            height={40}
            className="h-10 w-auto"
          />
          <p className="text-sm font-medium tracking-wide text-hedgr-600">
            {surface.eyebrow}
          </p>
          <div
            data-testid="orientation-disclosure"
            className="border border-hedgr-300 bg-hedgr-100 px-4 py-3 text-hedgr-800"
          >
            <p className="font-medium">{surface.disclosure.heading}</p>
            <p className="mt-1 text-sm">{surface.disclosure.body}</p>
          </div>
          <h1 className="text-3xl font-semibold leading-tight text-hedgr-800">
            {surface.title}
          </h1>
          <p className="text-lg leading-relaxed">{surface.lede}</p>
        </header>

        {surface.blocks.map((block) => (
          <section
            key={block.id}
            data-testid={`orientation-block-${block.id}`}
            aria-labelledby={`orientation-${block.id}`}
            className="space-y-3"
          >
            <h2
              id={`orientation-${block.id}`}
              className="text-xl font-semibold text-hedgr-800"
            >
              {block.heading}
            </h2>
            {block.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        <footer className="space-y-4 border-t border-hedgr-200 pt-8">
          <Link
            href={surface.continue.href}
            data-testid="orientation-continue"
            className="inline-flex bg-hedgr-primary px-5 py-3 font-medium text-hedgr-white hover:bg-hedgr-600"
          >
            {surface.continue.label}
          </Link>
          <p className="text-sm text-hedgr-600">{surface.continue.note}</p>
        </footer>
      </main>
    </div>
  );
}
