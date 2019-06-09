import {DELETE_POST, GET_POST, GET_POST_LIST, LOGIN, LOGOUT, UPDATE_POST, WRITE_POST} from "./mutation-type";
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
        userData: JSON.parse(localStorage.getItem('userData')) || {}
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
        },
        [LOGOUT](state) {
            state.userData = '';
            state.accessToken = '';
            axios.defaults.headers.common['Authorization'] = undefined;
            logout();
        }
    },
    actions: {
        [LOGIN]({commit}, {email, password}) {
            return axios.post(`${server.AuthServer}/auth/login`, {email, password})
                .then((res) => {
                    commit('LOGIN', res.data);
                })
                .then(() => {
                    EventBus.$emit('closeHamburgerMenu');
                    EventBus.$emit('closeModal');
                    // router.push('/');
                })
                .catch(e => {
                    if (e.response) return e.response.data;
                    else return 'ERR_CONNECTION_REFUSED';
                });
        },
        [LOGOUT]({commit}) {
            return axios.get(`${server.AuthServer}/auth/logout`)
                .then(() => {
                    commit('LOGOUT');
                }).catch(e => console.log(e));
        },
        [GET_POST_LIST]({commit}, {topic, boardSeq}) {
            return axios.post(`${server.BoardServer}/board/list/${topic}`, {boardSeq})
                .then(({data}) => {
                    return data.sort((a, b) => {
                        return a.seq > b.seq ? -1 : a.seq < b.seq ? 1 : 0;
                    });
                });
        },
        [WRITE_POST]({commit}, {data, config}) {
            return axios.post(`${server.BoardServer}/board`, data, config)
                .then(({data}) => {
                    return data;
                })
        },
        [GET_POST]({commit}, boardSeq) {
            return axios.post(`${server.BoardServer}/board/article/view`, {
                'boardSeq': boardSeq
            }).then(({data}) => data);
        },
        [DELETE_POST]({commit}, boardSeq) {
            return axios.delete(`${server.BoardServer}/board/${boardSeq}`)
                .then(() => true)
                .catch(() => false);
        },
        [UPDATE_POST]({commit}, data) {
            return axios.put(`${server.BoardServer}/board/${data.boardSeq}`, data)
                .then(() => true)
                .catch(() => false);
        }
    }
});
