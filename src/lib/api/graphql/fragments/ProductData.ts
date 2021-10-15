import { Product } from "$lib/api"

const query = `#graphql
fragment ProductData on Product {
	title
	handle
	variants(first: 1) {
		edges {
			node {
				id
				image {
					originalSrc
				}
				priceV2 {
					amount
				}
				available
			}
		}
	}	
}`

function parse(data): Product {
	const variant = data.variants.edges[0].node
	return {
		productId: variant.id,
		title: data.title,
		handle: data.handle,
		image: variant.image.originalSrc,
		price: Number(variant.priceV2.amount),
		available: variant.available
	}
}

export default { query, parse }