<script lang="ts">
	import type Pokemons from '$lib/pokemons.json'

	let { selected }: { selected?: (typeof Pokemons)[number] } = $props()
</script>

<img
	width="80"
	height="80"
	class:invisible={!selected?.id}
	class="mx-auto"
	src={selected?.id ? `https://images.alexonsager.net/pokemon/${selected.id}.png` : null}
	alt={selected?.name}
/>
