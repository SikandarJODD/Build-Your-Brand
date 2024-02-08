<script>
  import Button from "$lib/components/ui/button/button.svelte";
  import { Github } from "lucide-svelte";
</script>

<div
  class="flex h-[calc(100vh-65px)] flex-col items-center justify-center gap-3"
>
  <h1 class="mt-5 text-center text-lg font-bold md:text-6xl">
    Build Your Brand
  </h1>
  <h1 class="text-center text-lg font-thin md:text-3xl text-primary/90">
    Build E-commerce Store with build In Payment Gateway
  </h1>
  <p class="font-mono">
    Developed by <a
      href="https://github.com/SikandarJODD"
      target="_blank"
      class=" hover:underline dark:text-sky-500">SikandarJODD</a
    >
  </p>

  <Button href="https://github.com/SikandarJODD/Auth-Lucia" target="_blank">
    <Github size={20} strokeWidth={1.5} class="mr-1.5" />
    Github Code</Button
  >
</div>
