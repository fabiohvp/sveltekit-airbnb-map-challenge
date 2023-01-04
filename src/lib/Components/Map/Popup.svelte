<script lang="ts">
	import { Carousel } from 'flowbite-svelte';
	import * as L from 'leaflet';
	import { onDestroy, onMount } from 'svelte';
	import { carouselImages } from '../carouselImages';
	import { formatCurrency } from '../locale';
	import type { MapItem } from './MapItem';

	export let item: MapItem;
	export let map: L.Map;

	let element: HTMLDivElement;
	let popup: L.Popup;

	const carousel = {
		divClass: 'h-52 overflow-hidden rounded-t-3xl',
		images: carouselImages,
		showCaptions: false,
		showThumbs: false
	};

	onMount(() => {
		//must be inside because leaflet needs window element
		popup = L.popup({
			className: 'popup-container',
			closeButton: true,
			closeOnClick: false,
			closeOnEscapeKey: false
		});
	});

	$: if (popup && item) {
		popup.setLatLng([item.latitude, item.longitude]).setContent(element).openOn(map);
	}

	onDestroy(() => {
		popup.off();
		popup.remove();
	});
</script>

<div bind:this={element} class="popup w-[320px] overflow-hidden">
	<div class="w-full">
		<Carousel {...carousel} />
	</div>
	<div class="w-full p-4 text-[15px]">
		<address class="font-bold not-italic">
			{item.public_address}
		</address>
		<div class="my-1 overflow-hidden text-ellipsis whitespace-nowrap w-full">
			{item.title}
		</div>
		<div><strong>{formatCurrency(item.monthly_rent)} night</strong></div>
	</div>
</div>

<style>
	.popup :global([data-carousel-next] > span),
	.popup :global([data-carousel-prev] > span) {
		@apply h-8;
		@apply w-8;
		@apply shadow-md;
		background: white;
	}

	.popup :global([data-carousel-next] svg),
	.popup :global([data-carousel-prev] svg) {
		@apply h-4;
		@apply w-4;
		stroke: black;
	}

	/*
		must be global because of the animation			
		explanation: the html is removed when component is destroyed but there is still
			the html of the leaflet popup instance (that needs this css to not "blink") that 
			will only be removed after the animation completes
	*/
	:global(.popup-container) {
		min-height: 308px;
	}
</style>
