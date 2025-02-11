import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import pluginPrettier from 'eslint-plugin-prettier'
import tailwind from 'eslint-plugin-tailwindcss'
import ts from 'typescript-eslint'

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**'],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': ts.plugin,
      tailwindcss: tailwind,
      prettier: pluginPrettier,
      '@next/next': nextPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error',
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/enforces-negative-arbitrary-values': 'off',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]
