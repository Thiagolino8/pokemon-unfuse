<script lang="ts">
	import { clickoutside } from '@svelteuidev/composables'
	import { slide } from 'svelte/transition'
	import SelectImage from './SelectImage.svelte'

	interface Item {
		name: string
		url: string
	}

	export let selected: Item | undefined = undefined
	export let items: Item[]
	export let title: string
	export let exclude: Item | Item[] | undefined = undefined

	let isOpen = false
	let filter = ''

	const close = () => {
		isOpen = false
	}

	const toggle = () => {
		isOpen = !isOpen
	}

	$: filteredItems = items
		.filter((item) => (exclude && exclude instanceof Array ? !exclude.includes(item) : item !== exclude))
		.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
</script>

<div use:clickoutside={{ enabled: isOpen, callback: close }} class="dropdown dropdown-bottom w-60 text-center">
	<SelectImage {selected} />
	<label for="btn-{title}" class="label-text">{title}</label>
	<button id="btn-{title}" on:click={toggle} class="btn btn-primary w-full">{selected?.name ?? 'Choose'}</button>
	{#if isOpen}
		<div
			transition:slide
			class="absolute w-full grid grid-flow-row menu p-2 shadow bg-slate-900 text-slate-100 rounded-box gap-2"
		>
			<!-- svelte-ignore a11y-autofocus -->
			<input class="input input-bordered input-primary" autofocus bind:value={filter} placeholder="Filter" />
			<ul class="overflow-y-auto h-80 scrollbar-none">
				{#each filteredItems as item}
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
