import type { LayoutServerLoad } from "./$types"
import { shopify } from "$lib/shopify"
import { error } from "@sveltejs/kit"

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	let cart = await shopify.cart.one({ cart_id: locals.cart_id })
	if (cart === undefined) {
		cookies.delete("CART_ID")
		throw error(404, "Cart not found")
	}
	return { cart }
}
