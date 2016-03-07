var http = require('http').Server();

var io = require('socket.io')(http);
var p2pServer = require('socket.io-p2p-server').Server;

io.use(p2pServer);
http.listen(8000, function() {
    console.log("Server is listening on port 8000");
});

var clientsData = [];

io.on('connection', function(socket) {
    
    socket.on('new-connection', function(data) {
        clientsData[socket.id] = data;
    });
});