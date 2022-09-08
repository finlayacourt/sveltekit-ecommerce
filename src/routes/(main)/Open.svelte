<script lang="ts">
	import type { TCart } from "$lib/shopify"
	import { open } from "$lib/components/Cart.svelte"

	export let cart: TCart
</script>

<a href="/cart" aria-label="Open cart" on:click|preventDefault={() => open.set(true)}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
		<path d="M1 7l3 11h14l3-11z" />
		<path d="M8 7l3-6 3 6" />
		{#if cart.lines.length > 0}<circle cx="17" cy="17" r="5" />{/if}
	</svg>
</a>

<style>
	svg {
		display: block;
		width: 1.2rem;
		stroke: #313131;
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2;
		transition: stroke 0.2s ease;
	}
	svg:hover {
		stroke: #847171;
	}
	circle {
		fill: #ff4a58;
		stroke: #fff;
	}
</style>
