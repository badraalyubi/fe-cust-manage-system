const config = {
    BASE_API_URL: process.env.REACT_APP_API_URL,
};

export const isLoggedIn = () => {
    return localStorage.getItem('token');
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export const getRole = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.roles;
}


export default config;