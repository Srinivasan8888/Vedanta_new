import express from 'express';
import { io } from '../../Helpers/init_socketio.js'; // Import the Socket.IO instance

const router = express.Router();

// Route to handle fetching sensor data for Aside
router.get('/Aside', (req, res) => {
  io.emit('requestAsideData', { message: 'Fetching latest sensor data for Aside' });
  res.status(200).json({ message: 'Sensor data request for Aside sent to clients' });
});

// Route to handle fetching sensor data for Bside
router.get('/Bside', (req, res) => {
  io.emit('requestBsideData', { message: 'Fetching latest sensor data for Bside' });
  res.status(200).json({ message: 'Sensor data request for Bside sent to clients' });
});

export default router;
