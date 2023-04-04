import { fusedPokemonSchema, pokemonListSchema, pokemonSchema } from '$lib/types'
import { typesafeFetch } from '$lib/utils'

export const load = async ({ fetch }) => {
	const fusedPokemon = typesafeFetch('https://keith.api.stdlib.com/pokefusion@0.2.0/', fusedPokemonSchema, fetch)

	const pokemons = typesafeFetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0', pokemonListSchema, fetch)

	return {
		fusedPokemon,
		streamed: {
			pokemons,
		},
	}
}
