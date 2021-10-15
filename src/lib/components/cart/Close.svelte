<script>
	import { getContext } from "svelte"
	const { open } = getContext("cart")
</script>

<style>
	svg {
		width: 1rem;
		stroke: #313131;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2;
		display: block;
		transition: stroke .2s ease;
	}
	svg:hover {
		stroke: #847171;
	}
</style>

<a href="/" on:click|preventDefault={() => open.set(false)}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
		<path d="M2 2l16 16" />
		<path d="M18 2L2 18" />
	</svg>
</a>