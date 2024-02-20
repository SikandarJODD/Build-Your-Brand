import { getProducts } from "$lib/server/stripecode";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
    let session = await locals.user;
    // get products from stripeCode and return it
    let Productsdata = await getProducts();
    if (session) {
        return {
            userType: session.userType.toString(),
            username: session.username.toString(),
            url: url.pathname,
        }
    }
    else {

        return {

            username: '',
            url: url.pathname,
        }
    }
};