<script>
  import { allproducts, cartItems } from "$lib/state";
  import { fade, scale } from "svelte/transition";
  import CheckoutBtn from "./CheckoutBtn.svelte";
  export let i = 0;
  export let title = "Mango";
  export let quantity = 1;
  export let pricetag = 60;
  export let img = "";
  $: price = quantity > 0 ? quantity * pricetag : pricetag;
  let increment = () => {
    allproducts.update((n) => {
      n[i].quantity += 1;

      return n;
    });

    quantity += 1;
  };
  let decrement = () => {
    quantity -= 1;
    if (quantity <= 0) {
      quantity = 0;
    }
    allproducts.update((n) => {
      // if product quantity is 0, remove it from the cart
      if (n[i].quantity === 0) {
        return n;
      } else {
        n[i].quantity -= 1;
      }
      return n;
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
  <div class="quantity">
    Quantity : {quantity}
    <div>
      <button on:click={increment}>+</button>
      <button on:click={decrement}>-</button>
    </div>
  </div>
  <div class="price">
    Price : {price}
  </div>
  <CheckoutBtn />
</div>

<style>
  .price,
  .quantity {
    border: 1px solid #eee;
    margin: 10px 3px;
    padding: 3px 15px;
    background: rgba(128, 128, 128, 0.192);
    border-radius: 4px;
    text-align: center;
    display: flex;
    gap: 0 10px;
    justify-content: space-between;
  }
  button {
    background: rgba(0, 13, 26, 0.4);
    padding: 3px 6px;
    font-family: monospace;
    border-radius: 5px;
  }
</style>
