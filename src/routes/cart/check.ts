import { checkoutCart, checkoutCreate, checkoutReplace, checkoutUpdateCart } from "$lib/api"
import { RequestHandler } from "@sveltejs/kit"
import { parse } from "cookie"

const PACKAGE_CHARGE = "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MTU0MTY4NDAzNTc1Mw=="

export const get: RequestHandler<unknown, FormData> = async (request) => {

	if (request.headers.cookie) {
		const { cartId } = parse(request.headers.cookie)
		if (cartId) {

			const cart = await checkoutCart(cartId)

			if (cart) {
				let checkoutUrl: string

				const productIds = [...cart.productIds, PACKAGE_CHARGE]
				
				if (cart.checkoutId) {
					checkoutUrl = await checkoutReplace(cart.checkoutId, productIds)
				} else {
					const { id, url } = await checkoutCreate(productIds)
					await checkoutUpdateCart(cartId, id)
					checkoutUrl = url
				}
				return {
					headers: {
						Location: checkoutUrl
					},
					status: 303
				}
			}

		}
	}
}