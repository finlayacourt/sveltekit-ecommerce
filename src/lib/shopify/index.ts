import { error } from "@sveltejs/kit"

export interface TProduct {
	id: string
	title: string
	handle: string
	image: string
	cost: number
	available: boolean
}

export interface TProductDetail extends TProduct {
	description: string
}

export interface TLine {
	id: string
	product: TProduct
}

export interface TCart {
	id: string
	cost: number
	lines: TLine[]
}

function factory(params: { query: string }): () => Promise<void>
function factory<I>(params: { query: string; input?: (i: I) => any }): (i: I) => Promise<void>
function factory<O>(params: { query: string; output: (o: unknown) => O }): () => Promise<O>
function factory<I, O>(params: {
	query: string
	input?: (i: I) => any
	output?: (o: unknown) => O
}): (input: I) => Promise<O>
function factory<I, O>({
	query,
	input: parse_input,
	output: parse_output,
}: {
	query: string
	input?: (i: I) => any
	output?: (o: unknown) => O
}) {
	let minified = query.replace(/([\s,]|#[^\n\r]+)+/g, " ").trim()
	return async function run(input: I) {
		let parsed_input = parse_input ? parse_input(input) : undefined
		let res = await fetch(import.meta.env.VITE_SHOPIFY_API, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"X-Shopify-Storefront-Access-Token": import.meta.env.VITE_SHOPIFY_KEY,
			},
			body: JSON.stringify({ query: minified, variables: parsed_input }),
		})
		let { data, errors } = await res.json()
		if (errors) {
			throw error(res.status, errors[0].message)
		} else {
			let parsed_output = parse_output ? parse_output(data) : undefined
			return parsed_output
		}
	}
}

export const shopify = {
	cart: {
		create: factory({
			query: /* GraphQL */ `
				mutation CreateCart {
					cartCreate {
						cart {
							id
						}
					}
				}
			`,
			output: (data: any) => <string>data.cartCreate.cart.id,
		}),
		one: factory({
			query: /* GraphQL */ `
				query Cart($cart_id: ID!) {
					cart(id: $cart_id) {
						id
						cost {
							subtotalAmount {
								amount
							}
						}
						lines(first: 250) {
							edges {
								node {
									id
									merchandise {
										... on ProductVariant {
											id
											image {
												url
											}
											priceV2 {
												amount
											}
											availableForSale
											product {
												title
												handle
											}
										}
									}
								}
							}
						}
					}
				}
			`,
			input: (i: { cart_id: string }) => i,
			output: (data: any) => {
				return data.cart === null
					? undefined
					: {
							id: data.cart.id,
							cost: Number(data.cart.cost.subtotalAmount.amount),
							lines: data.cart.lines.edges.map(({ node }: any) => {
								let merch = node.merchandise
								return {
									id: node.id,
									product: {
										id: merch.id,
										handle: merch.product.handle,
										title: merch.product.title,
										image: merch.image.url,
										cost: Number(merch.priceV2.amount),
										available: merch.availableForSale,
									},
								}
							}),
					  }
			},
		}),
		add: factory({
			query: /* GraphQL */ `
				mutation AddToCart($cart_id: ID!, $product_id: ID!) {
					cartLinesAdd(cartId: $cart_id, lines: { merchandiseId: $product_id }) {
						cart {
							id
						}
					}
				}
			`,
			input: (i: { cart_id: string; product_id: string }) => i,
		}),
		remove: factory({
			query: /* GraphQL */ `
				mutation removeFromCart($cart_id: ID!, $line_id: ID!) {
					cartLinesRemove(cartId: $cart_id, lineIds: [$line_id]) {
						cart {
							id
						}
					}
				}
			`,
			input: (i: { cart_id: string; line_id: string }) => i,
		}),
		products: factory({
			query: /* GraphQL */ `
				query Checkout($cart_id: ID!) {
					cart(id: $cart_id) {
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
			`,
			input: (i: { cart_id: string }) => i,
			output: (data: any) => {
				let edges: any[] = data.cart.lines.edges
				let product_ids = edges.map(({ node }: any) => <string>node.merchandise.id)
				return product_ids
			},
		}),
	},
	product: {
		one: factory({
			query: /* GraphQL */ `
				query Product($handle: String!) {
					product(handle: $handle) {
						descriptionHtml
						title
						handle
						variants(first: 1) {
							edges {
								node {
									id
									image {
										url
									}
									priceV2 {
										amount
									}
									availableForSale
								}
							}
						}
					}
				}
			`,
			input: (i: { handle: string }) => i,
			output: (data: any) => {
				if (data.product) {
					let variant = data.product.variants.edges[0].node
					return <TProductDetail>{
						id: variant.id,
						title: data.product.title,
						description: data.product.descriptionHtml,
						handle: data.product.handle,
						image: variant.image.url,
						cost: Number(variant.priceV2.amount),
						available: variant.availableForSale,
					}
				}
			},
		}),
		all: factory({
			query: /* GraphQL */ `
				query Products {
					collections(query: "title:Website", first: 1) {
						edges {
							node {
								products(first: 250) {
									edges {
										node {
											descriptionHtml
											title
											handle
											variants(first: 1) {
												edges {
													node {
														id
														image {
															url
														}
														priceV2 {
															amount
														}
														availableForSale
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			`,
			output: (data: any) => {
				let products: any[] = data.collections.edges[0].node.products.edges
				return products.map(({ node }: any) => {
					let variant = node.variants.edges[0].node
					return <TProduct>{
						id: variant.id,
						title: node.title,
						handle: node.handle,
						image: variant.image.url,
						cost: Number(variant.priceV2.amount),
						available: variant.availableForSale,
					}
				})
			},
		}),
	},
	checkout: {
		create: factory({
			query: /* GraphQL */ `
				mutation CheckoutCreate($lines: [CheckoutLineItemInput!]) {
					checkoutCreate(input: { lineItems: $lines }) {
						checkout {
							id
							webUrl
						}
					}
				}
			`,
			input: ({ product_ids }: { product_ids: string[] }) => ({
				lines: product_ids.map((id) => ({ quantity: 1, variantId: id })),
			}),
			output: (data: any) => {
				let checkout = data.checkoutCreate.checkout
				return {
					id: <string>checkout.id,
					url: <string>checkout.webUrl,
				}
			},
		}),
		replace: factory({
			query: /* GraphQL */ `
				mutation CheckoutReplace($lines: [CheckoutLineItemInput!]!, $id: ID!) {
					checkoutLineItemsReplace(checkoutId: $id, lineItems: $lines) {
						checkout {
							webUrl
						}
					}
				}
			`,
			input: ({ checkout_id, product_ids }: { checkout_id: string; product_ids: string[] }) => ({
				id: checkout_id,
				lines: product_ids.map((id) => ({ quantity: 1, variantId: id })),
			}),
			output: (data: any) => <string>data.checkoutLineItemsReplace.checkout.webUrl,
		}),
	},
}
