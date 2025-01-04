/* eslint-disable no-undef */
module.exports = {
  useTabs: false,
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  endOfLine: 'lf',
  semi: false,
  arrowParens: 'always',
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
  tailwindFunctions: ['clsx', 'tw'],
}
