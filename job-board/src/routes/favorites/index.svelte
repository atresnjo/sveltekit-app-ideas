<script lang="ts">
	import { onMount } from 'svelte';
	import { api, serverConfig, isLoggedIn } from '$lib/api';
	import { Query } from 'appwrite';
	import type { JobDocument, LikedJob, LikedJobDocument } from '$lib/Job/JobTypes';
	import { currentUserStore } from '$lib/store';
	import JobGridList from '$lib/Job/JobGridList.svelte';
	import WelcomeEmoji from './WelcomeEmoji.svelte';

	onMount(async () => {
		const user = await isLoggedIn();
		const likedJobs = <LikedJobDocument[]>(
			(
				await api.database.listDocuments(serverConfig.likedJobCollectionId, [
					Query.equal('userId', user.$id)
				])
			).documents
		);
		const allLikedJobs = <JobDocument[]>(
			await api.database.listDocuments(serverConfig.jobCollectionId, [
				Query.equal(
					'$id',
					likedJobs.map((x) => x.jobId)
				)
			])
		).documents;

		const likedJobsMapped: LikedJob[] = [];
		allLikedJobs.forEach((actualJob: JobDocument) => {
			const foundLikedJob = likedJobs.find((job) => job.jobId === actualJob.$id);
			likedJobsMapped.push({
				job: actualJob,
				documentId: foundLikedJob.$id
			});
		});
		$currentUserStore.likedJobs = likedJobsMapped;
	});
</script>

<div class="p-2 justify-center flex flex-col pt-10 ">
	<div class="flex flex-row  space-x-2 text-center justify-center">
		<h1 class="text-center text-3xl ">
			Hey {$currentUserStore?.email}. You currently have {$currentUserStore?.likedJobs?.length} liked
			jobs.
		</h1>
		<WelcomeEmoji />
	</div>
</div>

<div class="justify-center flex">
	<JobGridList />
</div>
