<script lang="ts">
	import { Button, ChevronLeft, ChevronRight } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let expanded = false;

	function onClick() {
		expanded = !expanded;
		dispatch('click', expanded);
	}
</script>

<Button size="xs" color="light" class="absolute top-4 left-4 z-[401]" on:click={onClick}>
	{#if expanded}
		<ChevronRight /> <strong class="text-lg">Show list</strong>
	{:else}
		<ChevronLeft />
	{/if}
</Button>
