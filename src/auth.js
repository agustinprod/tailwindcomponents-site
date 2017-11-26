/* eslint-disable max-len,no-empty */
import axios from 'axios';
import settings from './env';
import store from './store';

export const setAccessToken = (token) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setUserByToken = (token) => {
    setAccessToken(token);

    return axios.get('api/v1/me')
        .then((response) => {
            const user = response.data;

            user.access_token = response.config.headers.Authorization.split(' ')[1];

            return user;
        });
};

export const authByPassword = (email, password) => new Promise((resolve, reject) => {
    axios.post('oauth/token', {
        grant_type: 'password',
        client_id: settings.api.client,
        client_secret: settings.api.secret,
        username: email,
        password,
        scope: '',
    }).then(({ data }) => setUserByToken(data.access_token).then(user => resolve(user))).catch(error => reject(error));
});

export const getUserByToken = () => axios.get('api/v1/me')
    .then((response) => {
        const user = response.data;

        user.access_token = response.config.headers.Authorization.split(' ')[1];

        return user;
    });


export const logout = () => {
    try {
        store.reset();
    } catch (error) {
    }

    try {
        localStorage.clear();
    } catch (error) {}

    window.location.href = '/';
};
