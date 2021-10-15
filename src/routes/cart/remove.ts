import { Cart, cartRemove, cartCreate } from "$lib/api"
import { RequestHandler, Response } from "@sveltejs/kit"
import { parse, serialize } from "cookie"

export const post: RequestHandler<unknown, FormData> = async request => {
	const lineItemId = request.body.get("lineItemId")
	const response: Response = { status: 200, headers: {} }

	let cart: Cart

	if (request.headers.cookie) {
		const { cartId } = parse(request.headers.cookie)
		if (cartId) {
			cart = await cartRemove(cartId, lineItemId)
		}
	}
	
	if (!cart) {
		cart = await cartCreate()
		response.headers["set-cookie"] = serialize("cartId", cart.cartId, { path: "/", httpOnly: true, SameSite: true })	
	}

	response.body = JSON.stringify(cart)
	
	if (request.headers.accept !== "application/json") {
		response.headers.Location = "/cart"
		response.status = 303
	}

	return response
}