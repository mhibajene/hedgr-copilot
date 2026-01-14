import { AppLayoutClient } from './layout.client';
import { Providers } from './providers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AppLayoutClient>{children}</AppLayoutClient>
    </Providers>
  );
}

