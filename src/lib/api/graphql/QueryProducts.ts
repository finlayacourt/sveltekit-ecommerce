import { Product } from "$lib/api"
import ProductData from "./fragments/ProductData"

const query = `#graphql
${ProductData.query}
query Products {
	collections(query: "title:Website", first: 1) {
		edges {
			node {
				products(first: 250) {
					edges {
						node {
							...ProductData
						}
					}
				}
			}
		}
	}
}
`

function parse(data): Product[] {
	const products = data.collections.edges[0].node.products.edges
	return products.map(({ node }) => ProductData.parse(node))
}

export default { query, parse }