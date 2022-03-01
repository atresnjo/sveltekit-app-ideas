<script lang="ts">
	import AuthForm from '$lib/Auth/AuthForm.svelte';
	import { goto } from '$app/navigation';
	import { api } from '$lib/api';

	import { currentUserStore } from '$lib/store';
</script>

<div class="min-h-screen bg-default py-6 flex flex-col justify-center sm:py-12">
	<div class="py-3 sm:max-w-xl sm:mx-auto">
		<div class=" px-4 py-10 bg-base-200 mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
			<div class="max-w-md mx-auto">
				<div class="flex items-center space-x-5">
					<div
						class="h-14 w-14 bg-base-100 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono"
					>
						👨‍💻
					</div>
					<div class="block pl-2 font-semibold text-xl self-start">
						<h2 class="uppercase font-bold leading-relaxed">Login to your account</h2>
						<p class="text-sm opacity-80 leading-relaxed">And manage your favorite jobs 💻</p>
					</div>
				</div>
				<AuthForm
					on:submit={async (event) => {
						const formData = event.detail;
						const createResponse = await api.account.createSession(
							formData.email,
							formData.password
						);

						if (createResponse.$id) {
							$currentUserStore.email = formData.email;
							await goto('favorites');
						}
					}}
				>
					<div class="flex" slot="details">
						<a class="link-hover" href="/signup">Don't have an account yet? </a>
					</div>
				</AuthForm>
			</div>
		</div>
	</div>
</div>
