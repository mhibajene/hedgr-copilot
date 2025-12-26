export function getAuthMode(): 'mock' | 'magic' {
  return process.env.NEXT_PUBLIC_AUTH_MODE === 'magic' ? 'magic' : 'mock';
}

