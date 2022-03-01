<script lang="ts">
	import { currentUserStore } from '$lib/store';
	import UserProfileEmoji from '$lib/UserProfileEmoji.svelte';
	import { api, serverConfig } from '$lib/api';
	import { goto } from '$app/navigation';
	import { jobSkills } from '$lib/skills';
	import { faker } from '@faker-js/faker';

	const gnerateData = () => {
		for (let i = 0; i < 50; i++) {
			const shuffled = jobSkills.sort(() => 0.5 - Math.random());

			api.database.createDocument(serverConfig.jobCollectionId, 'unique()', {
				companyName: faker.company.companyName(),
				title: `${faker.name.jobTitle()} - ${faker.name.jobType()}`,
				salary: '50k-100k',
				applyLink: 'https://google.com',
				createdAt: faker.date.recent(),
				skills: shuffled.slice(0, jobSkills.length)
			});
		}
	};
</script>

<section class="bg-base-300">
	<nav class="flex p-4 px-4">
		<div class="flex justify-center items-center w-full">
			<ul class="flex justify-center">
				<li class="mr-12"><a class=" font-medium" href="/">Jobs</a></li>
			</ul>
		</div>
		{#if $currentUserStore.email}
			<div class="dropdown dropdown-end cursor-pointer avatar placeholder">
				<div tabindex="0" class="bg-accent text-base-200 font-bold rounded-full w-10 ">
					<UserProfileEmoji />
				</div>
				<ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-200 rounded-box w-52">
					<li>
						<div class="flex flex-row">
							<svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250">
								<g transform="matrix(17.857142857142858,0,0,17.857142857142858,0,0)">
									<path
										fill="#D7E0FF"
										stroke="#4147D5"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M7 3.183C3.98-.522.792 2.111.75 4.949.75 9.172 5.805 12.64 7 12.64c1.195 0 6.25-3.468 6.25-7.692C13.208 2.11 10.02-.522 7 3.183z"
									/>
								</g>
							</svg>
							<a href="/favorites">Favorites</a>
						</div>
					</li>
					<li>
						<div class="flex flex-row">
							<svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250">
								<g transform="matrix(17.857142857142858,0,0,17.857142857142858,0,0)"
									><path
										fill="#D7E0FF"
										stroke="#4147D5"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M4.013 12.98c1.015.12 2.163.228 2.987.228.824 0 1.972-.109 2.987-.228a2.846 2.846 0 002.497-2.603c.11-1.296.22-2.872.22-3.966 0-1.148-.08-2.275-.176-3.375H1.445a44.388 44.388 0 00-.148 3.375c0 1.094.11 2.67.219 3.966a2.846 2.846 0 002.497 2.603z"
									/><path
										fill="#ffffff"
										stroke="#4147D5"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M7 5.74c3.576 0 5.588-.89 5.588-2.474C12.588 1.683 10.576.792 7 .792c-3.577 0-5.589.89-5.589 2.474C1.411 4.85 3.423 5.74 7 5.74z"
									/><path
										stroke="#4147D5"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M1.344 8.116c.578.45 1.361.756 2.18.845 1.139.123 2.305.223 3.492.223 1.188 0 2.354-.1 3.492-.223.873-.094 1.556-.346 2.148-.845"
									/></g
								></svg
							>
							<button on:click={gnerateData}>Generate data</button>
						</div>
					</li>
					<li>
						<div class="flex flex-row">
							<svg class="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 250 250">
								<g transform="matrix(17.857142857142858,0,0,17.857142857142858,0,0)">
									<path
										fill="#D7E0FF"
										d="M6.451.85a21.677 21.677 0 00-4.172 0C1.535.922.965 1.677.931 2.596a120.665 120.665 0 000 8.808c.034.92.604 1.674 1.348 1.746a21.67 21.67 0 004.172 0c.745-.072 1.314-.827 1.348-1.746.019-.506.034-1.02.046-1.539v-5.73a116.82 116.82 0 00-.046-1.54C7.765 1.678 7.196.923 6.451.85z"
									/>
									<path
										fill="#ffffff"
										stroke="#4147D5"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M9.14 7.09c0 .496.07 1.194.142 1.782.073.6.673.983 1.225.74 1.012-.445 1.944-1.104 2.597-2.064a.813.813 0 000-.915c-.653-.96-1.585-1.62-2.597-2.064-.552-.243-1.152.14-1.225.74-.072.588-.141 1.286-.141 1.781z"
									/>
									<path
										stroke="#4147D5"
										stroke-linecap="round"
										stroke-width="1.5"
										d="M7.8 2.596C7.764 1.676 7.195.922 6.45.85a21.677 21.677 0 00-4.172 0C1.535.922.965 1.677.931 2.596a120.665 120.665 0 000 8.808c.034.92.604 1.674 1.348 1.746a21.67 21.67 0 004.172 0c.745-.072 1.314-.827 1.348-1.746"
									/>
									<path
										stroke="#4147D5"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="1.5"
										d="M4.004 7.09H9.14"
									/>
								</g>
							</svg>
							<button
								on:click={async () => {
									await api.account.deleteSessions();
									$currentUserStore.email = undefined;
									$currentUserStore.likedJobs = [];
									await goto('/login');
								}}
								>Sign out
							</button>
						</div>
					</li>
				</ul>
			</div>
		{:else}
			<a class="btn btn-primary btn-sm text-base-100" href="/signup">Sign Up</a>
		{/if}
	</nav>
</section>
