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
        if(host && port) {
            var s = io.connect(host + ':' + port);  
        } else {
            var s = io.connect(serverAddr + ':' + serverPort);
        }

        // send new connection event to the server
        s.emit('new_connection', config.client);

        // handler for:
        // client_disconnect event 
        s.on('client_disconnect', function(data) {
            console.log('Peer: ' + data.username + ' is disconnected');
        });

        (function command() {
            prompt.get({name:'command', message:colors.green('>>')}, function(err, r) {
                // early error return for exit
                if (err) {
                    console.log('\nTo exit, press ^C again.');
                    return;
                }

                var c = r.command;
                
                if (c) {
                    if (c === 'peers') {
                        s.emit('show_peers', {message: 'get all peers'});
                        s.on('all_peers', function(data) {
                            console.log('Showing all online peers:');
                            for (var i in data) {
                                console.log(i +'. ' + data[i]);
                            }
                        });
                        command();

                        return;
                    }

                    if (c === 'publish') {
                        console.log('Publishing files...');
                        w.start();

                        w.on('process', function(files) {
                            fileList = files;
                            s.emit('updateFileIndex', fileList);
                        });
                        command();
                        return;
                    } 

                    if (c.split(' ')[0] === 'ls') {
                        var peer = c.split(' ')[1];
                        console.log('Files publish by ' + peer);

                        s.emit('ls', peer);

                        s.on('files_found', function(data) {
                            for (var i in data) {
                                console.log(data[i]);
                            }
                        });
                        command();
                        return;
                    }
                }

                command();
            })
        })();
    })
    .parse(process.argv);






