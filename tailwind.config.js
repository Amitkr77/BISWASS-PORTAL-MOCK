/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'govt-blue': '#0a3d78',
        'govt-blue-dark': '#062a54',
        'govt-blue-light': '#e7eff8',
        'govt-blue-mid': '#155ba6',
        'govt-saffron': '#ff9933',
        'govt-saffron-dark': '#cc7a29',
        'govt-green': '#128807',
        'govt-green-dark': '#0d6605',
        'govt-gray': {
          50: '#f7f8fa',
          100: '#eef1f4',
          200: '#dde2e8',
          300: '#c3cbd4',
          600: '#5a6472',
          700: '#3d4650',
          900: '#1a222c'
        },
        'govt-red': '#b3211e'
      },
      fontFamily: {
        heading: ['"Noto Sans"', 'Arial', 'Helvetica', 'sans-serif'],
        body: ['"Noto Sans"', 'Arial', 'Helvetica', 'sans-serif']
      },
      boxShadow: {
        gov: '0 1px 3px rgba(10, 61, 120, 0.15)'
      }
    }
  },
  plugins: []
};
