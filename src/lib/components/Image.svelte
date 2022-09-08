<script lang="ts">
	export let src: string
	export let sizes: string
	export let widths: number[]
	export let width = 500

	export let fetchpriority: string | undefined = undefined
	export let loading: string | undefined = undefined
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

<figure>
	<div>
		<picture>
			<source {srcset} {sizes} type="image/webp" />
			<img {loading} {fetchpriority} src={fallback} {alt} />
		</picture>
	</div>
</figure>

<style>
	figure {
		margin: 0;
	}
	div {
		width: 100%;
		padding-top: 100%;
		position: relative;
	}
	img {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		background-color: #e8e8e8;
		color: #fff;
		text-align: center;
	}
</style>
