<script>
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import { userType } from "$lib/state";
  import { Github, ShoppingBag } from "lucide-svelte";
  let sendSeller = () => {
    userType.set("seller");
    goto("/signup");
  };
  import bg from "$lib/bg.jpg";
</script>

<div
  class="relative px-2 flex h-[calc(100vh-65px)] flex-col items-center justify-center gap-3"
>
  <img
    src={bg}
    alt="bg"
    class="hidden lg:block md:h-[calc(100vh-65px)] w-full absolute -z-10 opacity-100 bg-white object-contain object-top"
  />
  <div></div>
  <h1 class="mt-5 text-center text-4xl font-bold md:text-6xl text-gray-900">
    Build Your Brand
  </h1>
  <h2 class="text-center text-lg font-thin md:text-2xl text-black">
    Build E-commerce Store with build In Payment Gateway & Provide Self Hosting
  </h2>

  <p class="font-mono text-lg underline underline-offset-2 text-center">
    Build Using <span class="text-orange-600">Sveltekit</span> &
    <span class="text-indigo-600">Stripe API</span>
  </p>

  <div class="flex items-center gap-2 flex-wrap mt-3 md:gap-4">
    <Button href="/products" variant="outline">
      <ShoppingBag size={20} strokeWidth={1.5} class="mr-1.5" />
      View Products</Button
    >
    <Button class="border" on:click={sendSeller}>Become a Seller</Button>
  </div>
</div>
