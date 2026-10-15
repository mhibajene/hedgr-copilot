/** Shared UTC example dates; local visit/date formatters remain separate. */
export function formatExampleDate(value: string): string {
  const parts = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).formatToParts(new Date(value));
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find(item => item.type === type)?.value ?? '';
  return `${part('day')} ${part('month').slice(0, 3)} ${part('year')}`;
}
