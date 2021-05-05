import dotenv from 'dotenv';
dotenv.config();

export const POLLING_PORT = process.env.POLLING_SERVER_PORT;
export const POLLING_SERVER = 'http://localhost:3001/message';
export const WEBSOCKET_SERVER = 'http://localhost:3002';
export const WEBSOCKET_PORT = process.env.WEBSOCKET_PORT;
export const SSE_PORT = process.env.SSE_PORT;
export const SSE_SERVER = `http://localhost:3003`;
export const LONG_POLLING_PORT = process.env.LONG_POLLING_PORT;
export const LONG_POLLING_SERVER = `http://localhost:3004`;