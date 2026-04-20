/**
 * Static mock data for the retail dashboard prototype spike only.
 * Does not represent live engine, ledger, or policy state.
 */

export type MockActivityRow = {
  title: string;
  subtitle: string;
  amount: string;
};

export type MockAllocationRow = {
  name: string;
  pct: number;
};

export const mockRetailDashboard = {
  portfolioLabel: 'Portfolio value',
  portfolioValue: '$12,847.30',
  stability: {
    title: 'Stability status',
    status: 'Balanced',
    note: 'Read-only posture — illustrative for layout review.',
    supportLine: 'Protected · Accessible',
  },
  actions: [
    { id: 'top-up', label: 'Top up' },
    { id: 'send', label: 'Send' },
  ] as const,
  activitySectionTitle: 'Recent money state',
  activity: [
    {
      title: 'Neighborhood Market',
      subtitle: '12 Apr · Payment',
      amount: '-$24.18',
    },
    {
      title: 'Payroll deposit',
      subtitle: '10 Apr · Transfer in',
      amount: '+$2,400.00',
    },
  ] satisfies MockActivityRow[],
  allocation: {
    title: 'Allocation & trust (informational)',
    rows: [
      { name: 'Stable cash', pct: 62 },
      { name: 'Protected yield', pct: 28 },
      { name: 'Reserve', pct: 10 },
    ] satisfies MockAllocationRow[],
    footnote: 'Bands are illustrative — not accounting or a promise of outcomes.',
  },
} as const;
