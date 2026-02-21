/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'os-dark': '#121212',
                'os-gray': '#1e1e1e',
                'os-accent': '#0078d4',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
