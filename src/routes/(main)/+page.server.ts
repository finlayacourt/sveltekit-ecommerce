import type { PageServerLoad } from "./$types"
import { shopify } from "$lib/shopify"

export const load: PageServerLoad = async () => {
	let products = await shopify.product.all()
	return { products }
}
