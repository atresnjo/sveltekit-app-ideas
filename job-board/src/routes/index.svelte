<script lang="ts">
	import JobList from '$lib/Job/JobList.svelte';
	import { jobStore } from '$lib/store';
	import { api, serverConfig } from '$lib/api';
	import { Query } from 'appwrite';
	import { onMount } from 'svelte';
	import type { JobDocument } from '$lib/Job/JobTypes';

	enum SearchType {
		Next,
		Previous
	}

	onMount(async () => {
		await search(SearchType.Next);
	});

	$: currentPage = 0;
	$: totalJobsAvailable = 0;
	$: totalPagesAvailable = 0;
	$: previousPage = currentPage - 2;

	const executeSearch = async (
		searchType: SearchType,
		reset = false,
		queries?: string[]
	): Promise<JobDocument[]> => {
		let searchOffset: number;
		if (searchType === SearchType.Next) {
			searchOffset = 5 * currentPage;
			currentPage++;
		} else {
			searchOffset = 5 * previousPage;
			currentPage--;
		}

		if (reset) {
			$jobStore.jobs = [];
			currentPage = 1;
			searchOffset = 0;
		}
		const response = await api.database.listDocuments(
			serverConfig.jobCollectionId,
			queries,
			5,
			searchOffset
		);
		totalJobsAvailable = response.sum;
		totalPagesAvailable = Math.ceil(totalJobsAvailable / 5);
		return <JobDocument[]>response.documents;
	};

	let searchTerm = '';
	const search = async (type: SearchType, reset = false): Promise<void> => {
		searchTerm = searchTerm.trim();
		if (searchTerm.length > 2) {
			$jobStore.jobs = await executeSearch(type, reset, [Query.search('title', searchTerm)]);
		} else {
			$jobStore.jobs = await executeSearch(type, reset);
		}
	};
</script>

<svelte:head>
	<title>jobbr - find your next job</title>
</svelte:head>

<div class="items-center flex justify-center flex-col">
	<div class="max-w-screen-sm w-full sm:p-0 p-2">
		<div class="flex flex-col  space-y-6 ">
			<div class="text-center pt-20" id="header">
				<h1 class="text-3xl">
					Find your next dream
					<span class="relative mt-2 animate-bounce inline-block ">
						<div class="absolute inset-0 rounded-lg transform bg-accent" />
						<span class="font-bold text-base-100 relative p-3">job 🔥</span>
					</span>
				</h1>
			</div>
			<div class="relative">
				<input
					bind:value={searchTerm}
					class="w-full pr-16 input input-bordered"
					on:keypress={async (e) => {
						if (e.keyCode === 13) {
							await search(SearchType.Next, true);
						}
					}}
					placeholder="Search by job title..."
					type="text"
				/>
				<button
					class="absolute top-0 right-0 rounded-l-none btn-primary btn btn-outline"
					on:click={async () => await search(SearchType.Next, true)}
					>go
				</button>
			</div>
		</div>
	</div>
	<JobList />
	{#if $jobStore.jobs.length > 0}
		<div class="text-center pt-10 text-2xl">
			<h1 class="opacity-70">Found total {totalJobsAvailable} jobs</h1>
			<h1 class="opacity-70">Page {currentPage} / {totalPagesAvailable}</h1>
		</div>
		<div class="flex flex-row pt-6 pb-20 space-x-5">
			<button
				disabled={currentPage <= 1}
				on:click={async () => await search(SearchType.Previous)}
				class="btn btn-outline"
			>
				<svg
					class="mr-2 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
						clip-rule="evenodd"
					/>
				</svg>
				Previous
			</button>
			<button
				disabled={currentPage === totalPagesAvailable}
				on:click={async () => await search(SearchType.Next)}
				class="btn btn-outline"
			>
				Next
				<svg
					class="ml-2 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</button>
		</div>
	{/if}
</div>
