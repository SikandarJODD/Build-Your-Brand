<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import CheckoutBtn from "$lib/home/CheckoutBtn.svelte";
  import { allproducts, cartItems } from "$lib/state";
  import { Minus, Plus, X } from "lucide-svelte";
  let increment = (i: string) => {
    allproducts.update((n) => {
      n.filter((item) => {
        if (item.id === i) {
          item.quantity += 1;
        }
      });
      return n;
    });
  };
  let decrement = (i: string) => {
    allproducts.update((n) => {
      n.filter((item) => {
        if (item.id === i && item.quantity === 0) {
          return n;
        } else if (item.id === i) {
          item.quantity -= 1;
        }
      });
      return n;
    });
  };
</script>

<div class="bg-white dark:bg-gray-950">
  <main class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
      Shopping Cart
    </h1>

    <div
      class="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
    >
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

        <ul
          role="list"
          class=" divide-gray-200 border-b border-t border-gray-200"
        >
          {#each $cartItems as item, i}
            <li
              class="flex py-6 sm:py-6 border border-primary/40 rounded-2xl my-3 px-2 md:px-4"
            >
              <div class="flex-shrink-0">
                <img
                  src={item.img}
                  alt="{item.title} ukiyo"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div
                  class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                >
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a
                          href="#"
                          class="font-medium text-primary capitalize hover:text-gray-800"
                          >{item.title}</a
                        >
                      </h3>
                    </div>

                    <p class="mt-1 text-sm font-medium text-primary/60">
                      ₹{item.pricetag}.00
                    </p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label for="quantity-0" class="sr-only"
                      >Quantity, Basic Tee</label
                    >
                    <div class="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        on:click={() => increment(item.id)}
                      >
                        <Plus size="20" strokeWidth="1.4" />
                      </Button>
                      <Button size="icon" variant="ghost"
                        >{item.quantity}</Button
                      >
                      <Button
                        size="icon"
                        variant="ghost"
                        on:click={() => decrement(item.id)}
                      >
                        <Minus size="20" strokeWidth="1.4" />
                      </Button>
                    </div>

                    <div class="absolute right-0 top-0">
                      <button
                        type="button"
                        class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Remove</span>
                        <X size="20" strokeWidth="1.4" />
                      </button>
                    </div>
                  </div>
                </div>

                <p class="mt-4 flex space-x-2 text-sm text-primary/60">
                  <svg
                    class="h-5 w-5 flex-shrink-0 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>In stock</span>
                </p>
              </div>
            </li>
          {/each}
        </ul>
      </section>

      <!-- Order summary -->
      <section
        aria-labelledby="summary-heading"
        class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      >
        <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
          Order summary
        </h2>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-gray-600">Subtotal</dt>
            <dd class="text-sm font-medium text-gray-900">$99.00</dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="flex items-center text-sm text-gray-600">
              <span>Shipping estimate</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how shipping is calculated</span
                >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900">$5.00</dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="flex text-sm text-gray-600">
              <span>Tax estimate</span>
              <a
                href="#"
                class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span class="sr-only"
                  >Learn more about how tax is calculated</span
                >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </dt>
            <dd class="text-sm font-medium text-gray-900">$8.32</dd>
          </div>
          <div
            class="flex items-center justify-between border-t border-gray-200 pt-4"
          >
            <dt class="text-base font-medium text-gray-900">Order total</dt>
            <dd class="text-base font-medium text-gray-900">$112.32</dd>
          </div>
        </dl>

        <div class="mt-6">
          <CheckoutBtn />
        </div>
      </section>
    </div>

    <!-- Related products -->
    <section aria-labelledby="related-heading" class="mt-24">
      <h2
        id="related-heading"
        class="text-lg md:text-xl font-medium text-primary"
      >
        You may also like&hellip;
      </h2>

      <div
        class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        {#each $allproducts as item}
          <div class="group relative">
            <div
              class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80"
            >
              <img
                src={item.img}
                alt="{item.title} ukiyo"
                class="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-primary capitalize">
                  <a href="/products/{item.id}">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    {item.title}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">Natural</p>
              </div>
              <p class="text-sm font-medium text-primary/50">
                ₹{item.pricetag}
              </p>
            </div>
          </div>
        {/each}

        <!-- More products... -->
      </div>
    </section>
  </main>
</div>
