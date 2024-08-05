/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,jsx,js}'],
  theme: {
    extend: {
      screens: {
        'xl': '1540px', // xl 브레이크포인트를 1536px로 설정
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    // ...
  ],
}
