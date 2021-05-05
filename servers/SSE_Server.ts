import express from 'express';
import cors from 'cors';
import { SSE_PORT } from './config';
const app = express();
app.use(express.urlencoded({
    extended: true,
}));
app.use(cors());
app.use(express.json());

app.listen(SSE_PORT, () => {
    console.log(`Listening on ${SSE_PORT}`);
});
const posts : Array<{
    message: string,
    time: number
}> = [];
let clients : Array<{
    id: number,
    response: express.Response
}> = [];
app.get('/stream', (request, response) => {
    console.log("Here");;
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
      };
      response.writeHead(200, headers);
    
      const data = `data: ${JSON.stringify(posts)}\n\n`;
    
      response.write(data);
    
      const clientId = Date.now();
    
      const newClient = {
        id: clientId,
        response
      };
    
      clients.push(newClient);
    
      request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
      });
})

app.post('/message', (request, response) => {
    const { message, time } = request.body;
    console.log(message, time);
    posts.push({ message, time });
    response.json({message, time});
    sendToAllClients({ message, time });
})

function sendToAllClients({
    message, time
}) {
    clients.forEach((client) => {
        client.response.write(`data: ${JSON.stringify({message, time})}\n\n`);
    })
}