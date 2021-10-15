import ProductData from "./fragments/ProductData"
import { ProductPage } from "$lib/api"

const query = `#graphql
${ProductData.query}
query Product($handle: String!) {
	productByHandle(handle: $handle) {
		descriptionHtml
		...ProductData
	}
}
`

function parse(data): ProductPage {
	return {
		description: data.productByHandle.descriptionHtml,
		...ProductData.parse(data.productByHandle)
	}
}

export default { query, parse }