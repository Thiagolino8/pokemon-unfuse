<script lang="ts">
	import { fade } from 'svelte/transition'
	import { gameState, GameState } from '../store'

	const endGameMessages = {
		[GameState.won]: 'You won!',
		[GameState.lost]: 'You lost!',
	}
</script>

{#if $gameState !== GameState.playing}
	<div
		transition:fade
		class="h-screen w-screen bg-black/70 z-10 top-0 left-0 fixed grid justify-items-center place-content-center"
	>
		<h2 class="text-4xl font-bold">{endGameMessages[$gameState]}</h2>
		<button on:click={() => ($gameState = GameState.playing)} class="btn btn-primary"> Play again </button>
	</div>
{/if}
