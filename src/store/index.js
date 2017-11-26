import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
    user: null,
    profile: null,
};

const store = new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict: process.env.NODE_ENV !== 'production',
    plugins: [
        createPersistedState(),
    ],
});

export default store;
