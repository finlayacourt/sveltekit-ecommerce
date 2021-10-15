import CartData from "./fragments/CartData"

const query = `#graphql
${CartData.query}
mutation AddToCart($cartId: ID!, $productId: ID!) {
	cartLinesAdd(cartId: $cartId, lines: {merchandiseId: $productId}) {
		cart {
			...CartData
		}
	}
}`

function parse(data) {
	if (data.cartLinesAdd.cart) return CartData.parse(data.cartLinesAdd.cart)
}

export default { query, parse }