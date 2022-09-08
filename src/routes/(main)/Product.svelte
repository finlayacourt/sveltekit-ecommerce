<script lang="ts">
	import type { TProduct } from "$lib/shopify"
	import Image from "$lib/components/Image.svelte"

	export let fetchpriority: string | undefined = undefined
	export let loading: string | undefined = undefined
	export let index: number
	export let product: TProduct
</script>

<a class:sold={!product.available} href="/product/{product.handle}">
	<Image
		src={product.image}
		alt={product.title}
		widths={[350, 500, 650, 800, 950, 1100]}
		sizes="(min-width: 1182px) 336px, (min-width: 608px) 28vw, 88vw"
		loading={index > 3 ? "lazy" : undefined}
		fetchpriority={index < 4 ? "high" : undefined}
	/>
	<div class="overlay">
		<div>
			<h2>{product.title}</h2>
			<p>£{product.cost.toFixed(2)}</p>
			{#if !product.available}<p class="tag">SOLD</p>{/if}
		</div>
	</div>
</a>

<style>
	a:hover .overlay {
		opacity: 1;
	}
	a:active .overlay {
		background: #fff;
	}
	a {
		width: 100%;
		margin-bottom: 5%;
		position: relative;
		display: block;
	}
	.tag {
		color: #ff4a58;
	}
	.sold::after {
		content: "";
		display: block;
		position: absolute;
		bottom: 0.3rem;
		right: 0.3rem;
		display: block;
		border-radius: 100%;
		background-color: #ff4a58;
		width: 1.2rem;
		height: 1.2rem;
	}
	.overlay {
		position: absolute;
		top: -0.1rem;
		left: -0.1rem;
		right: -0.1rem;
		bottom: -0.1rem;
		background-color: rgba(255, 255, 255, 0.92);
		border-radius: 0.2rem;
		border: 1px solid #dbdbdb;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		opacity: 0;
		transition: opacity 0.2s ease, background 0.2s ease;
	}
	@media (min-width: 38em) {
		a {
			width: 32%;
			margin-right: 2%;
			margin-bottom: 2%;
		}
		a:last-child {
			margin-right: 0;
		}
	}
</style>
