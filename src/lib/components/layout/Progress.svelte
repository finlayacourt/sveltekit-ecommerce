<script>
	let loading = false
	let loaded = false
	let timeout
</script>

<style>
	div {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 0.2em;
		background-color: #FF4A58;
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

<svelte:window
	on:sveltekit:navigation-start={() => {
		loading = true
		loaded = false
		clearTimeout(timeout)
	}}
	on:sveltekit:navigation-end={() => {
		loaded = true
		setTimeout(() => {
			loading = false
			loaded = false
		}, 400)
	}}
/>

<div class:loading class:loaded></div>