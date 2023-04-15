/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
        backgroundImage: {
            'auth-layout': 'url(\'../src/assets/img/login_bg.jpg\')'
        }
    },
    plugins: []
}
