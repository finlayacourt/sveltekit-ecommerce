import { Cart, cartAdd, cartCreateAdd } from "$lib/api"
import { RequestHandler, Response } from "@sveltejs/kit"
import { serialize } from "cookie"
import { Locals } from "src/hooks"

export const post: RequestHandler<Locals, FormData> = async request => {
	const productId = request.body.get("productId")
	const response: Response = { status: 200, headers: {} }

	let cart: Cart

	if (request.locals.cartId) {
		cart = await cartAdd(request.locals.cartId, productId)
	}

	if (!cart) {
		cart = await cartCreateAdd(productId)
		response.headers["set-cookie"] = serialize("cartId", cart.cartId, { path: "/", httpOnly: true, SameSite: true })	
	}

	response.body = JSON.stringify(cart)
	
	if (request.headers.accept !== "application/json") {
		response.headers.Location = "/cart"
		response.status = 303
	}

	return response
}