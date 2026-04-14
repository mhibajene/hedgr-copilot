import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prototype — Retail dashboard exploration',
  description: 'Exploratory UI spike — mock data only — not production behavior.',
  robots: { index: false, follow: false },
};

export default function PrototypeRetailDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
