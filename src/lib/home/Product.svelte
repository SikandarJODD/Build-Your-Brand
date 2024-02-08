<script>
  import { allproducts, cartItems } from "$lib/state";
  export let i = 0;
  export let title = "Mango";
  export let quantity = 1;
  export let pricetag = 60;
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
      n[i].quantity -= 1;
      return n;
    });
  };
</script>

<div
  class="card rounded-lg border bg-gray-800/50 p-3 transition-all duration-150 ease-linear hover:bg-gray-800/90"
>
  <h1 class="text-center text-2xl font-semibold text-yellow-400">{title}</h1>
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
