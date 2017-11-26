import Vue from 'vue';
import Router from 'vue-router';
import ga from 'vue-ga';

const Feed = () => import('pages/Feed');
const ComponentPage = () => import('pages/ComponentPage');
const NewComponentForm = () => import('pages/NewComponentForm');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/component/:slug',
            name: 'Component page',
            component: ComponentPage,
        },
        {
            path: '/new',
            name: 'Submit form',
            component: NewComponentForm,
        },

        {
            path: '/tag/:tag/:page?',
            name: 'Tag',
            component: Feed,
        },

        {
            path: '/:page?',
            name: 'Home',
            component: Feed,
        },
    ],
});


if (process.env.NODE_ENV === 'production') {
    ga(router, 'UA-110182129-1');
}

export default router;
