import { db } from "$lib/server/db";
import { orderTable } from "$lib/server/schema";
import type { Actions } from "@sveltejs/kit";
import Stripe from 'stripe';
const SECRECT_STRIPE_KEY =
    'sk_test_51NrXTsSGtEBcOdpVfvWNJiV9ADjZMT00j7278yGfCuZUbpsLey00dazh1pqdzwXWgzLsvvgvSOTIdctyRNu1ZejI00RMAIXMoW';
const stripe = new Stripe(SECRECT_STRIPE_KEY, {
    apiVersion: '2023-10-16'
});

let sendData = async (item: any, userId: string) => {
    await db.insert(orderTable).values({
        id: crypto.randomUUID(),
        userId: userId,
        productId: item.product_id,
        desc: item.description,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productUrl: item.product_url
    })
}
export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const items: any = JSON.parse(form.get('items'));
        console.log(items, 'Items');

        let user_session = await locals.session;
        if (!user_session) {
            return {
                status: 401,
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ message: 'Unauthorized' })
            };
        }
        if (user_session) {
            let lineItems: any = [];
            items.forEach((item: any) => {
                lineItems.push({ price: item.priceId, quantity: item.quantity });
                sendData(item, String(user_session?.userId));
            });


            const session = await stripe.checkout.sessions.create({
                line_items: lineItems,
                mode: 'payment',
                success_url: 'https://build-your-brand.vercel.app/success',
                cancel_url: 'https://build-your-brand.vercel.app/cancel'
            });

            return {
                status: 200,
                body: JSON.stringify({ url: session.url })
            };
        }
    }
};