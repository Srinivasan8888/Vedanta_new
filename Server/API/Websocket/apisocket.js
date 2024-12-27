import { Server } from 'socket.io';
import { createServer } from 'http';
import express from 'express';
import SensorModel1 from '../Models/SensorModel1.js';
import SensorModel2 from '../Models/SensorModel2.js';
import SensorModel3 from '../Models/SensorModel3.js';
import SensorModel4 from '../Models/SensorModel4.js';
import SensorModel5 from '../Models/SensorModel5.js';
import SensorModel6 from '../Models/SensorModel6.js';
import SensorModel7 from '../Models/SensorModel7.js';
import SensorModel8 from '../Models/SensorModel8.js';
import SensorModel9 from '../Models/SensorModel9.js';
import SensorModel10 from '../Models/SensorModel10.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Configure this according to your needs
    methods: ["GET", "POST"]
  }
});

// Namespace for A-side sensors (1-6)
const asideIO = io.of('/aside');
// Namespace for B-side sensors (7-10)
const bsideIO = io.of('/bside');

// Broadcast functions
export const broadcastAsideData = (newData) => {
  console.log('Broadcasting Aside data:', newData);
  asideIO.emit('sensorUpdate', { data: Array.isArray(newData) ? newData : [newData] });
};

export const broadcastBsideData = (newData) => {
  console.log('Broadcasting Bside data:', newData);
  bsideIO.emit('sensorUpdate', { data: Array.isArray(newData) ? newData : [newData] });
};

// A-side connection handler
asideIO.on('connection', async (socket) => {
  console.log('New client connected to Aside (Sensors 1-6)');

  try {
    const initialData = await Promise.all([
      SensorModel1.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel2.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel3.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel4.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel5.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel6.find().sort({ updatedAt: -1 }).limit(1)
    ]);

    const combinedInitialData = initialData.flat();
    socket.emit('initialData', { data: combinedInitialData });
  } catch (error) {
    console.error('Error fetching initial Aside sensor data:', error);
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected from Aside');
  });
});

// B-side connection handler
bsideIO.on('connection', async (socket) => {
  console.log('New client connected to Bside (Sensors 7-10)');

  try {
    const initialData = await Promise.all([
      SensorModel7.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel8.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel9.find().sort({ updatedAt: -1 }).limit(1),
      SensorModel10.find().sort({ updatedAt: -1 }).limit(1)
    ]);

    const combinedInitialData = initialData.flat();
    socket.emit('initialData', { data: combinedInitialData });
  } catch (error) {
    console.error('Error fetching initial Bside sensor data:', error);
  }

  socket.on('disconnect', () => {
    console.log('Client disconnected from Bside');
  });
});

// Start the server
const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

export { io, asideIO, bsideIO };