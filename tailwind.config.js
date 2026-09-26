/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', 'Inter', ...defaultTheme.fontFamily.sans],
        hud: ['"Chakra Petch"', 'monospace', 'sans-serif'],
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-card': 'rgb(var(--surface-card) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        highlight: 'rgb(var(--highlight) / <alpha-value>)',
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        vice: {
          coral: '#ff6b6b',
          gold: '#ffbe3b',
          pink: '#f43f5e',
          purple: '#8b5cf6',
          aqua: '#00f2fe',
          teal: '#14b8a6',
          deep: '#041224',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};


