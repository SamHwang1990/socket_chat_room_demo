/**
 * Created by sam on 14-12-5.
 * Socket.io Demo App Entry File
 */

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){

    io.emit('user_connect','a new user connected the chat room!');

    //msg is an object, contain two properties: nick_name and message
    socket.on('chat message',function(msg){
        console.log('message: ' + msg);
        socket.broadcast.emit('chat message', msg);
    });

    socket.on('user_typing',function(msg){
        socket.broadcast.emit('user_typing',msg);
    });

    //listen a disconnect event, and broadcast the msg to all user
    socket.on('disconnect',function(){
        io.emit('user_disconnect', 'an user disconnected from chat room!');
    })
});

http.listen(3000,function(){
    console.log('listening on *:3000');
});
