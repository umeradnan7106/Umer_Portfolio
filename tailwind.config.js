// tailwind.config.js
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#0066ff',
          accent: '#7a4bff',
          bg: '#1e1e1e',
          textLight: '#e0e0e0',
          textDark: '#333',
          buttonHover: '#00b0ff',
        },
      },
    },
    plugins: [],
  }
  