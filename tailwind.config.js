/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/reactTags/components/**/*.{js,ts,jsx,tsx}', './src/reactTags/assets/svg/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                iranyekan: ['iranyekan'],
            },
            colors: {
                bg: {
                    dark: '#1C1B1E',
                    light: '#FFF',
                },
                zSecondary: {
                    10: '#EFF0F6',
                    100: '#DBDDDE',
                    300: '#D9DBE9',
                    400: '#A0A3BD',
                },
                zGray: {
                    300: '#CDCDCD',
                    700: '#222831',
                    800: '#151515',
                },
                zDark: {
                    5: '#E3E2E6',
                    12: '#EFF0F6',
                },
            },
        },
    },
    plugins: [],
};
