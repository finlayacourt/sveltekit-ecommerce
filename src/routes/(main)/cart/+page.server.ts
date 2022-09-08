import type { PageServerLoad, Actions } from "./$types"
import { shopify } from "$lib/shopify"
import { error, redirect } from "@sveltejs/kit"
import { tomorrow } from "$lib/tomorrow"

export const load: PageServerLoad = async ({ parent }) => {
	let { cart } = await parent()
	return { cart }
}

export const actions: Actions = {
	async add({ request, locals }) {
		let values = await request.formData()
		let product_id = values.get("product_id")
		if (typeof product_id !== "string") throw error(400, "Bad request")
		await shopify.cart.add({ cart_id: locals.cart_id, product_id })
	},
	async remove({ request, locals }) {
		let values = await request.formData()
		let line_id = values.get("line_id")
		if (typeof line_id !== "string") throw error(400, "Bad request")
		await shopify.cart.remove({ cart_id: locals.cart_id, line_id })
	},
	async checkout({ locals, cookies }) {
		let checkout_id = cookies.get("CHECKOUT_ID")
		let cart_products_ids = await shopify.cart.products({ cart_id: locals.cart_id })
		let product_ids = [...cart_products_ids, import.meta.env.VITE_SHOPIFY_PACKING_CHARGE]
		if (checkout_id) {
			let url = await shopify.checkout.replace({ checkout_id, product_ids })
			throw redirect(303, url)
		} else {
			let { id, url } = await shopify.checkout.create({ product_ids })
			cookies.set("CHECKOUT_ID", id, { path: "/", sameSite: "strict", expires: tomorrow() })
			throw redirect(303, url)
		}
	},
}
