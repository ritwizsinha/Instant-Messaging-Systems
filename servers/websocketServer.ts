import express from 'express'
import http from 'http';

import { WEBSOCKET_PORT  } from './config';
const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket: any) => {
    console.log("New WS Connection....");
    console.log(socket.id);
    socket.on('message', (data: any) => {
        io.emit('data', data);
    });
});


server.listen(WEBSOCKET_PORT, () => {
    console.log(`Listening on port ${WEBSOCKET_PORT}`);
})
