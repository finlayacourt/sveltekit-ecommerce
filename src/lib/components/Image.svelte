<script lang="ts">
	export let src: string
	export let sizes: string
	export let widths: number[]
	export let width = 500
	export let lazy = false
	export let alt: string | undefined = undefined

	function transform(url: string, width: number, format?: string) {
		const split = url.split("?")
		const query = split[1] ? `?${split[1]}` : ""
		const tokens = split[0]!.split(".")
		tokens[tokens.length - 2] = `${tokens[tokens.length - 2]}_${width}x${width}`
		if (format) tokens.push(format)
		return `${tokens.join(".")}${query}`
	}

	$: srcset =
		widths && widths.map((width) => `${transform(src, width, "webp")} ${width}w`).join(",")
	$: fallback = transform(src, width)
</script>

<div>
	<picture>
		<source {srcset} {sizes} type="image/webp" />
		<img loading={lazy ? "lazy" : undefined} src={fallback} {alt} />
	</picture>
</div>

<style>
	div {
		padding-top: 100%;
		position: relative;
	}
	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		text-align: center;
	}
</style>
