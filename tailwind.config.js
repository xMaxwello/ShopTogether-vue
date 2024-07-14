/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins, sans-serif'],
      },
      colors: {
        'loginCard': "#D3D8F7",
        'confirmButton': "#576EE4",
      }
    },
  },
  plugins: [],
}

