import { test, expect } from '@playwright/test'

test('GET /api/health returns ok + fresh ISO timestamp', async ({ request, baseURL }) => {
  const res = await request.get(`${baseURL}/api/health`)
  expect(res.ok()).toBeTruthy()
  const json = await res.json()
  expect(json).toEqual(
    expect.objectContaining({ status: 'ok', ts: expect.any(String) })
  )
  const ts = json.ts as string
  expect(ts).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/)
  const diff = Math.abs(Date.now() - Date.parse(ts))
  expect(diff).toBeLessThan(10_000) // within 10s to account for build/start
})
