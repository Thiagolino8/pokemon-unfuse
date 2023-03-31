import { fusedPokemonSchema, pokemonListSchema, pokemonSchema } from '$lib/types'
import { typesafeFetch } from '$lib/utils'

export const load = async ({ fetch }) => {
	const fusedPokemon = typesafeFetch('https://keith.api.stdlib.com/pokefusion@0.2.0/', fusedPokemonSchema, fetch)

	const pokemons = typesafeFetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0', pokemonListSchema, fetch)

	const headPokemon = typesafeFetch(
		`https://pokeapi.co/api/v2/pokemon/${(await fusedPokemon).fused.head.toLowerCase()}`,
		pokemonSchema,
		fetch
	)

	const bodyPokemon = typesafeFetch(
		`https://pokeapi.co/api/v2/pokemon/${(await fusedPokemon).fused.body.toLowerCase()}`,
		pokemonSchema,
		fetch
	)

	return {
		fusedPokemon,
		streamed: {
			pokemons,
			headPokemon,
			bodyPokemon,
		},
	}
}
