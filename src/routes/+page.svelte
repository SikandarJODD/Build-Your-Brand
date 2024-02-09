<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { Github, ShoppingBag } from "lucide-svelte";
</script>

<div
  class="flex h-[calc(100vh-65px)] flex-col items-center justify-center gap-3"
>
  <h1 class="mt-5 text-center text-4xl font-bold md:text-6xl">
    Build Your Brand
  </h1>
  <h2 class="text-center text-lg font-thin md:text-2xl text-primary/90">
    Build E-commerce Store with build In Payment Gateway & Provide Self Hosting
  </h2>

  <p class="font-mono text-lg underline underline-offset-2">
    Build Using <span class="text-orange-600">Sveltekit</span> &
    <span class="text-indigo-600">Stripe API</span>
  </p>

  <div class="flex items-center gap-2 flex-wrap mt-3 md:gap-4">
    <Button
      href="https://github.com/SikandarJODD/Build-Your-Brand"
      target="_blank"
    >
      <Github size={20} strokeWidth={1.5} class="mr-1.5" />
      Github Code</Button
    >
    <Button href="/products">
      <ShoppingBag size={20} strokeWidth={1.5} class="mr-1.5" />
      View Products</Button
    >
  </div>
</div>
