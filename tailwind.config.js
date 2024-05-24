import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["cupcake"],
          primary: "#8D49C3",
          // secondary: "teal",
          "--rounded-btn": "8px"
        },
      },
    ],
  },
};
