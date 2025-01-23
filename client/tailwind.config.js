/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    "./index.html",
    "./src/*.tsx",
    "./src/components/**/*.tsx",
    "./src/pages/*.tsx"
  ],
  theme: {
    extend: {
      boxShadow: {
        'userinfo': '0 10px 15px -3px, 0 4px 6px -4px; --tw-shadow-color: #e2e8f0; --tw-shadow: var(--tw-shadow-colored);'
      }
    },
    fontFamily: {
      'sriracha': ['sriracha', 'ui-sans-serif']
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      // addVariant(`zoom-1`, [`.zoom-1 &`, `&.zoom-1`])
      const n = 10;
      const zoomLevel = new Array(n).fill(null).map((_, i) => i + 1);
      zoomLevel.map((zoom) => {
        const state = `zoom-${zoom}`;
        addVariant(state, [`.${state} &`, `&.${state}`])
      })
    }),
  ],
}

