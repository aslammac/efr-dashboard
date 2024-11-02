/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      ringWidth: {
        0: '0px',
      },
      ringOpacity: {
        0: '0',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#0284c7",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'black-pearl': {
          '50': '#f0f8ff',
          '100': '#dff0ff',
          '200': '#b8e2ff',
          '300': '#66c4ff',
          '400': '#069ffe',
          '500': '#0786d5',
          '600': '#0062a8',
          '700': '#004b85',
          '800': '#063a60',
          '900': '#041b2f',
          '950': '#031525',
        },
        'whisper': {
          '50': '#faf9fb',
          '100': '#f3f1f7',
          '200': '#e8e4f0',
          '300': '#d6cfe3',
          '400': '#bbb0d0',
          '500': '#a190bc',
          '600': '#8976a7',
          '700': '#73618f',
          '800': '#615277',
          '900': '#4f4360',
          '950': '#332942',
        },
        'polar': {
          '50': '#e7f9f7',
          '100': '#d8f5f3',
          '200': '#b6ebe8',
          '300': '#84dcd8',
          '400': '#4bc5c1',
          '500': '#2faba9',
          '600': '#2a8d90',
          '700': '#287276',
          '800': '#285d62',
          '900': '#254f54',
          '950': '#143438',
        },
        'alice-blue': {
          '50': '#eef6fb',
          '100': '#e6f1f8',
          '200': '#c7e3f0',
          '300': '#95cbe4',
          '400': '#5db1d3',
          '500': '#3897bf',
          '600': '#287aa1',
          '700': '#216283',
          '800': '#1f536d',
          '900': '#1f465b',
          '950': '#142e3d',
        },


      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
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
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('autoprefixer'),
    require("daisyui")
  ],
}