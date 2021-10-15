import CartData from "./fragments/CartData"

const query = `#graphql
${CartData.query}
mutation CreateAndAddToCart($productId: ID!) {
	cartCreate(input: {lines: {merchandiseId: $productId}}) {
		cart {
			...CartData
		}
	}
}`

function parse(data) {
	return CartData.parse(data.cartCreate.cart)
}

export default { query, parse }