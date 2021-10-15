<script>
	import { onMount } from "svelte"
	import { quotes } from "$lib/quotes"

	let current = 0

	onMount(() => {
		setInterval(() => {
			current = (current == quotes.length - 1) ? 0 : current + 1
		}, 8000)
	})
</script>

<style>
	section {
		margin: 1rem 2rem 2rem 2rem;
		position: relative;
	}
	blockquote {
		margin: 0;
		font-style: italic;
		opacity: 0;
		transition: opacity 0.8s;
	}
	cite {
		display: block;
		margin-top: 0.2rem;
		color: #313131;
	}
	.active {
		opacity: 1;
	}
	.floating {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
</style>

<section>
{#each quotes as {quote, cite}, i}
	<blockquote class:active={i == current} class:floating={i > 0}>
		&ldquo;{quote}&rdquo;
		<cite>{cite}</cite>
	</blockquote>
{/each}
</section>