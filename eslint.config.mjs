import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import perfectionist from 'eslint-plugin-perfectionist';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ...compat.config({
  //   extends: ['next/core-web-vitals', 'next/typescript'],
  //   rules: {
  //     '@next/next/no-img-element': 'off',
  //   },
  // }),
  ...tseslint.config({
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    plugins: {
      // '@stylistic': stylistic,
      react: pluginReact,
      perfectionist: perfectionist,
    },

    ignores: ['eslint.config.mjs', 'node_modules/**'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': ['error', { allow: ['error', 'debug', 'table', 'time', 'timeEnd'] }],
      'perfectionist/sort-imports': [
        'error',
        {
          groups: [
            'side-effect',
            'builtin',
            'external',
            ['internal-type', 'internal'],
            ['parent', 'sibling', 'index'],
            'side-effect-style',
            ['unknown', 'style'],
          ],
          internalPattern: ['@/.*'],
        },
      ],
      'perfectionist/sort-enums': ['error'],
      'perfectionist/sort-interfaces': ['error'],
      'perfectionist/sort-intersection-types': ['error'],
      'perfectionist/sort-object-types': ['error'],
      'perfectionist/sort-named-exports': ['error'],
      'perfectionist/sort-named-imports': ['error'],
      'react/jsx-curly-brace-presence': [
        'error',
        {
          props: 'never',
          children: 'never',
          propElementValues: 'always',
        },
      ],
    },
  }),
];

export default eslintConfig;
