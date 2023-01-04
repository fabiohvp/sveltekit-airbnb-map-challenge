<script lang="ts">
	import Grid from '$lib/Components/Grid.svelte';
	import Map from '$lib/Components/Map/Map.svelte';
	import ShowListButton from '$lib/Components/Map/ShowListButton.svelte';
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';

	let expanded = false;
	let map: Map;

	async function onToggleClick({ detail }: CustomEvent<boolean>) {
		expanded = detail;
		await tick();
		map.redraw();
	}
</script>

<svelte:head>
	<title>Listings</title>
</svelte:head>

<div style="margin: 0 auto;">
	<div class:wrapper={!expanded} class="antialiased">
		{#if !expanded}
			<div class="content-wrapper" in:fly>
				<h1 class="col-span-3 ml-1 h-9 flex items-end mb-6">Over 1,000 homes in Copenhagen</h1>
				<article class="content">
					<Grid />
				</article>
			</div>
		{/if}
		<div class="sidebar relative">
			<Map bind:this={map} />
			<ShowListButton on:click={onToggleClick} />
		</div>
	</div>
</div>

<style>
	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}

	.wrapper {
		display: grid;
		grid-template-columns: 63% calc(37%);
	}

	.wrapper > * {
		background-color: rgba(0, 0, 0, 0);
		border-radius: 5px;
		font-size: 16px;
		margin-bottom: 10px;
	}

	.sidebar {
		background-color: #fafafa;
		height: 100vh;
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		width: 100%;
	}

	.content-wrapper {
		padding: 8px;
		padding-left: 18px;
		padding-right: 18px;
	}

	.content {
		display: grid;
		margin: 0 auto;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		grid-auto-rows: minmax(264px, auto);
		grid-gap: 16px;
	}

	@media (max-width: 1100px) {
		.wrapper {
			grid-template-columns: 1fr;
		}

		.sidebar {
			display: none;
		}

		.content {
			width: 100%;
			grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
			grid-auto-rows: minmax(300px, auto);
		}
	}

	@supports (display: grid) {
		.wrapper > * {
			width: auto;
			margin: 0;
		}
	}
</style>
