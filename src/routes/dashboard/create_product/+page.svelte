<script>
  import { enhance } from "$app/forms";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  let avatar, fileinput;

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      avatar = e.target.result;
    };
  };
</script>

<form method="post" use:enhance enctype="multipart/form-data">
  <div class="space-y-4">
    <div class=" pb-0">
      <h2 class="text-base font-bold leading-7 md:text-2xl text-white">
        Create Product
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        This information will be displayed publicly so be careful what you
      </p>
    </div>
    <div class="border-b border-white/10 pb-8">
      <div class="mt-0 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <Label for="product_name">Product Name</Label>
          <div class="mt-2">
            <Input
              type="text"
              name="product_name"
              id="product_name"
              required
              placeholder="Robotoics"
            />
          </div>
        </div>
        <div class="sm:col-span-3">
          <Label for="product_price">Price</Label>
          <div class="mt-2">
            <Input
              type="number"
              name="product_price"
              id="product_price"
              required
              placeholder="40"
            />
          </div>
        </div>
        <div class="sm:col-span-full">
          <Label for="product_desc">Description</Label>
          <div class="mt-2">
            <Input type="text" name="product_desc" id="product_desc" required />
          </div>
        </div>
        <div class="sm:col-span-full">
          <Label for="product_desc">Upload Image</Label>
          <div class="mt-2">
            {#if avatar}
              <img
                class="avatar min-h-32 min-w-24 max-w-64 max-h-56 my-4 rounded-md object-contain object-center"
                src={avatar}
                alt="d"
              />
            {/if}

            <Button
              class="chan"
              on:click={() => {
                fileinput.click();
              }}
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
                class="lucide lucide-upload mr-1.5"
                ><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline
                  points="17 8 12 3 7 8"
                /><line x1="12" x2="12" y1="3" y2="15" /></svg
              >
              Choose Image
            </Button>
            <input
              style="display:none"
              name="product_image"
              id="product_image"
              type="file"
              accept=".jpg, .jpeg, .png"
              on:change={(e) => onFileSelected(e)}
              bind:this={fileinput}
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-2">
    <Button type="button" size="sm" variant="outline">Cancel</Button>
    <Button type="submit" size="sm">Create</Button>
  </div>
</form>
