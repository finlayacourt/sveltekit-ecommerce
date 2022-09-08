<script>
	export let href
</script>

<style>
	a {
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #313131;
		transition: color 0.2s ease;
	}
	svg {
		width: 1.6rem;
		margin-right: 0.4rem;
		fill: none;
		stroke: #313131;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: 2;
		transition: stroke 0.2s ease, transform 0.2s ease;
		transform-origin: right;
	}
	a:hover {
		color: #847171;
	}
	a:hover svg {
		stroke: #847171;
		transform: translateX(-2px) scaleY(0.9);
	}
</style>

<a {href}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 19">
		<path d="M32 9H1" />
		<path d="M9 1L1 9l8 8" />
	</svg>
	<slot />
</a>