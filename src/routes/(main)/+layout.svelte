<script lang="ts">
	import type { LayoutServerData } from "./$types"
	import Open from "./Open.svelte"
	import Sidebar from "./Sidebar.svelte"
	import Progress from "$lib/components/Progress.svelte"

	export let data: LayoutServerData
	$: cart = data.cart
</script>

<main><slot /></main>
<header>
	<div>
		<a class="title" href="/">Sue Williams A’Court</a>
		<Open {cart} />
	</div>
</header>
<footer>
	<small>© {new Date().getFullYear()} Sue Williams A’Court</small>
</footer>
<Progress />
<Sidebar {cart} />

<style>
	header {
		background-color: #fff;
		border-bottom: 1px solid #dbdbdb;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
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
