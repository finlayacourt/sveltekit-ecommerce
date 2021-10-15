<script>
	import { getContext } from "svelte"
	import { enhance } from "$lib/form"

	const { cart, updating, open } = getContext("cart")

	/** @type {import("$lib/api").ProductPage}*/
	export let product

	let error = false

	$: lineItem = $cart.lineItems.find(lineItem => lineItem.product.productId === product.productId)
	$: action = lineItem ? "/cart/remove" : product.available ? "/cart/add" : undefined
	$: text = lineItem ? "Remove from cart" : product.available ? "Add to cart" : "Sold"
	$: disabled = $updating || (!lineItem && !product.available)

</script>

<style>
	.error {
		font-size: 0.8rem;
		color: #FF4A58;
	}
</style>

<form
	use:enhance={{
		pending: () => updating.set(true),
		error: e => {
			console.error(e)
			error = true
			updating.set(false)
		},
		result: data => {
			cart.set(data)
			updating.set(false)
			open.set(true)
		}
	}}

	method="post"
	{action}
>

	{#if lineItem}
		<input type="hidden" name="lineItemId" value={lineItem?.lineItemId}>
	{:else if product.available}
		<input type="hidden" name="productId" value={product.productId}>
	{/if}

	<button
		{disabled}
		class:updating={$updating}
		class="primary" 
		type="submit"
	>
		{text}
	</button>

	{#if error}<div class="error">Something’s gone wrong!</div>{/if}
</form>