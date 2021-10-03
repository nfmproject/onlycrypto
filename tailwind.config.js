module.exports = {
  important: true,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        background: {
          primary: ({ opacityVariable }) =>
            `rgba(var(--primary-background) / var(${opacityVariable}))`,
          secondary: ({ opacityVariable }) =>
            `rgba(var(--secondary-background) / var(${opacityVariable}))`,
          hover: ({ opacityVariable }) =>
            `rgba(var(--primary-text-color) / var(${opacityVariable}))`,
        },
        text: {
          primary: ({ opacityVariable }) =>
            `rgba(var(--primary-text-color) / var(${opacityVariable}))`,
          secondary: ({ opacityVariable }) =>
            `rgba(var(--secondary-text-color) / var(${opacityVariable}))`,
          accent: ({ opacityVariable }) =>
            `rgba(var(--accent-text-color) / var(${opacityVariable}))`,
        },
        button: ({ opacityVariable }) => `rgba(var(--button-color) / var(${opacityVariable}))`,
        outline: ({ opacityVariable }) => `rgba(var(--outline-color) / var(${opacityVariable}))`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
