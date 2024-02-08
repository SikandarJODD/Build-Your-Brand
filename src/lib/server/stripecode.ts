import Stripe from 'stripe';
const SECRECT_STRIPE_KEY =
    'sk_test_51NrXTsSGtEBcOdpVfvWNJiV9ADjZMT00j7278yGfCuZUbpsLey00dazh1pqdzwXWgzLsvvgvSOTIdctyRNu1ZejI00RMAIXMoW';
const stripe = new Stripe(SECRECT_STRIPE_KEY, {
    apiVersion: '2023-10-16'
});

// function to retrive all the products from stripe and return it
export async function getProducts() {
    const products = await stripe.products.list();
    return products;
}