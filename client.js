window = process;   // simulate window global object on CLI environment ;-p

var program = require('commander');

// set up the http server and p2p server
var http = require('http').Server();
var serverIO = require('socket.io')(http);
var p2pServer = require('socket.io-p2p-server');
serverIO.use(p2pServer);

// start the server
http.listen(8888, function() {
    console.log('server is listening on port 8888');
});

// client config
var io = require('socket.io-client');
var p2p = require('socket.io-p2p');

// start the client
var clientSocket = io.connect('http://localhost:8888');
var opts = {autoUpgrade: false, peerOpts: {trickle: false}};
var p2pClient = new p2p(clientSocket, opts);


// var socket = io.connect('http://localhost:8000');
// var opts = {autoUpgrade: false, peerOpts: {trickle: false}};
// var p2pSocket = new p2p(socket, opts);

// program
//     .arguments('<port>')        // define the port you want this application to listen
//     .action(function(port) {
//         // set up the http server
        
//     })
//     .parse(process.argv)