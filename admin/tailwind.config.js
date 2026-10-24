/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { brand: { 50: '#edf2f9', 100: '#d6e2f2', 500: '#2d63ad', 600: '#1f4e8c', 700: '#183f72' } },
      fontFamily: { sans: ['"Noto Sans TC"', '-apple-system', '"PingFang TC"', '"Microsoft JhengHei"', 'sans-serif'], serif: ['"Noto Serif TC"', 'serif'], mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'] }
    }
  },
  plugins: []
};
