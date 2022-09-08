import type { PageServerLoad } from "./$types"
import { shopify } from "$lib/shopify"
import { error } from "@sveltejs/kit"

export const load: PageServerLoad = async ({ params, parent }) => {
	let product = await shopify.product.one({ handle: params.handle })
	if (product === undefined) throw error(404, "Product not found")
	let { cart } = await parent()
	return { product, cart }
}
