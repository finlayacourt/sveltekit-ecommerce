const query = `#graphql
query Cart($cartId: ID!) {
	cart(id: $cartId) {
		checkoutUrl
	}
}`

function parse(data): string {
	return data.cart.checkoutUrl
}

export default { query, parse }