import { getCart, Cart } from "$lib/api"
import { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async request => {

	let cart: Cart
	
	if (request.locals.cartId) {
		cart = await getCart(request.locals.cartId)
	}

	if (!cart) cart = { cartId: null, totalAmount: 0, lineItems: [] }

	return { body: JSON.stringify(cart) }

}