var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    pingTimeout: 1000,
});

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// localhost:3000서버에 접속하면 클라이언트로 메세지을 전송한다
app.get('/', function (req, res) {
    res.sendFile('Hellow Chating App Server');
});

io.on('connection', function (socket) {

    socket.on('join', (data) => {
        // TODO 이거 웨 안뎀? ㅎㅎ; 방별 채팅이 안된다 ㅅㅂ
        socket.join(data.roomSeq);
        const msg = {
            nickname: '= SYSTEM =',
            message: data.message,
            roomSeq: data.roomSeq
        };
        io.to(data.roomSeq).emit('chat', msg);
    });
    // 클라이언트로부터의 메시지가 수신되면
    socket.on('chat', function (data) {
        // console.log('Message from %s: %s', data.nickname, data.message);
        let msg = {
            nickname: data.nickname,
            message: data.message,
            roomSeq: data.roomSeq
        };
        // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
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