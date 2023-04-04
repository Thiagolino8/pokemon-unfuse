import type { Pokemon } from '$lib/types'
import { writable } from 'svelte/store'

export enum GameState {
	playing = 'playing',
	lost = 'lost',
	won = 'won',
}

export const savedPokemons: Record<string, Pokemon> = {}

export const gameState = writable<GameState>(GameState.playing)
