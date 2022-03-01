<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatcher = createEventDispatcher();
	let email: string;
	let password: string;
</script>

<div>
	<div class="py-8 text-white">
		<div class="form-control">
			<label for="email" class="label">
				<span class="label-text">Email</span>
			</label>
			<input
				bind:value={email}
				id="email"
				type="text"
				name="email"
				placeholder="email"
				class="input"
			/>
		</div>
		<div class="form-control">
			<label for="password" class="label">
				<span class="label-text">Password </span>
			</label>
			<input
				bind:value={password}
				id="password"
				type="password"
				name="password"
				placeholder="password"
				class="input"
			/>
		</div>
		<div class="pt-2">
			<slot name="details" />
		</div>
	</div>

	<div class="flex justify-between">
		<button
			on:click={() => dispatcher('submit', { email, password })}
			type="submit"
			class="btn-block btn btn-primary">Submit</button
		>
	</div>
</div>
