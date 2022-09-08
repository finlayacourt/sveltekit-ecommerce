import adapter from "@sveltejs/adapter-vercel"

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: true,
			split: true,
		}),
		inlineStyleThreshold: 1024,
	},
	vitePlugin: {
		experimental: {
			useVitePreprocess: true,
		},
	},
}

export default config
