const query = `#graphql
mutation CheckoutReplace($lineItems: [CheckoutLineItemInput!]!, $checkoutId: ID!) {
	checkoutLineItemsReplace(checkoutId: $checkoutId, lineItems: $lineItems) {
		checkout {
			webUrl
		}
	}
}
`

function parse(data): string {
	return data.checkoutLineItemsReplace.checkout.webUrl
}

export default { query, parse }