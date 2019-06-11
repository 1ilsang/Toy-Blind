const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    pingTimeout: 1000,
});

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', function (req, res) {
    res.sendFile('Hellow Chating App Server');
});

io.on('connection', function (socket) {

    socket.on('join', (data) => {
        socket.join(data.roomSeq);
        const msg = {
            nickname: '= SYSTEM =',
            message: data.message,
            roomSeq: data.roomSeq
        };
        io.to(data.roomSeq).emit('chat', msg);
    });

    socket.on('chat', function (data) {
        let msg = {
            nickname: data.nickname,
            message: data.message,
            roomSeq: data.roomSeq
        };
        io.to(data.roomSeq).emit('chat', msg);
    });

    socket.on('disconnect', function (data) {
        console.log('user disconnected: ' + data);
    });
    
    socket.on('leave', function (data) {
        console.log('user leave', data);
        socket.leave(data.roomSeq, (result) => console.log(result));
    })
});

server.listen(3002);