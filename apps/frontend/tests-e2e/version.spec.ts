import { test, expect } from '@playwright/test'

test('GET /api/version returns package version', async ({ request, baseURL }) => {
  const res = await request.get(`${baseURL}/api/version`)
  expect(res.ok()).toBeTruthy()
  const json = await res.json()
  expect(json).toEqual(
    expect.objectContaining({ version: expect.any(String) })
  )
  expect((json.version as string).length).toBeGreaterThan(0)
})
