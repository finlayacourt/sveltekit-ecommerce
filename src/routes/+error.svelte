<script lang="ts">
	import { page } from "$app/stores"
</script>

<div>
	<main>
		<h2>We’re sorry but something’s gone wrong.</h2>
		<pre>{$page.status}: {$page.error.message}</pre>
	</main>
</div>

<style>
	div {
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	pre {
		font-size: 0.8rem;
	}
</style>
