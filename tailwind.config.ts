import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        quicksand: ["Quicksand", "Sans-Serif"],
        monsterrat: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        xs: "10px",
        sx: "12px",
        sm: "14px",
        base: "16px",
        lg: "18px",
        xl: "20px",
        "1.5xl": "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "48px",
        "5xl": "60px",
        "6xl": "72px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1108px",
        xl: "1224px",
        "2xl": "1370px",
      },
      colors: {
        theme: "#045b63",
        font2: "#44476A",
        font1: "#045b63",
      },
    },
  },
  plugins: [],
}


export default config
