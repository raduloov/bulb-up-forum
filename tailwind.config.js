module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        appear: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'bulb-it': {
          '0%': {
            transform: 'scale(1)',
            filter: 'brightness(1)',
            color: '#f87171',
          },
          '100%': {
            transform: 'scale(2)',
            // filter: 'brightness(2)',
            color: '#fde047',
          },
        },
      },
    },
  },
  plugins: [],
};
