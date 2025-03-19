/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "rgba(122, 20, 245, 0.3)",
        input: "rgba(122, 20, 245, 0.2)",
        primary: {
          DEFAULT: "#7a14f5",
          light: "#9747ff",
          dark: "#5d10c3",
        },
        background: {
          DEFAULT: "#0c0d16",
          card: "rgba(30, 31, 48, 0.55)",
        },
        foreground: {
          DEFAULT: "#ffffff",
          muted: "#b3b3cc",
        },
        success: "#00c48c",
        warning: "#ff9f47",
        danger: "#ff5c5c",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(16px)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
