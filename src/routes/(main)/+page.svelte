<script lang="ts">
	import type { PageServerData } from "./$types"
	import Product from "./Product.svelte"

	export let data: PageServerData

	function chunk<T>(array: T[], size: number) {
		let chunked: [T, number][][] = []
		let chunk: [T, number][] = []
		for (let i = 0; i < array.length; i++) {
			if (chunk.length < size) {
				chunk.push([array[i]!, i])
			} else {
				chunked.push(chunk)
				chunk = []
			}
		}
		return chunked
	}
</script>

<svelte:head>
	<title>Shop &middot; Sue Williams A’Court</title>
	<meta property="og:title" content="Sue Williams A’Court’s Shop" />
	<meta name="description" content="Sue Williams A’Court is a fine artist and painter." />
	<meta property="og:description" content="Sue Williams A’Court is a fine artist and painter." />
</svelte:head>

<nav>
	{#each chunk(data.products, 3) as row}
		<div class="row">
			{#each row as [product, index]}
				<Product {product} {index} />
			{/each}
		</div>
	{/each}
</nav>

<style>
	nav {
		position: relative;
	}
	@media (min-width: 38em) {
		.row {
			display: flex;
		}
	}
</style>
