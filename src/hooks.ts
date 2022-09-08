import type { Handle } from "@sveltejs/kit"
import { shopify } from "$lib/shopify"

export const handle: Handle = async ({ event, resolve }) => {
	let cart_id = event.cookies.get("CART_ID")
	if (cart_id === undefined) {
		cart_id = await shopify.cart.create()
		event.cookies.set("CART_ID", cart_id, { path: "/", sameSite: "strict" })
	}
	event.locals.cart_id = cart_id
	return await resolve(event)
}
