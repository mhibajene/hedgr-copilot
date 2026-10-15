import type { ReactNode } from 'react';

export function ExampleCard({ title, children, rate, limits, testId }: { title: string; children: ReactNode; rate: ReactNode; limits: ReactNode; testId: string }) {
  return (
    <section className="space-y-3" aria-labelledby="dashboard-current-status-label" data-testid={testId} data-component="ExampleCard">
      <h2 id="dashboard-current-status-label" className="text-sm font-semibold text-hedgr-800">{title}</h2>
      {children}
      {rate}
      {limits}
    </section>
  );
}
