/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
          keyframes: {
            fadeIn: {
                '0%': { opacity: '0' },
                '100%': { opacity: '1' },
            },
            slideIn: {
              from: { transform: 'translateX(-20px)', opacity: '0' },
              to: { transform: 'translateX(0)', opacity: '1' },
            }
          },
          animation: {
            slideIn: 'slideIn 1s ease-in-out',
            fadeIn: 'fadeIn 1s ease-in-out',
          },
        }
      },
    plugins: [],
} 