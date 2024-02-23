// import { getProducts } from "$lib/server/stripecode";
import { db } from "$lib/server/db";
import { buyer_profile, productTable, seller_profile } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
    let session = await locals.user;
    // get products from stripeCode and return it
    let productsdata = await db.select().from(productTable);
    if (session) {
        let profileData;
        if (session.userType === 'buyer') {
            profileData = await db.select().from(buyer_profile).where(eq(buyer_profile.userId, session.id));
        }
        else if (session.userType === 'seller') {
            profileData = await db.select().from(seller_profile).where(eq(seller_profile.userId, session.id));
        }
        return {
            userType: session.userType.toString(),
            username: session.username.toString(),
            userId: session.id,
            url: url.pathname,
            products: productsdata,
            profileData: profileData
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