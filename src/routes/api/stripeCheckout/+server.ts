import type { RequestHandler } from '@sveltejs/kit';
// localhost:5173/api/stripeCheckout
import Stripe from 'stripe';
const SECRECT_STRIPE_KEY =
    'sk_test_51NrXTsSGtEBcOdpVfvWNJiV9ADjZMT00j7278yGfCuZUbpsLey00dazh1pqdzwXWgzLsvvgvSOTIdctyRNu1ZejI00RMAIXMoW';
const stripe = new Stripe(SECRECT_STRIPE_KEY, {
    apiVersion: '2023-10-16'
});

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();
    const items = data.items;
    console.log(items, 'Items');

    let lineItems: any = [];
    items.forEach((item: any) => {
        lineItems.push({ price: item.id, quantity: item.quantity });
    });
    console.log(lineItems, 'Line Items');

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://build-your-brand.vercel.app/success',
        cancel_url: 'https://build-your-brand.vercel.app/cancel'
    });
    console.log(session, 'SESSION');

    return new Response(JSON.stringify({ url: session.url }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
    });
};
