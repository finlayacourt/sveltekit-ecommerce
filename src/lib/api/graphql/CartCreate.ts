import { Cart } from "$lib/api"

const query = `#graphql
mutation CreateCart {
	cartCreate {
		cart {
			id
		}
	}
}`

function parse(data): Cart {
	return {
		cartId: data.cartCreate.cart.id,
		totalAmount: 0,
		lineItems: []
	}
}

export default { query, parse }