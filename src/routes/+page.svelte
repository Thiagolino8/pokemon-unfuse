<script lang="ts">
	import { invalidateAll } from '$app/navigation'
	import Footer from '$lib/components/Footer.svelte'
	import Select from '$lib/components/Select.svelte'
	import { GameState, game } from '$lib/store.svelte'
	import '../app.css'
	import EndGame from '$lib/components/EndGame.svelte'
	import pokeball from '$lib/pokeball.svg?raw'

	let { data } = $props()

	let headPokemon = $state<(typeof data)['pokemons'][number]>()
	let bodyPokemon = $state<(typeof data)['pokemons'][number]>()
	let showTip = $state(false)
	let loading = $state(false)

	const reset = () => {
		if (loading) return
		loading = true
		headPokemon = undefined
		bodyPokemon = undefined
		showTip = false
		invalidateAll()
	}

	const submit = () => {
		if (!bodyPokemon || !headPokemon) return
		if (bodyPokemon.id === data.fusedPokemon.ids[1] && headPokemon.id === data.fusedPokemon.ids[0])
			return (game.state = GameState.won)
		game.state = GameState.lost
	}
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

	<div
		class="grid [grid-template-areas:'fused'_'head'_'body'_'guess'] sm:[grid-template-areas:'head_fused_body'_'head_guess_body'] justify-items-center w-full p-4 gap-8"
	>
		<div class="[grid-area:head]">
			<Select exclude={bodyPokemon} bind:selected={headPokemon} title="Head pokemon" pokemons={data.pokemons} />
		</div>
		<img
			class="[grid-area:fused] grid grid-flow-row place-content-center"
			height="240"
			width="240"
			src={data.fusedPokemon.url}
			alt={data.fusedPokemon.name}
			onload={() => {
				loading = false
			}}
		/>
		<div class="[grid-area:guess] grid grid-flow-row gap-2 place-content-center">
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
					<span class="loading no-animation"></span>
				{/if}
				{loading ? 'Loading' : 'Try another'}
			</button>
		</div>
		<div class="[grid-area:body]">
			<Select exclude={headPokemon} bind:selected={bodyPokemon} title="Body pokemon" pokemons={data.pokemons} />
		</div>
	</div>
</main>

<EndGame {reset} />
<Footer />
