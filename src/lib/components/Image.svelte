<script>
	export let src
	export let alt = undefined
	export let loading = undefined

	export let sizes = undefined
	export let widths = undefined
	export let width = 500 

	function transform(url, width, format) {
		const split = url.split("?")
		const query = split[1] ? `?${split[1]}` : ""
		const tokens = split[0].split(".")
		tokens[tokens.length - 2] = `${tokens[tokens.length - 2]}_${width}x${width}`
		if (format) tokens.push(format)
		return `${tokens.join('.')}${query}`
	}

	$: srcset = widths && widths.map(width => `${transform(src, width, "webp")} ${width}w`).join(",")
	$: fallback = transform(src, width)
</script>

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

<figure>
	<div>
		<picture>
			<source {srcset} {sizes} type="image/webp">
			<img {loading} src={fallback} {alt}>
		</picture>
	</div>
</figure>