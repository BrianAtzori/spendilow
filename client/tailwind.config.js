/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        spendilowTheme: {
          primary: "#FFDB58",

          secondary: "#FFDB58",

          accent: "#FFD700",

          neutral: "#333333",

          "base-100": "#F5F5F5",

          info: "#AED6F1",

          success: "#C9E4C5",

          warning: "#FFF2CC",

          error: "#F7A8B8",
        },
      },
    ],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
