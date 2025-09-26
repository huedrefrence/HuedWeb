import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0E6FFF",
          dark: "#0B59CC",
          light: "#E6F0FF",
        },
        ink: {
          900: "#0F172A", // dark header/footer
          800: "#1F2937",
        },
        accent: {
          blue: "#2F7DE1",
          orange: "#E9724C",
          green: "#2FBF9B",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
