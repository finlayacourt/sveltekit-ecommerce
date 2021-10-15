import { Handle } from "@sveltejs/kit"
import { parse } from "cookie"

export interface Locals { cartId: string }

export const handle: Handle<Locals> = async ({ request, resolve }) => {
	if (request.headers.cookie) {
		const cookies = parse(request.headers.cookie)
		if (cookies.cartId) {
			request.locals.cartId = cookies.cartId
		}
	}
	return await resolve(request)
}