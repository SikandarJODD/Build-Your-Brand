<script>
  import { page } from "$app/stores";
  import { Toaster } from "$lib/components/ui/sonner";
  import Navbar from "$lib/home/Navbar.svelte";
  import "../app.pcss";
  import "../style.css";
  export let data;
  console.log(data, "data");
  $: username = data.username;
  import { ModeWatcher } from "mode-watcher";
  import { fade } from "svelte/transition";
  $: isStudio = $page.url.pathname.split("/")[1] === "studio";
</script>

<!-- Toaster to show toast  -->
<Toaster />
<!-- for Dark & Light Mode : ModeWatcher -->
<ModeWatcher />

{#if !isStudio}
  <Navbar {username} />
{/if}
{#if isStudio}
  {#key data.url}
    <div>
      <slot />
    </div>
  {/key}
{:else}
  {#key data.url}
    <div in:fade={{ duration: 200 }}>
      <slot />
    </div>
  {/key}
{/if}
