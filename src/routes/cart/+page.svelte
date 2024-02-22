<script>
  import ShopCart from "$lib/studio/cart/ShopCart.svelte";
  export let data;
</script>

<ShopCart userId={data.userId} />
