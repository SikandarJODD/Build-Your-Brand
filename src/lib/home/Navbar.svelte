<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import {
    AlignJustify,
    Home,
    Package,
    ShoppingCart,
    User,
    X,
  } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import ToggleMode from "./ToggleMode.svelte";
  import { goto } from "$app/navigation";
  export let username: string;
  $: user = username;
  let isProfileOpen = false;
  let isMenuOpen = false;
  export let navItems = [
    {
      name: "Home",
      link: "/",
      icon: Home,
    },
    {
      name: "Products",
      link: "/products",
      icon: Package,
    },
  ];
  export let goodName: string;
  export let goodEmail: string;
  export let details = {
    img: "https://i.pinimg.com/564x/84/a1/6a/84a16af6971e5c4234fa132c06b14969.jpg",
    title: "Ukiyo",
    link: "/",
    avatar:
      "https://i.pinimg.com/564x/68/b5/77/68b577ba7cb013903567b3537fd73747.jpg",

    avaratEmail: "hello@email.com",
  };
  export let profileItems = [
    {
      name: "Your Profile",
      link: "/studio",
    },
    {
      name: "Settings",
      link: "/studio/edit",
    },
    {
      name: "Sign Out",
      link: "",
    },
  ];
  let wid = 0;
</script>

<svelte:window bind:innerWidth={wid} />

<nav class="border-b border-primary/60 bg-gray-50 dark:bg-gray-900">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 justify-between">
      <div class="flex w-full">
        <div class="-ml-2 mr-2 flex items-center md:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded="false"
            on:click={() => (isMenuOpen = !isMenuOpen)}
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <AlignJustify
              class={isMenuOpen ? "hidden" : "block"}
              strokeWidth="1.5"
            />
            <X strokeWidth="1.3" class={isMenuOpen ? "block" : "hidden"} />
          </button>
        </div>
        <div class="flex flex-shrink-0 items-center gap-2">
          {#if wid > 700}
            <img
              class="h-8 w-auto rounded-full"
              src={details.img}
              alt="Ukiyo logo"
            />
          {/if}
          <a href="/" class="text-xl font-bold head_font">
            {wid < 600 ? "Ukiyo" : details.title}
          </a>
        </div>
        <div
          class="hidden md:ml-6 md:flex md:items-center md:space-x-4 w-full justify-center"
        >
          {#each navItems as item}
            <Button
              class="border-none outline-none"
              href={item.link}
              variant="secondary"
            >
              {item.name}</Button
            >
          {/each}
        </div>
      </div>
      <div class="flex items-center">
        <div class="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            on:click={() => {
              if (user.length === 0) {
                goto("/login");
              } else {
                goto("/cart");
              }
            }}
            class="bg-transparent border-primary/40"
          >
            <ShoppingCart size="20" strokeWidth="1.3" />
          </Button>
          <!-- <ToggleMode /> -->
          <div class="flex-shrink-0">
            {#if user.length === 0}
              <Button size="sm" href="/login">
                <User size="18" strokeWidth="1.3" class="mr-1" />
                Sign In</Button
              >
            {/if}
          </div>
        </div>
        <div class="hidden md:flex md:flex-shrink-0 md:items-center">
          {#if user.length > 0}
            <div class="relative">
              <div>
                <button
                  type="button"
                  class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  on:click={() => (isProfileOpen = !isProfileOpen)}
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="h-8 w-8 rounded-full"
                    src={details.avatar}
                    alt="avatar"
                  />
                </button>
              </div>

              <div
                class="{isProfileOpen
                  ? 'scale-100 transform opacity-100 transition duration-100 ease-out'
                  : 'scale-95 transform opacity-0 transition duration-75 ease-in'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border border-primary/60 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-slate-900"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabindex="-1"
              >
                {#each profileItems as item}
                  {#if item.name === "Sign Out"}
                    <form method="post" use:enhance>
                      <button
                        formaction="/?/logout"
                        class="block w-full px-4 py-2 text-left text-sm text-primary hover:bg-gray-100 dark:hover:bg-slate-800"
                        >Sign Out</button
                      >
                    </form>
                  {:else}<!-- content here -->
                    <a
                      href={item.link}
                      class="block px-4 py-2 text-sm text-primary hover:bg-gray-100 dark:hover:bg-slate-800"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-0">{item.name}</a
                    >
                  {/if}
                {/each}
                <div class="mt-1 mx-2">
                  <ToggleMode />
                </div>
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  {#key isMenuOpen}
    <div
      class=" {isMenuOpen ? 'block' : 'hidden'}  md:hidden"
      id="mobile-menu"
      transition:slide={{ duration: 300 }}
    >
      <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        {#each navItems as item}
          <Button href={item.link} variant="ghost" class="flex justify-start"
            ><svelte:component
              this={item.icon}
              size="20"
              strokeWidth="1.4"
              class="mr-2"
            />
            {item.name}
          </Button>
        {/each}
      </div>
      {#if user.length > 0}
        <div class="border-t border-gray-700 pb-3">
          <div class="flex items-center px-5 py-2 dark:bg-gray-950/60">
            <div class="flex-shrink-0">
              <img
                class="h-10 w-10 rounded-full"
                src={details.avatar}
                alt="avatar"
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-primary">{goodName}</div>
              <div class="text-sm font-medium text-muted-foreground">
                {goodEmail}
              </div>
            </div>
            <button
              type="button"
              class="relative ml-auto flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 dark:bg-gray-800"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
          </div>
          <div class="z-50 mt-3 space-y-1 px-2 sm:px-3">
            {#each profileItems as item}
              {#if item.name === "Sign Out"}
                <form method="post">
                  <button
                    formaction="/?/logout"
                    class="px-2 py-1 text-sm font-semibold"
                  >
                    {item.name}
                  </button>
                </form>
              {:else}
                <a
                  class="block px-2 py-1 text-sm font-semibold"
                  href={item.link}
                >
                  {item.name}
                </a>
              {/if}
            {/each}
            <!-- content here -->
            <ToggleMode />
          </div>
        </div>
      {/if}
    </div>
  {/key}
</nav>

<style>
  :global(.head_title) {
    /* font-family: "Varela Round", sans-serif; */
    /* font-family: "Protest Revolution", sans-serif; */
    /* font-family: "Comfortaa", sans-serif; */
    font-family: "Rubik Doodle Shadow", system-ui;
    /* font-family: "Bungee Shade", sans-serif; */
  }
</style>
