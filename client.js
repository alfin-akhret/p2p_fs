window = process;   // simulate window global object on CLI environment ;-p
var io = require('socket.io-client');
var p2p = require('socket.io-p2p');

var socket = io.connect('http://localhost:8000');
var opts = {autoUpgrade: false, peerOpts: {trickle: false}};
var p2pSocket = new p2p(socket, opts);

p2pSocket.emit('test', {message: 'testing'});