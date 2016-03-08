// CONFIGURATION
// ===================================================================
var config = require('./config.js');
var jq = require('jquery');
var serverAddr = config.server.ipAddress;
var serverPort = config.server.port;


jq(document).ready(function() {
    // Client socket configuration
    // ---------------------------------------------------------------------
    // Socket io libs
    var Socketiop2p = require('socket.io-p2p');
    var io = require('socket.io-client');

    var socket = io.connect('http://localhost:8000');
    var opts = {peerOpts: {trickle: false}, autoUpgrade: false}
    var p2psocket = new Socketiop2p(socket, opts);

});






