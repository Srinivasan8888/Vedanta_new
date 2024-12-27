require('dotenv').config();
const http = require('http');
const {WebSocketServer} = require('ws');
const url = require('url');

const server = http.createServer()
const wsServer = new WebSocketServer({server})
console.log(process.env.PORT)


wsServer.on('connection', (connection, request) => {
    // ws://localhost:9001/?token=jwt_token
    const { token } = url.parse(request.url, true).query;
    
    if (!token) {
        connection.send(JSON.stringify({ error: 'Authentication token required' }));
        connection.close();
        return;
    }

    try {
        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        connection.userId = decoded.userId; // Store userId on connection object
        
        console.log(`User ${decoded.userId} connected`);
        
        connection.send(JSON.stringify({ message: 'Successfully connected' }));

    } catch (error) {
        console.error('Invalid token:', error.message);
        connection.send(JSON.stringify({ error: 'Invalid authentication token' }));
        connection.close();
    }
})
server.listen(process.env.PORT, () => {

    console.log(`Server is running on port ${process.env.PORT}`);
})
