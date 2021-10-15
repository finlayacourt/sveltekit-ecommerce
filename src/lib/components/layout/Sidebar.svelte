<script>
	import Cart from "$lib/components/cart/Cart.svelte"
	import { slide } from "$lib/transitions"
</script>

<style>
	aside {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		width: 24rem;
		background-color: #FFF;
		padding: 1.1rem 1.6rem;
		box-sizing: border-box;
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
</style>

<aside transition:slide>
	<Cart />
</aside>