import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import {enhanceAccessToken, logout} from "../utils/loginMethods";
import {EventBus} from "../utils/event-bus";
import router from '../router';
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
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        ...board,
        ...comment
    }
});
