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
	let dropdown = $state<HTMLDivElement>()
	let innerHeight = $state<number>(0)
	let scrollY = $state<number>()

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

	const dropdownBottom = $derived(
		scrollY || true ? innerHeight - (dropdown?.getBoundingClientRect().bottom ?? 0) > 320 : true
	)

	const filteredPokemons = $derived(
		pokemons.filter((item) => item !== exclude).filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
	)

	const autofocus = (node: HTMLInputElement) => {
		node.focus()
	}
</script>

<svelte:window bind:innerHeight bind:scrollY />

<SelectImage {selected} />
<div
	bind:this={dropdown}
	use:clickoutside={{ enabled: isOpen, callback: close }}
	class="dropdown {dropdownBottom ? 'dropdown-bottom' : 'dropdown-top'} w-60 text-center"
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
			class="absolute dropdown-content z-10 w-full grid grid-flow-row menu p-2 shadow bg-slate-900 text-slate-100 rounded-box gap-2"
		>
			<input class="input input-bordered input-primary" use:autofocus bind:value={filter} placeholder="Filter" />
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
