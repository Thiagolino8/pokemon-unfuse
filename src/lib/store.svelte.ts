import type { Pokemon } from '$lib/types'

export const enum GameState {
	playing = 'playing',
	lost = 'lost',
	won = 'won',
}

export const savedPokemons: Record<string, Pokemon> = {}

export const game = $state({ state: GameState.playing })
