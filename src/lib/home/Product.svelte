<script>
  import { allproducts } from "$lib/state";
  import { fade } from "svelte/transition";
  import Button from "$lib/components/ui/button/button.svelte";
  import { ShoppingBag } from "lucide-svelte";
  import { toast } from "svelte-sonner";
  export let i = 0;
  export let title = "Mango";
  export let pricetag = 60;
  export let img = "";
  let addToCart = () => {
    allproducts.update((n) => {
      n[i].quantity += 1;
      return n;
    });
    toast.success("Added to Cart", {
      description: `${title} added to cart`,
    });
  };
</script>

<div
  transition:fade={{ duration: 200 }}
  class="w-full md:w-72 card rounded-lg border dark:bg-gray-800/50 p-3 transition-all duration-150 ease-linear dark:hover:bg-gray-800/70 border-transparent hover:border-primary"
>
  <div>
    <img
      src={img}
      alt="{title}-c"
      class="h-64 w-full object-cover object-center rounded-lg transition-all duration-150 ease-linear"
    />
  </div>
  <h1 class="capitalize text-left text-2xl font-semibold my-2 text-primary">
    {title}
  </h1>
  <div class="my-2 text-primary/60">
    Price : {pricetag}
  </div>
  <Button size="sm" class="w-full" on:click|once={addToCart}>
    <ShoppingBag size="20" strokeWidth="1.4" class="mr-1" />
    Add to Cart</Button
  >
</div>
