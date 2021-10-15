const SHOPIFY_API = "https://suewilliamsacourt.myshopify.com/api/2021-10/graphql"
const SHOPIFY_KEY = "fee36f2f92ccb124faf294290387fb06"

export async function run<Parsed>(
	input: { query: string, parse: (data: any) => Parsed },
	variables?: Record<string, any>
) {

	const { query, parse } = input

	const headers = {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"X-Shopify-Storefront-Access-Token": SHOPIFY_KEY
	}

	const res = await fetch(SHOPIFY_API, {
		method: "post",
		headers: headers,
		body: JSON.stringify({ query, variables })
	})

	const { data, errors } = await res.json()

	if (errors) throw errors

	return parse(data)
	
}