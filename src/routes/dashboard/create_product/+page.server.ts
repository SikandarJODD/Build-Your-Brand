import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
    cloud_name: 'dbarjexqw',
    api_key: '381973167113425',
    api_secret: 'VyWF1pp5vC8oRLsDR85Aji2tSUQ',
    secure: true,
});
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request, locals }) => {
        let formData = await request.formData();
        console.log(formData, 'Form Data');
        let fileData = formData.get('product_image');
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
        console.log(uploadStream, 'Upload Stream');

        // return { success: true, image: uploadStream.url };

        let session = await locals.session;
        if (session) {
            let isSeller = locals.user?.userType === 'seller';
            if (isSeller) {
            }
        }
    }
};