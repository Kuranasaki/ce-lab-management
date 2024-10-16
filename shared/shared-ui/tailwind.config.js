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
    extend: {
      fontFamily: {
        sans: ['Sarabun', 'sans-serif'], // Define your Google font here
      },
      colors: {
        primary: {
          100: '#F7FCFE',
          300: '#179BD7',
          500: '#253B80',
          700: '#031358',
        },
        secondary: {
          100: '#FFDFCC',
          300: '#FF904D',
          500: '#FF6000',
          700: '#993A00',
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
