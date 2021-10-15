import { getProducts } from "$lib/api"
import { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async () => {
	const products = await getProducts()
	return {
		body: JSON.stringify(products)
	}
}