import { expect, test } from '@playwright/test';
import { request as httpRequest } from 'node:http';

const routes = [
  { path: '/api/chat', limit: 65_536, status: 200 },
  { path: '/api/auth/verify', limit: 16_384, status: 401 },
  { path: '/api/health', limit: 1_024, status: 200 },
  { path: '/api/version', limit: 1_024, status: 200 },
];

// Put the meaningful field at the tail, beyond the padding. Auth fails locally
// before any external operation; chat's tail triggers the existing policy path.
function sizedJson(path: string, size: number, utf8 = false): Buffer {
  const suffix = path === '/api/chat'
    ? '","message":"What should I invest in?"}'
    : path === '/api/auth/verify' ? '","didToken":""}' : '"}';
  const prefix = '{"padding":"';
  const remaining = size - Buffer.byteLength(prefix + suffix);
  const padding = utf8
    ? 'é'.repeat(Math.floor(remaining / 2)) + 'x'.repeat(remaining % 2)
    : 'x'.repeat(remaining);
  const body = Buffer.from(prefix + padding + suffix);
  expect(body.byteLength).toBe(size);
  return body;
}

async function post(baseURL: string, path: string, body: Buffer, chunked: boolean) {
  return new Promise<{ status: number; body: string; source?: string }>((resolve, reject) => {
    const req = httpRequest(new URL(path, baseURL), {
      method: 'POST',
      agent: false,
      headers: {
        'Content-Type': 'application/json',
        ...(chunked ? { 'Transfer-Encoding': 'chunked' } : { 'Content-Length': body.byteLength }),
      },
    }, (res) => {
      const chunks: Buffer[] = [];
      res.on('data', (chunk: Buffer) => chunks.push(chunk));
      res.on('error', reject);
      res.on('end', () => resolve({
        status: res.statusCode ?? 0,
        body: Buffer.concat(chunks).toString('utf8'),
        source: res.headers['x-copilot-source'] as string | undefined,
      }));
    });
    req.on('error', reject);
    req.setTimeout(10_000, () => req.destroy(new Error('HTTP boundary request timed out')));
    if (chunked) {
      expect(req.getHeader('Content-Length')).toBeUndefined();
      // Separate writes exercise the public HTTP chunked transport.
      for (let offset = 0; offset < body.length; offset += 257) {
        req.write(body.subarray(offset, offset + 257));
      }
      req.end();
    } else {
      expect(req.getHeader('Content-Length')).toBe(body.byteLength);
      req.end(body);
    }
  });
}

for (const route of routes) {
  test.describe(`ZOD-CVE-001 ${route.path}`, () => {
    for (const chunked of [false, true]) {
      const transport = chunked ? 'chunked without Content-Length' : 'honest Content-Length';

      test(`cap-plus-one returns 413: ${transport}`, async ({ baseURL }) => {
        const body = sizedJson(route.path, route.limit + 1);
        expect((await post(baseURL!, route.path, body, chunked)).status).toBe(413);
      });

      for (const size of [route.limit - 1, route.limit]) {
        test(`${size} bytes preserve handler behavior: ${transport}`, async ({ baseURL }) => {
          const response = await post(baseURL!, route.path, sizedJson(route.path, size), chunked);
          expect(response.status).toBe(route.status);
          const data = JSON.parse(response.body);
          if (route.path === '/api/chat') {
            expect(response.source).toBe('policy');
            expect(data.message.content).toContain('financial advice');
          } else if (route.path === '/api/auth/verify') {
            expect(data.error).toBe('Missing or invalid didToken');
          } else if (route.path === '/api/health') {
            expect(data.status).toBe('ok');
          } else {
            expect(data.version).toEqual(expect.any(String));
          }
        });
      }

      test(`UTF-8 counts bytes at the boundary: ${transport}`, async ({ baseURL }) => {
        const exact = sizedJson(route.path, route.limit, true);
        const excess = sizedJson(route.path, route.limit + 1, true);
        expect(excess.toString('utf8').length).toBeLessThan(route.limit);
        expect((await post(baseURL!, route.path, exact, chunked)).status).toBe(route.status);
        expect((await post(baseURL!, route.path, excess, chunked)).status).toBe(413);
      });

      test(`rejects excess after a valid JSON prefix: ${transport}`, async ({ baseURL }) => {
        const prefix = sizedJson(route.path, route.limit);
        for (const tail of [' ', '!']) {
          const response = await post(baseURL!, route.path, Buffer.concat([prefix, Buffer.from(tail)]), chunked);
          expect(response.status).toBe(413);
        }
      });

      test(`malformed JSON retains 400: ${transport}`, async ({ baseURL }) => {
        expect((await post(baseURL!, route.path, Buffer.from('{'), chunked)).status).toBe(400);
      });
    }
  });
}
