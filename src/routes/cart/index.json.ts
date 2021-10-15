import { getCart, Cart } from "$lib/api"
import { RequestHandler } from "@sveltejs/kit"
import { parse } from "cookie"

export const get: RequestHandler = async request => {

	let cart: Cart

	if (request.headers.cookie) {
		const { cartId } = parse(request.headers.cookie)
		if (cartId) {
			cart = await getCart(cartId)
		}
	}

	if (!cart) cart = { cartId: null, totalAmount: 0, lineItems: [] }

	return { body: JSON.stringify(cart) }

}