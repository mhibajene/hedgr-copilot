import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  // Ignore build artifacts
  { ignores: ['.next/**', 'dist/**', 'coverage/**', 'node_modules/**'] },

  // Base JS rules
  js.configs.recommended,

  // TypeScript (no type-checking to keep config simple/fast)
  ...tseslint.configs.recommended,

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