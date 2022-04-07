<script lang="ts">
  import { goto } from '$app/navigation';

  import trcp, { InferQueryOutput } from '$lib/client/trpc';
  import { onMount } from 'svelte';

  const getPlaylist = async () => await trcp.query('user:playlist');
  const getTrendingSong = async () => await trcp.query('user:trending');

  let playlist: InferQueryOutput<'user:playlist'> = [];
  let trendingSong: InferQueryOutput<'user:trending'>;
  onMount(async () => {
    try {
      playlist = await getPlaylist();
      trendingSong = await getTrendingSong();
    } catch (err) {
      goto('/login');
    }
  });
</script>

<div class="flex flex-col space-y-6">
  <h1 class="text-3xl font-bold">Trending</h1>
  <div class="card bg-base-100 shadow-xl image-full">
    <figure>
      <img
        class="object-fill"
        src="https://api.lorem.space/image/album?h=300"
        alt="Trending Song"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{trendingSong?.artistName}</h2>
      <p>{trendingSong?.songName}</p>
      <div class="card-actions">
        <button
          disabled={playlist?.find((x) => x.songId === trendingSong?.songId) !== undefined}
          on:click={async () =>
            await trcp.mutation('user:like_song', { songId: trendingSong.songId })}
          class="btn btn-outline">Like</button
        >
      </div>
    </div>
  </div>
  <h1 class="text-3xl font-bold">My Playlist</h1>
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Artist</th>
        </tr>
      </thead>
      <tbody>
        {#each playlist as playlistItem, i}
          <th>{i + 1}</th>
          <th>{playlistItem.song.name}</th>
          <th>{playlistItem.song.artist?.name}</th>
        {/each}
      </tbody>
    </table>
  </div>
</div>
