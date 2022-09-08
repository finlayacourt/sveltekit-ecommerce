<script lang="ts">
	import type { PageServerData } from "./$types"
	import Cart from "$lib/components/Cart.svelte"
	export let data: PageServerData
</script>

<article>
	<Cart cart={data.cart} sidebar={false} />
</article>
