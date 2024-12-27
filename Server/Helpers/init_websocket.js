import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.WS_PORT || 4001;
const wss = new WebSocketServer({ port }, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});

export default wss;

