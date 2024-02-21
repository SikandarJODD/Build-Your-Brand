import { z } from 'zod';
export let authSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
    userType: z.string()
})

export let seller_profile = [
    {
        name: "Dashbaord",
        link: "/dashboard",
    },
    {
        name: "Settings",
        link: "/dashboard/edit",
    },
    {
        name: "Create Product",
        link: "/dashboard/create_product",
    },
    {
        name: "Sign Out",
        link: "",
    },
]


export let buyer_profile = [
    {
        name: "Your Profile",
        link: "/studio",
    },
    {
        name: "Settings",
        link: "/studio/edit",
    },
    {
        name: "Sign Out",
        link: "",
    },
];