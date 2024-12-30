import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const server = createServer();

// Create separate WebSocket servers for each endpoint
const wssAside = new WebSocketServer({ noServer: true });
const wssBside = new WebSocketServer({ noServer: true });

// Handle upgrade requests
server.on('upgrade', (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

  if (pathname === '/WS/Api/Aside') {
    wssAside.handleUpgrade(request, socket, head, (ws) => {
      wssAside.emit('connection', ws, request);
    });
  } else if (pathname === '/WS/Api/Bside') {
    wssBside.handleUpgrade(request, socket, head, (ws) => {
      wssBside.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(4001);

export { wssAside, wssBside };

