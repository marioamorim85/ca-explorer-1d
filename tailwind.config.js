/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: '#030509',
          900: '#060a14',
          800: '#0a1020',
          700: '#0e1830',
          600: '#162340',
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)',
        'glow-cyan-sm': '0 0 8px rgba(6,182,212,0.4), 0 0 16px rgba(6,182,212,0.15)',
        'glow-amber': '0 0 12px rgba(245,158,11,0.3)',
        'glow-violet': '0 0 16px rgba(167,139,250,0.3)',
        'led': '0 0 8px currentColor, 0 0 20px rgba(6,182,212,0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  },
  plugins: [],
}
