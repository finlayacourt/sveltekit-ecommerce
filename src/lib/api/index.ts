import { client, server } from "./query"

import QueryProducts from "./graphql/QueryProducts"
import QueryProduct from "./graphql/QueryProduct"
import QueryCheckout from "./graphql/QueryCheckout"
import QueryCart from "./graphql/QueryCart"

import CartAdd from "./graphql/CartAdd"
import CartCreate from "./graphql/CartCreate"
import CartCreateAdd from "./graphql/CartCreateAdd"
import CartRemove from "./graphql/CartRemove"

import CheckoutCart from "./graphql/CheckoutCart"
import CheckoutCreate from "./graphql/CheckoutCreate"
import CheckoutReplace from "./graphql/CheckoutReplace"
import CheckoutUpdateCart from "./graphql/CheckoutUpdateCart"

export interface Product {
	productId: string
	handle: string
	title: string
	image: string
	price: number
	available: boolean
}

export interface ProductPage extends Product {
	description: string
}

export interface Cart {
	cartId: string
	lineItems: LineItem[]
	totalAmount: number	
}

export interface LineItem {
	lineItemId: string
	product: Product
}

export function cartCreate() {
	return server(CartCreate)
}

export function cartAdd(cartId: string, productId: string) {
	return server(CartAdd, { cartId, productId })
}

export function cartCreateAdd(productId: string) {
	return server(CartCreateAdd, { productId })
}

export function cartRemove(cartId: string, lineItemId: string) {
	return server(CartRemove, { cartId, lineItemId })
}

export function cartCheckout(cartId: string) {
	return server(QueryCheckout, { cartId })
}

export function getCart(cartId: string) {
	return server(QueryCart, { cartId })
}

export function getProduct(handle: string) {
	if (import.meta.env.SSR || import.meta.env.DEV) {
		return server(QueryProduct, { handle })
	} else {
		return client(QueryProduct, { handle })
	}
	
}

export function getProducts() {
	if (import.meta.env.SSR || import.meta.env.DEV) {
		return server(QueryProducts)
	} else {
		return client(QueryProducts)
	}
	
}

export function checkoutCart(cartId: string) {
	return server(CheckoutCart, { cartId })
}

export function checkoutCreate(productIds: string[]) {
	const lineItems = productIds.map(productId => ({ quantity: 1, variantId: productId }))
	return server(CheckoutCreate, { lineItems })
}

export function checkoutReplace(checkoutId: string, productIds: string[]) {
	const lineItems = productIds.map(productId => ({ quantity: 1, variantId: productId }))
	return server(CheckoutReplace, { checkoutId, lineItems })
}

export function checkoutUpdateCart(cartId: string, checkoutId: string) {
	return server(CheckoutUpdateCart, { cartId, checkoutId })
}