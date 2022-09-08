import type { TransitionConfig } from "svelte/transition"
import { cubicInOut } from "svelte/easing"

export function fade(n: unknown, p: unknown): TransitionConfig {
	return {
		duration: 400,
		easing: cubicInOut,
		css: (t, u) => `opacity: ${t};`,
	}
}

export function slide(n: unknown, p: unknown): TransitionConfig {
	return {
		duration: 400,
		easing: cubicInOut,
		css: (t, u) => `transform: translateX(${u * 100}%);`,
	}
}
