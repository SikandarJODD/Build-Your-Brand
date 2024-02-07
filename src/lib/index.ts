import { z } from 'zod';
export let authSchema = z.object({
    username: z.string(),
    password: z.string().min(6)
})