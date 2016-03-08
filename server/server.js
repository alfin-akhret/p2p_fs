var http = require('http').Server();

var io = require('socket.io')(http);
var p2pServer = require('socket.io-p2p-server').Server;

http.listen(8000, function() {
    console.log("Server is listening on port 8000");
});

// io.use(p2pServer);

var clientsData = [];

io.on('connection', function(socket) {
    console.log('new conn');


    socket.on('ping-test', function() {
        socket.emit('ping-reply', {message: 'ping reply from server'});
    });

    // socket.on('new_connection', function(data) {
    //     clientsData[socket.id] = data;
    // });

    // socket.on('disconnect', function() {
    //     socket.broadcast.emit('client_disconnect', clientsData[socket.id]);
    //     delete clientsData[socket.id];
    // });

    // socket.on('show_peers', function() {
    //     var peers = [];
    //     for (var index in clientsData) {
    //         if(index != socket.id) {
    //             peers.push(clientsData[index].username);
    //         }
    //     }
    //     socket.emit('all_peers', peers);
    // });

    // socket.on('updateFileIndex', function(data) {
    //     clientsData[socket.id].files = data;
    // });

    // socket.on('ls', function(data) {
    //     for (var i in clientsData) {
    //         if (clientsData[i].username === data) {
    //             socket.emit('files_found', clientsData[i].files);
    //         }
    //     }
    // });

});