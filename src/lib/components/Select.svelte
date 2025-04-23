<script lang="ts">
	import type Pokemons from '$lib/pokemons.json'
	import SelectImage from './SelectImage.svelte'
	import { on } from 'svelte/events'

	let {
		selected = $bindable(),
		pokemons,
		title,
		exclude,
	}: {
		selected?: (typeof Pokemons)[number]
		pokemons: typeof Pokemons
		title: string
		exclude?: (typeof Pokemons)[number]
	} = $props()

	let modal: HTMLDialogElement
	let input: HTMLInputElement
	let filter = $state('')
	let shouldFocus = false

	const filteredPokemons = $derived(
		pokemons
			.filter((item) => item.id !== exclude?.id)
			.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()))
	)

	const clickoutside = (node: HTMLDialogElement) => {
		$effect(() => {
			const observer = new MutationObserver((mutationList) => {
				mutationList.forEach((mutation) => {
					if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
						shouldFocus = true
					}
				})
			})
			observer.observe(node, {
				attributes: true,
				attributeFilter: ['open'],
			})
			const unsubClick = on(node, 'click', (event) => {
				if (event.target === node) {
					modal.close()
				}
			})
			const unsubClose = on(node, 'close', () => {
				input.value = ''
				filter = ''
			})
			return () => {
				unsubClick()
				unsubClose()
				observer.disconnect()
			}
		})
	}
</script>

<SelectImage {selected} />
<label for="btn-{title}" class="floating-label">{title}</label>
<button id="btn-{title}" onclick={() => modal.showModal()} class="btn btn-primary w-full">
	{selected?.name ?? 'Choose'}
</button>
<dialog
	ontransitionend={() => {
		if (shouldFocus) {
			shouldFocus = false
			input.focus()
		}
	}}
	bind:this={modal}
	use:clickoutside
	class="modal absolute"
>
	<div class="modal-box menu grid scrollbar-none rounded-box gap-2 p-2">
		<input class="input w-auto font-extrabold" bind:this={input} bind:value={filter} placeholder="Filter" />
		<ul class="overflow-y-auto h-80 scrollbar-none">
			{#each filteredPokemons as item}
				<li class="flex w-full font-bold {item.id === selected?.id ? 'btn-primary' : ''}">
					<button
						class="capitalize"
						onclick={() => {
							selected = item
							modal.close()
						}}
					>
						{item.name}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</dialog>
