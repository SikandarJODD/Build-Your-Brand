<script>
  import { allproducts, cartItems } from "$lib/state";
  import Product from "$lib/home/Product.svelte";
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

<button
  on:click={() => checkout()}
  class="rounded-md border border-emerald-400 bg-green-700/20 p-2.5"
  >Checkout</button
>
