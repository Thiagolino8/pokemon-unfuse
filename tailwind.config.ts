import { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import themes from 'daisyui/src/colors/themes'
import scrollbar from 'tailwind-scrollbar'

export default {
	content: ['./src/**/*.html', './src/**/*.svelte'],
	theme: {
		extend: {},
	},
	daisyui: {
		themes: [
			{
				default: {
					...themes['[data-theme=autumn]'],
					'base-100': '#1e293b',
				},
			},
		],
	},
	plugins: [daisyui, scrollbar],
} satisfies Config
