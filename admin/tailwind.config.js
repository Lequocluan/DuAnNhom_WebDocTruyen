
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        scooter: {
          50: "#ebfeff",
          100: "#cefbff",
          200: "#a2f5ff",
          300: "#63eafd",
          400: "#1cd6f4",
          500: "#00c5e8",
          600: "#0393b7",
          700: "#0a7594",
          800: "#125e78",
          900: "#144f65",
          950: "#063446",
        },
        success: {
          outline: "#01E17B",
          bg : "#E5FCF1"
        },
        error: {
          outline: "#F04349",
          bg: "#FDECEC"
        }
      },
      fontFamily: {
        'mulish': ['"Mulish"','sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
};
