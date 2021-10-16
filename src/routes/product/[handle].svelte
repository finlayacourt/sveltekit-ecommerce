<script context="module">
	import { getProduct } from "$lib/api"

	/** @type {import("@sveltejs/kit").Load} */
	export async function load({ page: { params } }) {
		const product = await getProduct(params.handle)
		return { props: { product } }
	}
</script>

<script>
	import Buy from "$lib/components/product/Buy.svelte"
	import Back from "$lib/components/Back.svelte"
	import Image from "$lib/components/Image.svelte"

	/** @type {import("$lib/api").ProductPage}*/
	export let product
</script>

<style>
	article {
		display: flex;
	}
	section {
		flex: 1;
		margin-right: 1.8rem;
	}
	main {
		flex: 1;
	}
	div {
		margin-bottom: 1.1rem;
	}
	p {
		font-size: 1.4rem;
		font-weight: 400;
		color: #FF4A58;
	}
	span {
		font-size: 0.85rem;
		margin-left: 0.2rem;
	}
	.buy {
		width: 10rem;
	}
	
	@media (max-width: 38em) {
		article {
			display: block;
		}
		section {
			width: 100%;
			margin-right: 0;
			margin-bottom: 1.8rem;
		}
		.back {
			display: none;
		}
		.buy {
			width: 100%;
		}
	}
</style>

<svelte:head>
	<title>{product.title} &middot; Sue Williams A’Court</title>
	<meta property="og:title" content="{product.title} &middot; Sue Williams A’Court’s Shop">
	<meta name="description" content="Sue Williams A’Court is a fine artist and painter.">
	<meta property="og:description" content="Sue Williams A’Court is a fine artist and painter.">
	<meta property="og:image" content="">
</svelte:head>

<article>
	<section>
		<Image
			src={product.image}
			alt={product.title}
			widths={[500, 700, 1000]}
			width={700}
			sizes="(min-width: 1182px) 500px, (min-width: 608px) 42vw, 88vw"
		/>
	</section>
	<main>
		<div class="back">
			<Back href="/">Back to shop</Back>
		</div>
		<div>
			<h1>{product.title}</h1>
			{@html product.description}			
		</div>
		<div>
			<p>£{product.price.toFixed(2)}<span>+ shipping</span></p>
		</div>
		<div class="buy"><Buy {product} /></div>
	</main>
</article>