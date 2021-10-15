import CartData from "./fragments/CartData"

const query = `#graphql
${CartData.query}
mutation removeFromCart($cartId: ID!, $lineItemId: ID!) {
	cartLinesRemove(cartId: $cartId, lineIds: [$lineItemId]) {
		cart {
			...CartData
		}
	}
}`

function parse(data) {
	if (data.cartLinesRemove.cart) return CartData.parse(data.cartLinesRemove.cart)
}

export default { query, parse }