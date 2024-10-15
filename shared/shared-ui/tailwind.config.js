const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

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
  plugins: [],
};
