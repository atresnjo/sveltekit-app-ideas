<script lang="ts">
  import trcp, { InferQueryOutput } from '$lib/client/trpc';
  import AcceptIcon from '$lib/components/icons/AcceptIcon.svelte';
  import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
  import { successToast } from '$lib/toast';
  import { onMount } from 'svelte';

  let friendsRequestQuery: InferQueryOutput<'user:friends'> = [];

  onMount(async () => {
    friendsRequestQuery = await trcp.query('user:friends', {
      fetchFriendRequests: true
    });
  });

  const handleAcceptRequest = (friendId: number) => {
    trcp.mutation('user:accept_friend_request', {
      friendId
    });
  };
  const handleRejectRequest = (friendId: number) => {
    trcp.mutation('user:reject_friend_request', {
      friendId
    });
    successToast('Successfully deleted friend request');
  };
</script>

<div class="flex flex-col space-y-6">
  <h1 class="text-3xl font-bold">Friend requests</h1>
</div>

<div class="max-w-2xl">
  {#if friendsRequestQuery !== undefined}
    {#each friendsRequestQuery as friendQuery}
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
          <div class="flex flex-row space-x-4">
            <AcceptIcon on:click={() => handleAcceptRequest(friendQuery.friend.id)} />
            <TrashIcon on:click={() => handleRejectRequest(friendQuery.friend.id)} />
          </div>
        </div>
      </div>
    {/each}
  {/if}
</div>
