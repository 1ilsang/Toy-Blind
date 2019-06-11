import Vue from 'vue';
import io from 'socket.io-client';
import server from '../const/server-host';

const socket = io(`${server.ChatServer}`);

const SocketPlugin = {
    install(vue) {
        vue.mixin({});

        vue.prototype.$sendMessage = (payload) => {
            socket.emit('chat', {
                message: payload.message,
                name: payload.name
            });
        };

        vue.prototype.$socket = socket;
    }
};

Vue.use(SocketPlugin);