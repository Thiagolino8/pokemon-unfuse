<script lang="ts">
	import { typesafeFetch } from '../utils'
	import { pokemonSchema, type PokemonItem } from '../types'
	import { savedPokemons } from '../store.svelte'

	let { selected } = $props<{ selected?: PokemonItem }>()
	let selectedId = $state<number>()

	$effect(() => {
		if (selected) {
			if (savedPokemons[selected.name]) selectedId = savedPokemons[selected.name].id
			else
				typesafeFetch(selected?.url, pokemonSchema, fetch).then((pokemon) => {
					savedPokemons[pokemon.name] = pokemon
					selectedId = pokemon.id
				})
		} else selectedId = 0
	})
</script>

<img
	width="80"
	height="80"
	class:invisible={!selectedId}
	class="mx-auto"
	src={selectedId ? `https://images.alexonsager.net/pokemon/${selectedId}.png` : null}
	alt={selected?.name}
/>
