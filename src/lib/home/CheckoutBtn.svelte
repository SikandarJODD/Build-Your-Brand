<script>
  import { cartItems } from "$lib/state";
  import { toast } from "svelte-sonner";
  import Button from "$lib/components/ui/button/button.svelte";

  let checkout = async () => {
    console.log($cartItems);
    if ($cartItems.length === 0) {
      toast.error("Cart is Empty!");
      return;
    }
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

<Button
  on:click={() => checkout()}
  variant="outline"
  class="w-full border-primary"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-shopping-cart mr-1.5"
    ><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path
      d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
    /></svg
  >
  Checkout</Button
>
