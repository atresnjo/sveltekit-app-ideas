const {fontFamily} = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    content: ['./src/**/*.{html,js,svelte,ts}'],
    options: {
        safelist: ['/data-theme$/']
    },
    theme: {
        extend: {
            fontFamily: {
                ...fontFamily,
                georgia: ['georgia']
            },
        }
    },
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false
    }
};
