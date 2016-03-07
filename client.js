window = process;   // simulate window global object on CLI environment ;-p

// import all modules
var Watcher = require('./libs/file_watcher');
var program = require('commander');
// var cli = require('')

// CONFIGURATION
// ===================================================================
var config = require('./config.js');
var serverAddr = config.server.ipAddress;
var serverPort = config.server.port;

// File watcher configuration
// --------------------------------------------------------------------
var w = new Watcher(__dirname + '/' + config.pubDir);
var fileList = [];
w.on('process', function(files) {
    fileList = files;
});

// Client socket configuration
// ---------------------------------------------------------------------
// Socket io libs
var io = require('socket.io-client');
var p2p = require('socket.io-p2p');

var s = io.connect(serverAddr + ':' + serverPort);
s.emit('new-connection', config.client);
s.on('client_disconnect', function(data) {
    console.log('Peer: ' + data.username + ' is disconnected');
});

// run file watcher
w.start();

// MAIN PROGRAM






