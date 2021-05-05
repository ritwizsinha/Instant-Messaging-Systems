import { messageArr } from '../data';
import axios from 'axios';
import { SSE_SERVER } from '../config';
let run = 0, index = 0;
const length = messageArr.length;

const iterations = parseInt(process.env.ITERATIONS as string);
const intervals = parseInt(process.env.INTERVAL as string);

const id = setInterval(async () => {
    run++;
    if (run === iterations) {
        clearInterval(id);
    } else {
       await axios.post(`${SSE_SERVER}/message`, {
            message: messageArr[index],
            time: Date.now(),
        });
        index = (index + 1)%length;
    }
}, intervals);
