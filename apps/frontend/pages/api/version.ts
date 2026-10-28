import type { NextApiRequest, NextApiResponse } from 'next'
import pkg from '../../package.json'

export const config = { api: { bodyParser: { sizeLimit: 1_024 } } }

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ version: pkg.version })
}
