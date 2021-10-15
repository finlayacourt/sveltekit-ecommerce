<script context="module">
	/** @type {import("@sveltejs/kit").Load}*/
	export async function load({ fetch }) {
		const res = await fetch("/cart.json")
		const cart = await res.json()
		return { props: { cart } }
	}
</script>

<script>
	import "../app.css"

	import Sidebar from "$lib/components/layout/Sidebar.svelte"
	import Open from "$lib/components/layout/Open.svelte"
	import Overlay from "$lib/components/layout/Overlay.svelte"
	import Progress from "$lib/components/layout/Progress.svelte"

	import { setContext } from "svelte"
	import { writable } from "svelte/store"
	import { onMount } from "svelte"

	export let cart

	const open = writable(false)
	
	onMount(() => {
		open.subscribe($open => {
			if ($open) {
				document.body.classList.add("open")
			} else {
				document.body.classList.remove("open")
			}
		})
	})
	
	setContext("cart", {
		open: open,
		updating: writable(0),
		cart: writable(cart)
	})
</script>

<style>
	header {
		background-color: #fff;
		border-bottom: 1px solid #dbdbdb;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	header div {
		display: flex;
		align-items: center;
		height: 4rem;
		max-width: 65rem;
		padding: 0 6%;
		margin: 0 auto;
	}
	main {
		padding: 1.8rem 6% 0 6%;
		max-width: 65rem;
		margin: 4rem auto 0 auto;
	}
	a {
		color: #313131;
		margin-right: auto;
		transition: color 0.2s ease;
		text-decoration: none;
	}
	a:hover {
		color: #847171;
	}
	.title {
		font-size: 1.5rem;
		margin-right: auto;
	}
	footer {
		padding: 1.8rem 6%;
		text-align: center;
	}
	small {
		font-size: 0.8rem;
		color: #665757;
	}
</style>

<svelte:body class:open={$open}></svelte:body>

<main><slot /></main>
<header>
	<div>
		<a class="title" href="/">Sue Williams A’Court</a>
		<Open />
	</div>
</header>
<footer>
	<small>© {new Date().getFullYear()} Sue Williams A’Court</small>
</footer>
<Progress />

{#if $open}
	<Overlay />
	<Sidebar />
{/if}