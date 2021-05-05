import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { LONG_POLLING_SERVER } from '../../config';

export const LongPollingComponent = () => {
    const [msgs, setMsgs] = useState([]);
    const [totalDelay, setTotalDelay] = useState(0);
    useEffect(() => {
        const f = async () => {
            try {
                const data = await axios.get(LONG_POLLING_SERVER);
                const { data: { message, time } } = data;
                // const msgList = [ ...msgs, {message, time}];
                setMsgs(msgs => [...msgs, {message, time}]);
                setTotalDelay(delay => delay + Date.now() - time);
            } catch (err) {
                console.log(err);
            }
            finally {
                f();
            }
        }

        f();
    },[]);

    return (

        <div className="jumbotron">
            <h1 className="display-4">Long Polling Server Stats</h1>
            <p className="lead">Shows the average delay in getting the message</p>
            <hr className="my-4" />

            <h4>Delay <span className={'badge badge-secondary'}>{msgs.length ? totalDelay/(msgs.length*1000): 0} s</span></h4>

            <hr className="my-4" />
            <ul class="list-group">
                {msgs.map(({ message }, index) => <li key={index} className="list-group-item">{message}</li>)}
            </ul>
        </div>

    )
}