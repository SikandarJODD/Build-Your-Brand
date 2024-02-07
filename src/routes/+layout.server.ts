import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, url }) => {
    let session = await locals.user;

    if (session) {
        return {
            username: session.username.toString(),
            url: url.pathname,
        }
    }
    else {

        return {
            username: '',
            url: url.pathname,
        }
    }
};