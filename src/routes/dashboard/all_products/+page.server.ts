import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { db } from "$lib/server/db";
import { orderTable, productTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals }) => {
    let session = locals.session;
    if (!session) {
        throw redirect(303, '/login');
    }
    else {
        let allpro = await db.select().from(productTable).where(eq(productTable.sellerId, session.userId));
        return {
            allpro: allpro
        }

    }

};