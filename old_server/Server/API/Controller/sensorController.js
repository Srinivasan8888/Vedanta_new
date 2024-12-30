import { broadcastAsideData, broadcastBsideData } from '../Websocket/apisocket.js';

// For sensors 1-6 (Aside)
export const updateSensor1Data = async (req, res) => {
  try {
    console.log('Received new sensor 1 data:', req.body);
    const sensorData = new SensorModel1(req.body);
    const savedData = await sensorData.save();
    
    console.log('Saved sensor 1 data:', savedData);
    broadcastAsideData(savedData);
    
    res.status(201).json(savedData);
  } catch (error) {
    console.error('Error updating sensor 1:', error);
    res.status(500).json({ error: error.message });
  }
};

// For sensors 7-10 (Bside)
export const updateSensor7Data = async (req, res) => {
  try {
    const sensorData = new SensorModel7(req.body);
    const savedData = await sensorData.save();
    
    // Broadcast the new data immediately
    broadcastBsideData(savedData);
    
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 