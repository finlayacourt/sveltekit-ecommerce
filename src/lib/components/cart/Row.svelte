<style>
	.row {
		display: flex;
		margin-bottom: 1.1rem;
	}
	.image {
		width: 9rem;
		margin-right: 1.1rem;
	}
	.heading {
		flex: 1;
		margin-right: 1.1rem;
	}
	.price {
		text-align: right;
	}
</style>

<div class="row">
	{#if $$slots.image}<div class="image"><slot name="image" /></div>{/if}
	<div class="heading"><slot name="heading" /></div>
	<div class="price"><slot name="price" /></div>
</div>