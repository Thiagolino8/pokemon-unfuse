import { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import scrollbar from 'tailwind-scrollbar'

export default {
	content: ['./src/**/*.html', './src/**/*.svelte'],
	theme: {
		extend: {},
	},
	plugins: [daisyui, scrollbar],
} satisfies Config
