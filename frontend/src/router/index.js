import Vue from 'vue';
import VueRouter from 'vue-router'
import Wrap from '../components/Wrap'
import Search from '../components/Search'
import NotFound from '../components/error/NotFound';
import SignUp from "../components/modal/SignUp";
import WritePost from "../components/modal/WritePost";
import { EventBus } from "../utils/event-bus";

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
    const isAuthenticated = false;
    if(isAuthenticated) return next();
    else EventBus.$emit('openModal', 'SignUp');
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/articles/Topics' },
        { path: '/articles/:topic', component: Wrap },
        { path: '/writepost', component: WritePost, beforeEnter: requireAuth() },
        { path: '/signup', component: SignUp },
        { path: '/search', component: Search },
        { path: '*', component: NotFound }
    ]
});

export default router;