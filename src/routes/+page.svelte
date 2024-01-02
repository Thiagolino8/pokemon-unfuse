<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import Footer from '$lib/components/Footer.svelte'
	import Select from '$lib/components/Select.svelte'
	import { GameState, game } from '$lib/store.svelte'
	import { untrack } from 'svelte'
	import '../app.css'
	import EndGame from '../lib/components/EndGame.svelte'
	import pokeball from '../lib/pokeball.svg?raw'
	import type { PokemonItem } from '../lib/types'

	let { data } = $props()

	let headPokemon = $state<PokemonItem>()
	let bodyPokemon = $state<PokemonItem>()
	let showTip = $state(false)
	let loading = $state(false)
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
		if (!bodyPokemon || !headPokemon) return
		if (
			bodyPokemon.name.toLocaleLowerCase() === data.fusedPokemon.fused.body.toLocaleLowerCase() &&
			headPokemon.name.toLocaleLowerCase() === data.fusedPokemon.fused.head.toLocaleLowerCase()
		) {
			game.state = GameState.won
		} else {
			game.state = GameState.lost
		}
	}

	$effect(() => {
		game.state
		if (firstRender) firstRender = false
		else if (game.state === GameState.playing) untrack(reset)
	})
</script>

<svelte:head>
	<title>Pokemon Unfuse</title>
	<meta name="description" content="Unfuse pokemon game" />
</svelte:head>

<main>
	<h1 class="text-4xl sm:text-5xl font-mono font-bold grid grid-flow-col place-content-center items-center p-4">
		<span class="text-red-600">Pokemon</span>
		{@html pokeball}
		<span class="text-white">Unfuse</span>
	</h1>

	<div class="grid grid-areas-portrait-layout sm:grid-areas-landscape-layout justify-items-center w-full p-4 gap-8">
		<div class="grid-in-head">
			<Select
				exclude={bodyPokemon}
				bind:selected={headPokemon}
				title="Head pokemon"
				pokemonPromises={data.streamed.pokemons}
			/>
		</div>
		<img
			class="grid-in-fused grid grid-flow-row place-content-center"
			height="240"
			width="240"
			src={data.fusedPokemon.image_url}
			alt={data.fusedPokemon.name}
		/>
		<div class="grid-in-guess grid grid-flow-row gap-2 place-content-center">
			<button
				type="button"
				disabled={loading}
				class="btn btn-block btn-info justify-start gap-2 inline-flex {showTip
					? 'tooltip tooltip-open tooltip-info before:visible'
					: ''}"
				data-tip={data.fusedPokemon.name}
				onclick={() => (showTip = true)}
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
				type="button"
				onclick={submit}
				disabled={!(headPokemon && bodyPokemon) || loading}
				class="btn btn-block justify-start gap-2 btn-success"
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
			<button type="button" onclick={reset} class="btn btn-block btn-error justify-start gap-2">
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
				{:else}
					<span class="loading no-animation" />
				{/if}
				{loading ? 'Loading' : 'Try another'}
			</button>
		</div>
		<div class="grid-in-body">
			<Select
				exclude={headPokemon}
				bind:selected={bodyPokemon}
				title="Body pokemon"
				pokemonPromises={data.streamed.pokemons}
			/>
		</div>
	</div>
</main>

<EndGame />
<Footer />
