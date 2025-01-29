/* eslint-disable no-undef */
module.exports = {
  useTabs: false,
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  endOfLine: 'lf',
  semi: false,
  arrowParens: 'always',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
  tailwindFunctions: ['clsx', 'tw'],
}
