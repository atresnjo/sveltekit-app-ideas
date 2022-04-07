<script lang="ts">
  import { goto } from '$app/navigation';

  import DashboardHeader from '$lib/components/DashboardHeader.svelte';
  import MainContentContainer from '$lib/components/MainContentContainer.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { onMount } from 'svelte';
  import '../app.postcss';
  import { SvelteToast } from '@zerodevx/svelte-toast';

  onMount(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      goto('/home');
    }
  });
</script>

<svelte:head>
  <title>MyMusic - The only way to share music</title>
</svelte:head>

<SvelteToast />

<div class="flex h-screen">
  <Sidebar />
  <div class="flex flex-col flex-1 w-full">
    <DashboardHeader />
    <MainContentContainer>
      <slot />
    </MainContentContainer>
  </div>
</div>
