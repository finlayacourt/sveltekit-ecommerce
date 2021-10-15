const query = `#graphql
mutation CheckoutCreate($lineItems: [CheckoutLineItemInput!]) {
	checkoutCreate(input: {lineItems: $lineItems}) {
		checkout {
			id
			webUrl
		}
	}
}
`

function parse(data): { id: string, url: string } {
	const checkout = data.checkoutCreate.checkout
	return {
		id: checkout.id,
		url: checkout.webUrl
	}
}

export default { query, parse }