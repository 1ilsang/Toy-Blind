import Vue from 'vue';
import io from 'socket.io-client';
import server from '../const/server-host';

const socket = io(`${server.ChatServer}`);

const SocketPlugin = {
    install(vue) {
        vue.mixin({});

        vue.prototype.$join = (payload) => {
            socket.emit('join', payload);
        };

        vue.prototype.$leave = (payload) => {
            socket.emit('leave', payload);
        };

        vue.prototype.$sendMessage = (payload) => {
            socket.emit('chat', payload);
        };

        vue.prototype.$socket = socket;
    }
};

Vue.use(SocketPlugin);