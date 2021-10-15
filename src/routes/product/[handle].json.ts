import { getProduct } from "$lib/api"
import { RequestHandler } from "@sveltejs/kit"

export const get: RequestHandler = async ({ params }) => {
	const product = await getProduct(params.handle)
	return {
		body: JSON.stringify(product)
	}
}