/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors - Web Green
        'web-green': {
          50: '#e6f6ee',
          100: '#bcf0d8',
          200: '#8ce9c1',
          300: '#5ce3aa',
          400: '#2bdb93',
          500: '#00A950',  // Main Green
          600: '#009947',  // Darker Green
          700: '#00803c',
          800: '#006630',
          900: '#004d24',
        },
        // Functional Colors
        success: '#00A950',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // Neutral Colors
        neutral: {
          50: '#F5F7F8',   // Page Background
          100: '#F3F4F6',
          200: '#E5E7EB',  // Borders and Dividers
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',  // Secondary Text
          600: '#4B5563',
          700: '#374151',  // Primary Body Text
          800: '#333D47',  // Footer Background
          900: '#111827',  // Darkest Text
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'liquid': 'liquid 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(0, 169, 80, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 169, 80, 0.8), 0 0 60px rgba(44, 219, 147, 0.4)' },
        },
        liquid: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        }
      },
      backgroundImage: {
        'liquid-gradient': 'linear-gradient(135deg, rgba(0, 169, 80, 0.1) 0%, rgba(44, 219, 147, 0.1) 50%, rgba(140, 233, 193, 0.1) 100%)',
      },
      boxShadow: {
        'custom-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'custom': '0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)',
        'custom-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'custom-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}