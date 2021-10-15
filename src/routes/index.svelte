<script context="module">
	import { getProducts } from "$lib/api"

	/** @type {import("@sveltejs/kit").Load} */
	export async function load() {
		const products = await getProducts()
		return { props: { products } }
	}
</script>

<script>
	import Product from "$lib/components/product/Product.svelte"
	import Quotes from "$lib/components/Quotes.svelte"
	import Next from "$lib/components/Next.svelte"

	/** @type {import("$lib/api").Product[]}*/
	export let products

	function chunk(array, size) {
		const chunked = []
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
	<meta property="og:title" content="Sue Williams A’Court’s Shop">
	<meta name="description" content="Sue Williams A’Court is a fine artist and painter.">
	<meta property="og:description" content="Sue Williams A’Court is a fine artist and painter.">
</svelte:head>

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

<section>
	<Next href="/about">More about this shop</Next>
	<Quotes />
</section>
<nav>
{#each chunk(products, 3) as row, i}
	<div class="row">
		{#each row as product}
			<Product {product} loading={i > 2 ? "lazy" : undefined}/>
		{/each}
	</div>
{/each}
</nav>