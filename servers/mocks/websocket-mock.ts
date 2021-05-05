import { io } from 'socket.io-client';
import { messageArr } from '../data';
import { WEBSOCKET_PORT, WEBSOCKET_SERVER } from '../config';

let run = 0, index = 0;
const length = messageArr.length;

const iterations = parseInt(process.env.ITERATIONS as string);
const intervals = parseInt(process.env.INTERVAL as string);

const id = setInterval(() => {
    run++;
    if (run === iterations) {
        clearInterval(id);
    } else {
        const socket = io(WEBSOCKET_SERVER);
        socket.on('connect', () => {
            socket.emit('message', {
                message: messageArr[index],
                time: Date.now(),
            });
            socket.disconnect();
        })

        index = (index + 1) % length;
    }
}, intervals)