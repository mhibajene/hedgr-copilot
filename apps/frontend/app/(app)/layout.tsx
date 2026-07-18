import { Suspense } from 'react';
import { AppLayoutClient } from './layout.client';
import { Providers } from './providers';

const AppSuspense = Suspense as unknown as React.ComponentType<
  React.PropsWithChildren<{ fallback: React.ReactNode }>
>;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AppSuspense fallback={null}>
        <AppLayoutClient>{children}</AppLayoutClient>
      </AppSuspense>
    </Providers>
  );
}
