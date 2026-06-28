/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0a0a1a',
          800: '#111128',
          700: '#1a1a3e',
          600: '#252552',
        },
        primary: {
          400: '#8b5cf6',
          500: '#6366f1',
          600: '#4f46e5',
        },
        accent: {
          400: '#06b6d4',
          500: '#0891b2',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
