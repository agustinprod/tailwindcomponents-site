import * as types from '../store/mutation-types';
import { authByPassword, getUserByToken } from '../auth';


export const logIn = ({ commit }, data) => {
    authByPassword(data.email, data.password)
        .then((user) => {
            commit(types.SET_USER, user);

            return user;
        });
};

export const refreshUser = ({ commit }, token) => {
    getUserByToken(token)
        .then((user) => {
            commit(types.SET_USER, user);
            commit(types.SET_PROFILE, user);
        });
};
