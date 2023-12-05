/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "300px",
      tablet: "451px",
      // => @media (min-width: 640px) { ... }

      desktop: "961px",
      // => @media (min-width: 1024px) { ... }

      "desktop-l": "1440px",
      // => @media (min-width: 1280px) { ... }

      "desktop-4k": "2560px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        primary: ["Playfair Display", "sans-serif"],
        heading: ["Raleway", "serif"],
        body: ["Montserrat", "sans-serif"],
      },
    },
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
