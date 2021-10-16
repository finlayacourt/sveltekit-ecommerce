<script>
	import { flip } from "svelte/animate"
	import { getContext } from "svelte"
	import { enhance } from "$lib/form"

	import Close from "./Close.svelte"
	import Row from "./Row.svelte"
	import Image from "$lib/components/Image.svelte"

	const { cart, updating } = getContext("cart")

	let error = false
</script>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.1rem;

		font-size: 1.3rem;
		color: #313131;
	}

	main {
		flex: 1;
		overflow-y: auto;
	}

	footer {
		border-top: 1px solid #dbdbdb;
		padding-top: 1rem;
		margin-top: 1rem;
	}

	.remove {
		color: #847171;
		text-decoration: underline;
		transition: color 0.2s ease;
		outline: 0;
	}

	.remove:hover {
		color: #665757;
	}
	
	.empty {
		color: #847171;
	}

	main.updating {
		opacity: 0.4;
		cursor: wait;
	}

	.unavailable {
		margin-top: 0.4rem;
	}

</style>

<header>
	<div>Shopping Cart</div>
	<Close/>
</header>
<main class:updating={$updating}>
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
			}
		}}
		action="/cart/remove"
		method="post"
	>

		{#if $cart.lineItems.length === 0}

			<span class="empty">{$updating ? "Loading..." : "Your cart is empty"}</span>

		{:else}

			{#each $cart.lineItems as { lineItemId, product } (lineItemId)}
				<div animate:flip="{{duration: 400}}">

				<Row>
					<span slot="image">
						<Image
							src={product.image}
							alt={product.title}
							widths={[300]}
							width={300}
						/>
					</span>
					<span slot="heading">
						<div>{product.title}</div>
						<button disabled={$updating} class="remove" type="submit" name="lineItemId" value={lineItemId}>Remove</button>
						{#if !product.available}<div class="error unavailable">This item is no longer available</div>{/if}
					</span>
					<span slot="price">£{product.price.toFixed(2)}</span>
				</Row>

				</div>
			{/each}
			
		{/if}

		{#if error}<div class="error">Something’s gone wrong!</div>{/if}
		
	</form>
</main>
<footer>
	<Row>
		<span slot="heading">Subtotal</span>
		<span slot="price">£{$cart.totalAmount.toFixed(2)}</span>
	</Row>

	<form action="/cart/check" method="get">
		<button
			disabled={$updating || $cart.lineItems.length === 0}
			class:updating={$updating}
			class="primary"
			type="submit"
		>Checkout</button>
	</form>
</footer>