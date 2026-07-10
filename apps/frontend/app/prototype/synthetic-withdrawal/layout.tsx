import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Synthetic withdrawal journey — closed-user research',
  description:
    'A visibly synthetic, non-live withdrawal trust prototype for closed-user research.',
  robots: { index: false, follow: false, nocache: true },
};

export default function SyntheticWithdrawalPrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
