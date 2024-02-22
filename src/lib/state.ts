import { derived, writable } from 'svelte/store';

export let allproducts = writable([
    {
        id: "e2ae9e3d-8f9f-4434-8886-ead3ce428b82", sellerId: "dkbcsfvu34a88we", product_id: "prod_PbdggEAsn579l0", name: "Smart Watch", description: "Simple Smart Watch ", price: "450", stock: "5", createdAt: "2024-02-22T00:44:45.142Z", product_url: "http://res.cloudinary.com/dbarjexqw/image/upload/v1708562684/kliwrvcwlmgj6khiidio.png", quantity: 0,
        default_price: 'price_1OhfNDSGtEBcOdpVxx6g25Vi'
    }]
)

export let cartItems = derived(allproducts, ($allproducts) => {
    return $allproducts.filter((n) => n.quantity >= 1);
});


export let totalPrice = derived(allproducts, ($allproducts) => {
    return $allproducts.reduce((acc, n) => acc + n.quantity * Number(n.price), 0);
});
export let sprod = writable([
    {
        id: "e2ae9e3d-8f9f-4434-8886-ead3ce428b82", sellerId: "dkbcsfvu34a88we", product_id: "prod_PbdggEAsn579l0", name: "Smart Watch", description: "Simple Smart Watch ", price: "450", stock: "5", createdAt: "2024-02-22T00:44:45.142Z", product_url: "http://res.cloudinary.com/dbarjexqw/image/upload/v1708562684/kliwrvcwlmgj6khiidio.png", quantity: 0,
        default_price: 'price_1OhfNDSGtEBcOdpVxx6g25Vi'
    }]);


export let userType = writable('buyer');
