import mongoose from 'mongoose';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Import the existing MongoDB initialization
import '../Helpers/init_mongodb.js';

// WebSocket Server Setup
const server = new WebSocketServer({ port: 8080 });
console.log('WebSocket server running on port 8080');

// Store connected clients
const clients = new Set();

server.on('connection', (ws) => {
    console.log('Client connected');
    clients.add(ws);

    ws.on('close', () => {
        console.log('Client disconnected');
        clients.delete(ws);
    });
});

// Broadcast Function
const broadcast = (action, data) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: "update", action, data }));
        }
    });
};

// Fetch the most recent data based on createdAt field
const fetchLatestData = async (collection) => {
    try {
        const latestData = await collection
            .find()
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(1); // Limit to 1 document

        return latestData[0]; // Return the first document (the latest one)
    } catch (error) {
        console.error("Error fetching latest data:", error);
        return null;
    }
};

// Watch for Changes in sensormodel1
(async () => {
    try {
        const db = mongoose.connection;
        const sensormodel1Collection = db.collection('sensormodel1');
        const changeStream1 = sensormodel1Collection.watch();

        console.log('Watching changes on sensormodel1...');

        changeStream1.on('change', async (change) => {
            console.log('Change detected in sensor model 1:', change);

            if (change.operationType === 'insert') {
                const newData = change.fullDocument;

                // Fetch the latest data after the insert
                const latestData = await fetchLatestData(sensormodel1Collection);
                if (latestData) {
                    broadcast("sensor model 1 Update", latestData);
                }
            }
        });
    } catch (error) {
        console.error("Error setting up Change Stream for sensormodel1:", error);
    }
})();
