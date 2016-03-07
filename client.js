window = process;   // simulate window global object on CLI environment ;-p

// import fileWatcher
var Watcher = require('./libs/file_watcher');

// import config file
var config = require('./config.js');
var serverAddr = config.server.ipAddress;
var serverPort = config.server.port;


// set up file watcher
var w = new Watcher('./public');
var fileList = [];
w.on('process', function(files) {
    fileList = files;
    console.log(fileList);
});

w.start();

// utility libs
var program = require('commander');

// Socket io libs
var io = require('socket.io-client');
var p2p = require('socket.io-p2p');

var s = io.connect(serverAddr + ':' + serverPort);
s.emit('new-connection', config.client);


