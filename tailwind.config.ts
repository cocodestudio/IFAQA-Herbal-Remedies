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
        'ifaqa-plum': '#0B2D22',        // Deep Imperial Forest Emerald (Primary Brand)
        'ifaqa-blackberry': '#165A45',  // Vibrant Botanical Spruce (Secondary/Interactive)
        'ifaqa-mauve': '#C5A059',       // Royal Antique Burnished Gold (Accent/Badges)
        'ifaqa-sand': '#DFBA73',        // Champagne Gold Hairline (Borders/Dividers)
        'ifaqa-cashmere': '#F5F0E6',    // Warm Silk Parchment (Container Base)
        'ifaqa-linen': '#FAF8F5',       // Luminous Alabaster Pearl (Clean Canvas)
        ifaqa: {
          plum: '#0B2D22',
          blackberry: '#165A45',
          mauve: '#C5A059',
          sand: '#DFBA73',
          cashmere: '#F5F0E6',
          linen: '#FAF8F5',
          emerald: '#0B2D22',
          spruce: '#165A45',
          gold: '#C5A059',
          goldLight: '#FAF5EC',
          goldDark: '#99752D',
          onyx: '#0F1714',
          ruby: '#B91C1C',
          mauveStart: '#165A45',
          mauveEnd: '#0B2D22',
          steelStart: '#0E3B2D',
          steelEnd: '#061811',
        },
      },
      backgroundImage: {
        'gradient-mauve-reserve': 'linear-gradient(135deg, #165A45 0%, #0B2D22 100%)',
        'gradient-steel-night': 'linear-gradient(145deg, #0E3B2D 0%, #061811 100%)',
        'gradient-royal-gold': 'linear-gradient(135deg, #C5A059 0%, #DFBA73 50%, #99752D 100%)',
        'gradient-emerald-silk': 'linear-gradient(180deg, #FAF8F5 0%, #F5F0E6 100%)',
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        urdu: ['Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', 'serif'],
      },
      boxShadow: {
        'luxury-card': '0 8px 24px -4px rgba(11, 45, 34, 0.08), 0 2px 8px -2px rgba(11, 45, 34, 0.04)',
        'luxury-lifted': '0 20px 40px -8px rgba(11, 45, 34, 0.16), 0 6px 16px -2px rgba(197, 160, 89, 0.18)',
        'specular-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 8px 24px -4px rgba(197, 160, 89, 0.25)',
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
