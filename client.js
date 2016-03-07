window = process;   // simulate window global object on CLI environment ;-p

// import all modules
var Watcher = require('./libs/file_watcher');
var program = require('commander');
var prompt = require('prompt');

// CONFIGURATION
// ===================================================================
var config = require('./config.js');
var serverAddr = config.server.ipAddress;
var serverPort = config.server.port;

// File watcher configuration
// --------------------------------------------------------------------
var w = new Watcher(__dirname + '/' + config.pubDir);
var fileList = [];

// Client socket configuration
// ---------------------------------------------------------------------
// Socket io libs
var io = require('socket.io-client');
var p2p = require('socket.io-p2p');  

// MAIN PROGRAM
// =====================================================================
program
    .arguments('<host>')
    .arguments('<port>')
    .action(function(host, port) {
        // create new socket connection
        if(host && port) 
            var s = io.connect(host + ':' + port);
        else
            var s = io.connect(serverAddr + ':' + serverPort);

        // send new connection event to the server
        s.emit('new-connection', config.client);

        // handler for:
        // client_disconnect event 
        s.on('client_disconnect', function(data) {
            console.log('Peer: ' + data.username + ' is disconnected');
        });

        // run file watcher
        w.start();
        w.on('process', function(files) {
            fileList = files;
        });  
    })
    .parse(process.argv);






