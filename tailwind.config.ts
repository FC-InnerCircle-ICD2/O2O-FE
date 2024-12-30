import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      padding: {
        mobile_safe: '16px',
      },
      height: {
        navigation: '40px',
        bottom_navigation: '56px',
      },
    },
  },
  plugins: [],
} satisfies Config
