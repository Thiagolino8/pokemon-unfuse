<script lang="ts">
	import { typesafeFetch } from '../utils'
	import { pokemonSchema, type PokemonItem } from '../types'
	import { savedPokemons } from '../store'

  export let selected: PokemonItem | undefined = undefined
	let selectedId: number

	$: if (selected) {
		if (savedPokemons[selected.name]) selectedId = savedPokemons[selected.name].id
		else
			typesafeFetch(selected?.url, pokemonSchema, fetch).then((pokemon) => {
				savedPokemons[pokemon.name] = pokemon
				selectedId = pokemon.id
			})
	}
</script>

<img
		width="80"
		height="80"
    class:invisible={!selected}
		class="mx-auto"
		src={selectedId ? `https://images.alexonsager.net/pokemon/${selectedId}.png` : undefined}
		alt={selected?.name}
	/>