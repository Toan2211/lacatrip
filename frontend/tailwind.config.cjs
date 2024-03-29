/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {},
        backgroundImage: {
            'auth-layout': 'url("../src/assets/img/login_bg.jpg")'
        }
    },
    plugins: [require('flowbite/plugin')]
}
