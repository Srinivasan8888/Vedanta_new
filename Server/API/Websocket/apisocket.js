// require('dotenv').config();
// const { WebSocketServer } = require('ws');
import wss from '../../Helpers/init_websocket.js';
import SensorModel1 from '../Models/SensorModel1.js';

wss.on('connection', async (ws) => {
  console.log('New client connected');
  let lastTimestamp = new Date();
  
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
    lastTimestamp = initialData[0]?.updatedAt || new Date();
  } catch (error) {
    console.error('Error fetching initial sensor data:', error);
  }

  // Poll for new data
  const pollInterval = setInterval(async () => {
    try {
      const newData = await SensorModel1.find({
        updatedAt: { $gt: lastTimestamp }
      }).sort({ updatedAt: 1 });

      if (newData.length > 0) {
        await sendSensorData(newData);
        lastTimestamp = newData[newData.length - 1].updatedAt;
      }
    } catch (error) {
      console.error('Error polling sensor data:', error);
    }
  }, 1000); // Poll every second

  // Clean up on client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(pollInterval);
  });
});

export default wss;