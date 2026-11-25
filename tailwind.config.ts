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
        'ifaqa-plum': '#0B2D22',        // Deep Forest Ink (Primary Brand Accent & Ink)
        'ifaqa-blackberry': '#165A45',  // Botanical Spruce (Secondary Ink)
        'ifaqa-mauve': '#C5A059',       // Burnished Brass Accent (Use sparingly for signature detail)
        'ifaqa-sand': '#DFBA73',        // Light Brass Border Accent
        'ifaqa-cashmere': '#F5F0E6',    // Warm Botanical Stone (Raised Surface)
        'ifaqa-linen': '#FAF8F5',       // Warm Paper Canvas (Page Ground)
        ifaqa: {
          plum: '#0B2D22',
          blackberry: '#165A45',
          mauve: '#C5A059',
          sand: '#DFBA73',
          cashmere: '#F5F0E6',
          linen: '#FAF8F5',
          emerald: '#0B2D22',
          spruce: '#165A45',
          muted: '#5A6962',
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
        serif: ['var(--font-display)', 'Newsreader', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
        urdu: ['var(--font-urdu)', 'Noto Nastaliq Urdu', 'serif'],
      },
      boxShadow: {
        'luxury-card': '0 1px 2px rgba(11, 45, 34, 0.05)',
        'luxury-lifted': '0 8px 24px rgba(11, 45, 34, 0.07)',
      },
      transitionTimingFunction: {
        'emil-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'emil-drawer': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
