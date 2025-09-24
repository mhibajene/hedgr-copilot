import type { NextApiRequest, NextApiResponse } from 'next'
import pkg from '../../package.json'

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ version: pkg.version })
}