module.exports = {
  node: "jit",
  purge: {
    content: [
      "./src/pages/**/*.{js,jsx,ts,tsx}",
      "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    // These options are passed through directly to PurgeCSS
  },
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    background: ["responsive", "hover"],
    extend: {
      border: ["active"],
      padding: ["responsive"],
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
