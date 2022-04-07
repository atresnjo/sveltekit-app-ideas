<script lang="ts">
  export let routeId: string;
  export let title: string;
  import { page } from '$app/stores';
</script>

<a
  href={routeId}
  class="hover:bg-neutral hover:font-semibold cursor-pointer p-3 rounded-xl w-full justify-between flex"
  class:bg-neutral={$page.routeId === routeId}
>
  <span class="inline-flex items-center">
    <slot />
    <span class="ml-4 ">{title}</span>
  </span>
</a>
