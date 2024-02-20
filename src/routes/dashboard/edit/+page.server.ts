import { db } from "$lib/server/db";
import { buyer_profile, seller_profile } from "$lib/server/schema";
import { redirect, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from ".$types";
export const load: PageServerLoad = async ({ locals }) => {
    let session = locals.session;
    if (!session) {
        throw redirect(303, '/login');
    }

};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        let session = locals.session;
        let formData = await request.formData();
        if (!session) {
            throw redirect(303, '/login');
        }
        // is buyer already present in the database?
        let isSeller = await db.select().from(seller_profile).where(eq(seller_profile.userId, session?.userId));
        console.log(isSeller);
        if (isSeller.length > 0) {
            await db.update(seller_profile).set({
                name: formData.get('name')?.toString(),
                email: formData.get('email')?.toString(),
            }).where(eq(buyer_profile.userId, session?.userId));
            return {
                status: 200,
                body: {
                    message: 'Profile Updated!',
                    redirect: '/products'
                }
            };
        }
        else {
            await db.insert(seller_profile).values({
                id: crypto.randomUUID().toString(),
                userId: session?.userId,
                name: formData.get('name'),
                email: formData.get('email'),
                createdAt: new Date(),
                total_products: 0,
            });
            return {
                status: 200,
                body: {
                    message: 'Profile Created Successfully!',
                    redirect: '/products'
                }
            };
        }
    }
};