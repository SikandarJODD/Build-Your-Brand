import { db } from "$lib/server/db";
import { buyer_profile } from "$lib/server/schema";
import { redirect, type Actions } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
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
        let isbuyer = await db.select().from(buyer_profile).where(eq(buyer_profile.userId, session?.userId));
        console.log(isbuyer);
        if (isbuyer.length > 0) {
            await db.update(buyer_profile).set({
                name: formData.get('name')?.toString(),
                email: formData.get('email')?.toString(),
                phone: formData.get('phone')?.toString(),
                address: formData.get('address')?.toString(),
                city: formData.get('city')?.toString(),
                state: formData.get('state')?.toString(),
                zip: formData.get('zip')?.toString(),
                country: formData.get('country')?.toString(),
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
            await db.insert(buyer_profile).values({
                id: crypto.randomUUID().toString(),
                userId: session?.userId,
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                state: formData.get('state'),
                zip: formData.get('zip'),
                country: formData.get('country'),
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