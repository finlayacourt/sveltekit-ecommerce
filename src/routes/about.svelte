<script context="module">
	export const prerender = true
</script>

<script>
	import { quotes } from "$lib/quotes"
</script>

<style>
	article {
		max-width: 34rem;
		margin: 0 auto;
	}
	p {
		margin-bottom: 0.7rem;
	}
	blockquote {
		border-left: 0.2rem solid #eaeaea;
		margin: 1.5em 0;
		padding: 0.5em 1em;
		font-style: italic;
	}
	cite {
		display: block;
		margin-top: 0.2rem;
		color: #313131;
	}
</style>

<svelte:head>
	<title>About &middot; Sue Williams A’Court</title>
</svelte:head>

<article>
	<h1>About this shop</h1>
	<p>Sue Williams A’Court’s practice explores the notion of the visual sublime working within painting, collage and drawing, she employs re-imagined landscapes for encounter or contemplation.</p>
	<p>These series of experimental collage works are inspired by rare Tantric images made by copying symbols from ancient manuscripts  onto salvaged paper and used in the practitioners home as a visual aid to their meditation practice.  My collages are a starting point for original graphite and mixed media paintings which can be seen at <a href="https://www.suewilliamsacourt.co.uk">suewilliamsacourt.co.uk</a></p>
	<p>In the selection of work for sale there will continue to be a selection of collages available at the reduced rate as part of the amazing artist support pledge that has been a fantastic support and enabled me to support my fellow artists by collecting their work. <a href="https://artistsupportpledge.com/">artistsupportpledge.com</a></p>
	<p>Thank you! Here is some of your amazing feedback that means so much to me and makes it all worth while!</p>

	{#each quotes as {quote, cite}, i}
		<blockquote>
			&ldquo;{quote}&rdquo;
			<cite>{cite}</cite>
		</blockquote>
	{/each}
</article>