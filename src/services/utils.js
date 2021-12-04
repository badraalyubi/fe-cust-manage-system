const config = {
    BASE_API_URL: process.env.REACT_APP_API_URL,
};

export const isLoggedIn = () => {
    return localStorage.getItem('token');
}

export default config;