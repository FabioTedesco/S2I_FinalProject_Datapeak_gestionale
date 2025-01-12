/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/src/assets/background.jpg')", // Aggiungi qui il percorso dell'immagine
      },
      colors: {
        primary: "#0d1829",
        secondary: "#f0a500",
        tertiary: "#ef4444",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
