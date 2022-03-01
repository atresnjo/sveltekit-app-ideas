const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	options: {
		safelist: ['/data-theme$/']
	},
	theme: {
		extend: {
			colors: require('daisyui/colors')
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
