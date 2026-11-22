import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ifaqa-plum': '#3E3239',
        'ifaqa-blackberry': '#6B5560',
        'ifaqa-mauve': '#9E8189',
        'ifaqa-sand': '#C7A9A3',
        'ifaqa-cashmere': '#E8D2C4',
        'ifaqa-linen': '#F7EFE7',
        ifaqa: {
          plum: '#3E3239',
          blackberry: '#6B5560',
          mauve: '#9E8189',
          sand: '#C7A9A3',
          cashmere: '#E8D2C4',
          linen: '#F7EFE7',
          mauveStart: '#B2949D',
          mauveEnd: '#6B5F6F',
          steelStart: '#88A2BF',
          steelEnd: '#141318',
        },
      },
      backgroundImage: {
        'gradient-mauve-reserve': 'linear-gradient(135deg, #B2949D 0%, #6B5F6F 100%)',
        'gradient-steel-night': 'linear-gradient(145deg, #88A2BF 0%, #141318 100%)',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'serif'],
      },
      boxShadow: {
        'luxury-card': '0 10px 30px -5px rgba(62, 50, 57, 0.12), 0 4px 12px -2px rgba(62, 50, 57, 0.06)',
        'luxury-lifted': '0 20px 40px -10px rgba(62, 50, 57, 0.22), 0 8px 16px -4px rgba(62, 50, 57, 0.12)',
        'specular-glow': 'inset 0 1px 1px 0 rgba(247, 239, 231, 0.4), 0 8px 24px -4px rgba(178, 148, 157, 0.25)',
      },
      transitionTimingFunction: {
        'emil-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'emil-drawer': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
