import adapter from "@sveltejs/adapter-auto"

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter(),
		inlineStyleThreshold: 1024,
	},
	vitePlugin: {
		experimental: {
			useVitePreprocess: true,
		},
	},
}

export default config
