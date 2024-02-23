import { fail, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { db } from "$lib/server/db";
import { orderTable } from "$lib/server/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ locals }) => {
    let session = locals.session;
    if (!session) {
        throw redirect(303, '/login');
    }
    else {
        // get user buyied products from order
        let allorders = await db.select().from(orderTable).where(eq(orderTable.userId, session.userId));
        return {
            allorders: allorders
        }

    }

};