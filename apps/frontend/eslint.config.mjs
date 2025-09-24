// Flat ESLint config for ESLint v9+ in ESM mode
// 1) Apply Rushstack modern module resolution patch (needed by Next config)
import '@rushstack/eslint-patch/modern-module-resolution';
// 2) Import Next's flat config
import next from 'eslint-config-next';

export default [
  // Ignore build artifacts
  {
    ignores: ['.next/**', 'dist/**', 'coverage/**', 'node_modules/**'],
  },
  // Next.js recommended rules (includes TS/React setup)
  ...next,
  // Vitest globals for test files
  {
    files: ['**/*.test.{ts,tsx}', '**/__tests__/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        vi: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
  },
];
