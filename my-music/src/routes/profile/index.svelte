<script lang="ts">
  import trcp, { InferQueryOutput } from '$lib/client/trpc';
  import FriendsIcon from '$lib/components/icons/FriendsIcon.svelte';
  import MusicIcon from '$lib/components/icons/MusicIcon.svelte';
  import ProfileStatsItem from '$lib/components/ProfileStatsItem.svelte';
  import { successToast, errorToast } from '$lib/toast';

  import { onMount } from 'svelte';

  let userQuery: InferQueryOutput<'user:me'>;
  let username = '';

  onMount(async () => {
    userQuery = await trcp.query('user:me');
    username = userQuery.username;
  });
</script>

<div class="flex flex-col space-y-6">
  <h1 class="text-3xl font-bold">User details</h1>
</div>

<div class="card-body bg-base-300">
  <div class="items-center flex flex-col ">
    <img
      tabindex="0"
      class="object-cover w-12 h-12 rounded-full"
      src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
      alt=""
      aria-hidden="true"
    />
    <h2 class="card-title mt-3">{userQuery?.username}</h2>
  </div>
  <div class="mt-3">
    <div class="space-x-12 justify-center flex flex-row">
      <ProfileStatsItem value={`${userQuery?.friends?.toString()} friends`}>
        <FriendsIcon small={true} />
      </ProfileStatsItem>
      <ProfileStatsItem value={`${userQuery?.likedSongs?.toString()} songs liked`}>
        <MusicIcon small={true} />
      </ProfileStatsItem>
    </div>
  </div>
  <div class="divider" />
  <div class="card-actions container max-w-2xl mx-auto space-y-2">
    <div class="form-control w-full">
      <label for="username" class="label">
        <span class="label-text">Username</span>
      </label>
      <input
        id="username"
        type="text"
        name="username"
        bind:value={username}
        class="input input-bordered rounded-md w-full"
      />
    </div>

    <button
      on:click={async () => {
        try {
          username = await trcp.mutation('user:update_me', { username });
          successToast('Successfully updated profile');
        } catch (err) {
          errorToast('Error while updating profile');
        }
      }}
      class="btn w-full block btn-primary">Save</button
    >
  </div>
</div>
