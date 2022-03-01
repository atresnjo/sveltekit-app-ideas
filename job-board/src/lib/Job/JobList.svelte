<script lang="ts">
	import { jobStore } from '$lib/store';
	import JobCard from './JobCard.svelte';
</script>

<div class="flex w-full sm:w-3/4 mt-10 flex-col sm:p-2 sm:space-y-2 max-w-screen-lg">
	{#each $jobStore.jobs as job}
		<JobCard {job} />
	{/each}
</div>
