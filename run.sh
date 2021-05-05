#!/bin/bash

# Setting up environment variables
iterations=2000
interval=100
#Starting servers and mocks
cd servers
npm run polling-server > /dev/null 2>&1 &

ITERATIONS=$iterations INTERVAL=$interval npx ts-node mocks/polling-server-filler.ts  > /dev/null 2>&1 &

npm run websocket-server > /dev/null 2>&1 &

ITERATIONS=$iterations INTERVAL=$interval npx ts-node mocks/websocket-mock.ts > /dev/null 2>&1 &

npm run sse-server > /dev/null 2>&1 &

ITERATIONS=$iterations INTERVAL=$interval npx ts-node mocks/sse-mock.ts > /dev/null 2>&1 &

npm run long-polling > /dev/null 2>&1 &

ITERATIONS=$iterations INTERVAL=$interval npx ts-node mocks/longpolling-mock.ts > /dev/null 2>&1