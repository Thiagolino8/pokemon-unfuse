import type { Pokemon } from '$lib/types'

export const GameState = {
	playing: 'playing',
	lost: 'lost',
	won: 'won',
} as const

export const savedPokemons: Record<string, Pokemon> = {}

export const game = $state<{ state: (typeof GameState)[keyof typeof GameState] }>({ state: GameState.playing })
