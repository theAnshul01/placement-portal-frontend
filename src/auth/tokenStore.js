let accessToken = null;

export const setToken = (token) => {
    accessToken = token;
};

export const clearToken = () => {
    accessToken = null;
};

export const getToken = () => {
    return accessToken;
};
