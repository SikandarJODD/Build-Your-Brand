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
export let sprod = writable([
    {
        id: 'price_1OhfNDSGtEBcOdpVxx6g25Vi',
        img: 'https://rukminim2.flixcart.com/image/416/416/kp5sya80/screen-guard/tempered-glass/o/v/n/apple-macbook-air-m1-13-3-inch-lightwings-original-imag3gh5xftgbpg3.jpeg?q=70&crop=false',
        title: 'apple 2020 Macbook',
        pricetag: 85000,
        quantity: 0,

    },
    {
        id: 'price_1OhfL1SGtEBcOdpVnTLCZOos',
        title: 'vivo T2 5G',
        img: 'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/c/s/x/-original-imagzjhwaaewgj8r.jpeg?q=70&crop=false',
        pricetag: 18000,
        quantity: 0
    },
    {
        id: 'price_1OhfHzSGtEBcOdpV9WESIYqS',
        title: 'airdopes 121V2',
        img: 'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/1/8/l/-original-imagqhswqgpwb2yu.jpeg?q=70&crop=false',
        pricetag: 1500,
        quantity: 0
    },
    {
        id: 'price_1OhaUoSGtEBcOdpVPT67MD0U',
        title: 'noise Buds VS102',
        img: 'https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/z/e/i/-original-imagvgzfk89pgqgy.jpeg?q=70&crop=false',
        pricetag: 400,
        quantity: 0
    },
]);


export let userType = writable('buyer');
