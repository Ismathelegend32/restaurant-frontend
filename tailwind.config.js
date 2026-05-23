/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: 'rgb(var(--color-brand-gold) / <alpha-value>)',
          red: 'rgb(var(--color-brand-red) / <alpha-value>)',
          black: '#263238',
          navy: 'rgb(var(--color-brand-navy) / <alpha-value>)',
          surface: 'rgb(var(--color-brand-surface) / <alpha-value>)',
          cream: 'rgb(var(--color-brand-cream) / <alpha-value>)',
          success: 'rgb(var(--color-brand-success) / <alpha-value>)',
          error: 'rgb(var(--color-brand-error) / <alpha-value>)',
          info: 'rgb(var(--color-brand-info) / <alpha-value>)',
          warning: 'rgb(var(--color-brand-warning) / <alpha-value>)',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: 'var(--shadow-glow)',
        card: 'var(--shadow-card)',
        red: 'var(--shadow-red)',
      },
      backgroundImage: {
        'hero-overlay':
          'radial-gradient(circle at top, rgba(201, 168, 76, 0.18), transparent 35%), linear-gradient(135deg, rgba(245, 240, 232, 0.06), rgba(26, 26, 26, 0.88))',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(14px, -10px, 0)' },
        },
        slowZoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.07)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        'slow-zoom': 'slowZoom 12s ease-in-out infinite',
        fadeIn: 'fadeIn 0.45s ease-out',
      },
    },
  },
  plugins: [],
}

