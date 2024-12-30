import SensorModel1 from '../Models/SensorModel1.js'
import SensorModel2 from '../Models/SensorModel2.js'
import SensorModel3 from '../Models/SensorModel3.js'
import SensorModel4 from '../Models/SensorModel4.js'
import SensorModel5 from '../Models/SensorModel5.js'
import SensorModel6 from '../Models/SensorModel6.js'
import SensorModel7 from '../Models/SensorModel7.js'
import SensorModel8 from '../Models/SensorModel8.js'
import SensorModel9 from '../Models/SensorModel9.js'
import SensorModel10 from '../Models/SensorModel10.js'
import { wss } from '../../Helpers/init_websocket.js'

// Export the function if you need to use it elsewhere
export const fetchAndSendSensorData = async () => {
  try {
    const [data, data1, data2, data3, data4, data5] = await Promise.all([
      SensorModel1.find(),
      SensorModel2.find(),
      SensorModel3.find(),
      SensorModel4.find(),
      SensorModel5.find(),
      SensorModel6.find().sort({ updatedAt: -1 }).limit(1),
    ]);

    const combinedData = [
      ...data,
      ...data1,
      ...data2,
      ...data3,
      ...data4,
      ...data5,
    ];

    return combinedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// WebSocket handling
wss.on('connection', (ws) => {
  console.log('Client connected.');

  const sendSensorData = async () => {
    try {
      const combinedData = await fetchAndSendSensorData();
      ws.send(JSON.stringify({
        message: 'Data fetched successfully.',
        data: combinedData,
      }));
    } catch (error) {
      ws.send(JSON.stringify({
        error: 'An error occurred while fetching data.',
      }));
    }
  };

  sendSensorData();
  const intervalId = setInterval(sendSensorData, 1000);

  ws.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
