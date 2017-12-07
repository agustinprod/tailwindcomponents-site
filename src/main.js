/* eslint-disable no-unused-vars */
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import axios from 'axios';
import Meta from 'vue-meta';

import config from './env';
import App from './App';
import router from './router';
import store from './store';

import AuthorLink from './components/AuthorLink';

sync(store, router);
axios.defaults.baseURL = config.api.path;

Vue.config.productionTip = false;

Vue.component('AuthorLink', AuthorLink);
Vue.use(Meta);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
});
