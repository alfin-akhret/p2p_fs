window = process;   // simulate window global object on CLI environment ;-p

// import all modules
var Watcher = require('./libs/file_watcher');
var program = require('commander');
var prompt = require('prompt');
var colors = require('colors');

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

        (function command() {
            prompt.get(['command'], function(err, r) {
                // early error return for exit
                if (err) {
                    console.log('\nTo exit, press ^C again.');
                    return;
                }

                var c = r.command;
                switch (c) {
                    case 'h':
                        console.log('show all available commands');
                        break;
                    case 'peers':
                        console.log('show all connected peers');
                        break;
                    case 'peek':
                        // if peers username provided
                        // show all files shared by peers
                        break;
                    case 'download':
                        // if peers username and target file provided
                        // open p2p connection to peer and download the target file
                        break;
                    default:
                        console.log('Unknown command. Type \'h\' to see all availbale commands');
                        break;
                }
                command();
            })
        })();
    })
    .parse(process.argv);






