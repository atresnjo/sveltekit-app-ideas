<script lang="ts">
	export let skills: string[] = [];
</script>

<div class="flex space-x-1 flex-wrap xl:flex-none  sm:space-x-0 ">
	{#each skills as skill}
		<span class="badge badge-outline badge-primary text-base-100 ">{skill}</span>
	{/each}
</div>
