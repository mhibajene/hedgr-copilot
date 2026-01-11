export function getChatMode(): 'stub' | 'openai' {
  // Always force stub mode in CI
  if (process.env.CI === 'true') {
    return 'stub';
  }
  
  // Check explicit mode setting
  const mode = process.env.OPENAI_MODE;
  if (mode === 'openai') {
    return 'openai';
  }
  
  // Default to stub
  return 'stub';
}
