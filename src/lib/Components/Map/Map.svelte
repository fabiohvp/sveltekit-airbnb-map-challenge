<script lang="ts">
	import * as L from 'leaflet';
	import 'leaflet-providers';
	import 'leaflet/dist/leaflet.css';
	import { onDestroy, onMount } from 'svelte';
	import './leaflet-overrides.css';
	import type { MapItem } from './MapItem';
	import { mapStore } from './mapStore';
	import Marker from './Marker.svelte';
	import Popup from './Popup.svelte';

	const data = $mapStore;

	let element: HTMLDivElement;
	let map: L.Map;
	let popup: HTMLDivElement;
	let selectedItem: MapItem | null = null;

	onMount(() => {
		createMap();
	});

	onDestroy(() => {
		if (!map) return;
		map.off();
		map.remove();
	});

	function createMap() {
		map = L.map(element, {
			attributionControl: false,
			zoomControl: false
		});

		const boundaries = L.featureGroup(data.map((o) => new L.Marker([o.latitude, o.longitude])));
		map.fitBounds(boundaries.getBounds());

		L.control
			.zoom({
				position: 'topright'
			})
			.addTo(map);

		// @ts-ignore
		L.tileLayer.provider('Stadia.OSMBright').addTo(map);

		map.on('click', function () {
			selectedItem = null;
		});
	}

	function onItemClick(item: MapItem) {
		selectedItem = item;
	}

	export function redraw() {
		map.invalidateSize(true);
	}
</script>

<div bind:this={element} class="relative">
	{#if map}
		{#each data as item, index (index)}
			<Marker {item} {map} on:click={() => onItemClick(item)} />
		{/each}
	{/if}
</div>

<div bind:this={popup}>
	<Popup item={selectedItem} {map} />
</div>

<style>
	.relative {
		height: 100%;
	}
</style>
