<script lang="ts">
	import type { TCart, TProductDetail } from "$lib/shopify"
	import type { SubmitFunction } from "$app/forms"
	import { pending, open } from "$lib/components/Cart.svelte"
	import { enhance, applyAction } from "$app/forms"
	import { invalidateAll } from "$app/navigation"

	export let cart: TCart
	export let product: TProductDetail

	$: line = cart.lines.find((line) => line.product.id === product.id)

	const handleForm: SubmitFunction = () => {
		pending.set(true)
		return async ({ result }) => {
			if (result.type === "success") {
				await invalidateAll()
				pending.set(false)
				open.set(true)
			}
			applyAction(result)
		}
	}
</script>

<form method="post">
	{#if line !== undefined}
		<form action="/cart?/remove" method="post" use:enhance={handleForm}>
			<input hidden name="line_id" value={line.id} />
			<button disabled={$pending} class:pending={$pending} class="primary" type="submit"
				>Remove from cart</button
			>
		</form>
	{:else if false && !product.available}
		<button class:pending={$pending} disabled class="primary" type="submit">Sold</button>
	{:else}
		<form action="/cart?/add" method="post" use:enhance={handleForm}>
			<input hidden name="product_id" value={product.id} />
			<button disabled={$pending} class:pending={$pending} class="primary" type="submit"
				>Add to cart</button
			>
		</form>
	{/if}
</form>
