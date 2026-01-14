'use client';

import { FxRateProvider } from '../../lib/fx/FxRateContext';

/**
 * Client-side providers wrapper.
 * 
 * This component wraps all client-side context providers to keep
 * the layout.tsx server-side compatible.
 * 
 * Currently includes:
 * - FxRateProvider: Provides FX rate data to all app routes
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <FxRateProvider>{children}</FxRateProvider>;
}
