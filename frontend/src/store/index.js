import {LOGOUT, SET_USER_DATA} from "./mutation-type";
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const authServer = 'http://127.0.0.1:3000';

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
        [SET_USER_DATA](state, payload) {
            state.userData = payload;
        },
        [LOGOUT](state) {
            state.userData = '';
        }
    },
    // FIXME 이거 옳은건가? 인증서버 열어서 확인해 봐야함.
    actions: {
        [SET_USER_DATA]({commit, state}) {
            return axios.post(`${authServer}/login`, state)
                .then(({data}) => commit('SET_USER_DATA', data));
        },
        [LOGOUT]({commit}) {
            commit('LOGOUT');
        }
    }
});