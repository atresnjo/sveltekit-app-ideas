<script lang="ts">
  import { Routes } from '$lib/routes';

  import FriendsIcon from './icons/FriendsIcon.svelte';
  import HomeIcon from './icons/HomeIcon.svelte';
  import SidebarItem from './SidebarItem.svelte';
</script>

<aside class="z-20 p-4 hidden w-64 overflow-y-auto bg-base-200 md:block flex-shrink-0">
  <div class="py-10 p-3">
    <div class="flex flex-row">
      <svg class="w-10 h-10" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"
        ><g transform="matrix(5.208333333333333,0,0,5.208333333333333,0,0)"
          ><path
            d="M12.93,6.86a1,1,0,0,0-.93,1v21.8a5.94,5.94,0,0,0-4-.72,6,6,0,0,0,1.26,11.9A6.15,6.15,0,0,0,15,34.6V15.71l23-1.66V27.22a5.94,5.94,0,0,0-4-.72,6,6,0,0,0,1.26,11.91A6.17,6.17,0,0,0,41,32.17V5.91a1,1,0,0,0-1.07-1Z"
            fill="#00b8f0"
          /><path
            d="M12.000 45.500 A12 1.5 0 1 0 36.000 45.500 A12 1.5 0 1 0 12.000 45.500 Z"
            fill="#45413c"
            opacity=".15"
          /><path
            d="M34,29.54a6,6,0,0,1,3.27.35.54.54,0,0,0,.75-.5V27.22a5.94,5.94,0,0,0-4-.72,6,6,0,0,0-4.92,5,6.13,6.13,0,0,0,.13,2.39A6,6,0,0,1,34,29.54Z"
            fill="#4acfff"
          /><path
            d="M8,32a6.06,6.06,0,0,1,3.27.36.52.52,0,0,0,.51-.06.54.54,0,0,0,.24-.45V29.65a5.94,5.94,0,0,0-4-.72,6,6,0,0,0-4.79,7.42A6.06,6.06,0,0,1,8,32Z"
            fill="#4acfff"
          /><path
            d="M39.93,4.92l-27,1.94a1,1,0,0,0-.93,1v3a1,1,0,0,1,.93-1L39.93,8A1,1,0,0,1,41,9v-3A1,1,0,0,0,39.93,4.92Z"
            fill="#4acfff"
          /><path
            d="M12.93,6.86a1,1,0,0,0-.93,1v21.8a5.94,5.94,0,0,0-4-.72,6,6,0,0,0,1.26,11.9A6.15,6.15,0,0,0,15,34.6V15.71l23-1.66V27.22a5.94,5.94,0,0,0-4-.72,6,6,0,0,0,1.26,11.91A6.17,6.17,0,0,0,41,32.17V5.91a1,1,0,0,0-1.07-1Z"
            fill="none"
            stroke="#45413c"
            stroke-linecap="round"
            stroke-linejoin="round"
          /></g
        ></svg
      >
      <a class="ml-6 flex text-lg font-bold text-primary tracking-widest " href="/Home">
        My
        <span class="relative text-base-content">Music</span>
      </a>
    </div>
    <div class="mt-10 space-y-2">
      <SidebarItem routeId={Routes.home} title="Home">
        <HomeIcon small={false} />
      </SidebarItem>
      <SidebarItem routeId={Routes.friends} title="Friends">
        <FriendsIcon small={false} />
      </SidebarItem>
    </div>
  </div>
</aside>
