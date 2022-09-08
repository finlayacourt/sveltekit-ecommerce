<script lang="ts">
	import { afterNavigate, beforeNavigate } from "$app/navigation"

	let loading = false
	let loaded = false
	let timeout: any

	beforeNavigate(() => {
		loading = true
		loaded = false
		clearTimeout(timeout)
	})

	afterNavigate(() => {
		loaded = true
		timeout = setTimeout(() => {
			loading = false
			loaded = false
		}, 400)
	})
</script>

<div class:loading class:loaded />

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 0.2em;
		background-color: #ffc0c5;
		transform-origin: left;
		transform: scaleX(0);
	}

	.loading {
		transform: scaleX(0.7);
		transition: transform 2s cubic-bezier(0, 0, 0, 0.618);
	}

	.loaded {
		transform: scaleX(1);
		transition: transform 0.4s ease;
	}
</style>
