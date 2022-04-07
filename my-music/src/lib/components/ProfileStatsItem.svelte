<script lang="ts">
  export let value: string;
</script>

<div class="flex flex-row space-x-2">
<slot />
<span class="opacity-80">{value}</span>
</div>
