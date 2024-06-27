/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // Path to your HTML file(s)
    "./src/**/*.{js,ts,jsx,tsx}",  // Paths to your source files with different extensions
  ],
  theme: {
    extend: {},  // Extend the default theme (currently empty)
  },
  plugins: [
    require('daisyui'),  // Include daisyUI plugin
  ],
}
