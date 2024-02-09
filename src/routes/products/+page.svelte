<script>
  import { allproducts, cartItems, sprod } from "$lib/state";
  import Product from "$lib/home/Product.svelte";
  import Plane1 from "$lib/home/Plane1.svelte";
  import { fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  let checkout = async () => {
    console.log($cartItems);
    await fetch("api/stripeCheckout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: $cartItems }),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        window.location.replace(data.url);
      });
  };
</script>

<div class="m-2 md:m-10">
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-11 lg:gap-6">
    <div
      class="h-fit lg:col-span-3 rounded-lg bg-gray-200 dark:bg-gray-900 border border-primary"
    >
      <Plane1 />
    </div>
    <div class="rounded-lg lg:col-span-8">
      <div
        class="flex gap-2 md:gap-4 flex-wrap justify-center md:justify-start"
        transition:fade
      >
        {#each $sprod as { title, pricetag, quantity, img }, i}
          <Product {title} {pricetag} {quantity} {i} {img} />
        {:else}
          <div class="text-xl">No products Found</div>
        {/each}
      </div>
    </div>
  </div>
</div>
