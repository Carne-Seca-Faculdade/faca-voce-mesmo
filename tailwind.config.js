export default {
  content: ["./src/**/*.{html,js,ts}", "./*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        "white-custom": "var(--colorWhite)",
        "black-custom": "var(--colorBlack)",
        "text-white": "var(--textWhite)",
        "text-black": "var(--textBlack)",
        "text-gray": "var(--textGray)",
        primary: "var(--colorPrimary)",
        secondary: "var(--colorSecondary)",
        "neutral-100": "var(--colorNeutral-100)",
        "neutral-200": "var(--colorNeutral-200)",
        "neutral-300": "var(--colorNeutral-300)",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit, minmax(250px, auto))",
      },
    },
  },
  plugins: [],
};
