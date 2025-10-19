/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neonPink: "#ff2bd0",
        neonBlue: "#00e5ff",
        neonPurple: "#a855f7"
      },
      boxShadow: {
        neon: "0 0 10px rgba(255,43,208,0.8), 0 0 20px rgba(0,229,255,0.6)",
      },
    },
  },
  plugins: [],
}

