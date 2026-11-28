import { readDailyRate } from '../../../lib/live-rate/exchange-rate-api';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await readDailyRate());
}
