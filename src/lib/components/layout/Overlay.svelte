<script>
	import { fade } from "$lib/transitions"
	import { getContext } from "svelte"

	const { open } = getContext("cart")
</script>

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
		pointer-events: none;
	}
	.open {
		pointer-events: all;
	}
</style>

<div class:open={$open} transition:fade on:click={() => $open = false}></div>