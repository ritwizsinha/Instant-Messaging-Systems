import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

import { WEBSOCKET_SERVER } from '../../config';


export const WebsocketComponent = () => {
    const client = io(WEBSOCKET_SERVER);
    const [msgs, setMsgs] = useState([]);
    const [totalDelay, setTotalDelay] = useState(0);

    const calculateAverageDelay = ({ message, time }) => {
        console.log(message, time);
        setMsgs(msgs => [...msgs, { message, time }]);
        setTotalDelay(delay => delay + Date.now() - time);
    }

    useEffect(() => {
        client.on('connect', () => {
            client.on('data', data => calculateAverageDelay(data));
        })
    }, []);

    return (

        <div className="jumbotron">
            <h1 className="display-4">WebSocket Server Stats</h1>
            <p className="lead">Shows the average delay in getting a message and allows you to post own message</p>
            <hr className="my-4" />

            <h4>Delay <span className={'badge badge-secondary'}>{msgs.length === 0 ? 0 : totalDelay /(msgs.length * 1000)} s</span></h4>

            <hr className="my-4" />
            <ul class="list-group">
                {msgs.map(({ message } ,index) => <li key={index} className="list-group-item">{message}</li>)}
            </ul>
        </div>

    )
}