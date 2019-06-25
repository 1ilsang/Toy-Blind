import Vue from 'vue';
import VueRouter from 'vue-router';
import Body from '../components/body/Board';
import Search from '../components/body/Search';
import NotFound from '../components/error/NotFound';
// import SignUp from '../components/modal/SignUp';
import WritePost from '../components/body/WritePost';
import {EventBus} from '../utils/event-bus';
import {isLogin, enhanceAccessToken} from '../utils/loginMethods';
import Chat from '../components/body/Chat';

Vue.use(VueRouter);

const requireAuth = () => (from, to, next) => {
    if (isLogin()) return next();
    else {
        EventBus.$emit('openModal', 'SignUp');
        next({path: '/'});
    }
};

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', redirect: '/articles/Topics'},
        {path: '/article/:title', component: Body},
        {path: '/articles/:topic', component: Body},
        {path: '/login', beforeEnter: requireAuth()},
        {path: '/writepost', component: WritePost, beforeEnter: requireAuth()},
        {path: '/chat', component: Chat, beforeEnter: requireAuth()},
        {path: '/search', component: Search},
        {path: '*', component: NotFound}
    ]
});

router.beforeEach((to, from, next) => {
    enhanceAccessToken();
    next();
});

export default router;