import pokemons from '$lib/pokemons.json'
import { genName } from '$lib/utils'
import prefixes from '$lib/prefixes.json'
import suffixes from '$lib/suffixes.json'

export const load = async () => {
	const [pokemon1, pokemon2] = [Math.floor(Math.random() * 151), Math.floor(Math.random() * 151)]
	const fusedPokemon = {
		ids: [pokemon1, pokemon2],
		url: `https://images.alexonsager.net/pokemon/fused/${pokemon2}/${pokemon2}.${pokemon1}.png`,
		name: genName(
			prefixes[String(pokemon1) as keyof typeof prefixes],
			suffixes[String(pokemon2) as keyof typeof suffixes]
		),
	}

	return {
		fusedPokemon,
		pokemons,
	}
}
