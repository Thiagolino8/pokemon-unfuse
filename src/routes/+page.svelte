<script lang="ts">
	import { browser } from '$app/environment'
	import { invalidateAll } from '$app/navigation'
	import Select from '$lib/components/Select.svelte'
	import { GameState, gameState } from '$lib/store'
	import { onMount } from 'svelte'
	import EndGame from '../lib/components/EndGame.svelte'
	import Pokeball from '../lib/components/Pokeball.svelte'
	import type { PokemonItem } from '../lib/types'

	export let data

	let headPokemon: PokemonItem | undefined
	let bodyPokemon: PokemonItem | undefined
	let showTip = false
	let loading = false
	let firstRender = true

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

	const submit = () => {
		if (bodyPokemon && headPokemon) {
			if (
				bodyPokemon.name.toLocaleLowerCase() === data.fusedPokemon.fused.body.toLocaleLowerCase() &&
				headPokemon.name.toLocaleLowerCase() === data.fusedPokemon.fused.head.toLocaleLowerCase()
			) {
				$gameState = GameState.won
			} else {
				$gameState = GameState.lost
			}
		}
	}

	$: if (browser) {
		if (firstRender) firstRender = false
		else if ($gameState === GameState.playing) reset()
	}
</script>

<svelte:head>
	<title>Pokemon Unfuse</title>
	<meta name="description" content="Unfuse pokemon game" />
</svelte:head>

<h1 class="text-5xl font-mono font-bold flex justify-center p-4">
	<span class="text-red-600">Pokemon</span><Pokeball /><span class="text-white">Unfuse</span>
</h1>

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
			class="btn btn-info justify-start gap-2 inline-flex before:visible {showTip
				? 'tooltip tooltip-open tooltip-info'
				: ''}"
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
		<button
			on:click={submit}
			disabled={!(headPokemon && bodyPokemon) || loading}
			class="btn justify-start gap-2 btn-success"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			Guess
		</button>
		<button on:click={reset} class="btn btn-error justify-start gap-2 {loading ? 'loading no-animation' : ''}">
			{#if !loading}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			{/if}
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

<EndGame />

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	:global(img) {
		image-rendering: pixelated;
	}
</style>
