<script>
  import { page } from "$app/stores";
  import { seller_profile, buyer_profile } from "$lib";
  import { Toaster } from "$lib/components/ui/sonner";
  import Navbar from "$lib/home/Navbar.svelte";
  import { onMount } from "svelte";
  import "../app.pcss";
  import "../style.css";
  export let data;
  let goodName = data.profileData[0]?.name || "";
  let goodEmail = data.profileData[0]?.email || "";
  let profileItems =
    data.userType === "seller" ? seller_profile : buyer_profile;
  $: username = data.username;
  import { ModeWatcher } from "mode-watcher";
  import { fade } from "svelte/transition";
  import { allproducts, sprod } from "$lib/state";
  $: isStudio =
    $page.url.pathname.split("/")[1] === "studio" ||
    $page.url.pathname.split("/")[1] === "dashboard";
  onMount(() => {
    console.log("layout mounted");
    let temp = data.products;
    for (let i = 0; i < temp.length; i++) {
      let element = temp[i];
      element.quantity = 0;
    }
    console.log(JSON.stringify(temp));
    allproducts.set(temp);
    sprod.set(temp);
    console.log($allproducts, "All Products Store");
  });
</script>

<Toaster />
<ModeWatcher />

{#if !isStudio}
  <Navbar {username} {profileItems} {goodEmail} {goodName} />
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
