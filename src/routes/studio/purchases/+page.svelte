<script>
  import ProInfoSheet from "$lib/studio/cart/ProInfoSheet.svelte";
  export let data;
</script>

<div class="bg-indigo-100/50 md:border md:border-primary/60 rounded-xl">
  <div
    class="mx-auto max-w-7xl px-6 py-10 sm:py-14 lg:flex gap-2 flex-col lg:px-8"
  >
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Products Dashboard
    </h2>
    <p class="text-lg">
      List of all the products you have purchased from the store
    </p>
  </div>
</div>
<div class="px-4 sm:px-6 lg:px-8 mt-10">
  <div class="mt-8 flow-root">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >ID</th
              >
              <th
                scope="col"
                class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Name</th
              >
              <th
                scope="col"
                class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Price</th
              >
              <th
                scope="col"
                class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Quantity</th
              >
              <th
                scope="col"
                class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Product ID</th
              >

              <th
                scope="col"
                class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                >Purchase Date
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            {#each data.allorders as item, i}
              <tr>
                <td
                  class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0"
                  >{i + 1}</td
                >
                <td
                  class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                  >{item.name}</td
                >
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900"
                  >₹{item.price}.00</td
                >
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
                  >{item.quantity}</td
                >
                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
                  >{item.productId}</td
                >

                <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
                  >{item.createdAt?.slice(0, 10)}</td
                >
                <!-- <td
                  class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit<span class="sr-only">, AAPS0L</span></a
                  >
                </td> -->
              </tr>
            {/each}

            <!-- More transactions... -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
