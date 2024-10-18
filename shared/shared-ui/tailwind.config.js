const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Replacing variables with actual hsl values
        border: 'hsl(214.3, 31.8%, 91.4%)',
        input: 'hsl(214.3, 31.8%, 91.4%)',
        ring: 'hsl(215, 20.2%, 65.1%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(222.2, 47.4%, 11.2%)',
        primary: {
          DEFAULT: '#253B80',
          100: '#F7FCFE',
          300: '#179BD7',
          500: '#253B80',
          700: '#031358',
          foreground: 'hsl(210, 40%, 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(210, 40%, 96.1%)',
          100: '#FFDFCC',
          300: '#FF904D',
          500: '#FF6000',
          700: '#993A00',
          foreground: 'hsl(222.2, 47.4%, 11.2%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 100%, 50%)',
          foreground: 'hsl(210, 40%, 98%)',
        },
        muted: {
          DEFAULT: 'hsl(210, 40%, 96.1%)',
          foreground: 'hsl(215.4, 16.3%, 46.9%)',
        },
        accent: {
          DEFAULT: 'hsl(210, 40%, 96.1%)',
          foreground: 'hsl(222.2, 47.4%, 11.2%)',
        },
        popover: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(222.2, 47.4%, 11.2%)',
        },
        card: {
          DEFAULT: 'hsl(0, 0%, 100%)',
          foreground: 'hsl(222.2, 47.4%, 11.2%)',
        },
        error: {
          300: '#F15B5B',
          500: '#DC2626',
        },
        warning: {
          300: '#FCD34D',
          500: '#EAB308',
        },
        success: {
          300: '#22C55E',
          500: '#15803D',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.5xl'),
          fontWeight: theme('fontWeight.extrabold'),
        },
        h2: {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        h3: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        h4: {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.semibold'),
        },
        h5: {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.normal'),
        },
        p: {
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.normal'),
        },
      });
    }),
  ],
};
