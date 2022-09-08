<script lang="ts">
	import type { TCart } from "$lib/shopify"
	import Cart, { open } from "$lib/components/Cart.svelte"
	import { fade, slide } from "$lib/transitions"

	export let cart: TCart
</script>

{#if $open}
	<div transition:fade on:click={() => open.set(false)} />
	<aside transition:slide>
		<Cart {cart} />
	</aside>
{/if}

<style>
	aside {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 24rem;
		background-color: #fff;
		padding: 1.1rem 1.6rem;
		box-sizing: border-box;
		border-left: 1px solid #dbdbdb;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
		color: #313131;
		display: flex;
		flex-direction: column;
	}
	@media (max-width: 38em) {
		aside {
			width: 100%;
			right: 0;
		}
	}
	div {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
