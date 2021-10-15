const query = `#graphql
mutation CheckoutUpdateCart($checkoutId: String!, $cartId: ID!) {
	cartAttributesUpdate(
		attributes: {key: "checkoutId", value: $checkoutId}
		cartId: $cartId
	) {
		cart {
			id
		}
	}
}
`

function parse() {}

export default { query, parse }