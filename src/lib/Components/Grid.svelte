<script lang="ts">
	import { Img } from 'flowbite-svelte';
	import { mapStore } from './Map/mapStore';
</script>

{#each $mapStore as row}
	<a
		rel="noopener noreferrer nofollow"
		target="listing_{row.id}"
		aria-labelledby="title_{row.id}"
		href="/listing/{row.id}"
		on:mouseenter
	>
		<div class="panel overflow-hidden bg-white">
			<div class="relative h-[14.25rem]">
				<Img
					async
					src={row.image_url}
					alt="Listing"
					imgClass="absolute h-full w-full object-cover rounded-xl"
				/>
			</div>
			<div style="margin-top: 5%;margin-bottom:5%;">
				<p class="text-xs font-semibold uppercase tracking-wide text-gray-500">
					{row.public_address}
				</p>
				<p class="text-base font-semibold text-gray-900">Lejlighed / 1 vær. / 35 m²</p>
				<p class="mt-1 truncate text-base text-gray-700">{row.title}</p>
				<p class="panel-rent mt-2 text-gray-800">
					<span class="font-semibold text-teal-600">{row.monthly_rent}</span>
					<span class="text-sm text-gray-600">kr./måned</span>
				</p>
			</div>
		</div>
	</a>
{/each}

<style>
	.panel {
		margin-left: 5px;
		margin-right: 5px;
	}

	.panel-rent {
		text-align: right;
	}

	a {
		text-decoration: none;
	}
</style>
