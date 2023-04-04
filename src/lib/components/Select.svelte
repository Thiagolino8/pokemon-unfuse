<script lang="ts">
	import { clickoutside } from '@svelteuidev/composables'
	import { slide } from 'svelte/transition'
	import type { PokemonItem, PokemonList } from '../types'
	import SelectImage from './SelectImage.svelte'

	export let selected: PokemonItem | undefined = undefined
	export let pokemonPromisses: Promise<PokemonList>
	export let title: string
	export let exclude: PokemonItem | undefined = undefined

	let pokemons: Awaited<typeof pokemonPromisses>['results'] = []

	$: pokemonPromisses.then((items) => {
		pokemons = items.results
	})

	let isOpen = false
	let filter = ''

	const close = () => {
		isOpen = false
	}

	const toggle = () => {
		isOpen = !isOpen
	}

	$: filteredPokemons = pokemons
		.filter((item) => item !== exclude)
		.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
</script>

<div use:clickoutside={{ enabled: isOpen, callback: close }} class="dropdown dropdown-bottom w-60 text-center">
	<SelectImage {selected} />
	<label for="btn-{title}" class="label-text">{title}</label>
	{#await pokemonPromisses}
		<button disabled id="btn-{title}" class="btn btn-primary w-full">Loading Pokemons...</button>
	{:then}
		<button id="btn-{title}" on:click={toggle} class="btn btn-primary w-full">
			{selected?.name ?? 'Choose'}
		</button>
	{/await}
	{#if isOpen}
		<div
			transition:slide
			class="absolute w-full grid grid-flow-row menu p-2 shadow bg-slate-900 text-slate-100 rounded-box gap-2"
		>
			<!-- svelte-ignore a11y-autofocus -->
			<input class="input input-bordered input-primary" autofocus bind:value={filter} placeholder="Filter" />
			<ul class="overflow-y-auto h-80 scrollbar-none">
				{#each filteredPokemons as item}
					<li class="flex w-full {item.url === selected?.url ? 'btn-primary' : ''}">
						<button
							class="capitalize"
							on:click={() => {
								selected = item
								close()
							}}
						>
							{item.name}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
