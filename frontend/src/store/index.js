import Vue from 'vue';
import Vuex from 'vuex';
import socket from './modules/socket';
import user from './modules/user';
import {actions as board} from './actions/board';
import {actions as comment} from './actions/comment';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        socket,
        user
    },
    state: {},
    getters: {},
    mutations: {},
    actions: {
        ...board,
        ...comment
    }
});
