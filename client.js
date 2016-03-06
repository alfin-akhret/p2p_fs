window = process;   // simulate window global object on CLI environment ;-p

// utility libs
var program = require('commander');

// Socket io libs
var io = require('socket.io-client');
var p2p = require('socket.io-p2p');

// client config
var clientData = {
    nodeName: 'alfin',
    filesAvailability: true
}
var s = io.connect('http://localhost:8000', function() {
    
});
