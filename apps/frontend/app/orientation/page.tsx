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
  description: ORIENTATION_SURFACE.disclosure.heading,
};

export default function OrientationPage() {
  const surface = ORIENTATION_SURFACE;

  return (
    <div className={`${plusJakartaSans.className} min-h-screen bg-hedgr-white text-hedgr-dark`}>
      <main
        data-testid="orientation-surface"
        className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-8 px-6 py-10 sm:py-16"
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
          <h1 className="text-3xl font-semibold leading-tight text-hedgr-800">
            {surface.title}
          </h1>
        </header>

        <section
          data-testid="orientation-disclosure"
          aria-labelledby="orientation-disclosure-heading"
          className="border border-hedgr-300 bg-hedgr-100 px-4 py-4 text-hedgr-800"
        >
          <h2 id="orientation-disclosure-heading" className="font-medium">
            {surface.disclosure.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed">
            {surface.disclosure.body}
          </p>
          <p
            data-testid="orientation-data-boundary"
            className="mt-3 text-sm font-medium leading-relaxed"
          >
            {surface.dataBoundary}
          </p>
        </section>

        <footer className="border-t border-hedgr-200 pt-8">
          <Link
            href={surface.continue.href}
            data-testid="orientation-continue"
            className="inline-flex min-h-11 items-center justify-center bg-hedgr-primary px-5 py-3 font-medium text-hedgr-white hover:bg-hedgr-600 focus:outline-none focus:ring-2 focus:ring-hedgr-500 focus:ring-offset-2"
          >
            {surface.continue.label}
          </Link>
        </footer>
      </main>
    </div>
  );
}
