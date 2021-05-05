import express, { Request, Response, Router, json, urlencoded } from 'express';
import { POLLING_PORT } from './config';
const app = express();
const port = POLLING_PORT;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(json());
app.use(urlencoded({ extended: false }));
const data : Array<{
    message: string,
    time: number,
}>= [];

app.post('/message', async (req: Request, res: Response) => {
    const { message } = req.body;
    try {
        const post = {
            message,
            time: Date.now(),
        };
        data.push(post);

        return res.status(201).json({
            success: true,
            post,
        });
    } catch (e: any) {
        return res.status(500);
    }

});
app.get('/message', async (req: Request, res: Response) => {
    let { time } = req.query;
    const gt = parseInt(time as string);
    try {
        if (!time) {
            return res.status(400).json({});
        }

        const posts = data.filter(({ time: t }) =>  t > gt);
        console.log(posts);
        return res.status(200).json({
            posts,
        });
    } catch(err) {
        return res.status(500).json({});
    }

})
app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})