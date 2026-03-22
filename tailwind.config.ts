import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#475569',
        card: '#FFFFFF',
        bg: '#F8FAFC',
        accent: '#2563EB',
        accent2: '#0EA5E9'
      }
    },
  },
  plugins: [],
} satisfies Config;
