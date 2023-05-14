/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in-down': {
          from: {
            transform: 'translateY(-1.75rem)',
            opacity: '0',
          },
          to: {
            transform: 'translateY(0rem)',
            opacity: '1',
          },
        },
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.4s ease-in-out both',
      },
    },
  },
  plugins: [],
}
