<script lang="ts">
  import { allproducts } from "$lib/state";
  import { fade } from "svelte/transition";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ShoppingBag } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  export let name = "Mango";
  export let price: any;
  export let product_id: any;
  export let product_url = "";
  let addToCart = (id: string) => {
    allproducts.update((n) => {
      n.map((i) => {
        if (i.product_id === id) {
          i.quantity += 1;
        }
        return i;
      });
      return n;
    });
    toast.success("Added to Cart", {
      description: `${name} added to cart`,
    });
  };
</script>

<div
  transition:fade={{ duration: 200 }}
  class="w-full md:w-72 card rounded-lg border dark:bg-gray-800/50 p-3 transition-all duration-150 ease-linear dark:hover:bg-gray-800/70 border-transparent hover:border-primary"
>
  <div>
    <img
      src={product_url}
      alt="{name}-c"
      class="h-64 w-full object-cover object-center rounded-lg transition-all duration-150 ease-linear"
    />
  </div>
  <h1 class="capitalize text-left text-2xl font-semibold my-2 text-primary">
    {name}
  </h1>
  <div class="my-2 text-primary/60">
    Price : {price}
  </div>
  <Button size="sm" class="w-full" on:click|once={() => addToCart(product_id)}>
    <ShoppingBag size="20" strokeWidth="1.4" class="mr-1" />
    Add to Cart</Button
  >
</div>
