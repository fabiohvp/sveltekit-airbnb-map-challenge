<script lang="ts">
	import * as L from 'leaflet';
	import { onMount } from 'svelte';
	import { formatCurrency } from '../locale';
	import type { MapItem } from './MapItem';

	export let item: MapItem;
	export let map: L.Map;

	let element: HTMLButtonElement;

	onMount(() => {
		//must be inside because leaflet needs window element
		L.popup({
			closeButton: false,
			closeOnClick: false,
			closeOnEscapeKey: false
		})
			.setLatLng([item.latitude, item.longitude])
			.setContent(element)
			.addTo(map);
	});
</script>

<button bind:this={element} on:click>
	{formatCurrency(item.monthly_rent)}
</button>

<style>
	button {
		@apply font-extrabold;
		height: 28px;
		padding: 0px 8px;
		width: 100%;
	}
</style>
