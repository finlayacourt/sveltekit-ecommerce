import { run } from "./query"

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
	return run(CartCreate)
}

export function cartAdd(cartId: string, productId: string) {
	return run(CartAdd, { cartId, productId })
}

export function cartCreateAdd(productId: string) {
	return run(CartCreateAdd, { productId })
}

export function cartRemove(cartId: string, lineItemId: string) {
	return run(CartRemove, { cartId, lineItemId })
}

export function cartCheckout(cartId: string) {
	return run(QueryCheckout, { cartId })
}

export function getCart(cartId: string) {
	return run(QueryCart, { cartId })
}

export function getProducts() {
	return run(QueryProducts)
}

export function getProduct(handle: string) {
	return run(QueryProduct, { handle })
}

export function checkoutCart(cartId: string) {
	return run(CheckoutCart, { cartId })
}

export function checkoutCreate(productIds: string[]) {
	const lineItems = productIds.map(productId => ({ quantity: 1, variantId: productId }))
	return run(CheckoutCreate, { lineItems })
}

export function checkoutReplace(checkoutId: string, productIds: string[]) {
	const lineItems = productIds.map(productId => ({ quantity: 1, variantId: productId }))
	return run(CheckoutReplace, { checkoutId, lineItems })
}

export function checkoutUpdateCart(cartId: string, checkoutId: string) {
	return run(CheckoutUpdateCart, { cartId, checkoutId })
}