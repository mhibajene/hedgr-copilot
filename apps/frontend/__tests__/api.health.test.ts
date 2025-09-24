import { describe, it, expect } from 'vitest'
import type { NextApiRequest, NextApiResponse } from 'next'
import handler from '../pages/api/health'

type MockRes = Partial<NextApiResponse> & { _json?: unknown; statusCode?: number }
function createMockRes(): NextApiResponse & { _json?: unknown } {
  const res: MockRes = {}
  res.status = (code: number) => {
    res.statusCode = code
    return res as NextApiResponse
  }
  res.json = (data: unknown) => {
    res._json = data
    return res as NextApiResponse
  }
  return res as NextApiResponse & { _json?: unknown }
}

describe('/api/health', () => {
    it('returns 200 with status ok and ISO timestamp', () => {
    const req = {} as NextApiRequest
    const res = createMockRes()
    handler(req, res)
    expect(res.statusCode).toBe(200)
    expect(res._json).toBeDefined()

    // Shape + type assertions
    expect(res._json).toEqual(
        expect.objectContaining({
            status: 'ok',
            ts: expect.any(String),
        })
    )
     // ISO-8601 (UTC, allow optional milliseconds)
     const { ts } = res._json as { ts: string }
     expect(ts).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
     expect(Number.isNaN(Date.parse(ts))).toBe(false)

    // Freshness check (not a hard requirement, but useful)
    const now = Date.now()
    const t = now - Date.parse(ts)
    expect(Math.abs(now - t)).toBeLessThan(2000) // within 2s
  })
})