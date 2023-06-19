import { GoogleAuth } from 'google-auth-library';

if (!process.env.EDITOR_UPSTREAM_RENDER_URL) {
    throw Error('EDITOR_UPSTREAM_RENDER_URL needs to be set.');
}
const auth = new GoogleAuth();
let serviceUrl = process.env.EDITOR_UPSTREAM_RENDER_URL;
export const token = await auth.getIdTokenClient(serviceUrl);

