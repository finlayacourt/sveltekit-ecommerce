const query = `#graphql
query CheckoutCart($cartId: ID!) {
	cart(id: $cartId) {
		attributes {
			value
			key
		}
		lines(first: 250) {
			edges {
				node {
					merchandise {
						... on ProductVariant {
							id
						}
					}
				}
			}
		}
	}
}
`

function parse(data): { productIds: string[], checkoutId: string } {
	const cart = data.cart
	if (cart) {
		const attribute = cart.attributes.find(({ key }) => key === "checkoutId")
		return {
			productIds: cart.lines.edges.map(({ node }) => node.merchandise.id),
			checkoutId: attribute && attribute.value
		}
	}
}

export default { query, parse }