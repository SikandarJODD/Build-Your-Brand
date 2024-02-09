<script lang="ts">
  import { allproducts, cartItems, sprod } from "$lib/state";
  import Product from "$lib/home/Product.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Slider from "$lib/components/ui/slider/slider.svelte";

  // Build a Function to Seach for a Product and return the Product

  let searchProduct = (title: string) => {
    title = title.toLowerCase();
    if (title.length < 1) {
      sprod.set($allproducts);
      return allproducts;
    }
    let product = $allproducts.filter((p) => p.title.includes(title));
    sprod.set(product);
    return product;
  };
  let text = "";
  $: searchProduct(text);
  let priceVal = 1;
  let changePrice = (e) => {
    priceVal = e[0] * 100;
    let product = $allproducts.filter((p) => p.pricetag >= e[0] * 100);
    sprod.set(product);
    return product;
  };
</script>

<div class="p-2">
  <div>
    <Input bind:value={text} placeholder="Search Products" />
  </div>
  <div class="flex gap-3 my-4 flex-col px-2">
    <Label
      >Product Price <span class="font-mono ml-4"
        >Minimum Price - {priceVal} Rs.</span
      ></Label
    >
    <div class="px-3">
      <Slider
        value={[0]}
        onValueChange={(e) => changePrice(e)}
        min={0}
        max={860}
      />
    </div>
  </div>

  <!-- <input type="text" bind:value={text} /> -->
</div>
