var app = require('http').createServer(handler);
app.listen(3010);
var io = require('socket.io').listen(app);
var redis = require('redis');
var redis2 = require('socket.io-redis');
io.adapter(redis2({ host: 'localhost', port: 6379 }));
// var fs = require('fs');
//
// function handler(req,res){
//     fs.readFile(__dirname + '/index.html', function(err,data){
//         if(err){
//             res.writeHead(500);
//             return res.end('Error loading index.html');
//         }
//         res.writeHead(200);
//         console.log("Listening on port 8088");
//         res.end(data);
//     });
// }

var store = redis.createClient();
var pub = redis.createClient();
var sub = redis.createClient();
pub.on('error', (err) => { console.log(err);});
sub.on('error', (err) => { console.log(err);});
sub.on("message", function (channel, data) {
    data = JSON.parse(data);
    console.log("Inside Redis_Sub: data from channel " + channel + ": " + (data.sendType));
    if (parseInt("sendToSelf".localeCompare(data.sendType)) === 0) {
        io.emit(data.method, data.data);
    }else if (parseInt("sendToAllConnectedClients".localeCompare(data.sendType)) === 0) {
        io.sockets.emit(data.method, data.data);
    }else if (parseInt("sendToAllClientsInRoom".localeCompare(data.sendType)) === 0) {
        io.sockets.in(channel).emit(data.method, data.data);
    }

});

io.sockets.on('connection', function (socket) {

    sub.on("subscribe", function(channel, count) {
        console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
    });

    socket.on("setUsername", function (data) {
        console.log("Got 'setUsername' from client, " + JSON.stringify(data));
        var reply = JSON.stringify({
            method: 'message',
            sendType: 'sendToSelf',
            data: "You are now online"
        });
    });

    socket.on("createRoom", function (data) {
        console.log("Got 'createRoom' from client , " + JSON.stringify(data));
        sub.subscribe(data.room);
        socket.join(data.room);

        var reply = JSON.stringify({
            method: 'message',
            sendType: 'sendToSelf',
            data: "Share this room name with others to Join:" + data.room
        });
        pub.publish(data.room,reply);


    });
    socket.on("joinRooom", function (data) {
        console.log("Got 'joinRooom' from client , " + JSON.stringify(data));
        sub.subscribe(data.room);
        socket.join(data.room);

    });
    socket.on("sendMessage", function (data) {
        console.log("Got 'sendMessage' from client , " + JSON.stringify(data));
        var reply = JSON.stringify({
            method: 'message',
            sendType: 'sendToAllClientsInRoom',
            data: data.user + ":" + data.msg
        });
        pub.publish(data.room,reply);

    });

    socket.on('disconnect', function () {
        sub.quit();
        pub.publish("chatting","User is disconnected :" + socket.id);
    });

});