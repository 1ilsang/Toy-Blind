import {LOGIN, LOGOUT} from "./mutation-type";
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import server from '../utils/server-host';
import {logout} from "../utils/loginMethods";
import {EventBus} from "../utils/event-bus";
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: {}
    },
    getters: {
        getUserData: state => {
            return state.userData;
        }
    },
    mutations: {
        [LOGIN](state, {data}) {
            state.userData = data;
            localStorage.accessToken = data.accessToken;
            localStorage.setItem('userData', JSON.stringify(data.userData));
            enhanceAccessToken();
        },
        [LOGOUT](state) {
            state.userData = '';
            state.accessToken = '';
            logout();
        }
    },
    actions: {
        [LOGIN]({commit}, {email, password}) {
            return axios.post(`${server.AuthServer}/auth/login`, {email, password})
                .then(({data}) => {
                    commit('LOGIN', data);
                })
                .then(() => {
                    EventBus.$emit('closeHamburgerMenu');
                    router.push('/');
                })
                .catch(e => console.log(e));
        },
        [LOGOUT]({commit}) {
            return axios.get(`${server.AuthServer}/auth/logout`)
                .then(() => {
                    axios.defaults.headers.common['Authorization'] = undefined;
                    commit('LOGOUT');
                }).catch(e => console.log(e));
        }
    }
});
// 새로고침해도 엑세스토큰 헤더에 박도록 함.
const enhanceAccessToken = () => {
    const {accessToken} = localStorage;
    if (!accessToken) return;
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
};