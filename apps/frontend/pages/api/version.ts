import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json') as { version?: string }

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const version = pkg?.version ?? '0.0.0'
  res.status(200).json({ version })
}