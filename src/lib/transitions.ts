import { cubicInOut } from "svelte/easing"

export function fade(node, params) {
	return {
		duration: 400,
		easing: cubicInOut,
		css: (t,u) => `opacity: ${t};`
	}		
}

export function slide(node, params) {
	return {
		duration: 400,
		easing: cubicInOut,
		css: (t,u) => `transform: translateX(${u * 100}%);`
	}
}