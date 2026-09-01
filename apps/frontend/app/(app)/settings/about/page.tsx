import { ABOUT_HEDGR_SURFACE } from '@/lib/narrative/about-hedgr';

export default function AboutHedgrPage() {
  return (
    <main
      className="mx-auto max-w-2xl space-y-8 px-6 pb-28 pt-6 sm:p-8"
      data-testid="about-hedgr"
    >
      <h1 className="text-3xl font-bold tracking-tight text-hedgr-800 sm:text-4xl">
        {ABOUT_HEDGR_SURFACE.title}
      </h1>

      <div className="space-y-7">
        {ABOUT_HEDGR_SURFACE.sections.map((section) => (
          <section
            key={section.heading}
            className="space-y-3 border-t border-hedgr-100 pt-5 first:border-t-0 first:pt-0"
          >
            <h2 className="text-lg font-semibold text-hedgr-800">
              {section.heading}
            </h2>
            <div className="max-w-xl space-y-3 text-sm leading-relaxed text-hedgr-dark">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
