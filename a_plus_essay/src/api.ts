import { env } from './env/env';


export async function post(url: string, body = {}) {
    const res = await fetch(`${env.BACKEND_ORIGIN}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //   'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body),
    });
    const result = await res.json();
}