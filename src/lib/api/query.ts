const SHOPIFY_API = "https://suewilliamsacourt.myshopify.com/api/2021-10/graphql"
const SHOPIFY_KEY = "fee36f2f92ccb124faf294290387fb06"

function create(url: string) {
	return async function run<Parsed>(
		input: { query: string, parse: (data: any) => Parsed },
		variables?: Record<string, any>
	) {
		const { query, parse } = input
		const minified = query.replace(/([\s,]|#[^\n\r]+)+/g, ' ').trim() 

		const res = await fetch(url, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
				"X-Shopify-Storefront-Access-Token": SHOPIFY_KEY
			},
			body: JSON.stringify({ query: minified, variables })
		})

		const { data, errors } = await res.json()

		if (errors) throw errors

		return parse(data)		
	}
}

export const server = create(SHOPIFY_API)

export const client = create("/shopify")