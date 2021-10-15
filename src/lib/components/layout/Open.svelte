<script>
	import { getContext } from "svelte"
	const { cart, open } = getContext("cart")
</script>

<style>
	svg {
		display: block;
		width: 1.2rem;
		stroke: #313131;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2;
		transition: stroke .2s ease;
	}
	svg:hover {
		stroke: #847171;
	}
	circle {
		fill: #FF4A58;
		stroke: #FFF;
	}
</style>

<a href="/cart" on:click|preventDefault={() => open.set(true)}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
		<path d="M1 7l3 11h14l3-11z"/>
		<path d="M8 7l3-6 3 6"/>
		{#if $cart.lineItems.length > 0}<circle cx="17" cy="17" r="5"/>{/if}
	</svg>
</a>