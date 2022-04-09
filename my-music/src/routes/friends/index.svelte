<script lang="ts">
  import trcp, { InferQueryOutput } from '$lib/client/trpc';
  import FriendsIcon from '$lib/components/icons/FriendsIcon.svelte';
  import MusicIcon from '$lib/components/icons/MusicIcon.svelte';
  import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
  import ProfileStatsItem from '$lib/components/ProfileStatsItem.svelte';
  import { successToast, errorToast } from '$lib/toast';

  import { onMount } from 'svelte';

  let friendsQuery: InferQueryOutput<'user:friends'> = [];

  onMount(async () => {
    friendsQuery = await trcp.query('user:friends');    
  });
</script>

<div class="flex flex-col space-y-6">
  <h1 class="text-3xl font-bold">Friend list</h1>
</div>

<div class="max-w-2xl">
  {#if friendsQuery !== undefined}
    {#each friendsQuery as friendQuery}
      <div class="bg-base-300 flex flex-row p-4 rounded-xl">
        <div class="flex w-full align-middle justify-between flex-row">
          <img
            tabindex="0"
            class="object-cover w-12 h-12 rounded-full"
            src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
            alt=""
            aria-hidden="true"
          />

          <span class="text-2xl">
            {friendQuery.friend.username}
          </span>
          <TrashIcon />
        </div>
      </div>
    {/each}
  {/if}
</div>
