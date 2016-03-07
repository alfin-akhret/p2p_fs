// file_watcher.js
// watch available files in public directory

// function prototype
function Watcher(watchDir) {
    this.watchDir = watchDir;
}

var events = require('events'),
    util = require('util');

// inheriting EventEmitter to watcher prototype
util.inherits(Watcher, events.EventEmitter);

// extending the event emitter functionality
var fs = require('fs');

Watcher.prototype.watch = function() {
    var watcher = this;
    fs.readdir(this.watchDir, function(err, files) {
        if (err) throw err;
        // for (var index in files) {
        //     watcher.emit('process', files[index]);
        // }
        watcher.emit('process', files);
    })
}

Watcher.prototype.start = function() {
    var watcher = this;
    fs.watchFile(this.watchDir, function() {
        watcher.watch();
    });
}

module.exports = Watcher;