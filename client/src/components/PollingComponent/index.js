import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { POLLING_SERVER } from '../../config';

export const PollingComponent = () => {
    const [msgs, setMsgs] = useState([]);
    const [delay, setDelay] = useState(0);

    const getMessages = async () => {
        // console.log(msgs);
        const latestReceivedMsg = (msgs.length === 0 ? 0 : msgs[msgs.length - 1]['time']);
        try {
            const res = await axios.get(`${POLLING_SERVER}?time=${latestReceivedMsg}`);
            const receivedAt = Date.now();
            let posts = res.data.posts;
            console.log(posts);
            let totalTimeDifference = 0;
            let totalTimeDifferenceArray = [];
            let items = msgs.length;
            if (posts.length > 0) {
                posts = posts.map(post => {
                    return { ...post, received: receivedAt }
                }); 
                posts = posts.sort((a, b) => {
                    return a.time - b.time;
                });
                totalTimeDifferenceArray = posts.reduce((acc, cur) => [ ...acc, (Math.abs(cur.received - cur.time))], []);
                console.log(totalTimeDifferenceArray)
                totalTimeDifference = totalTimeDifferenceArray.reduce((acc, cur) => acc+=cur, 0);
                items+=posts.length;
            }
            const d = items === 0 ? 0 : (delay * msgs.length + totalTimeDifference) / items;
            setDelay(d);
            setMsgs(msgs => [...msgs, ...posts]);
        } catch (e) {
            console.log(e && e.message ? e.message : e);
        }
    };

    useEffect(() => {
        const interval = setInterval(async () => {
            await getMessages();
        }, 3000);
        return () => clearInterval(interval);
    });

    return (
        <div className="jumbotron">
            <h1 className="display-4">Polling Server Stats</h1>
            <p className="lead">Shows the average delay in getting a message</p>
            <hr className="my-4" />

            <h4>Delay <span className="badge badge-secondary">{delay/1000} s</span></h4>

            <hr className="my-4" />
            <ul className="list-group">
                {msgs.map(({ message }) => <li className="list-group-item">{message}</li>)}
            </ul>
        </div>
    )
}