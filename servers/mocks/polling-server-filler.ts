import { messageArr } from '../data';
import axios from 'axios';
import { POLLING_SERVER } from '../config';

const iterations = parseInt(process.env.ITERATIONS as string);
const intervals = parseInt(process.env.INTERVAL as string);

let run = 0, index = 0;
const length = messageArr.length;
const id = setInterval(async () => {
    run++;
    if (run === iterations) {
        clearInterval(id);
    } else {
        await axios.post(POLLING_SERVER, {
            message: messageArr[index],
        });
        index = (index + 1)%length;
    }
}, intervals);
    