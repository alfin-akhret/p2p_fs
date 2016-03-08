'use strict';

// electron modules
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

app.on('ready', function() {
    mainWindow = new BrowserWindow({width:800, heigth:600});
    mainWindow.loadURL('file://' + __dirname + '/public/index.html');
    mainWindow.on('close', function() {
        mainWindow = null;
    });
});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});
