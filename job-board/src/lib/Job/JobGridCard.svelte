<script lang="ts">
	import type { LikedJob } from './JobTypes';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import { api, serverConfig } from '$lib/api';
	import { currentUserStore } from '$lib/store';
	import JobTitle from '$lib/Job/JobTitle.svelte';
	import JobCompanyName from '$lib/Job/JobCompanyName.svelte';
	import JobSkills from '$lib/Job/JobSkills.svelte';

	dayjs.extend(relativeTime);
	export let likedJob: LikedJob;
</script>

<div class="hover:scale-105 transform transition duration-500">
	<div class="px-8 py-4 bg-base-200 shadow-lg w-full h-full block indicator rounded-xl">
		<button
			class="flex justify-center indicator-item"
			on:click={async () => {
				await api.database.deleteDocument(serverConfig.likedJobCollectionId, likedJob.documentId);
				$currentUserStore.likedJobs = $currentUserStore.likedJobs.filter(
					(x) => x.documentId !== likedJob.documentId
				);
			}}
		>
			<svg class="h-6" fill="red" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
				<g transform="matrix(17.857142857142858,0,0,17.857142857142858,0,0)">
					<path
						d="M7 3.183C3.98-.522.792 2.111.75 4.949.75 9.172 5.805 12.64 7 12.64c1.195 0 6.25-3.468 6.25-7.692C13.208 2.11 10.02-.522 7 3.183z"
						stroke="#4147D5"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
					/>
				</g>
			</svg>
		</button>
		<div class="flex flex-col justify-between h-full w-full">
			<div class="flex space-y-1 flex-col">
				<JobTitle title={likedJob?.job.title} />
				<JobCompanyName companyName={likedJob?.job.companyName} />
				<JobSkills skills={likedJob?.job.skills} />
				<div class="flex xl:pt-0 pt-3 xl:space-x-3 mt-3 flex-col xl:flex-row">
					<span>🕐 {dayjs(likedJob?.job.createdAt).fromNow()}</span>
					<span>💸 {likedJob?.job.salary}</span>
				</div>
			</div>
			<div class="self-center pt-6 align-bottom">
				<a class="btn btn-outline btn-accent" href={likedJob.job.applyLink}>Apply</a>
			</div>
		</div>
	</div>
</div>
