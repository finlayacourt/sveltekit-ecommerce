import CartData from "./fragments/CartData"

const query = `#graphql
${CartData.query}
query Cart($cartId: ID!) {
	cart(id: $cartId) {
		...CartData
	}
}`

function parse(data) {
	if (data.cart) return CartData.parse(data.cart)
	
}

export default { query, parse }