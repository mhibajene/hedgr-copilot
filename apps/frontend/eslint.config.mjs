import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  // Ignore build artifacts & generated types
  { ignores: ['.next/**', 'dist/**', 'coverage/**', 'node_modules/**', 'next-env.d.ts'] },

  // Don't fail for stray disable comments (we're migrating configs)
  { linterOptions: { reportUnusedDisableDirectives: false } },

  // Base JS rules
  js.configs.recommended,

  // TypeScript (no type-checking to keep config simple/fast)
  ...tseslint.configs.recommended,

  // Next.js rules
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Ensure TS parser for TS/TSX
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: { parser: tseslint.parser },
  },

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
    rules: {
      // Tests commonly use `any` in mocks
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Node/CommonJS tool configs (allow require/module/__dirname)
  {
    files: ['postcss.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'readonly', __dirname: 'readonly' },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
    },
  },

  // Next pages shim: be forgiving in the special _app.tsx file
  {
    files: ['pages/_app.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]