import { derived, writable } from 'svelte/store';

export let allproducts = writable([
    {
        id: 'price_1OhfNDSGtEBcOdpVxx6g25Vi',
        title: 'Apple 2020 Macbook',
        pricetag: 85000,
        quantity: 0
    },
    {
        id: 'price_1OhfL1SGtEBcOdpVnTLCZOos',
        title: 'vivo T2 5G',
        pricetag: 18000,
        quantity: 0
    },
    {
        id: 'price_1OhfHzSGtEBcOdpV9WESIYqS',
        title: 'Airdopes 121V2',
        pricetag: 1500,
        quantity: 0
    },
    {
        id: 'price_1OhaUoSGtEBcOdpVPT67MD0U',
        title: 'Noise Buds VS102',
        pricetag: 400,
        quantity: 0
    },
]);

export let cartItems = derived(allproducts, ($allproducts) => {
    return $allproducts.filter((n) => n.quantity >= 1);
});
