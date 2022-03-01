<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	import { currentUserStore } from '$lib/store';
	import JobCompanyName from '$lib/Job/JobCompanyName.svelte';
	import JobTitle from '$lib/Job/JobTitle.svelte';
	import type { JobDocument } from './JobTypes';
	import { api } from '$lib/api';

	dayjs.extend(relativeTime);

	export let job: JobDocument;
	$: isJobAlreadyLiked = !!$currentUserStore.likedJobs.find((x) => x.job.$id === job.$id);
	$: heartColor = isJobAlreadyLiked ? 'red' : '#D7E0FF';
</script>

<div class="hover:scale-105 transform  transition duration-500">
	<div class="px-6 py-6 bg-base-200 shadow-lg w-full block indicator rounded-none sm:rounded-xl ">
		<button
			class="indicator-item indicator-center sm:indicator-end"
			disabled={isJobAlreadyLiked}
			on:click={async () => {
				const user = await api.account.get();
				const jobLikedDocument = await api.database.createDocument(
					'620d7785cc50bea6a8d3',
					'unique()',
					{
						userId: user.$id,
						jobId: job.$id
					}
				);
				$currentUserStore.likedJobs = [
					...$currentUserStore.likedJobs,
					{ job: job, documentId: jobLikedDocument.$id }
				];
			}}
		>
			<svg class="h-6" fill={heartColor} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
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
		<div class="flex flex-row justify-between">
			<div class="flex space-y-1 flex-col">
				<JobTitle title={job.title} />
				<JobCompanyName companyName={job.companyName} />
				<div class="flex flex-row space-x-1">
					{#each job?.skills as skill}
						<span class="badge badge-outline badge-primary text-base-100 flex-wrap ">{skill}</span>
					{/each}
				</div>
				<div class="flex space-x-3 mt-3 flex-row">
					<span>🕐 {dayjs(job?.createdAt).fromNow()}</span>
					<span>💸 {job?.salary}</span>
				</div>
			</div>
			<div class="self-center">
				<a class="btn btn-outline btn-accent" href={job.applyLink}>Apply</a>
			</div>
		</div>
	</div>
</div>
