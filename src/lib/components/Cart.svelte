<script lang="ts" context="module">
	import { writable } from "svelte/store"
	export const open = writable(false)
	export const pending = writable(false)
</script>

<script lang="ts">
	import type { TCart } from "$lib/shopify"
	import type { SubmitFunction } from "$app/forms"
	import { flip } from "svelte/animate"
	import { applyAction } from "$app/forms"
	import { enhance } from "$app/forms"
	import { invalidateAll } from "$app/navigation"
	import Image from "$lib/components/Image.svelte"
	import Close from "./Close.svelte"

	export let cart: TCart
	export let sidebar = true

	const handleForm: SubmitFunction = () => {
		pending.set(true)
		return async ({ result }) => {
			if (result.type === "success") {
				await invalidateAll()
				pending.set(false)
			}
			applyAction(result)
		}
	}
</script>

<header>
	<div>Shopping Cart</div>
	{#if sidebar}<Close />{/if}
</header>
<main class:pending={$pending}>
	{#if cart.lines.length === 0}
		<span class="empty">Your cart is empty</span>
	{:else}
		{#each cart.lines as { id, product } (id)}
			<div animate:flip={{ duration: 400 }} class="row">
				<div class="image">
					<Image
						src={product.image}
						alt={product.title}
						widths={[350, 500, 650, 800, 950, 1100]}
						width={350}
						sizes="144px"
					/>
				</div>
				<div class="heading">
					<div>{product.title}</div>
					<form action="/cart?/remove" method="post" use:enhance={handleForm}>
						<input hidden name="line_id" value={id} />
						<button disabled={$pending} class="remove" type="submit">Remove</button>
					</form>
					{#if !product.available}
						<div class="unavailable">This item is no longer available</div>
					{/if}
				</div>
				<div class="price">£{product.cost.toFixed(2)}</div>
			</div>
		{/each}
	{/if}
</main>
<footer>
	<div class="row">
		<div class="heading">Subtotal</div>
		<div class="price">£{cart.cost.toFixed(2)}</div>
	</div>

	<form action="/cart?/checkout" method="post">
		<button disabled={cart.lines.length === 0 || $pending} class="primary" type="submit"
			>Checkout</button
		>
	</form>
</footer>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		border-bottom: 1px solid #dbdbdb;
		padding-bottom: 1rem;

		font-size: 1.3rem;
		color: #313131;
	}

	main {
		flex: 1;
		overflow-y: auto;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}

	footer {
		border-top: 1px solid #dbdbdb;
		padding-top: 1rem;
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

	main.pending {
		opacity: 0.4;
		cursor: wait;
	}

	.unavailable {
		font-size: 0.8rem;
		color: #ff4a58;
		margin-top: 0.4rem;
	}

	.row {
		display: flex;
		margin-bottom: 1.1rem;
	}
	.image {
		width: 9rem;
		margin-right: 1.1rem;
	}
	.heading {
		flex: 1;
		margin-right: 1.1rem;
	}
	.price {
		text-align: right;
	}
</style>
