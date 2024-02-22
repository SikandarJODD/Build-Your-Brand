// import { getProducts } from "$lib/server/stripecode";
import { db } from "$lib/server/db";
import { productTable } from "$lib/server/schema";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
    let session = await locals.user;
    // get products from stripeCode and return it
    let productsdata = await db.select().from(productTable);
    if (session) {
        return {
            userType: session.userType.toString(),
            username: session.username.toString(),
            userId: session.id,
            url: url.pathname,
            products: productsdata
        }
    }
    else {

        return {
            username: '',
            url: url.pathname,
            products: productsdata
        }
    }
};