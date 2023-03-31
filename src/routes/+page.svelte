<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import Select from '$lib/components/Select.svelte'
	import { savedPokemons } from '$lib/store'
	import LoadingSpiner from '../lib/components/LoadingSpiner.svelte'
	import type { PokemonItem } from '../lib/types'

	export let data

	let headPokemon: PokemonItem | undefined
	let bodyPokemon: PokemonItem | undefined
	let showTip = false
	let loading = false

	const reset = () => {
		if (loading) return
		loading = true
		headPokemon = undefined
		bodyPokemon = undefined
		showTip = false
		invalidateAll().then(() => {
			loading = false
		})
	}

	$: data.streamed.headPokemon.then((pokemon) => {
		if (!savedPokemons.has(pokemon.name)) savedPokemons.set(pokemon.name, pokemon)
	})

	$: data.streamed.bodyPokemon.then((pokemon) => {
		if (!savedPokemons.has(pokemon.name)) savedPokemons.set(pokemon.name, pokemon)
	})
</script>

<div class="flex justify-around h-screen">
	<div class="mt-10">
		{#await data.streamed.pokemons}
			<p>Loading...</p>
		{:then pokemons}
			<Select exclude={bodyPokemon} bind:selected={headPokemon} title="Head pokemon" items={pokemons.results} />
		{/await}
	</div>
	<div class="grid grid-flow-row content-center gap-2">
		<img src={data.fusedPokemon.image_url} alt={data.fusedPokemon.name} />
		<button
			disabled={loading}
			class="btn btn-info gap-2 inline-flex {showTip ? 'tooltip tooltip-open tooltip-info' : ''}"
			data-tip={data.fusedPokemon.name}
			on:click={() => (showTip = true)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-current flex-shrink-0 w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			Tip: See fused pokemon name
		</button>
		<button disabled={loading} class="btn btn-success"> Guess </button>
		<button on:click={reset} class="btn btn-error {loading ? 'loading no-animation' : ''}">
			{loading ? 'Loading' : 'Try another'}
		</button>
	</div>
	<div class="mt-10">
		{#await data.streamed.pokemons}
			<p>Loading...</p>
		{:then pokemons}
			<Select exclude={headPokemon} bind:selected={bodyPokemon} title="Body pokemon" items={pokemons.results} />
		{/await}
	</div>
</div>
