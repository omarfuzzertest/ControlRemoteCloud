var express = require("express");
var compression = require('compression');
var app = express();
var server = require('http').Server(app);
 const { Server } = require("socket.io");
 const io = new Server(server);
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(compression());
app.use('/', express.static(__dirname + '/www'));


 io.on('connection', (socket) => {
     console.log('a user connected');
     socket.on('disconnect', () => {
       console.log('user disconnected');
     });
 });


 io.on('connection', (socket) => {
     socket.on('chat message', (msg) => {
       console.log('message: ' + msg);
     });
 });

server.listen(3000, function () {
    console.log('listening on *:3000');
});



// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);


// app.use('/', express.static(__dirname + '/www'));

// /*app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/www/index.html');
// });*/

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
// });


// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });