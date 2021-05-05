import React, { useState, useEffect } from 'react';

import { SSE_SERVER } from '../../config';

export const SSEComponent = () => {
    const [msgs, setMsgs] = useState([]);
    const [totalDelay, setTotalDelay] = useState(0);
    const [avgDelay, setAvgDelay] = useState(0);

    const calculateAverageDelay = ( message, time ) => {
        const msgList = [{ message, time }, ...msgs];
        const curTime = Date.now();
        const currentDelay = totalDelay + curTime - time; 
        console.log(time, time, totalDelay);
        setAvgDelay(currentDelay/msgList.length);
        setTotalDelay(currentDelay);
        setMsgs(msgList);
    }

    const getMessage = (chunk) => {
        const data = JSON.parse(chunk?.data || "{}");
        if (data.message && data.time) 
            calculateAverageDelay(data.message, data.time);
    }
    useEffect(() => {
        const sse = new EventSource(SSE_SERVER);
        sse.onmessage = getMessage;
        return () => {
            sse.close();
        }
    });

    return (

        <div className="jumbotron">
            <h1 className="display-4">Server sent Events Server Stats</h1>
            <p className="lead">Shows the average delay in getting a message and allows you to post own message</p>
            <hr className="my-4" />

            <h4>Delay <span className={'badge badge-secondary'}>{avgDelay/1000} s</span></h4>

            <hr className="my-4" />
            <ul class="list-group">
                {msgs.map(({ message }) => <li className="list-group-item">{message}</li>)}
            </ul>
        </div>

    )
}