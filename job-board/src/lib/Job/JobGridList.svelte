<script lang="ts">
    import {currentUserStore} from "$lib/store";
    import JobGridCard from "$lib/Job/JobGridCard.svelte";

</script>

<div class="max-w-screen-xl grid p-6 pt-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
    {#each $currentUserStore?.likedJobs as job}
        <JobGridCard likedJob={job}/>
    {/each}
</div>