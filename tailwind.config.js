/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '4xl': ['2.5rem', { lineHeight: '3rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.375rem' }],
      },
    },
  },
  plugins: [],
}
