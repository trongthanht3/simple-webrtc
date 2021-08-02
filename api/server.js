const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');

const { ExpressPeerServer } = require('peer');

const app = express();

const server = http.createServer(app)
const io = socketio(server).sockets;


// Body parser
app.use(express.json());

const customGen = () => {
    (Math.random().toString(36) + "00000").substr(2,10);
}

const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/',
    generateClientId: customGen
});


app.use('/newpeer', peerServer);

io.on('connection', () => console.log("connected"));

const port = 9000;
server.listen(port, () => console.log("server is running!"));