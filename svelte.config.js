import adapter from "@sveltejs/adapter-vercel"

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({
			edge: true,
		}),
	},
	vitePlugin: {
		experimental: {
			useVitePreprocess: true,
		},
	},
}

export default config
