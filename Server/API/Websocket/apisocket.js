// require('dotenv').config();
// const { WebSocketServer } = require('ws');
import { emit } from 'nodemon';
import wss from '../../Helpers/init_websocket.js';
import SensorModel1 from '../Models/SensorModel1.js';

wss.on('connection', async (ws) => {
  console.log('New client connected');
  let changeStream;

  wss.on('Aside', (message) => {
    // Parse the incoming message and send sensor data
    const data = JSON.parse(message);
    sendSensorData(data);
  });
  
  // Function to send sensor data
  const sendSensorData = async (data) => {
    try {
      ws.send(JSON.stringify({ data }));
    } catch (error) {
      console.error('Error sending sensor data:', error);
    }
  };

  // Send initial data
  try {
    const initialData = await SensorModel1.find()
      .sort({ updatedAt: -1 })
      .limit(1);
    await sendSensorData(initialData);
    
    // Set up change stream instead of polling
    changeStream = SensorModel1.watch();
    changeStream.on('change', async (change) => {
      try {
        // Get the full document for the change
        const newData = await SensorModel1.findById(change.documentKey._id);
        await sendSensorData([newData]);
      } catch (error) {
        console.error('Error handling change stream:', error);
      }
    });
  } catch (error) {
    console.error('Error fetching initial sensor data:', error);
  }

  // Clean up on client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    if (changeStream) {
      changeStream.close();
    }
  });
});

export default wss;