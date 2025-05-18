/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-heavy": "12px 12px 4px 0px rgba(0, 0, 0, 0.6)",
      },
      colors: {
        Brand: {
          "Brand-222": "#1E1E1E",
          
        },
      },
    },
  },
  plugins: [],
};
