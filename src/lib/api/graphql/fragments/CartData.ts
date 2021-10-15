import { Cart } from "$lib/api"

const query = `#graphql
fragment CartData on Cart {
	id
	estimatedCost {
		subtotalAmount {
			amount
		}
	}
	lines(first: 250) {
		edges {
			node {
				id
				merchandise {
					... on ProductVariant {
						id
						image {
							originalSrc
						}
						priceV2 {
							amount
						}
						available
						product {
							title
							handle
						}
					}
				}
			}
		}
	}
}`

function parse(data): Cart {
	return {
		cartId: data.id,
		totalAmount: Number(data.estimatedCost.subtotalAmount.amount),
		lineItems: data.lines.edges.map(({ node }) => {
			const merchandise = node.merchandise
			return {
				lineItemId: node.id,
				product: {
					productId: merchandise.id,
					handle: merchandise.product.handle,
					title: merchandise.product.title,
					image: merchandise.image.originalSrc,
					price: Number(merchandise.priceV2.amount),
					available: merchandise.available
				}
			}
		})
	}
}

export default { query, parse }