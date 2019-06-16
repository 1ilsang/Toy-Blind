module.exports = function (io) {
    const express = require('express');
    const redisStore = require('socket.io-redis');

    const redis = require('redis');
    const token = require('../utils/token');
    const chat = require('../utils/chatMethods');

    const MESSAGE = require('../const/MESSAGES');

    const router = express.Router();
    const sub = redis.createClient();
    const pub = redis.createClient();
    pub.on('error', (err) => console.log(err));
    sub.on('error', (err) => console.log(err));
    sub.on('message', (roomSeq, data) => {
        data = JSON.parse(data);
        if(data.sendType === 'self') {
            io.emit('chat', data);
        } else if(data.sendType === 'room') {
            io.to(roomSeq).emit('chat', data);
        }
    });

    io.adapter(redisStore({host: 'redis', port: 6379}));

    router.get('/', function (req, res, next) {
        res.send('respond with a resource:: chat - server');
    });

    io.on('connection', (socket) => {

        sub.on('subscribe', (roomSeq, count) => {
            console.log(`Subscribed to ${roomSeq}. Now subscribed to ${count} channel(s).`);
        });

        socket.on('join', (data) => {
            if(token.verifyCheck(data.token)) {
                console.log(`User ${data.nickname} join room ${data.roomSeq}`);
                sub.subscribe(data.roomSeq);
                socket.join(data.roomSeq);
                // io.to(data.roomSeq).emit('chat', chat.setMsg(data, '= SYSTEM ='));
                pub.publish(data.roomSeq, chat.setMsg(data, 'room', '= SYSTEM ='));
            } else socket.emit('chat', chat.setMsg({}, 'self','= SYSTEM =', MESSAGE.validationExpired, data.roomSeq));
        });

        socket.on('chat', (data) => {
            // io.to(data.roomSeq).emit('chat', chat.setMsg(data));
            pub.publish(data.roomSeq, chat.setMsg(data, 'room'));
        });

        socket.on('disconnect', (data) => {
            // sub.quit(); // 나는 소켓 살려놔야하므로 quit 안해준다.
            console.log('user disconnected: ' + data);
        });

        socket.on('leave', (data) => {
            console.log('user leave', data);
            socket.leave(data.roomSeq, (result) => {});
        });
    });

    return router;
};