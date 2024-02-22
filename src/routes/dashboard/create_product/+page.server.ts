import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { v2 as cloudinary } from 'cloudinary';
import { db } from '$lib/server/db';
import { productTable } from '$lib/server/schema';
cloudinary.config({
    cloud_name: 'dbarjexqw',
    api_key: '381973167113425',
    api_secret: 'VyWF1pp5vC8oRLsDR85Aji2tSUQ',
    secure: true,
});
import Stripe from 'stripe';
const SECRECT_STRIPE_KEY =
    'sk_test_51NrXTsSGtEBcOdpVfvWNJiV9ADjZMT00j7278yGfCuZUbpsLey00dazh1pqdzwXWgzLsvvgvSOTIdctyRNu1ZejI00RMAIXMoW';
const stripe = new Stripe(SECRECT_STRIPE_KEY, {
    apiVersion: '2023-10-16'
});

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        let formData = await request.formData();
        console.log(formData, 'Form Data');
        let fileData = formData.get('product_image');
        // return { success: true, image: uploadStream.url };
        let session = await locals.session;
        if (session) {
            let isSeller = locals.user?.userType === 'seller';
            if (isSeller) {
                const arrayBuffer = await fileData.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                let uploadStream = await new Promise((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream({}, function (error, result) {
                            if (error) {
                                return reject(error);
                            }
                            return resolve(result);
                        })
                        .end(buffer);
                });
                let stripeData = await stripe.products.create({
                    name: String(formData.get('product_name')),
                    description: String(formData.get('product_desc')),
                    images: [uploadStream.url],
                    default_price_data: {
                        unit_amount: Number(formData.get('product_price')) * 100,
                        currency: 'inr',
                    },
                });
                console.log(stripeData, 'Stripe Data');

                let productData = await db.insert(productTable).values({
                    id: crypto.randomUUID(),
                    sellerId: session.userId,
                    product_id: stripeData.id,
                    name: formData.get('product_name'),
                    description: formData.get('product_desc'),
                    price: formData.get('product_price'),
                    stock: 5,
                    product_url: uploadStream.url,
                })
            }
        }
    }
};