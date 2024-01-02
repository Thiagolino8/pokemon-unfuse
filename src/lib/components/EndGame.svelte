<script lang="ts">
	import { fade } from 'svelte/transition'
	import { game, GameState } from '../store.svelte'

	const endGameMessages = {
		[GameState.won]: 'You win!',
		[GameState.lost]: 'You lose!',
	}

	const show = (dialog: HTMLDialogElement) => {
		dialog.showModal()
	}
</script>

{#if game.state !== GameState.playing}
	<dialog use:show transition:fade class="grid [&::backdrop]:bg-black/70 overflow-hidden bg-transparent gap-4 place-content-center">
		<h2 class="text-4xl text-white font-bold">{endGameMessages[game.state]}</h2>
		<button on:click={() => (game.state = GameState.playing)} class="btn btn-primary">Play again</button>
	</dialog>
{/if}
