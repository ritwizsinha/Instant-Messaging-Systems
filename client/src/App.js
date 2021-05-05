import React, { useState } from 'react';

import { PollingComponent } from './components/PollingComponent';
import { WebsocketComponent } from './components/WebSocketComponent';
import { SSEComponent } from './components/SSEComponent';
import { LongPollingComponent } from './components/LongPollingComponent';

function App() {
  const [currenView, setCurrentView] = useState('polling');

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Server Stats</span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className={`nav-item ${currenView === 'polling' ? 'active' : ''}`}>
              <span className="nav-link" onClick={() => setCurrentView('polling')}>Polling<span className="sr-only">(current)</span></span>
            </li>
            <li className={`nav-item ${currenView === 'long-polling' ? 'active' : ''}`}>
              <span className="nav-link" onClick={() => setCurrentView('long-polling')}>Long Polling<span className="sr-only">(current)</span></span>
            </li>
            <li className={`nav-item ${currenView === 'websocket' ? 'active' : ''}`}>
              <span className="nav-link" onClick={() => setCurrentView('websocket')}>WebSocket<span className="sr-only">(current)</span></span>
            </li>
            <li className={`nav-item ${currenView === 'serversent' ? 'active' : ''}`}>
              <span className="nav-link" onClick={() => setCurrentView('serversent')}>Server Sent<span className="sr-only">(current)</span></span>
            </li>
          </ul>
        </div>
      </nav>
      {currenView === 'polling' && <PollingComponent />}
      {currenView === 'long-polling' && <LongPollingComponent />}
      {currenView === 'websocket' && <WebsocketComponent />}
      {currenView === 'serversent' && <SSEComponent /> }
    </div>
  );
}

export default App;
