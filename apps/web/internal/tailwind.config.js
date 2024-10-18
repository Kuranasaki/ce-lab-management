const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const base = require('../../../shared/shared-ui/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [base],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {},
  plugins: [require('tailwindcss-animate')],
};
