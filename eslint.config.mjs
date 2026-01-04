import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import securityPlugin from 'eslint-plugin-security';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import prettierConfig from 'eslint-config-prettier';

export default [
  // Base configs
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  {
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
  },

  // Security
  securityPlugin.configs.recommended,

  // TypeScript-specific rules
  {
    files: ['**/*.ts'],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Prettier integration
  prettierPlugin,

  // Ignore patterns
  {
    ignores: ['node_modules/', 'dist/', '.eslintrc.js', 'eslint.config.mjs'],
  },

  // Disable rules conflicting with Prettier (must be last)
  prettierConfig,
];
