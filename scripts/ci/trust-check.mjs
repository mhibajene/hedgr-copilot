#!/usr/bin/env node
/**
 * trust-check.mjs
 * 
 * CI trust validation script that ensures the environment is configured
 * with safe defaults for CI/testing:
 * - AUTH_MODE=mock
 * - FX_MODE=fixed
 * - DEFI_MODE=mock
 * 
 * Fails the build if any mode is set to "live" or an unrecognized value.
 * 
 * Usage:
 *   node scripts/ci/trust-check.mjs
 *   pnpm run trust:check
 */

const EXPECTED_MODES = {
  AUTH_MODE: {
    envKey: 'NEXT_PUBLIC_AUTH_MODE',
    safeValues: ['mock'],
    liveValues: ['magic'],
    default: 'mock',
  },
  FX_MODE: {
    envKey: 'NEXT_PUBLIC_FX_MODE',
    safeValues: ['fixed'],
    liveValues: ['coingecko'],
    default: 'fixed',
  },
  DEFI_MODE: {
    envKey: 'NEXT_PUBLIC_DEFI_MODE',
    safeValues: ['mock'],
    liveValues: ['aave'],
    default: 'mock',
  },
};

function getMode(config) {
  const value = process.env[config.envKey]?.trim() || config.default;
  return value;
}

function validateMode(name, config) {
  const value = getMode(config);
  const allKnownValues = [...config.safeValues, ...config.liveValues];
  
  if (!allKnownValues.includes(value)) {
    return {
      name,
      value,
      status: 'unknown',
      message: `Unrecognized value "${value}" for ${config.envKey}. Expected one of: ${allKnownValues.join(', ')}`,
    };
  }
  
  if (config.liveValues.includes(value)) {
    return {
      name,
      value,
      status: 'live',
      message: `${config.envKey}="${value}" is a LIVE integration. CI should use safe defaults: ${config.safeValues.join(', ')}`,
    };
  }
  
  return {
    name,
    value,
    status: 'safe',
    message: `${config.envKey}="${value}" ✓`,
  };
}

function main() {
  console.log('🔐 Trust Check — Validating CI Environment Safety\n');
  console.log('Environment variables:');
  
  const results = [];
  const errors = [];
  
  for (const [name, config] of Object.entries(EXPECTED_MODES)) {
    const result = validateMode(name, config);
    results.push(result);
    
    const icon = result.status === 'safe' ? '✅' : result.status === 'live' ? '⚠️' : '❌';
    console.log(`  ${icon} ${name}: ${result.value} (${config.envKey})`);
    
    if (result.status !== 'safe') {
      errors.push(result);
    }
  }
  
  console.log('');
  
  // In CI, we fail on any non-safe modes
  const isCI = process.env.CI === 'true';
  
  if (errors.length > 0) {
    console.log('─'.repeat(60));
    console.log('');
    
    for (const error of errors) {
      if (error.status === 'live') {
        console.error(`⚠️  ${error.message}`);
      } else {
        console.error(`❌ ${error.message}`);
      }
    }
    
    console.log('');
    
    if (isCI) {
      console.error('❌ Trust check FAILED in CI environment.');
      console.error('');
      console.error('CI must run with safe/mock defaults to prevent accidental');
      console.error('use of live integrations during automated testing.');
      console.error('');
      console.error('Fix: Ensure your CI workflow sets these environment variables:');
      console.error('  NEXT_PUBLIC_AUTH_MODE=mock');
      console.error('  NEXT_PUBLIC_FX_MODE=fixed');
      console.error('  NEXT_PUBLIC_DEFI_MODE=mock');
      process.exit(1);
    } else {
      console.log('⚠️  Trust check WARNING (non-CI environment).');
      console.log('   Some modes are not set to safe defaults.');
      console.log('   This is allowed in local development but would fail in CI.');
    }
  } else {
    console.log('✅ Trust check passed. All modes are set to safe CI defaults.');
  }
  
  // Output summary for logs
  console.log('');
  console.log('Summary:');
  console.log(`  CI Environment: ${isCI ? 'Yes' : 'No'}`);
  console.log(`  AUTH_MODE: ${getMode(EXPECTED_MODES.AUTH_MODE)}`);
  console.log(`  FX_MODE: ${getMode(EXPECTED_MODES.FX_MODE)}`);
  console.log(`  DEFI_MODE: ${getMode(EXPECTED_MODES.DEFI_MODE)}`);
}

main();

