<script lang="ts">
	import type { PageServerData } from "./$types"
	import Product from "./Product.svelte"

	export let data: PageServerData

	function chunk<T>(array: T[], size: number) {
		const chunked: T[][] = []
		for (const item of array) {
			const last = chunked[chunked.length - 1]
			if (!last || last.length === size) {
				chunked.push([item])
			} else {
				last.push(item)
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
	{#each chunk(data.products, 3) as row, i}
		<div class="row">
			{#each row as product}
				<Product {product} lazy={i > 6} />
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
