// CONFIGURATION
// ===================================================================
var config = require('./config.js');
var serverAddr = config.server.ipAddress;
var serverPort = config.server.port;

// Client socket configuration
// ---------------------------------------------------------------------
// Socket io libs
var io = require('socket.io-client');
var p2p = require('socket.io-p2p');

var s = io.connect('http://localhost:8000');





