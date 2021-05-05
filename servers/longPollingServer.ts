import express from 'express';
import cors from 'cors';

import { LONG_POLLING_PORT } from './config';

const app = express();

app.use(cors());
app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());
const pool= [] as Array<express.Response>;
app.get('/pool', (req, res) => {
    console.log(pool.length);
    pool.push(res);
});

app.post('/message', (req, res) => {
    const { message, time } = req.body;
    pool.forEach((res) => res.json({message, time}));
    res.end();
    pool.length = 0;
});


app.listen(LONG_POLLING_PORT, () => {
    console.log(`Listening to  port ${LONG_POLLING_PORT}`);
});

