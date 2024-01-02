<script lang="ts">
	import { clickoutside } from '@svelteuidev/composables'
	import { slide } from 'svelte/transition'
	import type { PokemonItem, PokemonList } from '../types'
	import SelectImage from './SelectImage.svelte'

	let { selected, pokemonPromises, title, exclude } = $props<{
		selected?: PokemonItem
		pokemonPromises: Promise<PokemonList>
		title: string
		exclude?: PokemonItem
	}>()

	let pokemons = $state<Awaited<typeof pokemonPromises>['results']>([])

	$effect(() => {
		pokemonPromises.then((items) => {
			pokemons = items.results
		})
	})

	let isOpen = $state(false)
	let filter = $state('')

	const close = () => {
		isOpen = false
	}

	const toggle = () => {
		isOpen = !isOpen
	}

	const filteredPokemons = $derived(
		pokemons.filter((item) => item !== exclude).filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
	)

	const autofocus = (node: HTMLInputElement) => {
		node.focus()
	}
</script>

<SelectImage {selected} />
<div
	use:clickoutside={{ enabled: isOpen, callback: close }}
	class="dropdown md:dropdown-bottom dropdown-top text-center"
>
	<label for="btn-{title}" class="label-text">{title}</label>
	{#await pokemonPromises}
		<button disabled id="btn-{title}" class="btn btn-primary w-full">Loading Pokemons...</button>
	{:then}
		<button id="btn-{title}" on:click={toggle} class="btn btn-primary w-full">
			{selected?.name ?? 'Choose'}
		</button>
	{/await}
	{#if isOpen}
		<div
			transition:slide
			class="absolute dropdown-content z-10 w-auto grid menu p-2 shadow bg-slate-900 text-slate-100 rounded-box gap-2"
		>
			<input class="input input-bordered input-primary w-auto" use:autofocus bind:value={filter} placeholder="Filter" />
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
