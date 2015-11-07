var port = 8887,
    io = require('socket.io')(port);

io.sockets.on('connection', function (client) {

    console.log('client connected:'+ client.id);

    client.emit('connected');

    var server = io.sockets;

    /*
        OnJoinRoom
    */
    client.on("joinRoom", function ( id ) {
        client.roomID = id;
        client.join(id);

        server.to(id).emit("onJoined", 'welcome to channel ' + id)

        console.log("client joined to " + id);
    });

    /*
        UpdateStore
    */

    client.on("updateStore", function ( message ) {
        console.log('updating store ->' + message.name);

        client.broadcast.to(client.roomID).emit('onUpdateStore', message);
    });

    /*
        Disconnect
    */

    client.on("disconnect", function () {
        client.leave(client.roomID);
    });


});

console.log("Listening on port " + port);