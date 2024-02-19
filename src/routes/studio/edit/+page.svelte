<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { toast } from "svelte-sonner";
</script>

<form
  method="post"
  use:enhance={() => {
    return async ({ result }) => {
      console.log(result);
      if (result.status === 200) {
        console.log(result.data.body, "BODY");
        toast.success(result.data.body.message);

        setTimeout(() => {
          goto(result.data.body.redirect);
        }, 300);
      } else {
        toast.error(result.data.body.message);
      }
      // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
    };
  }}
>
  <div class="space-y-12">
    <div class="border-b border-white/10 pb-4">
      <h2 class="text-base font-bold leading-7 md:text-2xl text-white">
        Edit Profile
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        <!-- Fill profile information -->
        This information will be displayed publicly so be careful what you
      </p>
    </div>
    <div class="border-b border-white/10 pb-8">
      <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="sm:col-span-3">
          <Label for="name">Name</Label>
          <div class="mt-2">
            <Input type="text" name="name" id="name" required />
          </div>
        </div>

        <div class="sm:col-span-3">
          <Label for="phone">Phone</Label>
          <div class="mt-2">
            <Input type="text" name="phone" id="phone" required />
          </div>
        </div>

        <div class="sm:col-span-3">
          <Label for="email">Email</Label>
          <div class="mt-2">
            <Input type="email" name="email" id="email" required />
          </div>
        </div>
        <div class="sm:col-span-3">
          <Label for="country">Country</Label>
          <div class="mt-2">
            <Input type="country" name="country" id="country" />
          </div>
        </div>

        <div class="sm:col-span-full">
          <Label for="address">Street Address</Label>
          <div class="mt-2">
            <Input type="text" name="address" id="address" required />
          </div>
        </div>

        <div class="sm:col-span-2 sm:col-start-1">
          <Label for="city">City</Label>
          <div class="mt-2">
            <Input type="text" name="city" id="city" />
          </div>
        </div>

        <div class="sm:col-span-2">
          <Label for="state">State / Province</Label>
          <div class="mt-2">
            <Input type="text" name="state" id="state" />
          </div>
        </div>

        <div class="sm:col-span-2">
          <Label for="zip">ZIP / Postal Code</Label>
          <div class="mt-2">
            <Input type="text" name="zip" id="zip" />
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-white/10 pb-12">
      <h2 class="text-base font-semibold leading-7 text-white">
        Notifications
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        We'll always let you know about important changes, but you pick what
        else you want to hear about.
      </p>
    </div>
  </div>

  <div class="mt-6 flex items-center justify-end gap-x-2">
    <Button type="button" size="sm" variant="outline">Cancel</Button>
    <Button type="submit" size="sm">Save</Button>
  </div>
</form>
