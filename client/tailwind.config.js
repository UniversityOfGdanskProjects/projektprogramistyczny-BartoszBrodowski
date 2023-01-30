/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary_dark_blue: '#0d253f',
				primary_light_blue: '#01b4e4',
				primary_light_green: '#90cea1',
				card_bg: '#f7f0f5',
			},
			boxShadow: {
				movie_card:
					'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 8px -1px;',
				filters: '0px 0px 6px -1px rgba(100, 100, 100, 1)',
				input: 'inset 0px 0px 3px -1px rgba(139, 139, 143, 1)',
			},
			fontFamily: {
				open_sans: ['Open Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
