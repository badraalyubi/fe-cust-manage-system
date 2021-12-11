import ky from 'ky';

import config from './utils';

const api = ky.create({
    prefixUrl: config.BASE_API_URL,
    hooks: {
        afterResponse: [
            async (request, options, response) => {
                if (!response.ok) {
                    const body = await response.json();
                    console.log(body);
                    throw body;
                }
                return response;
            },
        ],
    },
});

const getHeaders = () => {
    let headers;
    let user = localStorage.getItem('token');
    user = user.replace(/\"/g, '');
    if (user) {
        headers = {
            Authorization: `Bearer ${user}`,
        }
    }
    return headers;
}

// Login 
export async function login(email, password) {
    try {
        const res = await api.post('auth/signin', { json: { email, password } });
        const user = await res.json()
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(user.accessToken));
        return user;
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return true
}

// Register
export function register(url, data = null) {
    return api.post(url, { json: data });
}

// post method
export async function post(url, data = null) {
    const headers = getHeaders();
    return api.post(url, { body: data, headers }).json();
}

// put method
export async function put(url, data = null) {
    const headers = getHeaders();
    return api.put(url, { body: data, headers }).json();
}

// get method
export async function get(url, data = null) {
    const headers = getHeaders();
    console.log(headers);
    return api.get(url, { searchParams: data, headers }).json();
}

// delete method
export async function remove(url, data = null) {
    const headers = getHeaders();
    return api.delete(url, { json: data, headers }).json();
}