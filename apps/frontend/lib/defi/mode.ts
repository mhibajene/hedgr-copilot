export function getDefiMode(): 'mock' | 'aave' {
  return process.env.NEXT_PUBLIC_DEFI_MODE === 'aave' ? 'aave' : 'mock';
}

