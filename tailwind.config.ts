import { Config } from 'tailwindcss'
import daisyui from 'daisyui'
import themes from 'daisyui/src/colors/themes'
import scrollbar from 'tailwind-scrollbar'
import gridAreas from '@savvywombat/tailwindcss-grid-areas'

export default {
	content: ['./src/**/*.html', './src/**/*.svelte'],
	theme: {
		extend: {
			gridTemplateAreas: {
				'landscape-layout': ['head fused body', 'head guess body'],
				'portrait-layout': ['fused', 'head', 'body', 'guess'],
			},
		},
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
  variants: {
    gridTemplateAreas: ['responsive']
  },
	plugins: [daisyui, scrollbar, gridAreas],
} satisfies Config
