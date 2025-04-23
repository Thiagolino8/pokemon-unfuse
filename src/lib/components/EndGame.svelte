<script lang="ts">
	import { game, GameState } from '../store.svelte'

	const endGameMessages = {
		[GameState.won]: 'You win!',
		[GameState.lost]: 'You lose!',
		[GameState.playing]: 'Playing...',
	} as const

	let modal: HTMLDialogElement

	$effect(() => {
		if (game.state === GameState.playing) return
		modal.showModal()
	})
</script>

<dialog bind:this={modal} class="modal">
	<div class="modal-content gap-2 grid">
		<h2 class="text-4xl text-white font-bold">{endGameMessages[game.state]}</h2>
		<button
			onclick={() => {
				game.state = GameState.playing
				modal.close()
			}}
			class="btn btn-primary"
		>
			Play again
		</button>
	</div>
</dialog>
